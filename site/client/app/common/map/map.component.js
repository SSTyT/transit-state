import template from './map.html';
import controller from './map.controller';

import './map.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';


let mapComponent = {
  restrict: 'E',
  bindings: {
    options: '<',
    mapControl: '=',
    onLoad: '&'
  },
  template,
  controller
};

export default mapComponent;
