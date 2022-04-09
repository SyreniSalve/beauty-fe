
export interface Event {
  id: number;
  title?: string;
  startTime: Date;
  endTime: Date;
  startTimeZone?: string;
  endTimeZone?: string;
  location?: string;
  color?: string;
}
