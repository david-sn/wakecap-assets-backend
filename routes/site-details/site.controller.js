const validation = require('./site.validate');
const HttpResponsesConst = require('../../constants/http-responses.constants');
const formatResponse = require('../../constants/response-formate.constants').formatResponse;

const siteService = require('./site.service');
const clientService = require('../clients-details/client.service');


/**
 *  End Point for create Site
 * @param {*} req 
 * @param {*} res 
 */
async function createSite(req, res) {
	const reqBody = req.body;

	const errorRequest = await validation.createSiteValidation(reqBody);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	} else {
		const clientDetailDB = await clientService.getClientById(reqBody.clientId);
		if (clientDetailDB) {
			reqBody.clientDetail = clientDetailDB;
			siteService.createSite(reqBody)
				.then(savedSite => res.status(HttpResponsesConst.Created.code).json(formatResponse(HttpResponsesConst.Created, savedSite)))
				.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
		} else {
			return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, { clientId: reqBody.clientId }));
		}
	}

}

/**
 * End Point for update exist Site
 * @param {*} req 
 * @param {*} res 
 */
async function updateSite(req, res) {
	const reqQuery = req.params;
	const reqBody = req.body;

	const errorRequest = await validation.updateSiteValidation({ reqBody, ...reqQuery });
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	} else {
		const [existSite, existClient] = await Promise.all([
			siteService.getSiteById(reqQuery.siteId),
			clientService.getClientById(reqBody.clientId)
		]);
		if (!existSite || !existClient) {
			return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, reqQuery));
		} else {
			reqBody.clientDetail = existClient;
			siteService.updateSite(reqBody, reqQuery.siteId)
				.then(updatedSite => res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, updatedSite.nModified)))
				.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
		}
	}
}

/**
 * End Point for soft delete exist Site
 * @param {*} req 
 * @param {*} res 
 */
async function deleteSite(req, res) {
	const reqQuery = req.params;

	const errorRequest = await validation.deleteOrFindByIdValidation(reqQuery);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	}
	const existSite = await siteService.getSiteById(reqQuery.siteId);
	if (!existSite) {
		return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, reqQuery));
	} else {
		siteService.deleteSite(reqQuery.siteId)
			.then(deletedStats => res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, deletedStats.nModified)))
			.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
	}

}

/**
 * End Point for find Site by id
 * @param {*} req 
 * @param {*} res 
 */
async function getSiteById(req, res) {
	const reqQuery = req.params;

	const errorRequest = await validation.deleteOrFindByIdValidation(reqQuery);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	}
	siteService.getSiteById(reqQuery.siteId)
		.then(siteDetail => {
			if (siteDetail)
				return res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, siteDetail));
			else return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, reqQuery));
		})
		.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
}

/**
 * End Point for find all Sites
 * @param {*} req 
 * @param {*} res 
 */
async function getAllSites(req, res) {
	const reqQuery = req.query;

	const errorRequest = validation.getAllSitesValidation(reqQuery);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	}
	siteService.getAllSites({})
		.then(sites => res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, sites)))
		.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));

}


module.exports = {
	createSite,
	updateSite,
	deleteSite,
	getSiteById,
	getAllSites
};