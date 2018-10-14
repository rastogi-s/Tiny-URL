var mongoose =
    require('mongoose');
var urlSchema =
    require('./url.schema.server');
var urlModel = mongoose
    .model('UrlModel', urlSchema);


module.exports = {
    findTinyUrl: findTinyUrl,
    findLongUrl: findLongUrl,
    createTinyUrl: createTinyUrl,
    deleteTinyUrl: deleteTinyUrl
};

// check if the tiny url exists
function findTinyUrl(tinyUrl) {
    return urlModel.findOne({tinyUrl: tinyUrl}).catch(error => error);

}

// fetch long url corresponding to tiny url provided
function findLongUrl(tinyUrl) {
    return urlModel.findOne({tinyUrl: tinyUrl}).catch(error => error);

}

// adds new tiny url if the provided tiny url does not exists
function createTinyUrl(tinyUrl, longUrl) {

    return urlModel.updateOne({tinyUrl: tinyUrl}, {
        $setOnInsert: {
            longUrl: longUrl,
            tinyUrl: tinyUrl
        }
    }, {upsert: true}).catch(error => error);
}

// delete the tiny url
function deleteTinyUrl(tinyUrl) {
    return urlModel.deleteOne({tinyUrl: tinyUrl}).catch(error => error);
    ;
}





