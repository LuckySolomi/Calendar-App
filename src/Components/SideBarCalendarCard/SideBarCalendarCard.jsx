import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "../../Shared/Components/Checkbox/Checkbox";
import styles from "./SideBarCalendarCard.module.css";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

function SideBarCalendarCard({ calendar, onEdit, handleDeleteCard }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(calendar.title);
  const [isChecked, setIsChecked] = useState(calendar.checked || false);

  const handleSave = (id) => {
    if (editedName.trim()) {
      dispatch(updateCalendarName({ id: calendar.id, name: editedName }));
      setIsEditing(false);
    }
  };

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);

    const storedCalendars = JSON.parse(localStorage.getItem("calendars")) || [];
    const updatedCalendars = storedCalendars.map((cal) =>
      cal.id === calendar.id ? { ...cal, checked: updatedChecked } : cal
    );
    localStorage.setItem("calendars", JSON.stringify(updatedCalendars));
  };

  return (
    <div className={styles.sideBarCalendarCard}>
      <div className={styles.checkboxAndTextContainer}>
        <Checkbox
          color={calendar.color}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {isEditing ? (
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSave}
            className={styles.input}
          />
        ) : (
          <p className={styles.cardTitle}>{calendar.title}</p>
        )}
      </div>

      <div className={styles.iconsContainer}>
        {!isEditing && (
          <PencilIcon
            style={{
              width: "16px",
              height: "16px",
              marginRight: "5px",
              cursor: "pointer",
            }}
            onClick={onEdit}
          />
        )}

        <TrashIcon
          style={{
            width: "16px",
            height: "16px",
            color: " #323749",
            cursor: "pointer",
          }}
          onClick={handleDeleteCard}
        />
      </div>
    </div>
  );
}

export default SideBarCalendarCard;
