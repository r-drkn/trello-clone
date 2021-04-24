import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import CardModal from "./CardModal";
import CardTitle from "./CardTitle";

export default function Card({ card, listId }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className={styles.listCardTitle}>
        <CardTitle
          modal={modal}
          setModal={setModal}
          card={card}
          listId={listId}
        />
      </div>
      {modal && (
        <CardModal
          card={card}
          modal={modal}
          setModal={setModal}
          listId={listId}
        />
      )}
    </>
  );
}
