import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../Shared/functions/generateId";

const initialState = {
  events: JSON.parse(localStorage.getItem("events")) || [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action) {
      const newEvent = {
        id: generateId(),
        title: action.payload.title,
        date: action.payload.date,
        displayDate: action.payload.displayDate,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        allDay: action.payload.allDay,
        repeat: action.payload.repeat,
        calendarId: action.payload.calendarId,
        description: action.payload.description,
      };

      console.log("New event added:", newEvent);

      state.events.push(newEvent);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    editEvent(state, action) {
      const updatedEvents = state.events.map((event) =>
        event.id === action.payload.id ? { ...event, ...action.payload } : event
      );
      state.events = updatedEvents;
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    },
    deleteEvent(state, action) {
      const id = action.payload;
      state.events = state.events.filter((item) => item.id !== id);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    deleteEventsByCalendarId(state, action) {
      const calendarId = action.payload;
      state.events = state.events.filter(
        (event) => event.calendarId !== calendarId
      );
      localStorage.setItem("events", JSON.stringify(state.events));
    },
  },
});

export const { addEvent, editEvent, deleteEvent, deleteEventsByCalendarId } =
  eventsSlice.actions;
export default eventsSlice.reducer;
