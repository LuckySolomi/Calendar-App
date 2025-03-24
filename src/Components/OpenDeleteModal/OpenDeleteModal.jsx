import { useDispatch } from "react-redux";
import { deleteCalendar } from "../../Store/Slicers/calendarSlice";
import {
  deleteEvent,
  deleteEventsByCalendarId,
} from "../../Store/Slicers/eventsSlice";
import Modal from "../../Shared/Components/Modal/Modal";
import Button from "../../Shared/Components/Button/Button";
import styles from "./OpenDeleteModal.module.css";

function OpenDeleteModal({
  handleCloseModal,
  onOverlayClick,
  calendar,
  event,
  setNotification,
}) {
  const dispatch = useDispatch();

  if (!calendar && !event) return null;

  const handleDelete = () => {
    if (calendar) {
      dispatch(deleteEventsByCalendarId(calendar.id));
      dispatch(deleteCalendar(calendar.id));
    } else if (event) {
      dispatch(deleteEvent(event.id));
      setNotification("Event deleted");
    }

    handleCloseModal();
  };

  return (
    <Modal
      title={calendar ? "Delete calendar" : "Delete event"}
      className={styles.calendarDeleteModal}
      onOverlayClick={onOverlayClick}
      onCloseClick={handleCloseModal}
    >
      <div>
        {calendar ? (
          <p>
            Are you sure you want to delete{" "}
            <span className={styles.lenghtOfTitle}>{calendar.title}</span> ?
            You'll no longer have access to this calendar and its events.
          </p>
        ) : (
          <p>
            Are you sure you want to delete Event{" "}
            <span className={styles.lenghtOfTitle}>{event.title}</span> ? You'll
            no longer have access to it.
          </p>
        )}
        <div className={styles.calendarDeleteModalBtnsContainer}>
          <Button
            variant="secondary"
            className={styles.CalendarModalButton}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className={styles.CalendarModalButton}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default OpenDeleteModal;
