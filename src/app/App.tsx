import { useState } from "react";
import CalendarWrapper from "../components/calendar/calendar";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function App() {
  const [courseDepartment, setCourseDepartment] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [courseNames, setCourseNames] = useState<string[]>([]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl text-center font-bold">CSP Course Scheduler</h1>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Course Department"
          value={courseDepartment}
          onChange={(e) => setCourseDepartment(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Course Number"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
        />
        <Button
          onClick={() => {
            console.log(`Adding course: ${courseDepartment} ${courseNumber}`);
            setCourseNames([
              ...courseNames,
              `${courseDepartment} ${courseNumber}`,
            ]);
          }}
        >
          Add Course
        </Button>
      </div>
      <div className="h-3/4 w-full flex justify-center gap-8">
        <CalendarWrapper courseNames={courseNames} filter={true} />
        <CalendarWrapper courseNames={courseNames} filter={false} />
      </div>
    </div>
  );
}
