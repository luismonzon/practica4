var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var routes = require('./routes/index');
var users = require('./routes/users');
var io = require('socket.io');

var app = express();
var server =require('http').createServer(app),
    io= require('socket.io').listen(server);

var connectionString = process.env.DATABASE_URL || 'postgres://luis:spiderman@localhost:5432/practica4';
var client = new pg.Client(connectionString);
client.connect();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



function Selects(){

var consulta="Select * from \"RUTA\"";
connectio.query(consulta,function(err,result)
	{
		if(err){
			console.log("Error:"+err.message);
		}else{
			console.log(result.row[0].nombre);
		}
	});

}









// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



module.exports = app;
