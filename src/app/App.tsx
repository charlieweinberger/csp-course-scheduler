import { useState } from "react";
import CalendarWrapper from "../components/calendar/calendar";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function App() {
  const [courseNames, setCourseNames] = useState<string[]>([]);

  // TODO display current course list to user

  const updateCourseNames = (data: FormData) => {
    const department = data.get("department");
    const courseNumber = data.get("courseNumber");
    const newCourseName = `${department} ${courseNumber}`;
    if (courseNames.includes(newCourseName)) return;
    console.log(`Adding course: ${newCourseName}`);
    setCourseNames([...courseNames, newCourseName]);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl text-center font-bold">CSP Course Scheduler</h1>
      <form className="flex gap-4" action={updateCourseNames}>
        <Input name="department" placeholder="Course Department" />
        <Input name="courseNumber" placeholder="Course Number" />
        <Button type="submit">Add Course</Button>
      </form>
      <div className="h-3/4 w-full flex justify-center gap-8">
        <CalendarWrapper courseNames={courseNames} filter={true} />
        <CalendarWrapper courseNames={courseNames} filter={false} />
      </div>
    </div>
  );
}
