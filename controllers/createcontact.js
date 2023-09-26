import { v4 } from 'uuid';
import query from '../database.js';

// Export du contrôleur
export default (req, res) => {
    // Création du contact
    const newContact = {
        id: v4(),
        civilite: req.body.civilite,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
    };

    // Insertion du kitten dans la BDD
    query(
        `INSERT INTO contacts (id, civilite, firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?, ?)`,
        [newContact.id, newContact.civilite, newContact.firstName, newContact.lastName, newContact.phone, newContact.email],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }
            res.send('Contact créé');
        }
    );
};
