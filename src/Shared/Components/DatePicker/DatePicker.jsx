import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../../../Store/Slicers/dateSlice";
import styles from "./DatePicker.module.css";

function DatePicker({
  onSelect,
  autoSelectToday = false,
  disablePastDates = false,
}) {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const selectedDateStr = useSelector((state) => state.date.selectedDate);
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  useEffect(() => {
    if (autoSelectToday && !selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dispatch(setSelectedDate(today.toISOString()));
      onSelect?.(today);
    }
  }, [autoSelectToday, selectedDate, dispatch, onSelect]);

  const handleSelectDate = (date) => {
    if (disablePastDates && date.getTime() < new Date().setHours(0, 0, 0, 0)) {
      return; // Забороняємо вибір минулої дати
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const localDateStr = `${year}-${month}-${day}`;

    dispatch(setSelectedDate(localDateStr));
    onSelect?.(date);
  };

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date().setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonthDays = new Date(year, month, 0).getDate();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const days = [];

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push(
        <div
          key={`prev-${date.getDate()}`}
          className={`${styles.day} ${styles.disabled}`}
        >
          {date.getDate()}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = disablePastDates && date.getTime() < today; // Чи минула дата?
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={`day-${day}`}
          className={`${styles.day} ${isSelected ? styles.selected : ""} ${
            isPast ? styles.disabled : ""
          }`.trim()}
          onClick={isPast ? undefined : () => handleSelectDate(date)}
        >
          {day}
        </div>
      );
    }

    const totalCells = startDay + daysInMonth;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push(
        <div
          key={`next-${date.getDate()}`}
          className={`${styles.day} ${styles.disabled}`}
        >
          {date.getDate()}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className={styles.datePicker}>
      <div className={styles.header}>
        <span>
          {currentDate.toLocaleString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <div>
          <button onClick={handlePrevMonth}>&lt;</button>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      </div>
      <div className={styles.weekdays}>
        {daysOfWeek.map((day, index) => (
          <div key={`${day}-${index}`} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {renderCalendar({ selectedDate: currentDate, handleSelectDate })}
      </div>
    </div>
  );
}

export default DatePicker;
