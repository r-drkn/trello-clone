import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function AddItem(props) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  const { item, setItem, type } = props;

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    if (value.length > 0) {
      setItem([...item, value]);
      setShowInput(false);
      setValue("");
    }
    event.preventDefault();
  }
  return (
    <div>
      {!showInput ? (
        <div
          onClick={() => {
            setShowInput(true);
          }}
        >
          <span>+</span>
          {type === "card" && item.length > 0 ? (
            <span>Add another card</span>
          ) : (
            <span>Add a {type}</span>
          )}
        </div>
      ) : (
        <div className={styles.flexColumn}>
          <form
            className={styles.form}
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${type} title`}
              className={styles.input}
            />
            <div className={styles.buttonGroup}>
              <input
                type="submit"
                className={styles.button}
                value={`Add ${type}`}
              />
              <svg
                className={styles.close}
                onClick={() => {
                  console.log("clicked");
                  setShowInput(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="40"
              >
                <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
              </svg>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
