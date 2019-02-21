const { Animal } = require('./models');

module.exports = {
  getAnimals: function getAnimals(req, res) {
    Animal.find(function(err, animals){
      if (err) return res.status(500).json(err);
      res.status(200).json(animals);
    })
  },
  createAnimal: function createAnimal(req, res){
    Animal.create(req.query, function(err, savedAnimal){
      if (err) return res.status(400).json(err);
      res.status(201).json(savedAnimal);
    })
  },
  deleteAnimal: function(req, res){
    Animal.findByIdAndDelete(req.params._id, function(err, deletedAnimal){
      if (err) return res.status(400).json(err);
      res.status(200).json(deletedAnimal);
    })
  }
};

