/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .directive('dashboardFuelGauge', dashboardFuelGauge);

    /** @ngInject */
    function dashboardFuelGauge() {
        return {
            restrict: 'E',
            controller: 'DashboardFuelGaugeCtrl',
            templateUrl: 'app/pages/dashboard/dashboardFuelGauge/dashboardFuelGauge.html'
        };
    }
})();