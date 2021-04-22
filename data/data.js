const lists = [
  {
    id: 1,
    name: "list 1",
    cards: [
      { id: 1, name: "card1", description: "this is card 1" },
      { id: 2, name: "card2", description: "this is card 2" },
      { id: 3, name: "card3", description: "this is card 3" },
    ],
  },
  {
    id: 2,
    name: "list 2",
    cards: [{ id: 1, name: "card1", description: "this is card 1" }],
  },
  {
    id: 3,
    name: "list 3",
    cards: [{ id: 1, name: "card1", description: "this is card 1" }],
  },
];

// lists.map((list) => {
//   const cardData = new Array(Math.floor(Math.random() * 10) + 1)
//     .fill(1)
//     .map((_, index) => ({
//       id: index + 1,
//       name: `Card ${index + 1}`,
//       description: `This is card ${index + 1}`,
//     }));
//   console.log(cardData);
//   return { ...list, cards: [...cardData] };
// });

module.exports = lists;
