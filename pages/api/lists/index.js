import nc from "next-connect";
import { connection } from "../../../lib/db";

const handler = nc()
  .post((req, res) => {
    const list = { ...req.body };

    connection.execute(
      "INSERT INTO lists (name) VALUES(?)",
      [list.name],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log("results:", results);
        res.json({ data: results });
      }
    );
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
