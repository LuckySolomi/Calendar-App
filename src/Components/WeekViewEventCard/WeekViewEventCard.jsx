import { useSelector } from "react-redux";
import styles from "./WeekViewEventCard.module.css";

function WeekViewEventCard({ event, onClick }) {
  const headerHeight = 80; // Висота заголовка дня
  const hourHeight = 80; // Висота години
  const startDayHour = 6; // День починається з 06:00

  // Розбираємо startTime (наприклад, "14:30" -> години = 14, хвилини = 30)
  const [hours, minutes] = event.startTime.split(":").map(Number);

  // Розраховуємо top Віднімаємо 6 годин, щоб 06:00 було на нульовій позиції
  const eventTop = event.allDay
    ? headerHeight // Початок події о 06:00
    : headerHeight +
      (hours - startDayHour) * hourHeight +
      (minutes / 60) * hourHeight;

  const [startHour, startMinutes] = event.startTime.split(":").map(Number);
  const [endHour, endMinutes] = event.endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinutes;
  const endTotalMinutes = endHour * 60 + endMinutes;

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const eventHeight = event.allDay
    ? `${18 * hourHeight}px` // Подія займає весь день (6:00 - 23:00)
    : `${(durationMinutes / 60) * hourHeight}px`;

  const calendars = useSelector((state) => state.calendar.calendars);
  const calendar = calendars.find((cal) => cal.id === event.calendarId);

  const eventDate = new Date(event.date);
  const dayIndex = (eventDate.getDay() + 6) % 7;

  const hourColumnWidth = 100; // Ширина стовпця годин
  const dayColumnWidth = 170; // Ширина одного дня

  const eventLeft = hourColumnWidth + dayIndex * dayColumnWidth;

  const hexToRgb = (hex) => {
    let r = 0,
      g = 0,
      b = 0;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return `${r}, ${g}, ${b}`;
  };

  const backgroundColor = calendar
    ? `rgba(${hexToRgb(calendar.color)}, 0.5)`
    : "rgba(204, 204, 204, 0.5)";

  const borderColor = calendar ? calendar.color : "#ccc";

  return (
    <div
      className={styles.eventContainer}
      style={{
        backgroundColor,
        top: `${eventTop}px`,
        left: `${eventLeft}px`,
        height: eventHeight,
        borderLeftColor: borderColor,
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
      }}
      onClick={onClick}
    >
      <h2 className={styles.eventTitle}>{event.title}</h2>
      {!event.allDay && (
        <p>
          {event.startTime.replace(/:(\d)$/, ":0$1")} -{" "}
          {event.endTime.replace(/:(\d)$/, ":0$1")}
        </p>
      )}
      {event.description && (
        <p className={styles.eventDescription}>{event.description}</p>
      )}
    </div>
  );
}

export default WeekViewEventCard;
