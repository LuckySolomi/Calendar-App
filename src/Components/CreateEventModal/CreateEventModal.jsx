import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEvent, editEvent } from "../../Store/Slicers/eventsSlice";
import Modal from "../../Shared/Components/Modal/Modal";
import Input from "../../Shared/Components/Input/Input";
import TimeSelect from "../../Shared/Components/TimeSelect/TimeSelect";
import DatePicker from "../../Shared/Components/DatePicker/DatePicker";
import CustomSelect from "../../Shared/Components/CustomSelect/CustomSelect";
import Checkbox from "../../Shared/Components/Checkbox/Checkbox";
import Button from "../../Shared/Components/Button/Button";
import {
  PencilSquareIcon,
  Bars3BottomLeftIcon,
  ClockIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import styles from "./CreateEventModal.module.css";

function CreateEventModal({ handleCloseModal, onOverlayClick, event }) {
  const calendars = useSelector((state) => state.calendar.calendars);
  const dispatch = useDispatch();

  const isEditing = event;
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    displayDate: "",
    startTime: "",
    endTime: "",
    allDay: false,
    repeat: false,
    calendarId: "",
    description: "",
  });

  useEffect(() => {
    if (event) {
      setEventData({
        id: event.id || "",
        title: event.title || "",
        date: event.date || "",
        displayDate: event.displayDate || "",
        startTime: event.startTime || "",
        endTime: event.endTime || "",
        allDay: event.allDay || false,
        repeat: event.repeat || false,
        calendarId: event.calendarId || "",
        description: event.description || "",
      });
    }
  }, [event]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (eventData.calendarId) {
      const selectedCalendar = chooseCalendar.find(
        (calendar) => calendar.value === eventData.calendarId
      );

      setEventData((prev) => ({
        ...prev,
        calendarColor: selectedCalendar ? selectedCalendar.color : "",
      }));
    }
  }, [eventData.calendarId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateSelect = (date) => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const isoDate = localDate.toISOString().split("T")[0];
    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setEventData((prev) => ({
      ...prev,
      date: isoDate,
      displayDate: formattedDate,
    }));
    setShowDatePicker(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editEvent(eventData));
    } else {
      dispatch(addEvent(eventData));
    }
    handleCloseModal();
  };

  const repeatEvent = [
    { value: "Does not repeat", label: "Does not repeat" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Annually", label: "Annually" },
  ];

  const chooseCalendar = calendars.map((calendar) => ({
    value: calendar.id,
    label: calendar.title,
    color: calendar.color,
  }));

  return (
    <Modal
      title={isEditing ? "Edit event" : "Create event"}
      className={styles.sideBarEventModal}
      onOverlayClick={onOverlayClick}
      onCloseClick={handleCloseModal}
    >
      <form className={styles.eventForm} onSubmit={handleSave}>
        <div className={styles.titleContainer}>
          <PencilSquareIcon
            style={{
              width: "16px",
              height: "16px",
              marginRight: "5px",
            }}
          />
          <Input
            text="Title"
            type="text"
            name="title"
            className={styles.longInputEventModal}
            placeholder="Enter title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.dateAndTimeContainer}>
          <ClockIcon className={styles.heroIcon} />
          <Input
            text="Date"
            type="text"
            name="date"
            className={styles.dateInputEventModal}
            placeholder="Enter Date"
            value={eventData.displayDate}
            onClick={() => setShowDatePicker(true)}
            readOnly
            required
          />

          {!eventData.allDay && (
            <div className={styles.timeSelectContainer}>
              <TimeSelect
                label="Time"
                placeholder="Start time"
                value={eventData.startTime}
                onSelect={(type, value) =>
                  setEventData({ ...eventData, startTime: value })
                }
              />
              <span className={styles.timeSelectSpan}>-</span>
              <TimeSelect
                value={eventData.endTime}
                onSelect={(type, value) =>
                  setEventData({ ...eventData, endTime: value })
                }
                placeholder="End time"
                label="Time"
              />
            </div>
          )}
        </div>
        {showDatePicker && (
          <div className={styles.datePickerContainer}>
            <DatePicker
              onSelect={handleDateSelect}
              autoSelectToday={false}
              disablePastDates={true}
            />
          </div>
        )}
        <div className={styles.checkboxSelectModalContainer}>
          <Checkbox
            checked={eventData.allDay}
            onChange={handleChange}
            name="allDay"
          >
            All day
          </Checkbox>
          <CustomSelect
            placeholder="Repeat event"
            days={repeatEvent}
            defaultValue={eventData.repeat}
            onSelect={(value) =>
              setEventData({
                ...eventData,
                repeat: value === "Does not repeat" ? false : value,
              })
            }
            className={styles.modalSelect}
          />
        </div>

        <div className={styles.chooseCalendarModalContainer}>
          <CalendarDaysIcon className={styles.heroIcon} />
          <CustomSelect
            placeholder="Choose calendar"
            days={chooseCalendar}
            label="Calendar"
            disabled={chooseCalendar.length === 0}
            defaultValue={eventData.calendarId}
            onSelect={(value) => {
              setEventData((prev) => ({ ...prev, calendarId: value }));
            }}
            className={styles.modalSelectCalendar}
          />
        </div>

        <div className={styles.textAreaContainer}>
          <Bars3BottomLeftIcon className={styles.heroIcon} />
          <Input
            text="Description"
            type="text"
            name="description"
            className={styles.longInputEventModal}
            placeholder="Enter description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          className={styles.saveModalButton}
          onClick={handleSave}
        >
          {isEditing ? "Save" : "Create"}
        </Button>
      </form>
    </Modal>
  );
}

export default CreateEventModal;
