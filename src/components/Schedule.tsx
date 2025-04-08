"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, List, BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Schedule({
  schedule,
  selectedCourses = [],
  peekedCourses = [],
  courseSections = {},
}: ScheduleProps) {
  const [view, setView] = useState("calendar");
  const [showAllSections, setShowAllSections] = useState(false);
  const [highlightedCourse, setHighlightedCourse] = useState<string | null>(
    null
  );

  // Helper function to get a color for each course
  const getCourseColor = (department: string) => {
    const colors = [
      "bg-red-100 text-red-800 border-red-200",
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-green-100 text-green-800 border-green-200",
      "bg-yellow-100 text-yellow-800 border-yellow-200",
      "bg-purple-100 text-purple-800 border-purple-200",
      "bg-pink-100 text-pink-800 border-pink-200",
      "bg-indigo-100 text-indigo-800 border-indigo-200",
      "bg-orange-100 text-orange-800 border-orange-200",
    ];

    // Simple hash function to consistently assign colors
    let hash = 0;
    for (let i = 0; i < department.length; i++) {
      hash = department.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8am to 9pm

  // Prepare the courses to display based on the current state
  const getDisplayCourses = () => {
    let displayCourses = [];

    // If we have a generated schedule and we're not showing all sections
    if (schedule && !showAllSections) {
      displayCourses = schedule.courses;
    }
    // If we're showing all sections or peeking at courses
    else {
      // Get all sections for courses that are either being peeked at or should be shown in "all sections" mode
      const coursesToShow = showAllSections
        ? selectedCourses.map((c) => c.id)
        : peekedCourses;

      // Flatten all sections from the courses we want to show
      displayCourses = coursesToShow.flatMap((courseId) => {
        const courseData = courseSections[courseId];
        if (!courseData) return [];
        return courseData.sections.map(
          (section: CourseSection): DisplayCourseSection => ({
            ...section,
            department: courseId.split("-")[0],
            number: courseId.split("-")[1],
            title: courseData.title,
            isHighlighted: highlightedCourse === courseId,
          })
        );
      });
    }

    return displayCourses;
  };

  const displayCourses = getDisplayCourses();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          {schedule
            ? "Your Generated Schedule"
            : peekedCourses.length > 0
            ? "Course Preview"
            : "Schedule Calendar"}
        </CardTitle>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={setView} className="w-auto">
            <TabsList>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              {schedule && (
                <TabsTrigger value="stats">
                  <BarChart className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={setView}>
          <TabsContent value="calendar" className="mt-0">
            {schedule && (
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-all-sections"
                    checked={showAllSections}
                    onCheckedChange={setShowAllSections}
                  />
                  <Label htmlFor="show-all-sections">
                    Show all available sections
                  </Label>
                </div>

                {showAllSections && (
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="highlight-course">Highlight course:</Label>
                    <Select
                      value={highlightedCourse || "all"}
                      onValueChange={(value) =>
                        setHighlightedCourse(value === "all" ? null : value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All courses</SelectItem>
                        {selectedCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.department} {course.number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 gap-1">
                  <div className="sticky left-0 bg-white"></div>
                  {days.map((day) => (
                    <div key={day} className="text-center font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-6 gap-1">
                  <div className="space-y-6 sticky left-0 bg-white">
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="text-right pr-2 text-sm text-gray-500 h-16"
                      >
                        {hour > 12
                          ? `${hour - 12}pm`
                          : hour === 12
                          ? "12pm"
                          : `${hour}am`}
                      </div>
                    ))}
                  </div>

                  {days.map((day) => (
                    <div key={day} className="relative border-l min-h-[800px]">
                      {displayCourses
                      .filter((course) => {
                        // If highlighting a course, only show that course
                        if (
                        highlightedCourse &&
                        !course.id.includes(highlightedCourse)
                        ) {
                        return false;
                        }

                        // Convert day abbreviations to full day names for filtering
                        const dayMap: Record<string, string> = {
                        M: "Monday",
                        T: "Tuesday",
                        W: "Wednesday",
                        Th: "Thursday",
                        F: "Friday",
                        };
                        return course.days.some(
                        (d: string) => dayMap[d] === day
                        );
                      })
                      .map((course, i: number) => {
                        // Parse start and end times
                        const [startHour, startMin] = course.startTime
                        .split(":")
                        .map(Number);
                        const [endHour, endMin] = course.endTime
                        .split(":")
                        .map(Number);

                        // Calculate position and height
                        const top: number =
                        (startHour - 8) * 64 + (startMin / 60) * 64;
                        const height: number =
                        (endHour - startHour) * 64 +
                        ((endMin - startMin) / 60) * 64;

                        const colorClass: string = getCourseColor(course.department);

                        // Add opacity for non-highlighted courses when in highlight mode
                        const opacityClass: string =
                        highlightedCourse &&
                        !course.id.includes(highlightedCourse)
                          ? "opacity-40"
                          : "";

                        // Add section code and type if available
                        const sectionInfo: string =
                        course.type && course.sectionCode
                          ? ` (${course.type} ${course.sectionCode})`
                          : course.sectionCode
                          ? ` (${course.sectionCode})`
                          : "";

                        return (
                        <div
                          key={`${course.id}-${i}`}
                          className={`absolute rounded-md border p-2 w-[95%] overflow-hidden ${colorClass} ${opacityClass} transition-opacity`}
                          style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          left: "2.5%",
                          zIndex: course.isHighlighted ? 10 : 1,
                          }}
                        >
                          <div className="text-xs font-bold">
                          {course.department} {course.number}
                          {sectionInfo}
                          </div>
                          <div className="text-xs truncate">
                          {course.location}
                          </div>
                          {course.instructor && (
                          <div className="text-xs truncate">
                            {course.instructor}
                          </div>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            {schedule && (
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-all-sections-list"
                    checked={showAllSections}
                    onCheckedChange={setShowAllSections}
                  />
                  <Label htmlFor="show-all-sections-list">
                    Show all available sections
                  </Label>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {schedule && showAllSections ? (
                // Group by course when showing all sections
                selectedCourses.map((course) => {
                  const courseData = courseSections[course.id];
                  if (!courseData) {
                    console.warn(`No data found for course ID: ${course.id}`);
                    return null;
                  }
                  return (
                    <div key={course.id} className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">
                        {course.department} {course.number} - {courseData.title}
                      </h3>

                      <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                        {courseData.sections.map(
                          (section: CourseSection, i: number) => (
                            <div
                              key={i}
                              className="flex justify-between items-start"
                            >
                              <div>
                                <div className="text-sm font-medium">
                                  {section.type} {section.sectionCode}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {section.days.join(", ")} {section.startTime}-
                                  {section.endTime}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {section.location}
                                </div>
                              </div>
                              <Badge variant="outline">
                                {section.instructor}
                              </Badge>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })
              ) : peekedCourses.length > 0 && !schedule ? (
                // Show peeked courses when no schedule is generated
                peekedCourses.flatMap((courseId) => {
                  const courseData = courseSections[courseId];
                  if (!courseData) return [];

                  const course = selectedCourses.find((c) => c.id === courseId);

                  return (
                    <div key={courseId} className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">
                        {course?.department || courseId.split("-")[0]}{" "}
                        {course?.number || courseId.split("-")[1]} -{" "}
                        {courseData.title}
                      </h3>

                      <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                        {courseData.sections.map(
                          (section: CourseSection, i: number) => (
                            <div
                              key={i}
                              className="flex justify-between items-start"
                            >
                              <div>
                                <div className="text-sm font-medium">
                                  {section.type} {section.sectionCode}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {section.days.join(", ")} {section.startTime}-
                                  {section.endTime}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {section.location}
                                </div>
                              </div>
                              <Badge variant="outline">
                                {section.instructor}
                              </Badge>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })
              ) : schedule?.courses ? (
                // Show scheduled courses
                schedule.courses.map((course, i: number) => (
                  <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                    <h3 className="font-bold">
                      {course.department} {course.number}
                    </h3>
                    <p className="text-sm text-gray-500">{course.title}</p>
                    </div>
                    <Badge>
                    {course.days.join(", ")} {course.startTime}-
                    {course.endTime}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                    <span className="font-medium">Location:</span>{" "}
                    {course.location}
                    </div>
                    <div>
                    <span className="font-medium">Instructor:</span>{" "}
                    {course.instructor}
                    </div>
                  </div>
                  </div>
                ))
                ) : (
                <div className="text-center p-8 border border-dashed rounded-md">
                  <p className="text-gray-500">
                    No courses to display. Add courses and click the eye icon to
                    preview them, or generate a schedule.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {schedule && (
            <TabsContent value="stats" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Units
                  </h3>
                  <p className="text-2xl font-bold">
                    {schedule.stats.totalUnits}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Average Day Length
                  </h3>
                  <p className="text-2xl font-bold">
                    {schedule.stats.averageDayLength}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Longest Break
                  </h3>
                  <p className="text-2xl font-bold">
                    {schedule.stats.longestBreak}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Shortest Break
                  </h3>
                  <p className="text-2xl font-bold">
                    {schedule.stats.shortestBreak}
                  </p>
                </div>
              </div>

              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-medium mb-2">Schedule Quality Metrics</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Time Preference Match</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Location Optimization</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Break Distribution</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
