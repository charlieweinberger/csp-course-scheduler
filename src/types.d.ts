import { Event } from "react-big-calendar";

interface CourseEvent {
  name: string;
  code: number;
  type: "Lec" | "Dis" | "Lab";
  section: string; // "A", "A1", "A2", "B", "B1", "B2", etc.
  days: string[]; // combinations of "M", "T", "W", "Th", and "F"
  startTime: number; // military time (ex: "17:00" for 5pm), 0.5 for half hours
  endTime: number; // military time, 0.5 for half hours
}

interface CalendarEvent extends Event {
  id: number;
  color: string;
}