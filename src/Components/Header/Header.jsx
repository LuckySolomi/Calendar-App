import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../Store/Slicers/dateSlice";
import { setViewMode } from "../../Store/Slicers/mainCalendarSlice";
import Button from "../../Shared/Components/Button/Button";
import CustomeSelect from "../../Shared/Components/CustomSelect/CustomSelect";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const viewMode = useSelector((state) => state.mainCalendar.viewMode);

  const handleTodayClick = () => {
    const today = new Date().toISOString();
    dispatch(setSelectedDate(today));
  };

  const currentDate = selectedDate ? new Date(selectedDate) : new Date();

  const handlePrev = () => {
    const prevDate = new Date(currentDate);
    if (viewMode === "week") {
      prevDate.setDate(prevDate.getDate() - 7);
    } else {
      prevDate.setDate(prevDate.getDate() - 1);
    }
    dispatch(setSelectedDate(prevDate.toISOString()));
  };

  const handleNext = () => {
    const nextDate = new Date(currentDate);
    if (viewMode === "week") {
      nextDate.setDate(nextDate.getDate() + 7);
    } else {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    dispatch(setSelectedDate(nextDate.toISOString()));
  };

  const displayDate = selectedDate ? new Date(selectedDate) : new Date();
  const formattedDate = displayDate.toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const daysOfWeek = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
  ];

  const handleSelect = (value) => {
    dispatch(setViewMode(value));
  };

  return (
    <header className={styles.header}>
      <div className={styles.contentContainer}>
        <div className={styles.currentDataContainer}>
          <img src="./img/Logo.svg" alt="logo" />
          <Button variant="primary" onClick={handleTodayClick}>
            Today
          </Button>
          <Button
            variant="secondary"
            icon={ChevronLeftIcon}
            className={styles.arrowButton}
            onClick={handlePrev}
          ></Button>
          <Button
            variant="secondary"
            icon={ChevronRightIcon}
            className={styles.arrowButton}
            onClick={handleNext}
          ></Button>
          <h1> {formattedDate}</h1>
        </div>
        <div className={styles.usernameContainer}>
          <CustomeSelect
            placeholder="Select"
            days={daysOfWeek}
            value={viewMode}
            defaultValue="week"
            onSelect={handleSelect}
          />
          <p>Username</p>
          <button className={styles.headerUserBtn}>
            <img src="./img/username.svg" alt="username" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
