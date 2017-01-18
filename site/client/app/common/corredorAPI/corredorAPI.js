import angular from 'angular';
import corredorAPIFactory from './corredorAPI.factory';

let corredorAPIModule = angular.module('corredorAPI', [])

.factory('corredorAPI', corredorAPIFactory)

.name;

export default corredorAPIModule;
