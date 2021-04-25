export async function handleCardEdit(event, card, key, value, setEdit) {
  event.preventDefault();
  await fetch(`http://localhost:3000/api/cards/${card.name}`, {
    method: "PATCH",
    body: JSON.stringify({
      column: key,
      value: value,
      cardName: card.name,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log("success", data))
    .catch((err) => console.error(err));
  setEdit(false);
}
