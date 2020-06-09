
const Joi = require('@hapi/joi');

function validateSubmitProfile(params) {
	const schema = Joi.object({
		a: Joi.string().required()
	}).unknown();
	return schema.validate(params);
}


module.exports = {
	validateSubmitProfile
};