// import getEvents from "../../lib/getEvents";

// import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// import type { CalendarEvent } from "../../types";
// import "./calendar.css";

// moment.updateLocale("en", { week: { dow: 1 } });

// export default function CalendarWrapper({
//   courseNames,
//   filter,
// }: {
//   courseNames: string[];
//   filter: boolean;
// }) {
//   return (
//     <div className="w-5/12 bg-gray-400 border-black border-2 rounded-xl p-8">
//       <Calendar<CalendarEvent>
//         localizer={momentLocalizer(moment)}
//         events={getEvents(courseNames, filter)}
//         startAccessor="start"
//         endAccessor="end"
//         defaultView="week"
//         views={["week"]}
//         toolbar={false}
//         min={new Date(0, 0, 0, 7, 0)}
//         max={new Date(0, 0, 0, 23, 0)}
//         formats={{
//           dayFormat: "ddd",
//           dayHeaderFormat: (day: Date) => moment(day).format("ddd"),
//         }}
//         components={{
//           week: {
//             header: ({
//               date,
//               localizer,
//             }: {
//               date: Date;
//               localizer: DateLocalizer;
//             }) => {
//               const dayOfWeek = moment(date).day();
//               if (dayOfWeek === 0 || dayOfWeek === 6) return null;
//               return <span>{localizer.format(date, "ddd")}</span>;
//             },
//           },
//         }}
//         dayPropGetter={(date: Date) => {
//           const dayOfWeek = moment(date).day();
//           if (dayOfWeek === 0 || dayOfWeek === 6)
//             return { style: { display: "none" } };
//           return {};
//         }}
//         eventPropGetter={(event: CalendarEvent) => {
//           return {
//             style: {
//               backgroundColor: event.color,
//               borderRadius: "5px",
//               color: "#fff",
//               border: "none",
//               display: "block",
//             },
//           };
//         }}
//       />
//     </div>
//   );
// }
