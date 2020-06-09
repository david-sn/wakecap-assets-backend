var mongoose = require('mongoose');
var workerService = require('../routes/workers-details/worker.service');

/** This is a Asset Schcema represent a model assets_details on database. */
var AssetsSchema = new mongoose.Schema({
    coordinates: {
        coordinates: [Number],
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        }
    },
    is_active: Boolean,
    duration: Number,
    worker_id: String,
    workerDetail: {
        _id: String,
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
        }
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


/** This is a Trigger before saving Asset Object to database */
AssetsSchema.pre('save', function (next) {
    workerService.getWorkerById(this.worker_id)
        .then(workerDetailDB => {
            if (workerDetailDB) {
                this.workerDetail = workerDetailDB;
                next();
            }
            else {
                throw new Error('Invalid Worker Id');
            }
        }).catch(e => { throw new Error(e) });
});

module.exports = mongoose.model('assets_details', AssetsSchema);
