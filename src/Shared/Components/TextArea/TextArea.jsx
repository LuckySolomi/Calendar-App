import React, { useState } from "react";
import styles from "./TextArea.module.css";

function TextArea({ children, disabled = false }) {
  const [text, setText] = useState(children);

  const handleInput = (event) => {
    if (!disabled) {
      setText(event.target.textContent);
    }
  };

  return (
    <div
      className={styles.textArea}
      contentEditable={!disabled && "true"}
      onInput={handleInput}
      suppressContentEditableWarning={true}
      tabIndex={0}
    >
      {text}
    </div>
  );
}

export default TextArea;
