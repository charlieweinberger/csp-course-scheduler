import { Event } from "react-big-calendar";

type CapitalLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type dayOption = "M" | "Tu" | "W" | "Th" | "F";
type TimeOption = 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12 | 12.5 | 13 | 13.5 | 14 | 14.5 | 15 | 15.5 | 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5 | 20 | 20.5 | 21 | 21.5 | 22;

interface CourseEvent {
  name: string;
  code: number;
  type: "Lec" | "Dis" | "Lab";
  section: `${CapitalLetter | ""}${Digit | ""}`;
  days: dayOption[];
  startTime: TimeOption;
  endTime: TimeOption;
}

interface CalendarEvent extends Event {
  color: string;
}