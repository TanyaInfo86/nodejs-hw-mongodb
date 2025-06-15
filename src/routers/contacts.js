import express from 'express';
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController,
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController);
router.post('/', createContactController);
router.patch('/:contactId', patchContactController);
router.delete('/:contactId', deleteContactController);

export default router;
