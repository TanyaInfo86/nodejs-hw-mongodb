import createHttpError from 'http-errors';
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        message: 'Contact created successfully',
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const updated = await updateContact(contactId, req.body);

    if (!updated) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        message: 'Contact updated successfully',
        data: updated,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const deleted = await deleteContact(contactId);

    if (!deleted) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
