import template from './corredorPicker.html';
import controller from './corredorPicker.controller';
import './corredorPicker.scss';

let corredorPickerComponent = {
  restrict: 'E',
  bindings: {
    corredores: '=',
    selected: '=',
    onSelect: '&'
  },
  template,
  controller
};

export default corredorPickerComponent;
