import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import DetailController from "./controllers/details.js";
import DeleteController from "./controllers/deleteContact.js";
import {addContact, addContactSubmit} from "./controllers/addContact.js";
import {updateContact, updateContactSubmit} from "./controllers/update.js";

router.get('/', HomeController);

router.get('/contacts/add', addContact);

router.post('/contacts/add', addContactSubmit);

router.post('/contacts/delete', DeleteController);

router.get('/contacts/:id', DetailController);
  
router.get('/contacts/:id/update', updateContact);

router.post('/contacts/:id/update', updateContactSubmit);

export default router;
