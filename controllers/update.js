import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateContact(req, res) {
    let id = req.params.id;

    query(
        'SELECT * FROM Contacts WHERE id = ?', [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            const contact = results[0];

            if (!contact) {
                return res.status(404).send(`Contact with id ${id} not found`);
            }

            //on appelle le template contactForm en lui passant les informations concernant le contact
            res.render('contactForm', {
                title: 'Modification d\'un contact',
                action: `/contacts/${id}/update`,
                contact
            });
        }
    );
};

export function updateContactSubmit(req, res) {
    let id = req.params.id;
    const formData = formidable({
        allowEmptyFiles: true,
        minFileSize: 0
    });

    const updateContactIntoDb = (data) =>
        query(`UPDATE Contacts SET civilite = ?,
                               lastName = ?,
                               surname = ?,
                               phone = ?,
                               email = ?,
                               image = ?
            WHERE id = ?`, data,
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

    // Récupération des champs et des fichiers
    formData.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération de la photo ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }
        
        // On change le fichier uniquement s'il y en a un de spécifié
        // dans le formulaire de modification
        if (files.image[0].originalFilename === '') {
            updateContactIntoDb([
                fields.civilite,
                fields.lastName,
                fields.surname,
                fields.phone,
                fields.email,
                '',
                id
            ]);
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
            updateContactIntoDb([
                fields.civilite,
                fields.lastName,
                fields.surname,
                fields.phone,
                fields.email,
                imageName,
                id
            ]);
        });
    });
};


