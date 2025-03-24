import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMode: "week",
  events: [],
};

const mainCalendarSlice = createSlice({
  name: "mainCalendar",
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
  },
});

export const { setViewMode, addEvent } = mainCalendarSlice.actions;
export default mainCalendarSlice.reducer;
