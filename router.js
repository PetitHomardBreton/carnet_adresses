import dotenv from "dotenv";
dotenv.config();

import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import DetailController from "./controllers/details.js";
import DeleteController from "./controllers/deleteContact.js";
import { addContact, addContactSubmit } from "./controllers/addContact.js";
import { updateContact, updateContactSubmit } from "./controllers/update.js";
import { loginForm, login } from "./controllers/login.js";
import logout from "./controllers/logout.js";
//import { adminForm, addAdminSubmit } from "./controllers/addAdmin.js";
import { userForm, addUserSubmit } from "./controllers/addUser.js";

const checkAuthentication = (req, res, next) => {
  // middleware
  if (req.session.isLogged) {
    // si l'utilisateur est connecté
    next(); // on passe à la suite
    return; // on sort de la fonction
  }
  res.redirect("/login"); // sinon on redirige vers la page de connexion
};

router.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

router.get("/", HomeController);

router.get("/login", loginForm);

router.post("/login", login);

router.get("/logout", logout);

router.get("/contacts/add", checkAuthentication, addContact);

router.post("/contacts/add", checkAuthentication, addContactSubmit);

router.post("/contacts/delete", checkAuthentication, DeleteController);

router.get("/contacts/:id", DetailController);

router.get("/contacts/:id/update", checkAuthentication, updateContact);

router.post("/contacts/:id/update", checkAuthentication, updateContactSubmit);


router.get("/user", checkAuthentication, (req, res) => {
  if (req.session.isLogged) {
    // Si un administrateur est connecté, affichez le formulaire
    res.render("userForm");
  } else {
    // Sinon, redirigez-le ou affichez un message d'erreur
    res.redirect('/login'); // Redirigez-le vers la page de connexion ou affichez un message d'erreur
  }
});

//router.get("/admin", checkAuthentication, adminForm);

router.post("/user", checkAuthentication, addUserSubmit);

export default router;
