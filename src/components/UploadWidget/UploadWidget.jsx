import React, { useRef, useState } from "react";
import imageIcon from "../../assets/icons/image-upload.svg";
import styles from "./uploadWidget.module.css";

export default function UploadWidget({ label, imageGetter }) {
  const inputRef = useRef(null);

  const [image, setImage] = useState(imageIcon);

  const [imageFlag, setImageFlag] = useState(false);

  const handleInput = () => {
    inputRef.current?.click();
  };

  const updateImage = (img) => {
    sessionStorage.setItem("userProfilePicture", img);
    setImage(img);
    setImageFlag(true);
    imageGetter(img)
  };

  const arrayBufferToBase64 = (arrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(arrayBuffer);

    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return window.btoa(binary);
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
    <div className={styles.container}>
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
      <span className={styles.label} onClick={handleInput} tabIndex={0}>
        {!imageFlag ? label : "Cambiar imagen"}
      </span>
    </div>
  );
}
