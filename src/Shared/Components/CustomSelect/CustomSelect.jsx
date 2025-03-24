import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import styles from "./CustomSelect.module.css";

export default function CustomSelect({
  onSelect,
  placeholder,
  label,
  days,
  defaultValue = "",
  disabled = false,
  className = "",
}) {
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleSelect(defaultValue);
  }, [defaultValue]);

  const handleSelect = (day) => {
    setSelectedDay(day);
    setIsOpen(false);
    onSelect?.(day);
  };

  const selectedDayObj = days.find((day) => day.value === selectedDay);

  return (
    <div
      className={`${styles.customSelectContainer}  ${
        disabled ? styles.disabled : ""
      }`}
    >
      <label className={styles.customLabel}>{label}</label>

      <div
        className={`${styles.customSelect} ${className} ${
          isOpen ? styles.open : ""
        } ${!selectedDay ? styles.placeholder : ""}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        <div className={styles.choosenOption}>
          {selectedDayObj?.color && (
            <div
              className={styles.calendarColor}
              style={{ backgroundColor: selectedDayObj.color }}
            ></div>
          )}
          {selectedDayObj ? selectedDayObj.label : placeholder}
        </div>

        <ChevronDownIcon className={styles.arrowIcon} />
      </div>
      {isOpen && (
        <ul className={styles.customOptions}>
          {days.map((day) => (
            <li
              key={day.value}
              className={`${styles.customOption} ${
                selectedDay === day.value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(day.value)}
            >
              {day.color && (
                <div
                  className={styles.calendarColor}
                  style={{ backgroundColor: day.color }}
                ></div>
              )}
              {day.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
