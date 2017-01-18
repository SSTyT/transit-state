import angular from 'angular';
import Map from './map/map';
import Header from './tpHeader/tpHeader';
import CorredorAPI from './corredorAPI/corredorAPI';

import './common.scss';

let commonModule = angular.module('app.common', [
  Map,
  Header,
  CorredorAPI
]).name;

export default commonModule;
