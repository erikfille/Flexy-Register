import React, { useRef } from "react";
import { arrayBufferToBase64 } from "../../utils/filesUploadManager";
import styles from "./uploadWidget.module.css";

export default function UploadWidget({
  label,
  image,
  imageFlag,
  updateImage,
  error,
}) {
  const inputRef = useRef(null);

  const handleInput = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        if (fileReader.result === null) return;

        let result = fileReader.result;

        if (typeof fileReader.result !== "string") {
          result = arrayBufferToBase64(result);
        }

        updateImage(result);
      }
    };
    if (!e.target.files) return;

    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.inputContainer}>
        <img
          src={image}
          onClick={handleInput}
          tabIndex={0}
          className={styles.profileImg}
        />
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => handleFileUpload(e)}
          className={styles.hideInput}
        />
        <p className={styles.label} onClick={handleInput} tabIndex={0}>
          {!imageFlag ? label : "Cambiar imagen"}
        </p>
      </div>
      <div>{error && <p className={`${styles.errorMessage}`}>{error}</p>}</div>
    </div>
  );
}
