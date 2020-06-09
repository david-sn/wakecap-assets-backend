const Joi = require('@hapi/joi');


/**
 * Validate Request Parameters for create Worker API
 * @param {*} params 
 */
async function createWorkerValidation(params) {
	const schema = Joi.object({
		name: {
			first: Joi.string().required(),
			last: Joi.string().required()
		},
		siteId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
	});
	return schema.validate(params);
}


/**
 * Validate Request Parameters for update Worker API
 * @param {*} params 
 */
async function updateWorkerValidation(params) {

	const schema = Joi.object({
		workerId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required(),
		reqBody: {
			name: {
				first: Joi.string().required(),
				last: Joi.string().required()
			},
			siteId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
		}
	})
	return schema.validate(params);

}


/**
 * Validate Request Parameters for delete and find one Worker API
 * @param {*} params 
 */
async function deleteOrFindByIdValidation(params) {
	const schema = Joi.object({
		workerId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
	}).unknown();
	return schema.validate(params);

}


/**
 * Validate Request Parameters for get all Worker API
 * @param {*} params 
 */
async function getAllWorkersValidation(params) {
	const schema = Joi.object({
		page: Joi.number().optional(),
		pageSize: Joi.number().optional()
	}).unknown();
	return schema.validate(params);
}

module.exports = {
	createWorkerValidation,
	updateWorkerValidation,
	deleteOrFindByIdValidation,
	getAllWorkersValidation
};