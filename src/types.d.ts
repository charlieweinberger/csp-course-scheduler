import { Event } from "react-big-calendar";

// TODO update types to match Anteater API data

type CapitalLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple";
type TypeOption = "Lec" | "Dis" | "Lab";
type SectionOption = `${CapitalLetter | ""}${Digit | ""}`;
type DayOption = "M" | "Tu" | "W" | "Th" | "F";
type TimeOption = 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12 | 12.5 | 13 | 13.5 | 14 | 14.5 | 15 | 15.5 | 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5 | 20 | 20.5 | 21 | 21.5 | 22;

interface CourseEvent {
  name: string;
  code: number;
  type: TypeOption;
  section: SectionOption;
  days: DayOption[];
  startTime: TimeOption;
  endTime: TimeOption;
}

interface CalendarEvent extends Event {
  color: string;
}

interface CSPSelections {
  [courseName: string]: {
    lecture: CourseEvent | null;
    discussion: CourseEvent | null;
    lab: CourseEvent | null;
  }
}

// Anteater API data types

interface ApiTime {
  hour: number;
  minute: number;
}

interface ApiMeeting {
  timeIsTBA: boolean;
  days?: string;
  startTime?: ApiTime;
  endTime?: ApiTime;
}

interface ApiSection {
  sectionCode: number;
  sectionType: string;
  sectionNum: string;
  meetings: ApiMeeting[];
}