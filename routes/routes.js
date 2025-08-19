const express = require('express');
const router = express.Router();
// Importar com caminhos relativos corretos para car-api1
const {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsByBrand,
  getCarsByYear
} = require('../controllers/controller');

// Rotas para carros
router.post('/cars', createCar);
router.get('/cars', getAllCars);
router.get('/cars/brand/:marca', getCarsByBrand);
router.get('/cars/year/:ano', getCarsByYear);
router.get('/cars/:id', getCarById);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

module.exports = router;