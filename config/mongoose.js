var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
mongoose.connect('mongodb://mongodb/wake-cap', { useNewUrlParser: true }, function (err) {
    if (err) return console.error(err);
    console.log('connection successed to mongoDB>>> wake-cap');
});
module.exports = { mongoose };
