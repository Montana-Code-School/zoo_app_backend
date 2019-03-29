const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require('cors')
const port = 3005;


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
});

app.use(cors());

connection.connect()
//connection.end()
const routeHandlersMySql = require('./routeHandlersMySql');
const { getAnimals, createAnimal, deleteAnimal } = routeHandlersMySql(connection);

connection.query("CREATE DATABASE IF NOT EXISTS zoo", function (err, result) {
  if (err) throw err
  console.log("created");
})
connection.query("USE zoo", function (err, result) {
  if (err) throw err
  console.log("using");
})
connection.query(
  `CREATE TABLE IF NOT EXISTS animals
  (_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255), predator BOOLEAN, age INTEGER)`,
  function (err, result) {
    if (err) throw err
    console.log("create animals table, ");
})


app.get('/', getAnimals);
app.post('/', createAnimal);
app.delete('/:_id', deleteAnimal);


app.listen(port, function(){
  console.log('we are running on ' + port);
})
