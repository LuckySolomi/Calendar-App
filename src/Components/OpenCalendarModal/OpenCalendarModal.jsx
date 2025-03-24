import Modal from "../../Shared/Components/Modal/Modal";
import Input from "../../Shared/Components/Input/Input";
import ColorPicker from "../../Shared/Components/ColorPicker/ColorPicker";
import Button from "../../Shared/Components/Button/Button";
import { PencilSquareIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import styles from "./OpenCalendarModal.module.css";

function OpenCalendarModal({
  handleCloseModal,
  onOverlayClick,
  handleSave,
  formData,
  setFormData,
}) {
  const colors = [
    "#9f2957",
    "#d90056",
    "#e25d33",
    "#dfc45a",
    "#b8c42f",
    "#16af6e",
    "#429488",
    "#397e49",
    "#439bdf",
    "#4254af",
    "#6c7ac4",
    "#8332a4",
  ];

  return (
    <Modal
      title={formData.id ? "Edit calendar" : "Create calendar"}
      className={styles.sideBarCalendarModal}
      onOverlayClick={onOverlayClick}
      onCloseClick={handleCloseModal}
    >
      <form onSubmit={handleSave} className={styles.calendarForm}>
        <div className={styles.titleContainer}>
          <PencilSquareIcon
            style={{ width: "16px", height: "16px", marginRight: "5px" }}
          />
          <Input
            text="Title"
            type="text"
            name="title"
            className={styles.inputInCalendarModal}
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.colorContainer}>
          <PaintBrushIcon
            style={{ width: "16px", height: "16px", marginRight: "10px" }}
          />
          <ColorPicker
            colors={colors}
            onSelect={(value) => setFormData({ ...formData, color: value })}
          >
            Color
          </ColorPicker>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={styles.saveModalButtonContainer}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
}

export default OpenCalendarModal;
