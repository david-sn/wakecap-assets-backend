const validation = require('./worker.validate');
const HttpResponsesConst = require('../../constants/http-responses.constants');
const formatResponse = require('../../constants/response-formate.constants').formatResponse;

const workerService = require('./worker.service');
const siteService = require('../site-details/site.service');


/**
 *  End Point for create Worker
 * @param {*} req 
 * @param {*} res 
 */
async function createWorker(req, res) {
	const reqBody = req.body;

	const errorRequest = await validation.createWorkerValidation(reqBody);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	} else {
		let siteDetail = await siteService.getSiteById(reqBody.siteId);
		if (siteDetail) {
			reqBody.siteDetail = siteDetail;
			workerService.createWorker(reqBody)
				.then(savedWorker => res.status(HttpResponsesConst.Created.code).json(formatResponse(HttpResponsesConst.Created, savedWorker)))
				.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
		} else {
			//site not found
			return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, { siteId: reqBody.siteId }));
		}
	}//valid validation
}

/**
 * End Point for update exist Worker
 * @param {*} req 
 * @param {*} res 
 */
async function updateWorker(req, res) {
	const reqQuery = req.params;//workerId
	const reqBody = req.body;

	const errorRequest = await validation.updateWorkerValidation({ reqBody, ...reqQuery });
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	} else {
		const [existWorker, existSite] = await Promise.all([workerService.getWorkerById(reqQuery.workerId), siteService.getSiteById(reqBody.siteId)]);
		if (!existWorker || !existSite) {
			return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound,
				{
					siteId: existWorker ? reqBody.siteId : null,
					workerId: existSite ? reqQuery.workerId : null
				}));
		} else {
			reqBody.siteDetail = existSite;
			workerService.updateWorker(reqBody, reqQuery.workerId)
				.then(updatedWorker => res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, updatedWorker.nModified)))
				.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
		}
	}
}

/**
 * End Point for soft delete exist Worker
 * @param {*} req 
 * @param {*} res 
 */
async function deleteWorker(req, res) {
	const reqQuery = req.params;

	const errorRequest = await validation.deleteOrFindByIdValidation(reqQuery);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	}
	const existWorker = await workerService.getWorkerById(reqQuery.workerId);
	if (!existWorker) {
		return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, reqQuery));
	} else {
		workerService.deleteWorker(reqQuery.workerId)
			.then(deletedStats => res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, deletedStats.nModified)))
			.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
	}

}

/**
 * End Point for find Worker by id
 * @param {*} req 
 * @param {*} res 
 */
async function getWorkerById(req, res) {
	const reqQuery = req.params;

	const errorRequest = await validation.deleteOrFindByIdValidation(reqQuery);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	}
	workerService.getWorkerById(reqQuery.workerId)
		.then(workerDetail => {
			if (workerDetail)
				return res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, workerDetail));
			else return res.status(HttpResponsesConst.NotFound.code).json(formatResponse(HttpResponsesConst.NotFound, reqQuery));
		})
		.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));
}

/**
 * End Point for find all Workers
 * @param {*} req 
 * @param {*} res 
 */
async function getAllWorkers(req, res) {
	const reqQuery = req.query;

	const errorRequest = validation.getAllWorkersValidation(reqQuery);
	if (errorRequest.error) {
		return res.status(HttpResponsesConst.BadRequest.code).json(formatResponse(HttpResponsesConst.BadRequest, errorRequest.error));
	}
	workerService.getAllWorkers({})
		.then(workers => res.status(HttpResponsesConst.OK.code).json(formatResponse(HttpResponsesConst.OK, workers)))
		.catch(e => res.status(HttpResponsesConst.InternalServerError.code).json(formatResponse(HttpResponsesConst.InternalServerError, e.toString())));

}


module.exports = {
	createWorker,
	updateWorker,
	deleteWorker,
	getWorkerById,
	getAllWorkers
};