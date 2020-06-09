
/**
 * Represents a book.
 * @param {string} responseConstant - The info of response status and code.
 * @param {any} data - The data need to be returned in response.
 * @param {string} message - special message can added
 */
function formatResponse(responseConstant, data, message) {
	let response = {
		info: responseConstant,
		result: data,
		message: message
	};
	return response;
}

module.exports = {
	formatResponse
};
