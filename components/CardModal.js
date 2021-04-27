import React, { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { handleCardEdit } from "../helpers/helpers";
import styles from "../styles/Card.module.css";
import CardTitle from "./CardTitle";
import { removeItem } from "../helpers/helpers";
import { GlobalContext } from "../context/GlobalContextProvider";

export default function CardModal(props) {
  const { modal, setModal, card, listId } = props;
  const [editDescription, setEditDescription] = useState(false);
  const [descValue, setDescValue] = useState(card.description);
  const { cards, setCards } = useContext(GlobalContext);

  function handleChange(event) {
    setDescValue(event.target.value);
  }

  async function handleDelete() {
    const res = await fetch(`http://localhost:3000/api/cards/${card.name}`, {
      method: "DELETE",
    });
    const { data } = res.json();
    console.log(data);
    setCards(removeItem(cards, card));
    setModal(false);
  }

  return (
    <div className={styles.modal}>
      <OutsideClickHandler
        onOutsideClick={(event) => {
          setModal(false);
          if (editDescription) {
            handleCardEdit(
              event,
              card,
              "description",
              descValue,
              setEditDescription
            );
          }
        }}
      >
        <div className={styles.modalCard}>
          <div className={styles.cardTitleWrapper}>
            <CardTitle
              card={card}
              listId={listId}
              modal={modal}
              setModal={setModal}
            />
          </div>
          <h4
            className={styles.descriptionHeading}
            onClick={() => {
              setEditDescription(true);
            }}
          >
            Description
          </h4>
          {editDescription ? (
            <OutsideClickHandler
              onOutsideClick={(event) => {
                handleCardEdit(
                  event,
                  card,
                  "description",
                  descValue,
                  setEditDescription
                );
              }}
            >
              <form
                onSubmit={(event) =>
                  handleCardEdit(
                    event,
                    card,
                    "description",
                    descValue,
                    setEditDescription,
                    listId
                  )
                }
                className={styles.descriptionForm}
              >
                <textarea
                  className={styles.descriptionInput}
                  type="text"
                  value={descValue}
                  onChange={(event) => handleChange(event)}
                  rows={10}
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                />
                <div className={styles.buttonGroup}>
                  <input type="submit" className={styles.button} value="Save" />
                  <button
                    className={styles.buttonSecondary}
                    onClick={() => {
                      setDescValue(card.description);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </OutsideClickHandler>
          ) : (
            <p
              className={styles.cardDescription}
              onClick={() => {
                setEditDescription(true);
              }}
            >
              {card.description ? card.description : "Add a description..."}
            </p>
          )}
          <button
            className={styles.buttonSecondary}
            onClick={() => handleDelete()}
            styles={{}}
          >
            Delete Card
          </button>
          <svg
            onClick={() => {
              setModal(false);
            }}
            className={styles.close}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
          </svg>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
