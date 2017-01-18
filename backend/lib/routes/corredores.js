'use strict';

const Corredor = require('../schemas').corredor;

module.exports = routes => {
  routes.get('/corredores', (req, res) => {
    let query = {};

    if (req.query.name) {
      query['properties.nombre'] = new RegExp(`^${req.query.name}.*$`, 'i')
    }

    Corredor.find(query).exec().then(corredores => {
      res.json(corredores);
    });
  });

  routes.get('/corredores/:id', (req, res) => {
    Corredor.find({ _id: req.params.id }).exec().then(corredor => {
      res.json(corredor[0]);
    });
  });
}
