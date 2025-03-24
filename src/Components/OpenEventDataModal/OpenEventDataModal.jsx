import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../Shared/Components/Modal/Modal";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import OpenDeleteModal from "../OpenDeleteModal/OpenDeleteModal";
import {
  TrashIcon,
  PencilIcon,
  PencilSquareIcon,
  Bars3BottomLeftIcon,
  ClockIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import styles from "./OpenEventDataModal.module.css";

function OpenEventDataModal({
  event,
  onClose,
  onOverlayClick,
  setNotification,
}) {
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openCreateEventModal = () => {
    setCreateEventModalOpen(true);
  };

  const closeCreateEventModal = () => {
    setCreateEventModalOpen(false);
    onClose();
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    onClose();
  };

  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) {
      closeFunction();
    }
  };

  const calendars = useSelector((state) => state.calendar.calendars);
  const calendar = event
    ? calendars.find((cal) => cal.id === event.calendarId)
    : null;

  const repeatText = event.repeat ? event.repeat : "Does not repeat";
  const allDayText = event.allDay ? "All day" : "";
  const shouldShowRepeatEvent = allDayText || repeatText;
  const eventDescription = event.description;

  return (
    <>
      <Modal
        title={"Event information"}
        className={styles.sideBarEventModal}
        onOverlayClick={onOverlayClick}
        onCloseClick={onClose}
      >
        <div className={styles.modalContent}>
          <div className={styles.editAndDeleteIconsContainer}>
            <PencilIcon
              style={{
                width: "16px",
                height: "16px",
                cursor: "pointer",
                color: " #323749",
              }}
              onClick={() => openCreateEventModal(event)}
            />
            <TrashIcon
              style={{
                width: "16px",
                height: "16px",
                cursor: "pointer",
                color: " #323749",
              }}
              onClick={openDeleteModal}
            />
          </div>
          <div className={styles.titleContainer}>
            <PencilSquareIcon className={styles.heroIcon} />
            <h2 className={styles.title}>{event.title}</h2>
          </div>
          <div className={styles.dateAndTimeContainer}>
            <ClockIcon className={styles.heroIcon} />
            <p>
              {event.displayDate}, {event.startTime.replace(/:(\d)$/, ":0$1")} -{" "}
              {event.endTime.replace(/:(\d)$/, ":0$1")}
            </p>
          </div>

          {shouldShowRepeatEvent && (
            <p className={styles.repeatEvent}>
              {allDayText}
              {allDayText && repeatText ? ", " : ""}
              {repeatText}
            </p>
          )}

          <div className={styles.calendarContainer}>
            <CalendarDaysIcon className={styles.heroIcon} />
            <div className={styles.calendarCard}>
              <div
                className={styles.calendarColor}
                style={{
                  backgroundColor: calendar ? calendar.color : "transparent",
                }}
              ></div>
              <p>{calendar ? calendar.title : "Без календаря"}</p>
            </div>
          </div>
          {eventDescription && (
            <div className={styles.textAreaContainer}>
              <Bars3BottomLeftIcon className={styles.heroIcon} />
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          )}
        </div>
      </Modal>
      {createEventModalOpen && (
        <CreateEventModal
          event={event}
          handleCloseModal={closeCreateEventModal}
          onOverlayClick={(e) => handleOverlayClick(e, closeCreateEventModal)}
        />
      )}
      {deleteModalOpen && (
        <OpenDeleteModal
          event={event}
          handleCloseModal={closeDeleteModal}
          onOverlayClick={(e) => handleOverlayClick(e, closeDeleteModal)}
          setNotification={setNotification}
        />
      )}
    </>
  );
}

export default OpenEventDataModal;
