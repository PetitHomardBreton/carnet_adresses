import query from '../database.js';
import bcrypt from 'bcrypt';

export function loginForm (req, res) {
    res.render('loginForm');
};

export function login (req, res) {
    const {pseudo, password} = req.body;
    
    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE pseudo = ?',
        [pseudo],
        (error, result) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }
            
            // Si l'utilisateur n'a pas été trouvé
            if(result.length === 0) {
                res.render(
                    'loginForm',
                    {message: 'Identifiants incorrects'}
                );
                return;
            }
            
            // Vérification du mot de passe
            bcrypt.compare(password, result[0].password, (error, hresult) => {
                if(!hresult) {
                    res.render(
                        'loginForm',
                        {message: 'Identifiants incorrects'}
                    );
                    return;
                }
                req.session.isLogged = true;
                res.redirect('/');
            });
        }
    );
}
