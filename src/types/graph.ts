export interface DataPoint {
  date: string;
  value: number;
}

export interface TimeRange {
  label: string;
  days: number;
}

export interface TimeSeriesGraphProps {
  data: DataPoint[];
  timeRanges: TimeRange[];
  defaultRange?: string;
  xAxisLabel: string;
  yAxisLabel: string;
  title: string;
  tooltipValueLabel: string;
}
