const { ObjectId } = require('mongoose').Types;
const ClientDetails = require('../../models/ClientDetails');

/**
 * Save a new Client to database.
 * 
 * @param {object} clientData - The poroperties of the client, ex(name, detail,...)
 */
async function createClient(clientData) {
    return ClientDetails.create(clientData);
}

/**
 * Update a Client to database.
 * 
 * @param {object} newClientData - The poroperties of the new client, ex(name, detail,...)
 * @param {string} clientId - The id of the client need to update.
 */
async function updateClient(newClientData, clientId) {
    return ClientDetails.updateOne(
        { _id: new ObjectId(clientId), deletedAt: null },
        {
            $set: {
                name: newClientData.name,
                detail: newClientData.detail,
                attachements: newClientData.attachements,
                phone: newClientData.phone
            }
        }
    ).exec();
}

/**
 * find a Client from database.
 * 
 * @param {string} clientId - The id of the client need to retrive.
 */
async function getClientById(clientId) {
    return ClientDetails.findOne({ _id: new ObjectId(clientId), deletedAt: null }).exec();
}

/**
 * find all Client from database.
 * 
 * @param {object} filters - The query criteria of the client need to retrive.
 */
async function getAllClients(filters) {
    filters.deletedAt = null;
    return ClientDetails.find(filters).exec();
}

/**
 * delete a Client from database.
 * 
 * @param {string} clientId - The id of the client need to delete. soft deletetion
 */
async function deleteClient(clientId) {
    return ClientDetails.updateOne(
        { _id: new ObjectId(clientId), deletedAt: null },
        { $set: { deletedAt: new Date() } }
    ).exec();
}


module.exports = {
    createClient,
    updateClient,
    getClientById,
    getAllClients,
    deleteClient
};