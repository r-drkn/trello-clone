import nc from "next-connect";
import lists from "../../../data/data";

const handler = nc()
  .post((req, res) => {
    console.log(req.body);
    const list = { ...req.body, id: lists.length + 1 };
    lists.push(list);
    res.json({ data: list });
  })
  .get((req, res) => {
    res.json({ data: lists });
  });
export default handler;
