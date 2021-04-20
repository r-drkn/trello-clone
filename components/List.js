import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import Card from "./Card";

export default function List({ list, setLists, lists }) {
  const [cards, setCards] = useState([]);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(list);

  function handleEdit(event) {
    event.preventDefault();

    const edittedLists = lists.map((listToEdit) => {
      listToEdit === list ? value : listToEdit;
    });
    setLists(edittedLists);
    setEdit(false);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className={styles.list}>
      {edit ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setEdit(false);
          }}
        >
          <form onSubmit={(event) => handleEdit(event)}>
            <input
              type="text"
              value={value}
              onChange={(event) => handleChange(event)}
            />
            <input type="submit" value="Save" />
          </form>
        </OutsideClickHandler>
      ) : (
        <h4
          className={styles.listTitle}
          onClick={() => {
            setEdit(true);
          }}
        >
          {list}
        </h4>
      )}
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
