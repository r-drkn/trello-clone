import nc from "next-connect";
import { connection } from "../../../lib/db";

function createList(list) {
  const data = connection.execute(
    "INSERT INTO lists (name) VALUES(?)",
    [list.name],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("results:", results);
      return results;
    }
  );
  return data;
}

const handler = nc()
  .post((req, res) => {
    const list = { ...req.body };
    const result = createList(list);
    console.log(result);
    res.json({ data: result });
  })
  .get((req, res) => {
    connection.execute("SELECT * FROM lists", [], (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("results:", results);
      res.json({ data: results });
    });
  });
export default handler;
