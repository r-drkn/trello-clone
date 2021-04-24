import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Home.module.css";

export default function AddItem(props) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  const { item, setItem, type, listId } = props;

  function handleChange(event) {
    setValue(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newItem =
      type === "card"
        ? { id: item.length + 1, name: value, listId: listId }
        : { id: item.length + 1, name: value, cards: [] };
    console.log(newItem);
    if (value.length > 0) {
      await fetch(
        `http://localhost:3000/api/${type === "card" ? "cards" : "lists"}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      )
        .then((res) => res.json)
        .then((data) => console.log("success", data))
        .catch((err) => console.error(err));
      setItem([...item, newItem]);
      setShowInput(false);
      setValue("");
    }
  }
  return (
    <div>
      {!showInput ? (
        <div
          className={styles.addItem}
          onClick={() => {
            setShowInput(true);
          }}
        >
          <span>+</span>
          {item && item.length > 0 ? (
            <span>Add another {type}</span>
          ) : (
            <span>Add a {type}</span>
          )}
        </div>
      ) : (
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowInput(false);
          }}
        >
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
                autoFocus
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
        </OutsideClickHandler>
      )}
    </div>
  );
}
