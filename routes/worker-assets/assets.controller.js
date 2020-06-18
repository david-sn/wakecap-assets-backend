const validation = require('./assets.validate');
const HttpResponsesConst = require('../../constants/http-responses.constants');
const formatResponse = require('../../constants/response-formate.constants').formatResponse;

const assetService = require('./assets.service');

/**
 *  End Point for create Worker Assets
 * @param {*} req 
 * @param {*} res 
 */
async function createAssets(req, res) {//reduce sync call, prefere use Kafka/kinesis messaging between sensor and first reciver
	const reqBody = req.body;

	const errorRequest = await validation.createAssetsValidation(reqBody);
	if (errorRequest.error) {
		return formatResponse(res, HttpResponsesConst.BadRequest, errorRequest.error);
	} else {
		assetService.createAssets(reqBody);//async call, don't need to waite for saved data just validate only
		return formatResponse(res, HttpResponsesConst.Created);
	}
}

module.exports = {
	createAssets
};