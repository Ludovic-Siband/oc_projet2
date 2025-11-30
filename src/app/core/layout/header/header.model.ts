export interface HeaderIndicator {
  label: string;
  value: string | number;
}

export interface HeaderConfig {
  title: string;
  indicators: HeaderIndicator[];
}
