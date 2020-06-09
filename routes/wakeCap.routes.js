const glob = require('glob');

/**
 * Load all Routes of Application
 * @param {*} app 
 */
function setRoutes(app) {
    let files = glob.sync('**/*.router.js', {});
    files.map(file => app.use('/', require('./../' + file)));
}

module.exports = {
    setRoutes
};
