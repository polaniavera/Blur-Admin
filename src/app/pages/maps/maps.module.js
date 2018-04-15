/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.maps', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.maps', {
        url: '/maps',
        templateUrl: 'app/pages/maps/maps.html',
        title: 'Mapas',
        sidebarMeta: {
          icon: 'ion-ios-location-outline',
          order: 150,
        },
        authenticate: true
      });
  }
})();