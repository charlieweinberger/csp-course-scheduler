"use client";

import { useState } from "react";

import { CourseSelection } from "@/components/CourseSelection";
import { Preferences } from "@/components/Preferences";
import { Schedule } from "@/components/Schedule";

// TODO Make sure course sections are in the same format as the Anteater API
const mockCourseSections: CourseSections = {
  "COMPSCI-161": {
    title: "Software Design",
    sections: [
      {
        id: "COMPSCI-161-LEC-A",
        type: "Lecture",
        sectionCode: "36720",
        days: ["T", "Th"],
        startTime: "11:00",
        endTime: "12:20",
        location: "DBH 1100",
        instructor: "Prof. Kay",
        department: "COMPSCI",
        number: "161",
        title: "Software Design",
      },
      {
        id: "COMPSCI-161-DIS-A1",
        type: "Discussion",
        sectionCode: "36721",
        days: ["F"],
        startTime: "10:00",
        endTime: "10:50",
        location: "ICS 174",
        instructor: "TA Smith",
        department: "COMPSCI",
        number: "161",
        title: "Software Design",
      },
      {
        id: "COMPSCI-161-DIS-A2",
        type: "Discussion",
        sectionCode: "36722",
        days: ["F"],
        startTime: "11:00",
        endTime: "11:50",
        location: "ICS 180",
        instructor: "TA Johnson",
        department: "COMPSCI",
        number: "161",
        title: "Software Design",
      }
    ]
  },
  "I&C SCI-51": {
    title: "Introductory Computer Organization",
    sections: [
      {
        id: "I&C SCI-51-LEC-A",
        type: "Lecture",
        sectionCode: "36520",
        days: ["M", "W", "F"],
        startTime: "13:00",
        endTime: "13:50",
        location: "HSLH 100A",
        instructor: "Prof. Bic",
        department: "I&C SCI",
        number: "51",
        title: "Introductory Computer Organization",
      },
      {
        id: "I&C SCI-51-LAB-A1",
        type: "Lab",
        sectionCode: "36521",
        days: ["M"],
        startTime: "14:00",
        endTime: "15:50",
        location: "ICS 183",
        instructor: "TA Williams",
        department: "I&C SCI",
        number: "51",
        title: "Introductory Computer Organization",
      },
      {
        id: "I&C SCI-51-LAB-A2",
        type: "Lab",
        sectionCode: "36522",
        days: ["W"],
        startTime: "14:00",
        endTime: "15:50",
        location: "ICS 183",
        instructor: "TA Davis",
        department: "I&C SCI",
        number: "51",
        title: "Introductory Computer Organization",
      }
    ]
  },
  "I&C SCI-139W": {
    title: "Critical Writing",
    sections: [
      {
        id: "I&C SCI-139W-LEC-A",
        type: "Lecture",
        sectionCode: "36820",
        days: ["M", "W"],
        startTime: "9:30",
        endTime: "10:50",
        location: "SSLH 100",
        instructor: "Prof. Garcia",
        department: "I&C SCI",
        number: "139W",
        title: "Critical Writing",
      },
      {
        id: "I&C SCI-139W-DIS-A1",
        type: "Discussion",
        sectionCode: "36821",
        days: ["F"],
        startTime: "9:00",
        endTime: "9:50",
        location: "HH 105",
        instructor: "TA Brown",
        department: "I&C SCI",
        number: "139W",
        title: "Critical Writing",
      },
      {
        id: "I&C SCI-139W-DIS-A2",
        type: "Discussion",
        sectionCode: "36822",
        days: ["F"],
        startTime: "10:00",
        endTime: "10:50",
        location: "HH 105",
        instructor: "TA Brown",
        department: "I&C SCI",
        number: "139W",
        title: "Critical Writing",
      }
    ]
  }
};

// TODO go through App.tsx, types.d.ts, fetchData.ts, and getEvents.ts. Manually review every line of code, and modify code to match what should work in my mind. Within fetchData.ts and getEvents.ts, connect backend to the current code (which is all frontend, from v0).

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [department, setDepartment] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [schedule, setSchedule] = useState<CourseSchedule | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [maxClassesPerDay, setMaxClassesPerDay] = useState(4);
  const [peekedCourses, setPeekedCourses] = useState<string[]>([]);

  // Preferences state
  const [preferredDays, setPreferredDays] = useState<DayOption[]>([
    "M",
    "T",
    "W",
    "Th",
    "F",
  ] as DayOption[]);
  const [preferredTimeRange, setPreferredTimeRange] = useState([8, 18]); // 8am to 6pm
  const [avoidBackToBack, setAvoidBackToBack] = useState(false);
  const [preferCompactSchedule, setPreferCompactSchedule] = useState(false);
  // const [preferredCampusRegions, setPreferredCampusRegions] = useState<string[]>([]);

  const addCourse = () => {
    if (department && courseNumber) {
      const courseKey = `${department}-${courseNumber}`;
      const newCourse = {
        id: courseKey,
        department,
        number: courseNumber,
        title:
          mockCourseSections[courseKey]?.title ||
          `${department} ${courseNumber}`,
        isPeeked: false,
      };
      setCourses([...courses, newCourse]);
      setDepartment("");
      setCourseNumber("");
    }
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
    // Also remove from peeked courses if it was peeked
    setPeekedCourses(peekedCourses.filter((courseId) => courseId !== id));
  };

  const toggleCoursePeek = (id: string) => {
    if (peekedCourses.includes(id)) {
      setPeekedCourses(peekedCourses.filter((courseId) => courseId !== id));
    } else {
      setPeekedCourses([...peekedCourses, id]);
    }
  };

  const generateSchedule = () => {
    if (courses.length === 0) return;

    setIsGenerating(true);

    // This would be where your CSP algorithm would run
    // For now, we'll simulate a delay and create a mock schedule
    setTimeout(() => {
      // Create a mock optimized schedule with one section from each course
      const mockSchedule = {
        courses: courses.map((course) => {
          const courseData = mockCourseSections[course.id];
          // Get the lecture section for the optimized schedule
          const lectureSection =
            courseData?.sections.find((s) => s.type === "Lecture") ||
            courseData?.sections[0];

          return {
            ...course,
            ...lectureSection,
            title: courseData?.title || `${course.department} ${course.number}`,
          };
        }),
        stats: {
          totalUnits: courses.length * 4,
          averageDayLength: "6 hours",
          longestBreak: "2 hours",
          shortestBreak: "20 minutes",
        },
      };

      setSchedule(mockSchedule);
      setIsGenerating(false);
    }, 1500);
  };

  const clearAll = () => {
    setCourses([]);
    setSchedule(null);
    setPeekedCourses([]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            UCI Course Scheduler
          </h1>
          <p className="text-gray-600">
            Automatically generate your perfect class schedule using constraint
            satisfaction
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CourseSelection
              courses={courses}
              department={department}
              courseNumber={courseNumber}
              setDepartment={setDepartment}
              setCourseNumber={setCourseNumber}
              addCourse={addCourse}
              removeCourse={removeCourse}
              toggleCoursePeek={toggleCoursePeek}
              generateSchedule={generateSchedule}
              clearAll={clearAll}
              isGenerating={isGenerating}
              peekedCourses={peekedCourses}
              schedule={schedule}
            />

            <Preferences
              preferredDays={preferredDays}
              setPreferredDays={setPreferredDays}
              preferredTimeRange={preferredTimeRange}
              setPreferredTimeRange={setPreferredTimeRange}
              avoidBackToBack={avoidBackToBack}
              setAvoidBackToBack={setAvoidBackToBack}
              preferCompactSchedule={preferCompactSchedule}
              setPreferCompactSchedule={setPreferCompactSchedule}
              maxClassesPerDay={maxClassesPerDay}
              setMaxClassesPerDay={setMaxClassesPerDay}
            />
          </div>

          <div className="lg:col-span-2">
            <Schedule
              schedule={schedule}
              selectedCourses={courses}
              peekedCourses={peekedCourses}
              courseSections={mockCourseSections}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// TODO replace this UI with v0 UI
// TODO as soon as a user adds a course, fetch the data from Anteater API, so that when the scheduel is created, the data is already there
// TODO store course data locally to avoid fetching it multiple times
// TODO figure out the logic between showing all course data and showing only the scheduled courses

// import { useState } from "react";
// import CalendarWrapper from "../components/calendar/calendar";

// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";

// export default function App() {
//   const [courseNames, setCourseNames] = useState<string[]>([]);

//   const updateCourseNames = (data: FormData) => {
//     const department = data.get("department");
//     const courseNumber = data.get("courseNumber");
//     const newCourseName = `${department} ${courseNumber}`;
//     if (courseNames.includes(newCourseName)) return;
//     console.log(`Adding course: ${newCourseName}`);
//     setCourseNames([...courseNames, newCourseName]);
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center gap-8">
//       <h1 className="text-4xl text-center font-bold">CSP Course Scheduler</h1>
//       <form className="flex gap-4" action={updateCourseNames}>
//         <Input name="department" placeholder="Course Department" />
//         <Input name="courseNumber" placeholder="Course Number" />
//         <Button type="submit">Add Course</Button>
//       </form>
//       <div className="h-3/4 w-full flex justify-center gap-8">
//         <CalendarWrapper courseNames={courseNames} filter={true} />
//         <CalendarWrapper courseNames={courseNames} filter={false} />
//       </div>
//     </div>
//   );
// }
