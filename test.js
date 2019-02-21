const mocha = require('mocha');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { getAnimals, createAnimal, deleteAnimal } = require('./routeHandlers')
const { Animal } = require('./models');


xit('dummytest', function(){
  const test = sinon.fake();
  sinon.assert.notCalled(test);
})

let res = {};

let sandbox;

beforeEach(function(){
  sandbox = sinon.createSandbox();
  const spy = sinon.spy();
  res = {
    json: spy,
    status: sinon.stub().returns({json: spy})
  }
})
afterEach(function(){
  sandbox.restore();
})

it('should get all the animals', function(){
  let req = {
    query: {}
  }
  let expectedResult = [
    {
      name: 'tiger',
      predator: true,
      age: 7,
      _id: 1,
    },
    {
      name: 'horse',
      predator: false,
      age: 10,
      _id: 2,
    },
    {
      name: 'echidna',
      predator: true,
      age: 2,
      _id: 3,
    },
  ]
  sandbox.stub(Animal, 'find').yields(null, expectedResult);
  getAnimals(req, res);
  sinon.assert.calledWith(res.status, sinon.match(200))
})

it('should create an animal', function(){
  let req = {
    query: {
      name: "Liger",
      age: 16,
      predator: true,
    }
  };
  let expectedResult = {
    name: "Liger",
    age: 16,
    predator: true,
    _id: new mongoose.Types.ObjectId(),
  };
  sandbox.stub(Animal, 'create').yields(null, expectedResult);
  createAnimal(req, res);
  sinon.assert.calledWith(Animal.create, req.query);
  sinon.assert.calledWith(
    res.json,
    sinon.match(expectedResult)
  )
})
it('should delete an animal', function(){
  const idToBeDeleted = new mongoose.Types.ObjectId()
  let req = {
    params: {
      _id: idToBeDeleted
    }
  };
  let expectedResult = {
    name: "Liger",
    age: 16,
    predator: true,
    _id: idToBeDeleted
  };

  sandbox.stub(Animal, 'findByIdAndDelete').yields(null, expectedResult);
  deleteAnimal(req, res);
  sinon.assert.calledWith(Animal.findByIdAndDelete, req.params._id);

})
