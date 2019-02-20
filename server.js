const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const port = 3001;


app.use(cors())


const animals = [
    {
      name: 'tiger', 
      predator: true,
      age: 7,
      id: 1,
    },
    {
      name: 'horse', 
      predator: false,
      age: 10,
      id: 2,
    },
    {
      name: 'echidna', 
      predator: true,
      age: 2,
      id: 3,
    },
  ]

app.get('/', function(req, res){
  res.status(200).json(animals);
})

app.listen(port, function(){
  console.log('we are running on ' + port);
})