import { React, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import styles from "./Notification.module.css";

export default function Notification({ children, onCloseClick }) {
  useEffect(() => {
    const timer = setTimeout(onCloseClick, 10000);
    return () => clearTimeout(timer);
  }, [onCloseClick]);
  return (
    <div className={styles.notification}>
      <p className={styles.notificationText}>{children}</p>
      <button onClick={onCloseClick} className={styles.closeBtn}>
        <XMarkIcon className={styles.closeIcon} />
      </button>
    </div>
  );
}
