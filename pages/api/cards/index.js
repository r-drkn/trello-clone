// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import lists from "../../../data/data";

const getList = (id) => lists.find((list) => list.id === parseInt(id));

const handler = nc()
  .post((req, res) => {
    try {
      const list = getList(req.body.listId);
      const { cards } = list;
      const card = { id: cards.length + 1, ...req.body };
      cards.push(card);
      res.json({ data: card });
    } catch (err) {
      console.error(err);
    }
  })
  .get((req, res) => {
    res.json({ data: cards });
  });

export default handler;
