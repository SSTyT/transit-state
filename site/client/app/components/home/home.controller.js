'use strict';

import moment from 'moment';

class HomeController {
  constructor(velocidadesAPI, corredorAPI) {
    this.name = 'Home';
    this.hour = 0;
    this.corredores = [];
    this.corredorAPI = corredorAPI;
    this.velocidadesAPI = velocidadesAPI;
    this.dateFrom = {};
    this.dateTo = {};
    this.mapControl = {};
    this.mapOpts = {
      mapId: 'map',
      lat: -34.603722,
      long: -58.381592,
      zoom: 12,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 18
    };
  }

  colorPick(percentage) {
    if (percentage == null) {
      return '#424242';
    } else if (percentage < 50) {
      return '#b71c1c';
    } else if (percentage >= 50 && percentage < 60) {
      return '#f44336';
    } else if (percentage >= 60 && percentage < 70) {
      return '#f9a825';
    } else if (percentage >= 70 && percentage < 80) {
      return '#ffea00';
    } else if (percentage >= 80 && percentage < 90) {
      return '#64dd17';
    } else if (percentage >= 90) {
      return '#76ff03';
    } else {
      return '#424242';
    }
  }

  mapReady() {
    this.corredorAPI.get({}, corredores => corredores.forEach(corredor => this.corredores.push(this.mapControl.addGeoJson(corredor))));
  }

  onFilterChange() {
    this.velocidadesAPI.get({})
  }
}

export default ['velocidadesAPI', 'corredorAPI', HomeController];
