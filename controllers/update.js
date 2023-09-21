import query from "../database.js";

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateContact(req, res) {
  const contactId = req.params.id;

  query("SELECT * FROM contacts WHERE id = ?", [contactId], (err, result) => {
    //si il y a une erreur on l'affiche
    if (err) {
      console.log(err);
      return res.status(500).send("Une erreur s'est produite");
    }
    //si le contact n'existe pas on affiche une erreur
    if (result.length === 0) {
      return res
        .status(404)
        .send(`Le contact avec l'id ${contactId} n'existe pas`);
    }
    //on appelle le template contactForm en lui passant les informations concernant le contact
    res.render("contactForm", {
      title: "Modification d'un contact",
      action: `/contacts/${contactId}/update`, // Utilisez "contactId" au lieu de "id"
      id: contactId, // Utilisez "contactId" au lieu de "id"
      contact: result[0], // Récupérez le premier élément du résultat
    });
  });
}

export function updateContactSubmit(req, res) {
  const contactId = req.params.id;

  // Récupérez les données du formulaire
  const {
    civilite,
    firstName,
    lastName,
    phone,
    email
  } = req.body;

  // Mettez à jour le contact dans la base de données SQL
  query(
    `UPDATE contacts SET civilite = ?, firstName = ?, lastName = ?, phone = ?, email = ? WHERE id = ?`,
    [civilite, firstName, lastName, phone, email, contactId], // Utilisez les données du formulaire
    (error, results) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send('Erreur serveur');
        return;
      }

      // Redirigez vers la page de détails du contact mis à jour
      res.redirect(`/contacts/${contactId}`);
    }
  );
}

