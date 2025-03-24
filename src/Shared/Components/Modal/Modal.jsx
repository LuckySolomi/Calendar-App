import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import styles from "./Modal.module.css";

function Modal({
  title,
  className = "",
  children,
  onOverlayClick,
  onCloseClick,
}) {
  return (
    <div onClick={onOverlayClick} className={styles.modalOverlay}>
      <div className={`${styles.modalContainer} ${className}`}>
        <h1>{title}</h1>
        <hr />
        <div>{children}</div>
        <button onClick={onCloseClick} className={styles.closeBtn}>
          <XMarkIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#323749",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default Modal;
