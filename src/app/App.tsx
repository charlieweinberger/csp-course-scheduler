import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import solveCSP from "./solveCSP";
import type { CalendarEvent } from "./types";

moment.updateLocale("en", { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

export default function App() {
  const courseNames = ["COMPSCI 161", "COMPSCI 178", "I&C SCI 139W", "I&C SCI 51"];
  const calendarEvents = solveCSP(courseNames);

  return (
    <div style={{ height: "800px", padding: "20px" }}>
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        min={new Date(0, 0, 0, 7, 0)} // 7am
        max={new Date(0, 0, 0, 23, 0)} // 11pm
        eventPropGetter={(event: CalendarEvent) => {
          return {
            style: {
              backgroundColor: event.color,
              borderRadius: "5px",
              color: "#fff",
              border: "none",
              display: "block",
            },
          };
        }}
      />
    </div>
  );
}
