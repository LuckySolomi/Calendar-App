import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from "./Input.module.css";

function Input({
  name,
  text,
  type,
  placeholder,
  className = "",
  disabled = false,
  required = false,
  validate,
  value,
  onChange,
  onClick,
  readOnly = false,
}) {
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleValidation = () => {
    if (!required) {
      setError("");
      return;
    }

    if (validate) {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };

  const handleChange = (e) => {
    onChange(e);
    setError("");
  };

  return (
    <label className={styles.label}>
      <div
        className={`${styles.labelTextContainer} ${
          disabled ? styles.disabledLabel : ""
        }`}
      >
        {text}
        {required && <span>*</span>}
      </div>

      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange ? handleChange : undefined}
        onClick={onClick}
        onBlur={handleValidation}
        readOnly={readOnly}
        className={`${styles.input} ${className} ${
          error ? styles.inputError : ""
        }`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.eye}
          disabled={disabled}
        >
          {showPassword ? (
            <EyeSlashIcon
              style={{ width: "24px", height: "24px", color: "#323749" }}
            />
          ) : (
            <EyeIcon
              style={{
                width: "24px",
                height: "24px",
                color: "#323749",
              }}
            />
          )}
        </button>
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
}

export default Input;
