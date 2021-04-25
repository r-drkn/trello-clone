import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Card.module.css";
import { handleCardEdit } from "../helpers/helpers";

export default function CardTitle({ card, modal, setModal }) {
  const [value, setValue] = useState(card.name);
  const [editTitle, setEditTitle] = useState(false);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <>
      {editTitle ? (
        <div>
          <OutsideClickHandler
            onOutsideClick={(event) =>
              handleCardEdit(event, card, "card_name", value, setEditTitle)
            }
          >
            <form
              onSubmit={(event) =>
                handleCardEdit(event, card, "card_name", value, setEditTitle)
              }
            >
              <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(event) => handleChange(event)}
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
              />
              {!modal && (
                <input className={styles.button} type="submit" value="Save" />
              )}
            </form>
          </OutsideClickHandler>
        </div>
      ) : (
        <>
          <h5
            className={modal ? styles.cardTitleModal : styles.cardTitleText}
            onClick={() => {
              modal ? setEditTitle(true) : setModal(true);
            }}
          >
            {card.name}
          </h5>
          {!modal && !editTitle && (
            <svg
              className={styles.edit}
              onClick={() => setEditTitle(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
              <path d="M0 0h48v48H0z" fill="none" />
            </svg>
          )}
        </>
      )}
    </>
  );
}
