var home = require('../app/controllers/home');

//you can include all your controllers

module.exports = function (app) {

    app.get('/', home.home);//home
    app.get('/new-article', home.newArticle);
    app.post('/new-article', home.createArticle);
    

}
