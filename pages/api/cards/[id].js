// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import { connection } from "../../../lib/db";

const handler = nc()
  .patch((req, res) => {
    const body = JSON.parse(req.body);
    const { column, value, cardName } = body;
    connection.execute(
      `UPDATE cards SET ${column}='${value}' WHERE card_name='${cardName}'`,
      (err, results) => {
        if (err) {
          throw err;
        }
        res.json(results);
      }
    );
  })
  .delete((req, res) => {
    const cardName = req.query.id;
    console.log("cardname:", cardName);
    connection.execute(
      `DELETE FROM cards WHERE card_name='${cardName}'`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
        res.json(results);
      }
    );
  });
export default handler;
