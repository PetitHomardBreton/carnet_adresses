import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

/****SUPPRESSION DE CONTACT */
export default (req, res) => {
    const contactsToDelete = req.body.contactsToDelete;
    
    query(
        `DELETE FROM Contacts WHERE id IN(?)`,
        contactsToDelete,
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            //on redirige vers la page d'accueil
            res.redirect('/');
        }
    );
};