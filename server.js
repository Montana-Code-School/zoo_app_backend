const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const port = 3001;
const mongoose = require('mongoose');

const {Animal} = require('./models');
const {getAnimals, createAnimal} = require('./routeHandlers');

mongoose.connect('mongodb://localhost/zoo', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', onDBConnected)

function onDBConnected(){
  console.log('we are connected to mongo db')
}

app.use(cors());

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

app.get('/', getAnimals);
app.post('/', createAnimal);

app.listen(port, function(){
  console.log('we are running on ' + port);
})
