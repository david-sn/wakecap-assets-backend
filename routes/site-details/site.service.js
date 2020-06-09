const { ObjectId } = require('mongoose').Types;
const SiteDetails = require('../../models/SiteDetails');

/**
 * create a new Site to database.
 * 
 * @param {object} siteData - The poroperties of the Site, ex(name, timezone,...)
 */
async function createSite(siteData) {
    return SiteDetails.create(siteData);
}

/**
 * Update a Site to database.
 * 
 * @param {object} newSiteData - The poroperties of the new Site, ex(name, timezone,...)
 * @param {string} siteId - The id of the Site need to update.
 */
async function updateSite(newSiteData, siteId) {
    return SiteDetails.updateOne(
        { _id: new ObjectId(siteId), deletedAt: null },
        { $set: newSiteData }
    ).exec();
}

/**
 * find a Site by Id from database.
 * 
 * @param {string} clientId - The id of the Site need to retrive.
 */
async function getSiteById(siteId) {
    return SiteDetails.findOne({ _id: new ObjectId(siteId), deletedAt: null }).exec();
}

/**
 * find All Sites to database.
 * 
 * @param {object} filters - The query criteria of the Sites need to retrive.
 */
async function getAllSites(filters) {
    filters.deletedAt = null;
    return SiteDetails.find(filters).exec();
}
 
/**
 * delete a Site from database.
 * 
 * @param {string} siteId - The id of the Site need to delete. soft deletetion
 */
async function deleteSite(siteId) {
    return SiteDetails.updateOne(
        { _id: new ObjectId(siteId), deletedAt: null },
        { $set: { deletedAt: new Date() } }
    ).exec();
}


module.exports = {
    createSite,
    updateSite,
    getSiteById,
    getAllSites,
    deleteSite
};