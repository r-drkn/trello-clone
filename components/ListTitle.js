import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Home.module.css";

export default function ListTitle({ list }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(list.name);

  async function handleEdit(event) {
    event && event.preventDefault();
    let edittedList = list;
    edittedList.name = value;
    try {
      setEdit(false);
      await fetch(`http://localhost:3000/api/lists/${list.id}/`, {
        method: "PATCH",
        body: JSON.stringify(edittedList),
      })
        .then((res) => res.json)
        .then((data) => console.log("success", data))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      {edit ? (
        <OutsideClickHandler
          onOutsideClick={(event) => {
            setValue(value);
            handleEdit(event);
          }}
        >
          <form onSubmit={(event) => handleEdit(event)}>
            <input
              className={styles.editInput}
              type="text"
              value={value}
              onChange={(event) => handleChange(event)}
              autoFocus
            />
          </form>
        </OutsideClickHandler>
      ) : (
        <h4
          className={styles.listTitle}
          onClick={() => {
            setEdit(true);
          }}
        >
          {list.name}
        </h4>
      )}
    </div>
  );
}
