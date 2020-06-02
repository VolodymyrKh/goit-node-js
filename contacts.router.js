const express = require('express');
const {getContacts, getContactById, createContact} = require('./contacts.controller')

const contactRouter = express.Router();
contactRouter.get('/', getContacts);
contactRouter.get('/:id', getContactById);
contactRouter.post('/', createContact)


exports.contactRouter = contactRouter;

