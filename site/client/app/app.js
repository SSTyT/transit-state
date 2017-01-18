import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularAria from 'angular-aria';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularResource from 'angular-resource';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'material-design-icons/iconfont/material-icons.css';

angular.module('app', [
    uiRouter,
    angularAnimate,
    angularAria,
    angularMaterial,
    angularResource,
    Common,
    Components
  ])
  .config(($locationProvider, $mdThemingProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

    const macriYellow = $mdThemingProvider.extendPalette('yellow', {
      '600': '#ffbc00',
      'contrastDefaultColor': 'dark'
    });

    $mdThemingProvider.definePalette('macriYellow', macriYellow);

    $mdThemingProvider
      .theme('default')
      .primaryPalette('macriYellow', {
        'default': '600'
      })
      .accentPalette('amber')
      .warnPalette('red')
      .backgroundPalette('grey');
  })

.component('app', AppComponent);
