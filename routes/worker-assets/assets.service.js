const AssetsDetails = require('../../models/AssetsDetails');

/**
 * Save a new Asset recived from worker to database.
 * @constructor
 * @param {*} assetData - The poroperties of the assets, ex(coordinates: {
        coordinates: [Number],
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        }
    },
    is_active: Boolean,
    duration: Number,
    worker_id: String)
 */
async function createAssets(assetData) {
    return AssetsDetails.create(assetData);
} 


module.exports = {
    createAssets
};