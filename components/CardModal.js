import React from "react";
import styles from "../styles/Card.module.css";

export default function CardModal(props) {
  const { modal, setModal } = props;
  return (
    <div className={styles.modal} onClick={() => setModal(false)}>
      <div className={styles.card}></div>
    </div>
  );
}
