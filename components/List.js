import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import Card from "./Card";
import ListTitle from "./ListTitle";

export default function List({ list }) {
  const { lists, setLists } = useContext(GlobalContext);
  const [cards, setCards] = useState([]);
  const { list_id: listId } = list;

  async function handleDelete() {
    console.log(listId);
    const res = await fetch(`http://localhost:3000/api/lists/${listId}`, {
      method: "DELETE",
    });
    const { data } = await res.json();

    console.log(data);
  }

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
  }, []);

  return (
    <div className={styles.list}>
      <ListTitle list={list} />
      {cards &&
        cards.length > 0 &&
        cards
          .filter((card) => card.listId === listId)
          .map((card, index) => {
            <div key={index}>
              <Card listId={listId} card={card} />
            </div>;
          })}
      <AddItem item={cards} setItem={setCards} type="card" listId={listId} />
      <button onClick={() => handleDelete()} className={styles.buttonSecondary}>
        Delete
      </button>
    </div>
  );
}
