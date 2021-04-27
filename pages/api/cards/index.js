// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import { connection } from "../../../lib/db";

const handler = nc()
  .post((req, res) => {
    const card = req.body;
    console.log(card);
    connection.execute(
      "INSERT INTO cards (card_name, list_id) VALUES(?, ?)",
      [card.name, card.list_id],
      (err, results) => {
        if (err) {
          console.log(err);
        }    
        res.json({ data: results });
      }
    );
  })
  .get((req, res) => {
    const listId = req.query.listId;
    connection.execute(
      `SELECT * FROM cards WHERE list_id = '${listId}'`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        res.json({ data: results });
      }
    );
  });

export default handler;
