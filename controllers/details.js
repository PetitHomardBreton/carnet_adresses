import query from "../database.js";

/****DETAIL DU CONTACT */
export default (req, res) => {
  //récupération de l'identifiant du contact à afficher
  let contactId = req.params.id;
  query(
    "SELECT * FROM contacts WHERE id = ?",
    [contactId],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la récupération des données."
          );
        return;
      }
      if (result.length === 0) {
        res.status(404).send(`The contact with id ${id} is not found`);
        return;
      }

      res.render("details.ejs", { contact: result[0] });
    }
  );
};
