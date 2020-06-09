const Joi = require('@hapi/joi');


/**
 * Validate Request Parameters for create Client API
 * @param {*} params 
 */
async function createClientValidation(params) {
	const schema = Joi.object({
		name: Joi.string().required(),
		detail: Joi.string().required(),
		attachements: Joi.array().optional().items(Joi.object().keys({
			mediaType: Joi.string().valid("image", "video", "pdf"),
			pointer: Joi.string().valid("cover", "profile", "attachemnts", "others"),
			url: Joi.string(),
			thumbnail: Joi.string()
		})),
		phone: {
			code: Joi.string().required(),
			number: Joi.string().required()
		}
	});
	return schema.validate(params);
}

/**
 * Validate Request Parameters for update Client API
 * @param {*} params 
 */
async function updateClientValidation(params) {

	const schema = Joi.object({
		clientId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required(),
		reqBody: {
			name: Joi.string().required(),
			detail: Joi.string().required(),
			attachements: Joi.array().optional(),
			phone: {
				code: Joi.string().required(),
				number: Joi.string().required()
			}
		}
	})
	return schema.validate(params);

}


/**
 * Validate Request Parameters for delete and find one Client API
 * @param {*} params 
 */
async function deleteOrFindByIdValidation(params) {
	const schema = Joi.object({
		clientId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
	}).unknown();
	return schema.validate(params);

}

/**
 * Validate Request Parameters for get all Client API
 * @param {*} params 
 */
async function getAllClientsValidation(params) {
	const schema = Joi.object({
		page: Joi.number().optional(),
		pageSize: Joi.number().optional()
	}).unknown();
	return schema.validate(params);
}

module.exports = {
	createClientValidation,
	updateClientValidation,
	deleteOrFindByIdValidation,
	getAllClientsValidation
};