import React, { useState, useEffect } from "react";
import styles from "./TimeSelect.module.css";

const generateTimeOptions = () => {
  const options = [];
  let hour = 6;
  let minute = 0;

  while (hour < 23) {
    options.push({
      value: `${hour}:${minute}`,
      label: `${hour}:${minute === 0 ? "00" : minute}`, // 24-годинний формат
    });
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }
  return options;
};

export default function TimeSelect({
  value = "",
  onSelect,
  placeholder,
  label,
  disabled = false,
}) {
  const [selectedTime, setSelectedTime] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedTime(value);
  }, [value]);

  const timeOptions = generateTimeOptions();

  const handleSelect = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
    onSelect?.("time", time);
  };

  return (
    <div
      className={`${styles.timeSelectContainer} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <label className={styles.timeLabel}>{label}</label>
      <div
        className={`${styles.timeSelect} ${isOpen ? styles.open : ""} ${
          !selectedTime ? styles.placeholder : ""
        }`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {selectedTime
          ? timeOptions.find((option) => option.value === selectedTime).label
          : placeholder}
      </div>
      {isOpen && (
        <ul className={styles.timeOptions}>
          {timeOptions.map((option) => (
            <li
              key={option.value}
              className={`${styles.timeOption} ${
                selectedTime === option.value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
