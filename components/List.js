import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import CardModal from "./CardModal";

export default function List({ list }) {
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(false);

  return (
    <div className={styles.list}>
      <h4 className={styles.listTitle}>{list}</h4>
      {cards.map((card) => {
        return (
          <>
            <p
              onClick={() => {
                setModal(true);
              }}
              key={card}
              className={styles.cardTitle}
            >
              {card}
            </p>
            {modal && <CardModal modal={modal} setModal={setModal} />}
          </>
        );
      })}
      <AddItem item={cards} setItem={setCards} type="card" />
    </div>
  );
}
