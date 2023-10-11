import { v4 } from 'uuid';
import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';

//AFFICHAGE DU FORMULAIRE
export function addContact(req, res) {
    res.render('contactForm', { title: 'Ajout d\'un contact', action: '/contacts/add' });
};

/*******AJOUT D UN CONTACT ET ACTUALISATION DE L AFFICHAGE */
export function addContactSubmit(req, res) {
    const formData = formidable();

    // Récupération des champs et des fichiers
    formData.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération de la photo`);
            res.status(500).send('Erreur serveur');
            return;
        }
        // Récupération du chemin temporaire du fichier
        let oldPath = files.image[0].filepath;
        // Chemin vers où sera stocké le fichier
        let newPath = 'public/images/' + files.image[0].originalFilename;
        // R2cupération du nom du fichier pour le stocker en BDD
        let imageName = files.image[0].originalFilename;

        // Copie le fichier depuis le dossier temporaire vers le dossier de destination
        fs.copyFile(oldPath, newPath, (error) => {
            if (error) {
                console.error(`Erreur lors de la récupération de la photo`);
                res.status(500).send('Erreur serveur');
                return;
            }
            
            const id = v4();
            
            // Faire la requête INSERT
            query(
                'INSERT INTO Contacts (id, civilite, lastName, surname, phone, email, image) VALUES(?, ?, ?, ?, ?, ?, ?)',
                [id, fields.civilite, fields.lastName, fields.surname, fields.phone, fields.email, imageName],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Erreur lors de la requete');
                        return;
                    }
                    //on redirige vers la page d'accueil
                    res.redirect('/');
                }
            );
        });
    });
};