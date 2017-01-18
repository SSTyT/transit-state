import angular from 'angular';
import uiRouter from 'angular-ui-router';
import tpHeaderComponent from './tpHeader.component';

let tpHeaderModule = angular.module('tpHeader', [
  uiRouter
])

.component('tpHeader', tpHeaderComponent)

.name;

export default tpHeaderModule;
