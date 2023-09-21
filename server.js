//appel des dépendances
import express from 'express';
import router from './router.js';

const PORT = 3000;
const app = express();

//pour récupérer les informations du formulaire
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

//fichiers statiques
app.use(express.static('public'));

//spécifie le dossier qui contient les vues (par défaut /views)
app.set('views', './views'); 

//définit le moteur de template (permet de ne plus mettre l'extension .ejs dans les render)
app.set('view engine', 'ejs'); 

//importation des routes
app.use('/', router);

// connexion du serveur au réseau
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
