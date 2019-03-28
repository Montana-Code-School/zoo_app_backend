const express = require('express');
const app = express();
var mysql = require('mysql');
const port = 3005;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'plants'
});


function test(req, res) {
  console.log('test route');
  let result;
  connection.connect()
  connection.query("Select trees.common_name from trees", function (err, rows, columns, fields) {
  if (err) throw err
  result = rows;
  console.log('The solution is: ', rows);
  })
//connection.end()
  res.json(result);
}

// Task.getAllTask = function getAllTask(result) {
//   sql.query("Select * from tasks", function (err, res) {

//           if(err) {
//               console.log("error: ", err);
//               result(null, err);
//           }
//           else{
//             console.log('tasks : ', res);

//            result(null, res);
//           }
//       });
// };

app.get('/', test);


app.listen(port, function(){
  console.log('we are running on ' + port);
})


