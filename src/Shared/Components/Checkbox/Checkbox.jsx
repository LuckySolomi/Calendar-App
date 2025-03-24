import React from "react";
import styles from "./Checkbox.module.css";

function Checkbox({
  name,
  children,
  disabled = false,
  required = false,
  color,
  onChange,
  checked,
}) {
  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.label}>
        <input
          type="checkbox"
          name={name}
          className={styles.checkbox}
          disabled={disabled}
          required={required}
          checked={checked}
          onChange={onChange}
          style={{
            accentColor: color,
          }}
        />
        <span className={styles.checkboxText}>{children}</span>
      </label>
    </div>
  );
}

export default Checkbox;
