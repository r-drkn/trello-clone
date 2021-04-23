import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Home.module.css";
import CardModal from "./CardModal";

export default function Card({ card, listId }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(card.name);

  function handleChange(event) {
    setValue(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let edittedCard = card;
    edittedCard.name = value;
    await fetch(`http://localhost:3000/api/cards/${listId}/`, {
      method: "PATCH",
      body: JSON.stringify(edittedCard),
    })
      .then((res) => res.json)
      .then((data) => console.log("success", data))
      .catch((err) => console.error(err));

    setEdit(false);
  }

  return (
    <>
      <div className={styles.cardTitle}>
        {edit ? (
          <OutsideClickHandler onOutsideClick={() => setEdit(false)}>
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(event) => handleChange(event)}
              />
              <input className={styles.button} type="submit" value="Save" />
            </form>
          </OutsideClickHandler>
        ) : (
          <h5
            className={styles.cardTitleText}
            onClick={() => {
              setModal(true);
            }}
          >
            {card.name}
          </h5>
        )}
        <svg
          className={styles.edit}
          onClick={() => setEdit(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 48 48"
        >
          <path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      </div>
      {modal && <CardModal card={card} modal={modal} setModal={setModal} />}
    </>
  );
}
