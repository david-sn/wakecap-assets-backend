const Joi = require('@hapi/joi');


/**
 * Validate Request Parameters for create Site API
 * @param {*} params 
 */
async function createSiteValidation(params) {
	const schema = Joi.object({
		name: Joi.string().required(),
		gps: {
			lat: Joi.number().required(),
			lon: Joi.number().required()
		},
		timezone: Joi.number().required(),
		startingHour: Joi.number().required(),
		endingHour: Joi.number().required(),
		lateThreshold: Joi.number().required(),
		totalInactiveHours: Joi.number().required(),
		clientId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
	});
	return schema.validate(params);
}

/**
 * Validate Request Parameters for update Site API
 * @param {*} params 
 */
async function updateSiteValidation(params) {

	const schema = Joi.object({
		siteId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required(),
		reqBody: {
			name: Joi.string().required(),
			gps: {
				lat: Joi.number().required(),
				lon: Joi.number().required()
			},
			timezone: Joi.number().required(),
			startingHour: Joi.number().required(),
			endingHour: Joi.number().required(),
			lateThreshold: Joi.number().required(),
			totalInactiveHours: Joi.number().required(),
			clientId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
		}
	})
	return schema.validate(params);

}


/**
 * Validate Request Parameters for delete and find one Site API
 * @param {*} params 
 */
async function deleteOrFindByIdValidation(params) {
	const schema = Joi.object({
		siteId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required()
	}).unknown();
	return schema.validate(params);

}

/**
 * Validate Request Parameters for get all Site API
 * @param {*} params 
 */
async function getAllSitesValidation(params) {
	const schema = Joi.object({
		page: Joi.number().optional(),
		pageSize: Joi.number().optional()
	}).unknown();
	return schema.validate(params);
}

module.exports = {
	createSiteValidation,
	updateSiteValidation,
	deleteOrFindByIdValidation,
	getAllSitesValidation
};