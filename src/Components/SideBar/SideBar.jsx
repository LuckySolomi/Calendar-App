import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addCalendar, editCalendar } from "../../Store/Slicers/calendarSlice";
import Button from "../../Shared/Components/Button/Button";
import DatePicker from "../../Shared/Components/DatePicker/DatePicker";
import OpenCalendarModal from "../OpenCalendarModal/OpenCalendarModal";
import OpenDeleteModal from "../OpenDeleteModal/OpenDeleteModal";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import SideBarCalendarCard from "../SideBarCalendarCard/SideBarCalendarCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./SideBar.module.css";

function SideBar() {
  const dispatch = useDispatch();
  const calendars = useSelector((state) => state.calendar.calendars);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [openEventModal, setopenEventModal] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    color: "",
  });

  const [selectedCalendar, setSelectedCalendar] = useState(null);

  const handleOpenModal = () => {
    setFormData({ id: null, title: "", color: "" });
    setOpenModal(true);
  };

  const handleOpenEditModal = (calendar) => {
    setFormData({
      id: calendar.id,
      title: calendar.title,
      color: calendar.color,
    });

    setOpenModal(true);
  };

  const handleOpenEventModal = (calendar) => {
    setSelectedCalendar(calendar);
    setopenEventModal(true);
  };

  const handleOpenDeleteModal = (calendar) => {
    setSelectedCalendar(calendar);
    setopenDeleteModal(true);
  };

  useEffect(() => {
    if (
      selectedCalendar &&
      !calendars.find((c) => c.id === selectedCalendar.id)
    ) {
      setopenDeleteModal(false);
    }
  }, [calendars, selectedCalendar]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ id: null, title: "", color: "" });
    setopenEventModal(false);
    setopenDeleteModal(false);
    setSelectedCalendar(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (formData.title && formData.color) {
      if (formData.id) {
        dispatch(
          editCalendar({
            id: formData.id,
            newText: formData.title,
            newColor: formData.color,
          })
        );
      } else {
        dispatch(
          addCalendar({
            title: formData.title,
            color: formData.color,
          })
        );
      }
      handleCloseModal();
    } else {
      console.error("All fields are required");
    }
  };

  const handleOverlayClick = (e, closeFn) => {
    if (e.target === e.currentTarget) {
      closeFn();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
        setOpenNotification(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <>
      <div className={styles.sideBar}>
        <Button
          icon={PlusIcon}
          iconColor=" #FFFFFF"
          variant="primary"
          className={styles.sideBarButton}
          onClick={() => handleOpenEventModal()}
        >
          Create
        </Button>

        <DatePicker autoSelectToday={true} />
        <div className={styles.sideBarCalendarContainer}>
          <div className={styles.sideBarCalendarHeader}>
            <h1>My calendars</h1>
            <button
              className={styles.plusIcon}
              onClick={() => handleOpenModal()}
            >
              <PlusIcon />
            </button>
          </div>
          <div className={styles.sideBarCalendarMain}>
            {calendars.map((calendar) => (
              <SideBarCalendarCard
                key={calendar.id}
                calendar={calendar}
                onEdit={() => handleOpenEditModal(calendar)}
                handleDeleteCard={() => handleOpenDeleteModal(calendar)}
              />
            ))}
          </div>
        </div>
      </div>
      {openModal && (
        <OpenCalendarModal
          onOverlayClick={(e) => handleOverlayClick(e, handleCloseModal)}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {openDeleteModal && (
        <OpenDeleteModal
          onOverlayClick={(e) => handleOverlayClick(e, handleCloseModal)}
          handleCloseModal={handleCloseModal}
          calendar={selectedCalendar}
        />
      )}
      {openEventModal && (
        <CreateEventModal
          onOverlayClick={(e) => handleOverlayClick(e, handleCloseModal)}
          handleCloseModal={handleCloseModal}
          calendars={calendars}
        />
      )}
    </>
  );
}

export default SideBar;
