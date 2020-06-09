var mongoose = require('mongoose');

/** This is a worker who send the asset Schcema represent a model worker_details on database. */
var WorkerDetailsSchema = new mongoose.Schema({  
    name: {
        first: String,
        last: String
    },
    siteDetail: {
        _id: String,
        name: String,
        gps: {
            lat: Number,
            lon: Number
        }
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('worker_details', WorkerDetailsSchema);
