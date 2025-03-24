import React, { useState } from "react";
import styles from "./Link.module.css";

function Link({ children, href, disabled = false }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
    } else {
      setIsActive(true);
    }
  };

  return (
    <a
      href={disabled ? "#" : href}
      className={`${styles.link} ${isActive ? styles.active : ""} ${
        disabled ? styles.inactive : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default Link;
