var mongoose = require('mongoose');

/** This is a Site Schcema represent a model site_details on database. */
var SiteSiteDetailsSchema = new mongoose.Schema({
    name: String,
    gps: {
        lat: Number,
        lon: Number
    },
    timezone: {//(Used to manage the timing of the tracked workers against UTC)
        type: Number, //ex. +02
        default: 0
    },
    startingHour: {// (Used to figure out the time the workers start their daily operation)
        type: Number// site start work at 9
    },
    endingHour: {//(Used to figure out the time the workers end their daily operation)
        type: Number// site end work at 18
    },
    lateThreshold: {//(The configurable value where every worker exceeds will be considered as late attendant)
        type: Number// site allow 1 hour to worker after  9
    },
    totalInactiveHours: {//(The hours that the worker spent in the site leaving the helmet away, or not moving from his place for 5 minutes)
        type: Number
    },
    clientDetail: {
        _id: String,
        name: String
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('site_details', SiteSiteDetailsSchema);
