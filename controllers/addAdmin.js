import { v4 } from "uuid";
import query from "../database.js";
import bcrypt from "bcrypt"; // Importez bcrypt ici




export function adminForm(req, res) {
    res.render('adminForm'), { title: 'Ajout d\'un admin', action: '/admin/add' };
};

/*******AJOUT D UN ADMIN ET ACTUALISATION DE L AFFICHAGE */
export function addAdminSubmit(req, res) {
    const { pseudo, password } = req.body;

    // Vérifiez si le pseudo de l'administrateur n'existe pas déjà dans la base de données
    query(
        'SELECT * FROM user WHERE pseudo = ?',
        [pseudo],
        (error, result) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            // Si l'utilisateur existe déjà, renvoyez une erreur
            if (result.length > 0) {
                res.render(
                    'adminForm',
                    { message: 'Ce pseudo est déjà utilisé' }
                );
                return;
            }

            // Hash du mot de passe
            bcrypt.hash(password, 10, (hashError, hashedPassword) => {
                if (hashError) {
                    console.error(`Erreur lors du hachage du mot de passe : ${hashError}`);
                    res.status(500).send('Erreur serveur');
                    return;
                }

                const id = v4();

                // Insérez le nouvel administrateur dans la base de données
                query(
                    'INSERT INTO user (id, pseudo, password, role) VALUES (?, ?, ?, ?)',
                    [id,pseudo, hashedPassword, 'admin'],
                    (insertError) => {
                        if (insertError) {
                            console.error(`Erreur lors de l'insertion de l'administrateur : ${insertError}`);
                            res.status(500).send('Erreur serveur');
                            return;
                        }

                        res.redirect('/admin');
                    }
                );
            });
        }
    );
}
