import { v4 } from 'uuid';
import query from '../database.js';

//AFFICHAGE DU FORMULAIRE
export function addContact(req, res) {
    res.render('contactForm', {title: 'Ajout d\'un contact', action: '/contacts/add'});
};

/*******AJOUT D UN CONTACT ET ACTUALISATION DE L AFFICHAGE */
export function addContactSubmit(req, res) {
    // Création du contact
    const newContact = {
        id: v4(),
        civilite: req.body.civilite,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
    };
    // Insertion du contact dans la BDD
    query(
        `INSERT INTO contacts (id, civilite, firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?, ?)`,
        [newContact.id, newContact.civilite, newContact.firstName, newContact.lastName, newContact.phone, newContact.email],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }
            //répondres au client avec la redirection
            res.redirect('/');
        }
    );


};