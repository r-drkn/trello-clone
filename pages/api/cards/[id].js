// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import lists from "../../../data/data";

const getList = (id) => lists.find((list) => list.id === parseInt(id));

const handler = nc().patch((req, res) => {
  const list = getList(req.query.id);
  const { cards } = list;
  const getCard = (id) => cards.find((card) => card.id === parseInt(id));

  const updated = JSON.parse(req.body);
  const card = getCard(updated.id);

  if (!card) {
    res.status(404);
    res.end();
    return;
  }

  // find index of current card
  const index = cards.findIndex((card) => card.id === parseInt(req.query.id));
  // assign current card to updated object
  cards[index] = updated;
  // respond with updated object
  res.json({ data: updated });
});
export default handler;
