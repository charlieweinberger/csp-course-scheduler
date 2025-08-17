// import { mockData } from "./mockData";
import { fetchData } from "./fetchData";
import type {
  Color,
  CourseEvent,
  CalendarEvent,
  CSPSelections,
} from "@/types";

const colors: Color[] = ["red", "orange", "yellow", "green", "blue", "purple"];
const usedColors: { [courseName: string]: Color } = {};

function getDate(day: string, timeOfDay: number): Date {
  // Set monday to be starting day of the week
  const now = new Date();
  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  // Set the day of the week
  const dayMapping: { [key: string]: number } = {
    M: 0,
    Tu: 1,
    W: 2,
    Th: 3,
    F: 4,
  };
  const targetDate = new Date(monday);
  targetDate.setDate(monday.getDate() + dayMapping[day]);

  // Set the time of the day
  const hours = Math.floor(timeOfDay);
  const minutes = (timeOfDay % 1) * 60;
  targetDate.setHours(hours, minutes, 0, 0);

  return targetDate;
}

function eventsOverlap(event1: CourseEvent, event2: CourseEvent): boolean {
  const daysOverlap = event1.days.some((day) => event2.days.includes(day));
  if (!daysOverlap) return false;
  return event1.startTime < event2.endTime && event2.startTime < event1.endTime;
}

function sectionsCompatible(lecSection: string, otherSection: string): boolean {
  if (/^\d+$/.test(otherSection)) return true;
  return otherSection.startsWith(lecSection.charAt(0));
}

function randomColor(courseName: string): string {
  // TODO fix this function, it's not preventing repeats
  if (courseName in usedColors) return usedColors[courseName];
  const possibleColors = colors.filter((color) => !(color in usedColors));
  const randomIndex = Math.floor(Math.random() * possibleColors.length);
  const randomColor = possibleColors[randomIndex];
  usedColors[courseName] = randomColor;
  return randomColor;
}

function getCalendarEvent(
  event: CourseEvent | null,
  courseName: string
): CalendarEvent[] | [] {
  if (!event) return [];
  return event.days.map((day) => ({
    id: event.code,
    title: `${event.code}: ${event.type} ${event.section}`,
    start: getDate(day, event.startTime),
    end: getDate(day, event.endTime),
    color: randomColor(courseName),
  }));
}

// TODO dissect this function
function backtrack(
  courseNames: string[],
  selections: CSPSelections,
  selectedEvents: CourseEvent[],
  courseIndex: number
): boolean {
  // Base case: all courses have been processed
  if (courseIndex >= courseNames.length) {
    return true;
  }

  const courseName = courseNames[courseIndex];
  const courseData: CourseEvent[][] = fetchData(courseName);
  // TODO fix error handling throughout the code (course doesn't exist, schedule isn't possible, etc.)
  if (courseData.length === 0) {
    console.error(`No data found for course: ${courseName}`);
    return false;
  }

  console.log(courseData);

  // Try to assign a lecture (must have one)
  const lectures = courseData[0];
  if (lectures.length === 0) {
    console.error(`No lectures available for ${courseName}`);
    return false;
  }

  for (const lecture of lectures) {
    // Check if this lecture conflicts with any already selected events
    if (
      selectedEvents.some((selectedEvent) =>
        eventsOverlap(lecture, selectedEvent)
      )
    ) {
      continue;
    }

    // Select this lecture
    selections[courseName].lecture = lecture;
    selectedEvents.push(lecture);

    // Try to assign a discussion if available
    const discussions = courseData[1];
    let discussionAssigned = discussions.length === 0; // True if no discussions to assign

    if (!discussionAssigned) {
      // Filter discussions to only those matching the lecture section
      const compatibleDiscussions = discussions.filter((discussion) =>
        sectionsCompatible(lecture.section, discussion.section)
      );

      if (compatibleDiscussions.length === 0) {
        // No compatible discussions found, try another lecture
        selectedEvents.pop();
        selections[courseName].lecture = null;
        continue;
      }

      let foundWorkingDiscussion = false;

      for (const discussion of compatibleDiscussions) {
        // Check for conflicts
        if (
          selectedEvents.some((selectedEvent) =>
            eventsOverlap(discussion, selectedEvent)
          )
        ) {
          continue;
        }

        // Select this discussion
        selections[courseName].discussion = discussion;
        selectedEvents.push(discussion);
        discussionAssigned = true;

        // Try to assign a lab if available
        const labs = courseData[2];
        const labAssigned = labs.length === 0; // True if no labs to assign

        if (!labAssigned) {
          // Filter labs to only those matching the lecture section
          const compatibleLabs = labs.filter((lab) =>
            sectionsCompatible(lecture.section, lab.section)
          );

          if (compatibleLabs.length === 0) {
            // No compatible labs found, but since there are no labs in the data,
            // this branch should never execute in the current example
            selectedEvents.pop();
            selections[courseName].discussion = null;
            continue;
          } else {
            let foundCompatibleLab = false;

            for (const lab of compatibleLabs) {
              // Check for conflicts
              if (
                selectedEvents.some((selectedEvent) =>
                  eventsOverlap(lab, selectedEvent)
                )
              ) {
                continue;
              }

              // Select this lab
              selections[courseName].lab = lab;
              selectedEvents.push(lab);
              foundCompatibleLab = true;

              // Try next course
              if (
                backtrack(
                  courseNames,
                  selections,
                  selectedEvents,
                  courseIndex + 1
                )
              ) {
                return true;
              }

              // Backtrack lab selection
              selectedEvents.pop();
              selections[courseName].lab = null;
            }

            if (!foundCompatibleLab) {
              // If no compatible lab was found, we need to try another discussion
              selectedEvents.pop();
              selections[courseName].discussion = null;
              continue;
            }
          }
        }

        // If we're here, we either have no labs to assign, or we found a compatible lab that worked
        // Try the next course
        if (
          backtrack(courseNames, selections, selectedEvents, courseIndex + 1)
        ) {
          foundWorkingDiscussion = true;
          return true;
        }

        // If we get here, the current discussion didn't work with the rest of the schedule
        selectedEvents.pop();
        selections[courseName].discussion = null;
      }

      if (!foundWorkingDiscussion) {
        // If no working discussion was found, we need to try another lecture
        selectedEvents.pop();
        selections[courseName].lecture = null;
        continue;
      }
    } else {
      // No discussions to assign

      // Try to assign a lab if available
      const labs = courseData[2];
      const labAssigned = labs.length === 0; // True if no labs to assign

      if (!labAssigned) {
        // Filter labs to only those matching the lecture section
        const compatibleLabs = labs.filter((lab) =>
          sectionsCompatible(lecture.section, lab.section)
        );

        if (compatibleLabs.length === 0) {
          // No compatible labs found, try another lecture
          selectedEvents.pop();
          selections[courseName].lecture = null;
          continue;
        }

        let foundWorkingLab = false;

        for (const lab of compatibleLabs) {
          // Check for conflicts
          if (
            selectedEvents.some((selectedEvent) =>
              eventsOverlap(lab, selectedEvent)
            )
          ) {
            continue;
          }

          // Select this lab
          selections[courseName].lab = lab;
          selectedEvents.push(lab);

          // Try next course
          if (
            backtrack(courseNames, selections, selectedEvents, courseIndex + 1)
          ) {
            foundWorkingLab = true;
            return true;
          }

          // Backtrack lab selection
          selectedEvents.pop();
          selections[courseName].lab = null;
        }

        if (!foundWorkingLab) {
          // If no working lab was found, we need to try another lecture
          selectedEvents.pop();
          selections[courseName].lecture = null;
          continue;
        }
      } else {
        // No labs to assign, try next course
        if (
          backtrack(courseNames, selections, selectedEvents, courseIndex + 1)
        ) {
          return true;
        }

        // If we get here, the current lecture didn't work with the rest of the schedule
        selectedEvents.pop();
        selections[courseName].lecture = null;
      }
    }
  }

  // No valid assignment for this course
  return false;
}

function solveCSP(courseNames: string[]) {
  const selections: CSPSelections = {};
  const selectedEvents: CourseEvent[] = [];

  courseNames.forEach((courseName) => {
    selections[courseName] = {
      lecture: null,
      discussion: null,
      lab: null,
    };
  });

  console.log("Starting CSP solver...");
  const solutionFound = backtrack(courseNames, selections, selectedEvents, 0);

  if (!solutionFound) {
    console.error(
      "No valid schedule found. Some courses conflict with each other or have section constraints that cannot be satisfied."
    );
    return [];
  } else {
    console.log("Solution found!");
    console.log(
      `Selected events: ${selectedEvents.map(
        (e) => `${e.name} ${e.type} ${e.section}`
      )}`
    );
  }

  const calendarEvents: CalendarEvent[] = [];

  for (const courseName of courseNames) {
    const selection = selections[courseName];
    calendarEvents.push(...getCalendarEvent(selection.lecture, courseName));
    calendarEvents.push(...getCalendarEvent(selection.discussion, courseName));
    calendarEvents.push(...getCalendarEvent(selection.lab, courseName));
  }

  return calendarEvents;
}

export default function getEvents(courseNames: string[], filter: boolean) {
  if (filter) return solveCSP(courseNames);
  return; // TODO implement the displayment of all courses
}
