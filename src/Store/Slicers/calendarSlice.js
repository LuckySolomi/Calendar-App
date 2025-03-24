import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../Shared/functions/generateId";

const initialState = {
  calendars: JSON.parse(localStorage.getItem("calendars")) || [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addCalendar(state, action) {
      const newCalendar = {
        id: generateId(),
        title: action.payload.title,
        color: action.payload.color,
        checked: false,
      };
      state.calendars.push(newCalendar);
      localStorage.setItem("calendars", JSON.stringify(state.calendars));
    },

    updateCalendarChecked(state, action) {
      const { id, checked } = action.payload;
      const calendar = state.calendars.find((cal) => cal.id === id);
      if (calendar) {
        calendar.checked = checked;
        localStorage.setItem("calendars", JSON.stringify(state.calendars));
      }
    },

    editCalendar(state, action) {
      const { id, newText, newColor } = action.payload;
      const calendar = state.calendars.find((item) => item.id === id);
      if (calendar) {
        calendar.title = newText;
        calendar.color = newColor;
        localStorage.setItem("calendars", JSON.stringify(state.calendars));
      }
    },

    deleteCalendar(state, action) {
      const id = action.payload;
      state.calendars = state.calendars.filter((item) => item.id !== id);
      localStorage.setItem("calendars", JSON.stringify(state.calendars));
    },
  },
});

export const { addCalendar, editCalendar, deleteCalendar } =
  calendarSlice.actions;
export default calendarSlice.reducer;
