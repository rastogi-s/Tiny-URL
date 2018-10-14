module.exports = function (app) {

    var urlModel = require('../models/url/url.model.server');

    var md5 = require('md5');

    // configure end points.
    app.put('/api', createTinyUrl);
    app.get('/api/:tinyUrl', findTinyUrl);
    app.get('/:tinyUrl', findLongUrl);
    app.delete('/api/:tinyUrl', deleteTinyUrl);



    /**
     * triggers redirection when short url is accessed
     *
     * @param req
     * @param res
     */
    function findLongUrl(req, res) {
        var tinyUrl = req.params['tinyUrl'];
        if (tinyUrl != undefined) {
            urlModel.findLongUrl(tinyUrl).then(function (value, error) {
                if (error)
                    res.json(error);
                else {
                    if (value != null && value !== '') {
                        let protocol = 'http://';
                        if (value.longUrl.substring(0, protocol.length) !== protocol)
                            res.redirect(protocol + value.longUrl);
                        else
                            res.redirect(value.longUrl);
                    }
                    else
                        res.sendStatus(404);
                }
            });
        }
    }

    /**
     * creates a tiny url
     * @param req
     * @param res
     */
    function createTinyUrl(req, res) {
        var urls = req.body;
        var longUrl = urls.longUrl;
        addTinyUrl(req, res, longUrl)
    }

    /**
     *  This method ensures that if the short url generated using md5 already
     *  exists in the database for a different long url it appends a random number
     *  to the long url and then again generate a short url using md5 generator.
     *
     *  this function recursively operates until it generates a unique short url.
     *
     * @param req
     * @param res
     * @param newLongUrl randomly generated url
     */
    function addTinyUrl(req, res, newLongUrl) {
        var longUrl = req.body.longUrl;
        var tinyUrl = generateTinyURL(newLongUrl);
        var url = require('url');
        var hostname = req.headers.host;
        var pathname = url.parse(req.url).pathname.replace('/api', '');
        urlModel.createTinyUrl(tinyUrl, longUrl).then(
            function (status, error) {
                if (status) {
                    urlModel.findLongUrl(tinyUrl).then(function (value, err) {
                        if (value && value.longUrl === longUrl) {
                            res.send('http://' + hostname + pathname + '/' + value.tinyUrl);
                        } else if (value && value.longUrl !== longUrl) {
                            let randomNum = Math.floor(Math.random() * 100);
                            addTinyUrl(req, res, randomNum + longUrl);
                        }
                        else
                            res.send(err);
                    });
                }
                else {
                    res.send(error);

                }
            }
        );

    }

    /**
     * Returns a short url generated using md5 hashing.
     *
     * @param longUrl
     * @returns {string}
     */
    function generateTinyURL(longUrl) {
        let hashMD5 = md5(longUrl);
        hashMD5 = parseInt(hashMD5, 16).toString(2).padStart(8, '0').substring(0, 43);
        hashMD5 = parseInt(hashMD5, 2).toString(10).padStart(8, '0');
        let result = Buffer.from(hashMD5, 10).toString('base64').split('=').join('_').substring(0, 8);
        return result;
    }

    /**
     * Checks if the tiny url exists or not.
     *
     * @param req
     * @param res
     */
    function findTinyUrl(req, res) {
        var tinyUrl = req.params['tinyUrl'];
        if (tinyUrl != undefined) {
            urlModel.findTinyUrl(tinyUrl).then(function (value, error) {
                if (error)
                    res.json(error);
                else {
                    if (value != null && value !== '')
                        res.json(value);
                    else
                        res.sendStatus(404);
                }
            });
        }
    }


    /**
     * Deletes the short url.
     *
     * @param req
     * @param res
     */
    function deleteTinyUrl(req, res) {
        var tinyUrl = req.params['tinyUrl'];
        urlModel.deleteTinyUrl(tinyUrl).then(
            function (status) {
                res.send(status);
            })

    }


};
