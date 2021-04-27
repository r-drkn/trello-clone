import nc from "next-connect";
import { connection } from "../../../lib/db";

const handler = nc()
  .patch((req, res) => {
    const listId = req.query.id;
    const value = req.body.replace("'", "\\'");
    connection.execute(
      `UPDATE lists SET name = '${value}' WHERE list_id = '${listId}'`,
      (err, results) => {
        if (err) {
          throw err;
        }
        res.json(results);
      }
    );
  })
  .delete((req, res) => {
    const listId = req.query.id;
    console.log(listId);
    connection.execute(
      `DELETE FROM lists WHERE list_id = '${listId}'`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log("deleted", results);
        res.json(results);
      }
    );
  });
export default handler;
