import createHttpError from 'http-errors';
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 'success',
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 'success',
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const createContactController = async (req, res, next) => {
    try {
        const contact = await createContact(req.body);
        res.status(201).json({
            status: 'success',
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const patchContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const updated = await updateContact(contactId, req.body);

        if (!updated) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 'success',
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const deleted = await deleteContact(contactId);

        if (!deleted) {
            throw createHttpError(404, 'Contact not found');
        }


        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};
