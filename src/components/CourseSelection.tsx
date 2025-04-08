"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";

export function CourseSelection({
  courses,
  department,
  courseNumber,
  setDepartment,
  setCourseNumber,
  addCourse,
  removeCourse,
  toggleCoursePeek,
  generateSchedule,
  clearAll,
  isGenerating,
  peekedCourses,
  schedule,
}: CourseSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Selection</CardTitle>
        <CardDescription>Add the courses you want to take</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., COMPSCI"
                value={department}
                onChange={(e) => setDepartment(e.target.value.toUpperCase())}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseNumber">Course Number</Label>
              <Input
                id="courseNumber"
                placeholder="e.g., 161"
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={addCourse}
            className="w-full"
            disabled={!department || !courseNumber}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </Button>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Selected Courses:</h3>
            {courses.length > 0 ? (
              <ul className="space-y-2">
                {courses.map((course) => (
                  <li
                    key={course.id}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded"
                  >
                    <span>
                      {course.department} {course.number}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCoursePeek(course.id)}
                        title={
                          peekedCourses.includes(course.id)
                            ? "Hide course sections"
                            : "Show course sections"
                        }
                      >
                        {peekedCourses.includes(course.id) ? (
                          <Eye className="h-4 w-4 text-blue-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCourse(course.id)}
                        title="Remove course"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No courses added yet
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              onClick={generateSchedule}
              className="flex-1"
              disabled={courses.length === 0 || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Schedule"}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={courses.length === 0 && !schedule}
            >
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
