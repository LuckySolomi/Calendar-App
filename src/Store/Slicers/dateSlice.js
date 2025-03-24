import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = dateSlice.actions;
export default dateSlice.reducer;
