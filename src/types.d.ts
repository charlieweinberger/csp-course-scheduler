// Basic types
type CapitalLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple";
type TypeOption = "Lec" | "Dis" | "Lab";
type SectionOption = `${CapitalLetter | ""}${Digit | ""}`;
type DayOption = "M" | "Tu" | "W" | "Th" | "F";
type TimeOption = 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12 | 12.5 | 13 | 13.5 | 14 | 14.5 | 15 | 15.5 | 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5 | 20 | 20.5 | 21 | 21.5 | 22;
type DayAbbreviation = "M" | "T" | "W" | "Th" | "F";

// TODO fix overlaps between types here

// Calendar related types
interface CourseEvent {
  name: string;
  code: number;
  type: TypeOption;
  section: SectionOption;
  days: DayOption[];
  startTime: TimeOption;
  endTime: TimeOption;
}

interface CSPSelections {
  [courseName: string]: {
    lecture: CourseEvent | null;
    discussion: CourseEvent | null;
    lab: CourseEvent | null;
  }
}

// Course and course selection types
interface Course {
  id: string;
  department: string;
  number: string;
  title?: string;
  isPeeked?: boolean;
}

interface CourseSection {
  id: string;
  type: string;
  sectionCode: string;
  days: string[];
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
}

interface CourseData {
  title: string;
  sections: CourseSection[];
}

interface CourseSchedule {
  courses: Array<Course & CourseSection & { title: string }>;
  stats: {
    totalUnits: number;
    averageDayLength: string;
    longestBreak: string;
    shortestBreak: string;
  };
}

interface DisplayCourseSection extends CourseSection {
  department: string;
  number: string;
  title: string;
  isHighlighted: boolean;
}

type CourseSections = Record<string, CourseData>;

// Component Props
interface CourseSelectionProps {
  courses: Course[];
  department: string;
  courseNumber: string;
  setDepartment: (value: string) => void;
  setCourseNumber: (value: string) => void;
  addCourse: () => void;
  removeCourse: (id: string) => void;
  toggleCoursePeek: (id: string) => void;
  generateSchedule: () => void;
  clearAll: () => void;
  isGenerating: boolean;
  peekedCourses: string[];
  schedule: CourseSchedule | null;
}

interface PreferencesProps {
  preferredDays: DayOption[];
  setPreferredDays: (days: DayOption[]) => void;
  preferredTimeRange: number[];
  setPreferredTimeRange: (range: number[]) => void;
  avoidBackToBack: boolean;
  setAvoidBackToBack: (value: boolean) => void;
  preferCompactSchedule: boolean;
  setPreferCompactSchedule: (value: boolean) => void;
  maxClassesPerDay: number;
  setMaxClassesPerDay: (value: number) => void;
}

interface ScheduleProps {
  schedule: CourseSchedule | null;
  selectedCourses: Course[];
  peekedCourses: string[];
  courseSections: CourseSections;
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface CourseSection {
  id: string;
  department: string;
  number: string;
  title: string;
  sectionCode: string;
  type: string;
  instructor: string;
  days: string[];
  startTime: string;
  endTime: string;
  location: string;
  isHighlighted?: boolean;
}

interface DisplayCourseSection extends CourseSection {
  isHighlighted?: boolean;
}

interface CourseData {
  title: string;
  sections: CourseSection[];
}

interface ScheduleStats {
  totalUnits: number;
  averageDayLength: string;
  longestBreak: string;
  shortestBreak: string;
}

interface GeneratedSchedule {
  courses: CourseSection[];
  stats: ScheduleStats;
}

interface Course {
  id: string;
  department: string;
  number: string;
}

interface ScheduleProps {
  schedule: GeneratedSchedule | null;
  selectedCourses: Course[];
  peekedCourses: string[];
  courseSections: Record<string, CourseData>;
}