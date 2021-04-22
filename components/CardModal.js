import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Card.module.css";

export default function CardModal(props) {
  const { modal, setModal, card } = props;

  return (
    <div className={styles.modal}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setModal(false);
        }}
      >
        <div className={styles.card}>
          <h3 className={styles.cardName}>{card.name}</h3>
          <h4 className={styles.descriptionHeading}>Description</h4>
          <p>{card.description}</p>
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
