import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

export default (req, res) => {
    query(
        'SELECT * FROM Contacts', 
        [],
        (error, results) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            res.render('index',{contacts: results});
        }
    );
};
