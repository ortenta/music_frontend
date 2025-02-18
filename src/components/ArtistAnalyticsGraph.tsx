import React, { useState, useEffect } from "react";

interface GraphData {
  date: string;
  rating?: number;
  listeners?: number;
}

interface ArtistAnalyticsGraphProps {
  data: GraphData[];
  title: string;
  type: "rating" | "listeners";
  artistId: string;
  onTimePeriodChange: (period: string) => void;
}

type TimePeriod = "all" | "90days" | "30days" | "7days";

export const ArtistAnalyticsGraph: React.FC<ArtistAnalyticsGraphProps> = ({
  data,
  title,
  type,
  onTimePeriodChange,
}) => {
  console.log(data, "artist data");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    date: string;
    value: number;
  }>({
    show: false,
    x: 0,
    y: 0,
    date: "",
    value: 0,
  });

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
    const days = period === "all" ? "" : period.replace("days", "");
    onTimePeriodChange(days);
  };


  const getFilteredData = () => {
    const now = new Date();
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    switch (timePeriod) {
      case "7days":
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        return sortedData.filter((item) => new Date(item.date) >= sevenDaysAgo);
      case "30days":
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        return sortedData.filter(
          (item) => new Date(item.date) >= thirtyDaysAgo
        );
      case "90days":
        const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
        return sortedData.filter(
          (item) => new Date(item.date) >= ninetyDaysAgo
        );
      default:
        return sortedData;
    }
  };

  const filteredData = getFilteredData();
  const values = filteredData.map((d) =>
    type === "rating" ? d.rating! : d.listeners!
  );
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  // Calculate y-axis labels
  const yAxisLabels = Array.from({ length: 6 }, (_, i) => {
    const value = minValue + ((maxValue - minValue) * (5 - i)) / 5;
    return type === "listeners"
      ? `${(value / 1000000).toFixed(1)}M`
      : Math.round(value).toString();
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
  };

  console.log('timwperiod,', timePeriod,'',);
  return (
    <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#FFD700] mb-4">
          {title}
        </h2>
        {/* Time period toggle */}
        <div className="inline-flex bg-gray-100 dark:bg-[#2C2C2C] rounded-lg p-1">
          {[
            { label: "All", value: "all" },
            { label: "90 days", value: "90days" },
            { label: "30 days", value: "30days" },
            { label: "7 days", value: "7days" },
          ].map((period) => (
            <button
              key={period.value}
              // onClick={() => setTimePeriod(period.value as TimePeriod)}
              onClick={() => {
                console.log('period', period.value);
                handleTimePeriodChange(period.value as TimePeriod)
              }}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                timePeriod === period.value
                  ? "bg-indigo-600 dark:bg-[#4B7BEC] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pr-4 text-sm text-gray-600 dark:text-gray-400 h-[400px]">
          {yAxisLabels.map((label, i) => (
            <div key={i}>{label}</div>
          ))}
        </div>

        {/* Graph container */}
        <div className="relative flex-grow h-[400px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
          >
            {/* Grid lines */}
            {yAxisLabels.map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * (100 / 5)}
                x2="100"
                y2={i * (100 / 5)}
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="dark:stroke-[#333]"
              />
            ))}

            {/* Area under the curve */}
            <path
              d={`
                M 0,100
                ${filteredData
                  .map((data, i) => {
                    const x = (i / (filteredData.length - 1)) * 100;
                    const value =
                      type === "rating" ? data.rating! : data.listeners!;
                    const y =
                      100 - ((value - minValue) / (maxValue - minValue)) * 100;
                    return `${i === 0 ? "M" : "L"} ${x},${y}`;
                  })
                  .join(" ")}
                L 100,100
                Z
              `}
              fill="url(#gradient)"
              opacity="0.3"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Line graph */}
            <path
              d={filteredData
                .map((data, i) => {
                  const x = (i / (filteredData.length - 1)) * 100;
                  const value =
                    type === "rating" ? data.rating! : data.listeners!;
                  const y =
                    100 - ((value - minValue) / (maxValue - minValue)) * 100;
                  return `${i === 0 ? "M" : "L"} ${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#FFD700"
              strokeWidth="0.5"
            />

            {/* Data points */}
            {filteredData.map((data, i) => {
              const x = (i / (filteredData.length - 1)) * 100;
              const value = type === "rating" ? data.rating! : data.listeners!;
              const y =
                100 - ((value - minValue) / (maxValue - minValue)) * 100;
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="0.8"
                    fill="#FFD700"
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        show: true,
                        x: rect.left,
                        y: rect.top,
                        date: data.date,
                        value: value,
                      });
                    }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        show: true,
                        x: rect.left,
                        y: rect.top,
                        date: data.date,
                        value: value,
                      });
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {tooltip.show && (
            <div
              className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 transform -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{
                left: tooltip.x,
                top: tooltip.y - 8,
              }}
            >
              <div className="text-sm text-gray-900 dark:text-white">
                <div className="font-semibold">
                  Date: {formatDate(tooltip.date)}
                </div>
                <div>
                  {type === "listeners" ? "Listeners" : "Rating"}:{" "}
                  {type === "listeners"
                    ? tooltip.value.toLocaleString()
                    : tooltip.value}
                </div>
              </div>
            </div>
          )}

          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {filteredData
              .filter((_, i) => i % Math.ceil(filteredData.length / 6) === 0)
              .map((data) => (
                <div
                  key={data.date}
                  className="text-sm text-gray-600 dark:text-gray-400 transform -rotate-45 origin-top-left"
                >
                  {formatDate(data.date)}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};