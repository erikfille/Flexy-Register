import React, { useState } from "react";
import styles from "./styledInput.module.css";

export default function StyledInput({
  type = "text",
  placeholder = "",
  field,
  value = "",
  onChange,
  error,
}) {
  const [visited, setVisited] = useState(false);
  const errorCondition = error?.length > 0 && visited;

  const handleVisited = () => setVisited(true);

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={field}
        id={field}
        className={`${styles.input} ${errorCondition && styles.error}`}
        value={value}
        onChange={onChange}
        onBlur={handleVisited}
      />
      {errorCondition && <p className={`${styles.errorMessage}`}>{error}</p>}
    </>
  );
}
