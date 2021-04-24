import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import Card from "./Card";
import ListTitle from "./ListTitle";

export default function List({ list, defaultCards }) {
  const [cards, setCards] = useState(defaultCards);

  return (
    <div className={styles.list}>
      <ListTitle list={list} />
      {cards &&
        cards.length > 0 &&
        cards.map((card, index) => {
          return (
            <div key={index}>
              <Card listId={list.id} card={card} />
            </div>
          );
        })}
      <AddItem item={cards} setItem={setCards} type="card" listId={list.id} />
    </div>
  );
}
