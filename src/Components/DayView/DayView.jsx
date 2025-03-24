import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DayViewEventCard from "../DayViewEventCard/DayViewEventCard";
import OpenEventDataModal from "../OpenEventDataModal/OpenEventDataModal";
import Notification from "../../Shared/Components/Notification/Notification";
import styles from "./DayView.module.css";

const DayView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const events = useSelector((state) => state.events.events); // Отримуємо події з Redux
  const calendars = useSelector((state) => state.calendar.calendars);
  const selectedDate = new Date(
    useSelector((state) => state.date.selectedDate)
  );
  selectedDate.setHours(12, 0, 0, 0);

  const date = selectedDate.toISOString().split("T")[0]; // Формат YYYY-MM-DD для подій
  const day = selectedDate
    .toLocaleString("en-GB", { weekday: "short" })
    .toUpperCase();

  const hours = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const calculateLinePosition = () => {
    if (currentTime.toDateString() !== selectedDate.toDateString()) return null;

    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    if (hour < 6 || hour >= 24) return null;

    const hourHeight = 100;
    const headerHeight = 100;
    const topOffset =
      headerHeight + (hour - 6) * hourHeight + (minutes / 60) * hourHeight;

    return topOffset;
  };

  const linePosition = calculateLinePosition();

  const generateRecurringEventsForDay = (event) => {
    if (event.repeat === false) return [event];

    const newEvents = [];
    let eventStartDate = new Date(event.date); // Встановлюємо дату початку події

    // Генерація повторів для подій
    for (let i = 0; i < 30; i++) {
      // Можна налаштувати кількість повторень
      let newDate = new Date(eventStartDate); // Копіюємо дату події

      switch (event.repeat) {
        case "Daily":
          newDate.setDate(eventStartDate.getDate() + i);
          break;
        case "Weekly":
          newDate.setDate(eventStartDate.getDate() + i * 7);
          break;
        case "Monthly":
          newDate.setMonth(eventStartDate.getMonth() + i);
          break;
        case "Annually":
          newDate.setFullYear(eventStartDate.getFullYear() + i);
          break;
        default:
          break;
      }

      // Перевіряємо, чи не виходить дата за межі поточного періоду
      if (newDate >= eventStartDate) {
        newEvents.push({
          ...event,
          date: newDate.toISOString().split("T")[0], // Форматуємо дату
        });
      }
    }

    return newEvents;
  };

  const filteredEvents = events
    .flatMap(generateRecurringEventsForDay) // Генеруємо всі повторювані події
    .filter((event) => event.date === date) // Фільтруємо події для поточної дати
    .map((event) => ({
      ...event,
      calendarColor:
        calendars.find((cal) => cal.id === event.calendarId)?.color || "#ccc",
    }));

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.emptyCell}></div>
        <div className={styles.dateHeader}>
          <span className={styles.dateContainer}>
            <span className={styles.selectedDate}>
              {selectedDate.getDate()}
            </span>
            {day}
          </span>
        </div>

        {/* Години + Клітинки для подій */}
        {hours.map((hour, index) => (
          <React.Fragment key={index}>
            <div className={styles.hourCell}>{hour}</div>
            <div className={styles.cell}></div>
          </React.Fragment>
        ))}

        {filteredEvents.map((event) => (
          <DayViewEventCard
            key={event.id}
            event={event}
            onClick={() => handleOpenModal(event)}
          />
        ))}
        {linePosition !== null && (
          <div
            className={styles.currentTimeLine}
            style={{ top: `${linePosition}px` }}
          ></div>
        )}
        {isModalOpen && (
          <OpenEventDataModal
            event={selectedEvent}
            onClose={handleCloseModal}
            onOverlayClick={handleOverlayClick}
            setNotification={setNotification}
          />
        )}
        {notification && (
          <Notification onCloseClick={() => setNotification("")}>
            {notification}
          </Notification>
        )}
      </div>
    </div>
  );
};

export default DayView;
