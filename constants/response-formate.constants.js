
/**
 * Represents a response.
 * @param {Response} res 
 * @param {ResponseConstant} responseConstant - The info of response status and code.
 * @param {*} data - The data need to be returned in response.
 * @param {string} message - special message can added
 */
function formatResponse(res, responseConstant, result, message) {
	return res.status(responseConstant.code).json({ info: responseConstant, result, message });
}

module.exports = {
	formatResponse
};
