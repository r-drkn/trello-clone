import nc from "next-connect";
import lists from "../../../data/data";

const getList = (id) => lists.find((list) => list.id === parseInt(id));

const handler = nc()
  .patch((req, res) => {
    let list = getList(req.query.id);
    const updated = JSON.parse(req.body);
    list = updated;
  })
  .post((req, res) => {
    const list = { ...req.body, id: lists.length + 1 };
    lists.push(list);
    res.json({ data: list });
  })
  .get((req, res) => {
    res.json({ data: lists });
  });
export default handler;
