import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./Slicers/calendarSlice";
import eventsReducer from "./Slicers/eventsSlice";
import mainCalendarReducer from "./Slicers/mainCalendarSlice";
import dateReducer from "./Slicers/dateSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventsReducer,
    mainCalendar: mainCalendarReducer,
    date: dateReducer,
  },
});

export default store;
