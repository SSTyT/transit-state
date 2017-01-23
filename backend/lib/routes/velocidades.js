'use strict';

const Velocidad = require('../schemas').speed;

const getHours = req => {
  if (req.query.hour) {
    return [req.query.hour, req.query.hour]; //Just one hour
  } else {
    return [0, 23] //All day
  }
}

const getForDates = (dateFrom, dateTo, req, res) => {
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
}

module.exports = routes => {
  routes.get('/velocidades/:year/:month/:day', (req, res) => {
    const [hourFrom, hourTo] = getHours(req);
    const dateFrom = new Date(`${req.params.year}-${req.params.month}-${req.params.day} ${hourFrom}:00`);
    const dateTo = new Date(`${req.params.year}-${req.params.month}-${req.params.day} ${hourTo}:59`);
    getForDates(dateFrom, dateTo, req, res);
  });

  routes.get('/velocidades/:year/:month', (req, res) => {
    const [hourFrom, hourTo] = getHours(req);
    const lastDay = new Date(req.params.year, parseInt(req.params.month), 0).getDate();
    const dateFrom = new Date(`${req.params.year}-${req.params.month}-01 ${hourFrom}:00`);
    const dateTo = new Date(`${req.params.year}-${req.params.month}-${lastDay} ${hourTo}:59`);
    getForDates(dateFrom, dateTo, req, res);
  });

  routes.get('/velocidades/:year', (req, res) => {
    const [hourFrom, hourTo] = getHours(req);
    const dateFrom = new Date(`${req.params.year}-01-01 ${hourFrom}:00`);
    const dateTo = new Date(`${req.params.year}-12-31 ${hourTo}:59`);
    getForDates(dateFrom, dateTo, req, res);
  });
}
