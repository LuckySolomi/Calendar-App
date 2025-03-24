import { useState } from "react";
import styles from "./ColorPicker.module.css";

function ColorPicker({
  colors = [],
  onSelect,
  initialSelectedColor,
  children,
}) {
  const [selectedColor, setSelectedColor] = useState(
    initialSelectedColor || null
  );

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelect?.(color);
  };

  return (
    <div>
      <h2 className={styles.colorPickerTitle}>{children}</h2>
      <div className={styles.btnsContainer}>
        {colors.map((color, index) => (
          <button
            key={index}
            className={`${styles.colorButton} ${
              selectedColor === color ? styles.selected : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
