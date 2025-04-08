import type {
  CourseEvent,
  DayOption,
  TimeOption,
  ApiTime,
  ApiSection,
} from "../../types";

function convertToDayOptions(days: string | undefined): DayOption[] {
  if (!days) return [];
  const dayOptions: DayOption[] = [];
  let substring = "";
  for (const char of days) {
    substring += char;
    if (["M", "Tu", "W", "Th", "F"].includes(substring)) {
      dayOptions.push(substring as DayOption);
      substring = "";
    }
  }
  // console.log(`Converted days: ${days} -> ${dayOptions}`);
  return dayOptions;
}

function convertToTimeOption(
  apiTime: ApiTime | undefined
): TimeOption | undefined {
  if (!apiTime) return undefined;
  const { hour, minute } = apiTime;
  const timeMap: { [key: number]: number } = {
    0: hour,
    20: hour + 0.5,
    30: hour + 0.5,
    50: hour + 1,
  };
  if (minute in timeMap) {
    const timeOption = timeMap[minute] as TimeOption;
    // console.log(`Converted days: ${hour}h${minute}m -> ${timeOption}`);
    return timeOption;
  } else {
    console.error(`Invalid minute value: ${minute}. Expected 0, 20, or 50.`);
    throw new Error("Invalid time format");
  }
}

export function fetchData(courseName: string): CourseEvent[][] {
  console.log(`Fetching data for course: ${courseName}`);

  const [courseDepartment, courseNumber] = courseName.split(/ (?!.* )/);
  const encodedDepartment = courseDepartment.replace(/&/g, "%26");
  const url = `https://anteaterapi.com/v2/rest/websoc?year=2025&quarter=Spring&department=${encodedDepartment}&courseNumber=${courseNumber}`;

  // TODO get anteater api API key

  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();

    if (xhr.status !== 200) {
      throw new Error(`HTTP error! Status: ${xhr.status}`);
    }

    const data = JSON.parse(xhr.responseText);
    console.log(`Data received for ${courseName}:`, data);

    const correctSchoolCheckpoint = data.data.schools[0];
    if (!correctSchoolCheckpoint) {
      console.error("That course does not exist.");
      return [];
    }

    const allSections: CourseEvent[] =
      correctSchoolCheckpoint.departments[0].courses[0].sections.map(
        (section: ApiSection) => {
          if (section.meetings[0].timeIsTBA) {
            return null;
          }
          return {
            name: courseName,
            code: section.sectionCode,
            type: section.sectionType,
            section: section.sectionNum,
            days: convertToDayOptions(section.meetings[0].days),
            startTime: convertToTimeOption(section.meetings[0].startTime),
            endTime: convertToTimeOption(section.meetings[0].endTime),
          } as CourseEvent;
        }
      );

    const timedSections = allSections.filter((section) => section !== null);

    return [
      timedSections.filter((section) => section.type === "Lec"),
      timedSections.filter((section) => section.type === "Dis"),
      timedSections.filter((section) => section.type === "Lab"),
    ];
  } catch (error) {
    console.error(`Error fetching: ${error}`);
    return [];
  }
}
