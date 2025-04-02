import { typeOption, sectionOption, dayOption, TimeOption } from "../../types";

export function fetchData(courseName: string) {
  console.log(`Fetching data for course: ${courseName}`);
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
