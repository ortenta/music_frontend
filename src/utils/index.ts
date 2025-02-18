import { DataPoint } from "../types/graph";

export const userData = JSON.parse(
  localStorage.getItem("musicUserData") || "{}"
);

export const formatDate = (date: string, rangeInDays: number): string => {
  const d = new Date(date);

  if (rangeInDays <= 7) {
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } else if (rangeInDays <= 30) {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

export const filterDataByRange = (
  data: DataPoint[],
  days: number
): DataPoint[] => {
  if (days === 0) return data;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return data.filter((point) => new Date(point.date) >= cutoffDate);
};

export const getMinMaxValues = (data: DataPoint[]) => {
  const values = data.map((d) => d.value);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

export const calculateScale = (min: number, max: number, height: number) => {
  const range = max - min;
  const step = range / 5;
  return {
    step,
    scale: height / range,
  };
};
