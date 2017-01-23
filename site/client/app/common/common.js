import angular from 'angular';
import Map from './map/map';
import Header from './tpHeader/tpHeader';
import CorredorAPI from './corredorAPI/corredorAPI';
import VelocidadesAPI from './velocidadesAPI/velocidadesAPI';

import './common.scss';

let commonModule = angular.module('app.common', [
  Map,
  Header,
  CorredorAPI,
  VelocidadesAPI
]).name;

export default commonModule;
