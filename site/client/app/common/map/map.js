import angular from 'angular';
import mapComponent from './map.component';

let mapModule = angular.module('map', [])
.component('map', mapComponent).name;

export default mapModule;
