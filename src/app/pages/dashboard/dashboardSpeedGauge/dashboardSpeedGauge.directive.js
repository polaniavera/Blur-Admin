/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .directive('dashboardSpeedGauge', dashboardSpeedGauge);

    /** @ngInject */
    function dashboardSpeedGauge() {
        return {
            restrict: 'E',
            controller: 'DashboardSpeedGaugeCtrl',
            templateUrl: 'app/pages/dashboard/dashboardSpeedGauge/dashboardSpeedGauge.html'
        };
    }
})();