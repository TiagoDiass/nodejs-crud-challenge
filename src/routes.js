const express = require('express');
const routes = express.Router();
const EquipmentController = require('./controllers/EquipmentController');

routes.get('/', (request, response) => {
    return response.redirect('/equipments');
})

routes.get('/equipments', EquipmentController.index);
routes.get('/equipments/:id', EquipmentController.showOne);
routes.post('/equipments', EquipmentController.create);
routes.put('/equipments/:id', EquipmentController.update);
routes.delete('/equipments/:id', EquipmentController.delete);

module.exports = routes;