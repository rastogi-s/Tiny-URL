var mongoose = require('mongoose');
var urlSchema = require('./url.schema.server');
var urlModel = mongoose.model('UrlModel', urlSchema);


module.exports = {
    findTinyUrl: findTinyUrl,
    findLongUrl: findLongUrl,
    createTinyUrl: createTinyUrl,
    deleteTinyUrl: deleteTinyUrl
};

/**
 * Checks if the tiny url exists
 *
 * @param tinyUrl
 * @returns {Promise}
 */
function findTinyUrl(tinyUrl) {
    return urlModel.findOne({tinyUrl: tinyUrl}).catch(error => error);

}

/**
 * Fetch long url corresponding to tiny url provided.
 *
 * @param tinyUrl
 * @returns {Promise}
 */
function findLongUrl(tinyUrl) {
    return urlModel.findOne({tinyUrl: tinyUrl}).catch(error => error);

}

/**
 * Adds new tiny url if the provided tiny url does not exists.
 *
 * @param tinyUrl
 * @param longUrl
 * @returns {Promise}
 */
function createTinyUrl(tinyUrl, longUrl) {

    return urlModel.updateOne({tinyUrl: tinyUrl}, {
        $setOnInsert: {
            longUrl: longUrl,
            tinyUrl: tinyUrl
        }
    }, {upsert: true}).catch(error => error);
}

/**
 * Delete the given tiny url.
 *
 * @param tinyUrl
 * @returns {Promise}
 */
function deleteTinyUrl(tinyUrl) {
    return urlModel.deleteOne({tinyUrl: tinyUrl}).catch(error => error);
}





