var mongoose = require('mongoose');

/** This is a Client Schcema represent a model client_details on database. */
var ClientDetailsSchema = new mongoose.Schema({
    name: String,
    detail: String,
    attachements: [{
        mediaType: {
            type: String,
            enum: ["image", "video", "pdf"]
        },
        pointer: {
            type: String,
            enum: ["cover", "profile", "attachemnts", "others"]
        },
        url: String,
        thumbnail: String
    }],
    phone: {
        code: String,
        number: String
    },
    statistics: {//can be add trigger pre save to increment this object in future
        totalSites: {
            type: Number,
            default: 0
        },
        totaWorkers: {
            type: Number,
            default: 0
        }
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


module.exports = mongoose.model('client_details', ClientDetailsSchema);
