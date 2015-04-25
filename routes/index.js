var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser')
router.use(bodyParser());
var rres;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Practica 4' });
});

router.get('/Consultas', function(req, res, next) {
	var page="Consultas";	
	refrescar(req,res,page);
});

function refrescar(req,res,page){

var results="";
	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
	client.query('select bus."BUS", tipo."NOMBRE", ruta."NOMBRE" as rut, ruta."RUTA" from "ASIGNA_BUS" asigna, "BUS" bus, "RUTA" ruta, "TIPO_BUS" tipo where asigna."BUS"=bus."BUS" and ruta."RUTA"=asigna."RUTA" and bus."TIPO_BUS"=tipo."TIPO_BUS"', function(err, result) { 
		
	for(var i in result.rows){
	results=results+result.rows[i].BUS+","+result.rows[i].NOMBRE.trim()+","+result.rows[i].rut.trim()+","+result.rows[i].RUTA.trim()+";";	
	}
	});

	var millisecondsToWait = 100;
	setTimeout(function() {
		client.end();
		res.render(page, { title: page, valor: results});
	}, millisecondsToWait);
}


router.get('/Consulta1', function(req, res){
	var results="";
	var tipo="";
	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
	client.query('select bus."BUS", tipo."NOMBRE" from  "BUS" bus, "TIPO_BUS" tipo where  bus."TIPO_BUS"=tipo."TIPO_BUS"', function(err, result) { 
	for(var i in result.rows){
	results=results+result.rows[i].BUS+","+result.rows[i].NOMBRE.trim()+";";	
	}

});


client.query('select "NOMBRE" FROM "TIPO_BUS"', function(err, result) { 
	for(var i in result.rows){
	tipo=tipo+result.rows[i].NOMBRE.trim()+",";	
	}
});
	
	

	var millisecondsToWait = 100;
	setTimeout(function() {
		client.end();
		rres=results;
		res.render('ABC', { title: 'ABC', valor: results, tipos: tipo});
	}, millisecondsToWait);
});

router.post('/nuevobus', function(req, res){
	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
	var id = req.body.id;
	var tipo = req.body.tipo;
	var query2 =  client.query('insert into "BUS"("BUS","TIPO_BUS") values ('+id+','+tipo+');',function(err,rows,fields)
	{
	if(err) throw err;
	});
	var page="ABC";
	refrescar(req,res,'ABC');	
});


router.post('/nuevotipo', function(req, res){
	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
	var id = req.body.nombre;
	var tipo = req.body.numero;
	
	var query2 =  client.query('insert into "TIPO_BUS"("NOMBRE","NUMERO_ASIENTO") values (\''+id+'\',\''+tipo+'\');',function(err,rows,fields)
	{
	if(err) throw err;
	});
	var page="ABC";
	refrescar(req,res,'ABC');	
});


router.post('/eliminarbus', function(req, res){
	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
	var id = req.body.nombre;
	var tipo = req.body.numero;
	
	var query2 =  client.query('delete from "BUS" where "BUS"='+id+';',function(err,rows,fields)
	{
	if(err) throw err;
	});
	var page="ABC";
	refrescar(req,res,'ABC');	
});


router.post('/cambiarbus', function(req, res){
	var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
	var client = new pg.Client(connectionString);
	client.connect();
	var id = req.body.nombre;
	var tipo = req.body.numero;
	
	var query2 =  client.query('insert into "TIPO_BUS"("NOMBRE","NUMERO_ASIENTO") values (\''+id+'\',\''+tipo+'\');',function(err,rows,fields)
	{
	if(err) throw err;
	});
	var page="ABC";
	refrescar(req,res,'ABC');	
});


module.exports = router;
