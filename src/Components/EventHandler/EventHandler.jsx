import { useDispatch } from "react-redux";

import Button from "../../Shared/Components/Button/Button";
import styles from "./EventHandler.module.css";

const EventHandler = ({ eventData, onSuccess }) => {
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Event before dispatch:", eventData);
    dispatch(addEvent(eventData));
    onSuccess();
  };

  return (
    <Button
      type="submit"
      variant="primary"
      className={styles.saveModalButton}
      onClick={handleSave}
    >
      Save
    </Button>
  );
};

export default EventHandler;
