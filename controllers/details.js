import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

/****DETAIL DU CONTACT */
export default (req, res) => {
    //récupération de l'identifiant du contact à afficher
    let id = req.params.id;

    query(
        'SELECT * FROM Contacts WHERE id = ?', 
        [id],
        (error, results) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            
            const contact = results[0];
            
            if (!contact) {
                return res.status(404).send(`Contact with id ${id} not found`);
            }
            
            res.render('details', {contact});
        }
    );
};
