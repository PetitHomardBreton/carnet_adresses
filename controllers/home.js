import query from '../database.js'

export default (req, res) => {
        query('SELECT * FROM contacts', [], (error, contacts) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }
            res.render('index.ejs', {contacts});
          });
};
