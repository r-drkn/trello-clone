import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import Card from "./Card";
import ListTitle from "./ListTitle";

export default function List({ list }) {
  const [cards, setCards] = useState([]);
  const { list_id: listId } = list;

  useEffect(() => {
    const getCards = async () => {
      const res = await fetch(
        `http://localhost:3000/api/cards?listId=${listId}`
      );
      const { data } = await res.json();
      const cleanCards = data.map((card) => {
        return {
          name: card.card_name,
          listId: card.list_id,
          description: card.description || "",
        };
      });
      setCards(cleanCards);
    };
    getCards();
  }, [cards]);

  return (
    <div className={styles.list}>
      <ListTitle list={list} />
      {cards &&
        cards.length > 0 &&
        cards.map((card, index) => {
          return (
            <div key={index}>
              <Card listId={listId} card={card} />
            </div>
          );
        })}
      <AddItem item={cards} setItem={setCards} type="card" listId={listId} />
    </div>
  );
}
