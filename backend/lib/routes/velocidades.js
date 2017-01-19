'use strict';

const Velocidad = require('../schemas').speed;

module.exports = routes => {
  routes.get('/velocidades/:year/:month/:day/:hour', (req, res) => {
    const dateFrom = new Date(`${req.params.year}-${req.params.month}-${req.params.day} ${req.params.hour}:00`);
    console.log(dateFrom);
    const dateTo = new Date(`${req.params.year}-${req.params.month}-${req.params.day} ${req.params.hour}:59`);
    let query = {
      timestamp: { "$gte": dateFrom, "$lte": dateTo }
    };
    if (req.query.corredores) {
      const corredores = req.query.corredores.split(';');
      query.corredor = { $in: corredores }
    }
    Velocidad.find(query).exec().then(velocidades => {
      res.json(velocidades);
    }, err => {
      console.log(err)
      res.status(400).send('Bad Request');
    });
  });
}
