import angular from 'angular';
import uiRouter from 'angular-ui-router';
import corredorPickerComponent from './corredorPicker.component';

let corredorPickerModule = angular.module('corredorPicker', [
  uiRouter
])

.component('corredorPicker', corredorPickerComponent)

.name;

export default corredorPickerModule;
