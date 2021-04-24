export async function handleCardEdit(
  event,
  card,
  key,
  value,
  setState,
  listId
) {
  event.preventDefault();
  let edittedCard = card;
  edittedCard[key] = value;
  await fetch(`http://localhost:3000/api/cards/${listId}/`, {
    method: "PATCH",
    body: JSON.stringify(edittedCard),
  })
    .then((res) => res.json)
    .then((data) => console.log("success", data))
    .catch((err) => console.error(err));

  setState(false);
}
