module.exports = function routeHandlersMySQL(connection) {
  return {
    getAnimals: function getAnimals(req, res) {
      connection.query("SELECT * FROM animals", function (err, animals) {
        if (err) return res.status(500).json(err);
        animals.forEach(element => {
          element.predator = !!element.predator;
          element._id = "" + element._id;
        });
        res.status(200).json(animals);
      })
    },
    createAnimal: function createAnimal(req, res){
      const { name, age, predator } = req.query;
      connection.query(`
        INSERT INTO animals (name, age, predator)
        VALUES ("${name}", ${age}, ${predator})`,
        function(err, insertionInfo, a){
          if (err) return res.status(400).json(err);
          console.log(a);
          connection.query(`SELECT * FROM animals WHERE _id = ${insertionInfo.insertId}`,
            function(err, newAnimal){
              if (err) return res.status(400).json(err);
              newAnimal[0].predator = !!newAnimal[0].predator;
              newAnimal[0]._id = "" + newAnimal[0]._id;
              res.status(200).json(newAnimal[0]);
            })
      })
    },
    deleteAnimal: function(req, res){
      const { _id } = req.params;
      console.log("id, ", _id )
      connection.query(`
        DELETE FROM animals WHERE _id = ${_id}`,
        function(err, deletionInfo, a){
          if (err) return res.status(400).json(err);
          res.status(200).json({ _id });
      })
    }
  }
};
