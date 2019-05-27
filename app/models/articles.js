const url = require('url');
const Pool = require('pg').Pool
//Edit this to change the database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tp3',
  password: 'postgres',
  port: 5432,
})

exports.getArticles = function(){
    return pool.query('SELECT * FROM articles')
}

exports.createArticle = function(param){
  return pool.query("INSERT INTO articles (author, date, section, status, title, text) VALUES ("
    + "'" + param.author + "',"
    + "'" + param.date + "',"
    + "'" + param.section + "',"
    + "'" + param.status + "',"
    + "'" + param.title + "',"
    + "'" + param.text + "')")
}


exports.articlesRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    req.params = params(req);
    if(!('section' in req.params)){ //If parameter section is missing, error
        res.statusCode = 422;
        res.end();
        return;
    }

    pool.query('SELECT * FROM articles WHERE section_id = (SELECT id FROM sections WHERE name = \'' + req.params['section'] +'\')', (error, results) => {
        if (error) {
          throw error
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results.rows));
    })
};



/**
 * Get the params of the request
 */
var params=function(req){
    let q=req.url.split('?'),result={};
    if(q.length>=2){
        q[1].split('&').forEach((item)=>{
             try {
               result[item.split('=')[0]]=item.split('=')[1];
             } catch (e) {
               result[item.split('=')[0]]='';
             }
        })
    }
    return result;
  }