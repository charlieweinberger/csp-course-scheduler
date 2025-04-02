# CSP Course Scheduler

A constraint satisfaction problem (CSP) solver for automatically creating a course schedule, given only the names of each course. Simply input a list of UCI courses, and watch the algorithm fit the courses into a schedule for you, quickly and automatically!

## Future Improvements

- [ ] Dissect current CSP algorithm, search for and implement optimizations
- [ ] Add user input for courses, sourcing data from [Anteater API](https://anteaterapi.com/)
- [ ] Deploy site
- [ ] Add more preference filters (e.g. time of day, day of week, space between courses)
- [ ] Add side-by-side comparing all available courses w/ scheduled courses
- [ ] Add tutorial
- [ ] Improve UI/UX

## Instructions for Self-Hosting

1. Clone this github repository.
2. Run `npm install` and `npm run dev`.
3. Open `localhost:5173` and view the schedule.