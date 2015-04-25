var express = require('express');
var router = express.Router();
var pg = require('pg');
var results="s";
var i=0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Practica 4' });
});

router.get('/Consultas', function(req, res, next) {
	i++;

	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
  	
	client.query('SELECT * FROM "RUTA"', function(err, result) {
	  
	  console.log(result.rows[0].RUTA, result.rows[0].NOMBRE);
	  results=results+","+result.rows[0].RUTA.trim();
	  results.concat();
 		/*var json = JSON.stringify(result.rows);
   		 res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
   		 res.end(json);*/
	//  console.log('name: %s and age: %s', result.rows[00]['RUTA'], result.rows[1]['NOMBRE']);
	res.render('Consultas', { title: 'Consultas', valor: results});
		
	});
	console.log(i);
	console.log('cadena '+results);
	});


router.get('/Consulta1', function(req, res){

res.render('Consultas', { title: 'Consultas', valor: row });
});

module.exports = router;
