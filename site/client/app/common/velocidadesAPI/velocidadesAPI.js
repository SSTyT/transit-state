import angular from 'angular';
import corredorAPIFactory from './velocidadesAPI.factory';

let velocidadesAPIModule = angular.module('velocidadesAPI', [])

.factory('velocidadesAPI', corredorAPIFactory)

.name;

export default velocidadesAPIModule;
