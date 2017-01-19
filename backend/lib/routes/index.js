'use strict';

const express = require('express');
const routes = express.Router();

routes.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

routes.get('/', (req, res) => res.json({ message: 'it works!' }));

require('./corredores')(routes)
require('./velocidades')(routes)

module.exports = routes;
