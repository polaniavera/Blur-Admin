/**
 * @author c.polania
 * created on 13.08.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reports', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main.reports', {
          url: '/reports',
          templateUrl: 'app/pages/reports/reports.html',
          title: 'Reportes',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
          authenticate: true
        });
  }

})();
