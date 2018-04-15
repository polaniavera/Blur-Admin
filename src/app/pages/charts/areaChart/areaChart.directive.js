/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts')
        .directive('areaChart', areaChart);

    /** @ngInject */
    function areaChart() {
        return {
            restrict: 'E',
            controller: 'AreaChartCtrl',
            templateUrl: 'app/pages/charts/areaChart/areaChart.html'
        };
    }
})();