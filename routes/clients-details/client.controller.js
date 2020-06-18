const validation = require('./client.validate');
const HttpResponsesConst = require('../../constants/http-responses.constants');
const formatResponse = require('../../constants/response-formate.constants').formatResponse;

const clientService = require('./client.service');

/**
 *  End Point for create Client
 * @param {*} req 
 * @param {*} res 
 */
async function createClient(req, res) {
	const reqBody = req.body;
	const errorRequest = await validation.createClientValidation(reqBody);
	if (errorRequest.error) {
		return formatResponse(res, HttpResponsesConst.BadRequest, errorRequest.error);

	} else {
		clientService.createClient(reqBody)
			.then(savedClient => formatResponse(res, HttpResponsesConst.Created, savedClient))
			.catch(e => formatResponse(res, HttpResponsesConst.InternalServerError, e.toString()));
	}
}

/**
 * End Point for update exist Client
 * @param {*} req 
 * @param {*} res 
 */
async function updateClient(req, res) {
	const reqQuery = req.params;
	const reqBody = req.body;

	const errorRequest = await validation.updateClientValidation({ reqBody, ...reqQuery });
	if (errorRequest.error) {
		return formatResponse(res, HttpResponsesConst.BadRequest, errorRequest.error);
	} else {
		const existClient = await clientService.getClientById(reqQuery.clientId);
		if (!existClient) {
			return formatResponse(res, HttpResponsesConst.NotFound, reqQuery);
		} else {
			clientService.updateClient(reqBody, reqQuery.clientId)
				.then(updatedClient => formatResponse(res, HttpResponsesConst.OK, updatedClient.nModified))
				.catch(e => formatResponse(res, HttpResponsesConst.InternalServerError, e.toString()));
		}
	}
}

/**
 * End Point for soft delete exist Client
 * @param {*} req 
 * @param {*} res 
 */
async function deleteClient(req, res) {
	const reqQuery = req.params;

	const errorRequest = await validation.deleteOrFindByIdValidation(reqQuery);
	if (errorRequest.error) {
		return formatResponse(res, HttpResponsesConst.BadRequest, errorRequest.error);
	}
	const existClient = await clientService.getClientById(reqQuery.clientId);
	if (!existClient) {
		return formatResponse(res, HttpResponsesConst.NotFound, reqQuery);
	} else {
		clientService.deleteClient(reqQuery.clientId)
			.then(deletedStats => formatResponse(res, HttpResponsesConst.OK, deletedStats.nModified))
			.catch(e => formatResponse(res, HttpResponsesConst.InternalServerError, e.toString()));
	}

}

/**
 * End Point for find Client by id
 * @param {*} req 
 * @param {*} res 
 */
async function getClientById(req, res) {
	const reqQuery = req.params;

	const errorRequest = await validation.deleteOrFindByIdValidation(reqQuery);
	if (errorRequest.error) {
		return formatResponse(res, HttpResponsesConst.BadRequest, errorRequest.error);
	}
	clientService.getClientById(reqQuery.clientId)
		.then(clientDetail => {
			if (clientDetail)
				returnformatResponse(res, HttpResponsesConst.OK, clientDetail);
			else return formatResponse(res, HttpResponsesConst.NotFound, reqQuery);
		})
		.catch(e => formatResponse(res, HttpResponsesConst.InternalServerError, e.toString()));
}

/**
 * End Point for find all Clients
 * @param {*} req 
 * @param {*} res 
 */
async function getAllClients(req, res) {
	const reqQuery = req.query;

	const errorRequest = validation.getAllClientsValidation(reqQuery);
	if (errorRequest.error) {
		return formatResponse(res, HttpResponsesConst.BadRequest, errorRequest.error);
	}
	clientService.getAllClients({})
		.then(clients => formatResponse(res, HttpResponsesConst.OK, clients))
		.catch (e => formatResponse(res, HttpResponsesConst.InternalServerError, e.toString()));

}


module.exports = {
	createClient,
	updateClient,
	deleteClient,
	getClientById,
	getAllClients
};