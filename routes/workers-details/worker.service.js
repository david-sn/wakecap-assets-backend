const { ObjectId } = require('mongoose').Types;
const WorkerDetails = require('../../models/WorkerDetails');

/**
 * Save a new Worker to database.
 * 
 * @param {object} workerData - The poroperties of the Worker, ex(name.first, name.last)
 */
async function createWorker(workerData) {
    return WorkerDetails.create(workerData);
}

/**
 * Update a Worker to database.
 * 
 * @param {object} newWorkerData - The poroperties of the new worker, ex(name.first, name.last)
 * @param {string} workerId - The id of the worker need to update.
 */
async function updateWorker(newWorkerData, workerId) {
    return WorkerDetails.updateOne(
        { _id: new ObjectId(workerId), deletedAt: null },
        {
            $set: {
                name: newWorkerData.name,
                siteDetail: newWorkerData.siteDetail
            }
        }
    ).exec();
}

/**
 * find a worker details by id from database.
 * 
 * @param {string} workertId - The id of the worker need to retrive.
 */
async function getWorkerById(workerId) {
    return WorkerDetails.findOne({ _id: new ObjectId(workerId), deletedAt: null }).exec();
}

/**
 * find all Workers from database.
 * 
 * @param {object} filters - The query criteria of the worker need to retrive.
 */
async function getAllWorkers(filters) {
    filters.deletedAt = null;
    return WorkerDetails.find(filters).exec();
}

/**
 * delete a Worker by id from database.
 * 
 * @param {string} workerId - The id of the worker need to delete. soft deletetion
 */
async function deleteWorker(workerId) {
    return WorkerDetails.updateOne(
        { _id: new ObjectId(workerId), deletedAt: null },
        { $set: { deletedAt: new Date() } }
    ).exec();
}


module.exports = {
    createWorker,
    updateWorker,
    getWorkerById,
    getAllWorkers,
    deleteWorker
};