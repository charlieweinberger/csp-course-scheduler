// import type { CourseEvent } from "../../types";

// interface MockDataType {
//   [name: string]: CourseEvent[][];
// }

// export const mockData: MockDataType = {
//   "COMPSCI 161": [
//     [
//       {
//         name: "COMPSCI 161",
//         code: 34250,
//         type: "Lec",
//         section: "A",
//         days: ["Tu", "Th"],
//         startTime: 8,
//         endTime: 9.5
//       }
//     ],
//     [
//       {
//         name: "COMPSCI 161",
//         code: 34251,
//         type: "Dis",
//         section: "A1",
//         days: ["M", "W"],
//         startTime: 17,
//         endTime: 18
//       },
//       {
//         name: "COMPSCI 161",
//         code: 34252,
//         type: "Dis",
//         section: "A2",
//         days: ["M", "W"],
//         startTime: 18,
//         endTime: 19
//       },
//       {
//         name: "COMPSCI 161",
//         code: 34253,
//         type: "Dis",
//         section: "A3",
//         days: ["M", "W"],
//         startTime: 15,
//         endTime: 16
//       }
//     ],
//     []
//   ],
//   "COMPSCI 178": [
//     [
//       {
//         name: "COMPSCI 178",
//         code: 34340,
//         type: "Lec",
//         section: "A",
//         days: ["Tu", "Th"],
//         startTime: 15.5,
//         endTime: 17
//       }
//     ],
//     [
//       {
//         name: "COMPSCI 178",
//         code: 34341,
//         type: "Dis",
//         section: "1",
//         days: ["W"],
//         startTime: 8,
//         endTime: 9
//       },
//       {
//         name: "COMPSCI 178",
//         code: 34342,
//         type: "Dis",
//         section: "2",
//         days: ["W"],
//         startTime: 10,
//         endTime: 11
//       },
//       {
//         name: "COMPSCI 178",
//         code: 34343,
//         type: "Dis",
//         section: "3",
//         days: ["W"],
//         startTime: 9,
//         endTime: 10
//       },
//       {
//         name: "COMPSCI 178",
//         code: 34344,
//         type: "Dis",
//         section: "4",
//         days: ["W"],
//         startTime: 15,
//         endTime: 16
//       },
//       {
//         name: "COMPSCI 178",
//         code: 34345,
//         type: "Dis",
//         section: "5",
//         days: ["W"],
//         startTime: 14,
//         endTime: 15
//       },
//     ],
//     []
//   ],
//   "I&C SCI 139W": [
//     [
//       {
//         name: "I&C SCI 139W",
//         code: 35890,
//         type: "Lec",
//         section: "C",
//         days: ["M", "W"],
//         startTime: 12.5,
//         endTime: 14
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35900,
//         type: "Lec",
//         section: "D",
//         days: ["W"],
//         startTime: 17,
//         endTime: 20
//       }
//     ],
//     [
//       {
//         name: "I&C SCI 139W",
//         code: 35891,
//         type: "Dis",
//         section: "C1",
//         days: ["W"],
//         startTime: 11,
//         endTime: 12
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35892,
//         type: "Dis",
//         section: "C2",
//         days: ["W"],
//         startTime: 9,
//         endTime: 10
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35893,
//         type: "Dis",
//         section: "C3",
//         days: ["W"],
//         startTime: 17,
//         endTime: 18
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35894,
//         type: "Dis",
//         section: "C4",
//         days: ["W"],
//         startTime: 18,
//         endTime: 19
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35901,
//         type: "Dis",
//         section: "D1",
//         days: ["F"],
//         startTime: 13,
//         endTime: 14
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35902,
//         type: "Dis",
//         section: "D2",
//         days: ["F"],
//         startTime: 14,
//         endTime: 15
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35903,
//         type: "Dis",
//         section: "D3",
//         days: ["F"],
//         startTime: 15,
//         endTime: 16
//       },
//       {
//         name: "I&C SCI 139W",
//         code: 35904,
//         type: "Dis",
//         section: "D4",
//         days: ["F"],
//         startTime: 16,
//         endTime: 17
//       },
//     ],
//     []
//   ],
//   "I&C SCI 51": [
//     [
//       {
//         name: "I&C SCI 51",
//         code: 35790,
//         type: "Lec",
//         section: "A",
//         days: ["Tu", "Th"],
//         startTime: 9.5,
//         endTime: 11
//       }
//     ],
//     [
//       {
//         name: "I&C SCI 51",
//         code: 35791,
//         type: "Dis",
//         section: "A1",
//         days: ["F"],
//         startTime: 16,
//         endTime: 17
//       }
//     ],
//     [
//       {
//         name: "I&C SCI 51",
//         code: 35795,
//         type: "Lab",
//         section: "1",
//         days: ["M", "W"],
//         startTime: 11,
//         endTime: 12.5
//       },
//       {
//         name: "I&C SCI 51",
//         code: 35796,
//         type: "Lab",
//         section: "2",
//         days: ["M", "W"],
//         startTime: 12.5,
//         endTime: 14
//       },
//       {
//         name: "I&C SCI 51",
//         code: 35797,
//         type: "Lab",
//         section: "3",
//         days: ["M", "W"],
//         startTime: 14,
//         endTime: 15.5
//       },
//       {
//         name: "I&C SCI 51",
//         code: 35798,
//         type: "Lab",
//         section: "4",
//         days: ["M", "W"],
//         startTime: 15.5,
//         endTime: 17
//       },
//       {
//         name: "I&C SCI 51",
//         code: 35799,
//         type: "Lab",
//         section: "5",
//         days: ["M", "W"],
//         startTime: 17,
//         endTime: 18.5
//       },
//       {
//         name: "I&C SCI 51",
//         code: 35800,
//         type: "Lab",
//         section: "6",
//         days: ["M", "W"],
//         startTime: 18.5,
//         endTime: 20
//       },
//       {
//         name: "I&C SCI 51",
//         code: 35801,
//         type: "Lab",
//         section: "7",
//         days: ["M", "W"],
//         startTime: 20,
//         endTime: 21.5
//       }
//     ]
//   ]
// };
