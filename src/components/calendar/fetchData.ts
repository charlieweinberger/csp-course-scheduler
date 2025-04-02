import { typeOption, sectionOption, dayOption, TimeOption } from "../../types";

// TODO replace this with anteater API

export function fetchData(courseName: string) { // TODO make this async
  console.log(`Fetching data for course: ${courseName}`);

  // const [ department, courseNumber ] = courseName.split(/ (?!.* )/);
  // try {
  //   const response = await fetch(`https://anteaterapi.com/v2/rest/websoc?year=2025&quarter=Spring&department=${department}&courseNumber=${courseNumber}`);
  //   if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return null;
  // }

  return [
    [
      {
        name: "COMPSCI 161",
        code: 34250,
        type: "Lec" as typeOption,
        section: "A" as sectionOption,
        days: ["Tu", "Th"] as dayOption[],
        startTime: 8 as TimeOption,
        endTime: 9.5 as TimeOption,
      },
    ],
    [
      {
        name: "COMPSCI 161",
        code: 34251,
        type: "Dis" as typeOption,
        section: "A1" as sectionOption,
        days: ["M", "W"] as dayOption[],
        startTime: 17 as TimeOption,
        endTime: 18 as TimeOption,
      },
      {
        name: "COMPSCI 161",
        code: 34252,
        type: "Dis" as typeOption,
        section: "A2" as sectionOption,
        days: ["M", "W"] as dayOption[],
        startTime: 18 as TimeOption,
        endTime: 19 as TimeOption,
      },
      {
        name: "COMPSCI 161",
        code: 34253,
        type: "Dis" as typeOption,
        section: "A3" as sectionOption,
        days: ["M", "W"] as dayOption[],
        startTime: 15 as TimeOption,
        endTime: 16 as TimeOption,
      },
    ],
    [],
  ];
}
