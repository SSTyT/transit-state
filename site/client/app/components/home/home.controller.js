'use strict';

import CheapRuler from 'cheap-ruler';

const ruler = new CheapRuler(-34, 'kilometers');

class HomeController {
  constructor(velocidadesAPI, corredorAPI, $timeout) {
    this.name = 'Home';
    this.hour = 0;
    this.corredores = [];
    this.corredoresConsolidados = [];
    this.corredorSelect = [];
    this.corredorAPI = corredorAPI;
    this.velocidadesAPI = velocidadesAPI;
    this.timeout = $timeout;
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
    this.corredorAPI.get({}, corredores => {
      console.log(corredores);
      corredores.forEach(corredor => this.corredores.push(this.mapControl.addGeoJson(corredor, { color: '#616161' })))
      this.consolidarCorredores();
    });
  }

  selectChange(clear) {
    let selection;
    this.timeout(() => {
      selection = this.corredorSelect.join(';').split(';');
      this.corredores.forEach(corredor => {
        if (!corredor.overriden || clear) {
          corredor.overriden = false;
          if (selection.indexOf(corredor.geoJSON._id) > 0 || selection.length === 0) {
            corredor.selected = true;
            corredor.setStyle({ color: '#ff7800' });
            //corredor.show();
          } else {
            corredor.selected = false;
            corredor.setStyle({ color: '#616161' });
            //corredor.hide();
          }
        }
      });
    });
  }

  consolidarCorredores() {
    let keys = {};
    this.corredores.forEach(corredor => {

      corredor.on('click', function() {
        corredor.overriden = true;
        if (!corredor.selected) {
          corredor.selected = true;
          corredor.setStyle({ color: '#ff7800' });
          //corredor.show();
        } else {
          corredor.selected = false;
          corredor.setStyle({ color: '#616161' });
          //corredor.hide();
        }
      });

      const name = `${corredor.geoJSON.properties.nombre} - ${corredor.geoJSON.properties.flujo}`;
      if (keys[name]) {
        this.corredoresConsolidados[keys[name]].ids += `;${corredor.geoJSON._id}`;
      } else {
        this.corredoresConsolidados.push({
          name: name,
          ids: `${corredor.geoJSON._id}`
        });
        keys[name] = this.corredoresConsolidados.length - 1;
      }
    });
    this.corredoresConsolidados.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  onFilterChange() {
    const corredores = this.corredores.filter(corredor => corredor.selected).map(corredor => corredor.geoJSON._id).reduce((acc, id) => acc ? `${acc};${id}` : id, '');
    //TODO arreglar negrada
    if (this.dateFrom.year && this.dateFrom.month && this.dateFrom.day) {
      this.velocidadesAPI.getDay({ year: this.dateFrom.year, month: this.dateFrom.month, day: this.dateFrom.day, hour: this.hour, corredores }, this.showSpeeds);
    } else if (this.dateFrom.year && this.dateFrom.month && !this.dateFrom.day) {
      console.log('mes');
      this.velocidadesAPI.getMonth({ year: this.dateFrom.year, month: this.dateFrom.month, hour: this.hour, corredores }, this.showSpeeds);
    }
    /*
    else if (this.dateFrom.year && !this.dateFrom.month && !this.dateFrom.day) {
      console.log('año');
      this.velocidadesAPI.getYear({ year: this.dateFrom.year, hour: this.hour }, this.showSpeeds);
    }
    */
  }

  showSpeeds(speeds) {
    //console.log(speeds);
    //return;

    const speedMap = new Map([]);
    const aggregatedSpeeds = speeds.reduce((acc, speed) => {
      if (acc[speed.corredor]) {
        acc[speed.corredor].push(speed);
      } else {
        acc[speed.corredor] = [speed];
      }
      return acc;
    }, {});

    Object.keys(aggregatedSpeeds).forEach(key => {
      speedMap.set(key, aggregatedSpeeds[key].reduce((acc, speed) => acc += speed.ida, 0) / aggregatedSpeeds[key].length);
    });

    const time = 0;
    speedMap.forEach((speed, id) => {
      const dist = ruler.lineDistance(this.corredores[id].geoJSON.geometry.coordinates);
    });
  }
}

export default ['velocidadesAPI', 'corredorAPI', '$timeout', HomeController];
