/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts')
        .directive('chartC', chartC);

    /** @ngInject */
    function chartC() {
        return {
            restrict: 'E',
            controller: 'chartCCtrl',
            templateUrl: 'app/pages/charts/chartC/chartC.html'
        };
    }
})();