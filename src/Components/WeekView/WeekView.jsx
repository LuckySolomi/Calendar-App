import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import WeekViewEventCard from "../WeekViewEventCard/WeekViewEventCard";
import OpenEventDataModal from "../OpenEventDataModal/OpenEventDataModal";
import Notification from "../../Shared/Components/Notification/Notification";
import styles from "./WeekView.module.css";

const WeekView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const selectedDate = new Date(
    useSelector((state) => state.date.selectedDate)
  );
  selectedDate.setHours(12, 0, 0, 0);

  const events = useSelector((state) => state.events.events);

  // Отримуємо понеділок поточного тижня
  const mondayOffset =
    selectedDate.getDay() === 0 ? -6 : 1 - selectedDate.getDay();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() + mondayOffset);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    return {
      day: date.toLocaleString("en-GB", { weekday: "short" }).toUpperCase(),
      date: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
    };
  });
  const hours = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`);

  const generateRecurringEvents = (event) => {
    if (event.repeat === false) return [event]; // Якщо подія не повторюється, повертаємо її саму

    const newEvents = [];
    let eventStartDate = new Date(event.date);

    for (let i = 0; i < 30; i++) {
      let newDate = new Date(eventStartDate);
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
      if (newDate >= eventStartDate) {
        newEvents.push({
          ...event,
          date: newDate.toISOString().split("T")[0], // Формат YYYY-MM-DD
        });
      }
    }
    return newEvents;
  };

  // Фільтруємо події для кожного дня

  const eventsWithRepeats = useMemo(() => {
    return events.flatMap(generateRecurringEvents); // Додаємо повторення
  }, [events, startOfWeek]);

  const eventsByDay = useMemo(() => {
    return weekDays.map((day) => ({
      ...day,
      events: eventsWithRepeats.filter((event) => event.date === day.fullDate),
    }));
  }, [eventsWithRepeats, weekDays]);

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

  const selectedFullDate = new Date(
    useSelector((state) => state.date.selectedDate)
  )
    .toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(".")
    .reverse()
    .join("-");

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateLinePosition = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayIndex = weekDays.findIndex((day) => day.fullDate === today);

    if (todayIndex === -1) return null;

    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    if (hour < 6 || hour >= 24) return null;

    const hourHeight = 80;
    const headerHeight = 80;
    const leftOffset = 100 + todayIndex * 170;

    const topOffset =
      headerHeight + (hour - 6) * hourHeight + (minutes / 60) * hourHeight;

    return { top: topOffset, left: leftOffset };
  };

  const linePosition = calculateLinePosition();

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Колонка з годинами */}
        <div className={styles.column}>
          <div className={styles.emptyCell}></div>
          {hours.map((hour, index) => (
            <div key={index} className={styles.hourCell}>
              {hour}
            </div>
          ))}
        </div>
        {/* Колонки з днями тижня та подіями */}
        {eventsByDay.map((day, dayIndex) => (
          <div key={dayIndex} className={styles.column}>
            <div className={styles.dayHeader}>
              <div
                className={styles.dateContainer}
                style={
                  day.fullDate === selectedFullDate
                    ? { background: "#dff5e2" }
                    : {}
                }
              >
                <span className={styles.dateNumber}>{day.date}</span> {day.day}
              </div>
            </div>
            {hours.map((_, index) => (
              <div key={index} className={styles.cell}></div>
            ))}

            {/* Відображаємо події у відповідний день */}
            {day.events.map((event) => (
              <WeekViewEventCard
                key={event.id}
                event={event}
                onClick={() => handleOpenModal(event)}
              />
            ))}
          </div>
        ))}

        {linePosition && (
          <div
            className={styles.currentTimeLine}
            style={{
              top: `${linePosition.top}px`,
              left: `${linePosition.left}px`,
            }}
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

export default WeekView;
