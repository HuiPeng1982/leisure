var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    viewsPath = 'views',
    publicPath = 'public',
    modelsPath = 'models',
    uploadsPath = 'uploads',
    faviconPath = 'favicon.ico';

module.exports = {
    development: {
        sessionStore: 'leisure_dev',
        db: 'mongodb://localhost/leisure_dev',
        root: rootPath,
        view_path: path.join(rootPath, viewsPath),
        static_path: path.join(rootPath, publicPath),
        models_path: path.join(rootPath, modelsPath),
        upload_tmp_path: path.join(rootPath, publicPath, uploadsPath),
        favicon_path: path.join(rootPath, publicPath,  faviconPath),
        cookie_secret: 'dneirFyMyenoMsIemiT'
    }
    , test: {
        sessionStore: 'leisure_test',
        db: 'mongodb://localhost/leisure_test',
        root: rootPath,
        view_path: path.join(rootPath, viewsPath),
        static_path: path.join(rootPath, publicPath),
        models_path: path.join(rootPath, modelsPath),
        upload_tmp_path: path.join(rootPath, publicPath, uploadsPath),
        favicon_path: path.join(rootPath, publicPath,  faviconPath),
        cookie_secret: 'TimeIsMoneyMyFriend'
    }
    , production: {
        sessionStore: 'leisure',
        db: 'mongodb://localhost/leisure',
        root: rootPath,
        view_path: path.join(rootPath, viewsPath),
        static_path: path.join(rootPath, publicPath),
        models_path: path.join(rootPath, modelsPath),
        upload_tmp_path: path.join(rootPath, publicPath, uploadsPath),
        favicon_path: path.join(rootPath, publicPath,  faviconPath),
        cookie_secret: 'dneirFyMyenoMsIemiT'
    }
};