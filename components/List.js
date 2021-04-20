import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import Card from "./Card";

export default function List({ list }) {
  const [cards, setCards] = useState([]);

  return (
    <div className={styles.list}>
      <h4 className={styles.listTitle}>{list}</h4>
      {cards.map((card) => {
        return (
          <div key={card}>
            <Card card={card} cards={cards} setCards={setCards} />
          </div>
        );
      })}
      <AddItem item={cards} setItem={setCards} type="card" />
    </div>
  );
}
