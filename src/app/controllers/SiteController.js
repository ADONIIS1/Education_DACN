const {multipleMongooseToObject: multipleMongooseToObject}  = require('../../util/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send('DO AN CHUYEN NGANH')
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
