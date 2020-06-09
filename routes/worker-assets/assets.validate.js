const Joi = require('@hapi/joi');


/**
 * Validate Request Parameters for create Assets API
 * @param {*} params 
 */
async function createAssetsValidation(params) {
	const schema = Joi.object({
		coordinates: {
			coordinates: Joi.array().items(Joi.number()).required(),
			type: Joi.string().valid('Point').required()
		},
		is_active: Joi.boolean().required(),
		duration: Joi.number().required(),
		worker_id: Joi.string().required()
	});
	return schema.validate(params);
}

module.exports = {
	createAssetsValidation
};