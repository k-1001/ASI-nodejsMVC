var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var moment = require('moment');
var articles = require('../models/articles');


exports.home = function(req, res){
	articles.getArticles().then(result => {
		res.render('articles.ejs',{
			articles: result.rows,
			moment : moment
		});
	}).catch(err => {
		throw err
	})
}

exports.newArticle = function(req, res){
	message = "";
	res.render('newArticle.ejs',{
		message : message
	});
}

exports.createArticle = function(req, res){
	if(req.body.author && req.body.date && req.body.section && req.body.title && req.body.status && req.body.title && req.body.text){
		result = articles.createArticle(req.body);
		res.redirect("/");
	}else{
		message = "your article could not be created. Check your inputs and try again";
		res.render("newArticle.ejs",{
			message : message
		});
	}
	
}
