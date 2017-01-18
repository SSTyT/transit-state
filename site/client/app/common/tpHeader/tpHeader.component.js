import template from './tpHeader.html';
import controller from './tpHeader.controller';
import './tpHeader.scss';

let tpHeaderComponent = {
  restrict: 'E',
  bindings: {
    tab: '<'
  },
  template,
  controller
};

export default tpHeaderComponent;
