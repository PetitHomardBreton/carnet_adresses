import query from "../database.js";


/****SUPPRESSION DE CONTACT */
export default (req, res) => { // Exporter la fonction pour pouvoir l'utiliser dans le fichier router.js
    const contactIdsToDelete = req.body.contactsToDelete; // Récupérer les identifiants depuis le corps de la requête
    console.log(req.body) // Afficher le corps de la requête dans la console

    if (!contactIdsToDelete || contactIdsToDelete.length === 0) { // Vérifier s'il y a des identifiants à supprimer
        // Vérifier s'il y a des identifiants à supprimer
        res.status(400).send("Aucun contact sélectionné pour la suppression."); // Envoyer une erreur 400 si aucun identifiant n'est présent    
        return;
      }

    query(
      "DELETE FROM contacts WHERE id IN(?)", // Utiliser IN (?) pour supprimer plusieurs lignes en une seule requête
      [contactIdsToDelete], // Passer les identifiants à supprimer en paramètre
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
          
        res.redirect("/"); // Rediriger vers la page d'accueil
      }
    );
  };