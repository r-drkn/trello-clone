import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../styles/Home.module.css";
import AddItem from "./AddItem";
import Card from "./Card";

export default function List({ list, setLists, lists, defaultCards }) {
  const [cards, setCards] = useState(defaultCards);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(list.name);

  function handleEdit(event) {
    event && event.preventDefault();
    const edittedLists = lists.map((listToEdit) => {
      return listToEdit.name === list.name ? value : listToEdit.name;
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
            handleEdit();
            setValue(value);
          }}
        >
          <form onSubmit={(event) => handleEdit(event)}>
            <input
              className={styles.editInput}
              type="text"
              value={value}
              onChange={(event) => handleChange(event)}
            />
          </form>
        </OutsideClickHandler>
      ) : (
        <h4
          className={styles.listTitle}
          onClick={() => {
            setEdit(true);
          }}
        >
          {list.name}
        </h4>
      )}
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
