const WorkerDetails = require('../../models/WorkerDetails');
const AssetsDetails = require('../../models/AssetsDetails');


async function aggergateWorkerDetail(query) {
    return WorkerDetails.aggregate(query);
}

async function distinctAssetDetail(column, query) {
    return AssetsDetails.distinct(column, query);
}

async function findAssetDetail(query) {
    return AssetsDetails.find(query);
}

async function aggregateAssetDetail(query) {
    return AssetsDetails.aggregate(query);
}


module.exports = {
    aggergateWorkerDetail,
    distinctAssetDetail,
    findAssetDetail,
    aggregateAssetDetail
};