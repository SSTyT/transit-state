'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./lib/routes');
const config = require('./lib/config');
const { mongo } = require('sstyt-tools');

const port = config.api.port;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

// START THE SERVER
// =============================================================================
mongo.connect(config.db('gmaps')).then(() => {
  app.listen(port);
  console.log('Magic happens on port ' + port);
});
