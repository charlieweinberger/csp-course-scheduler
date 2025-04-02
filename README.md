# CSP Course Scheduler

A constraint satisfaction problem (CSP) solver for automatically creating a course schedule, given only the names of each course. Simply input a list of UCI courses, and watch the algorithm fit the courses into a schedule for you, quickly and automatically!

## Future Improvements

- [ ] Dissect current CSP algorithm, search for and implement optimizations
- [ ] Add user input for courses, sourcing data from [Anteater API](https://anteaterapi.com/)
- [ ] Deploy site
- [ ] Add more preference filters (e.g. time of day, day of week, space between courses)
- [ ] Improve UI/UX
  - [ ] Add title
  - [ ] Add side-by-side comparing all available courses w/ scheduled courses
  - [ ] Add info modal
  - [ ] Remove weekend columns

## Instructions for Self-Hosting

1. Clone this github repository.
2. Run `npm install` and `npm run dev`.
3. Open `localhost:5173` and view the schedule
4. Play around with commenting out various classes in `mockData.ts`, and watch the schedule update in real time.
5. Until I implement Anteater API, course info is manually added. To modify this info, visit `mockData.ts` and follow the existing structure. Visit [antalmanac.com](https://antalmanac.com/) for easy access to course information. Also, make sure to update the course color map (`colorMap`) in `solveCSP.ts`, and the course list (`courseNames`) in `App.tsx`.