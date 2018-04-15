/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .directive('smartTable', smartTable);

    /** @ngInject */
    function smartTable() {
        return {
            restrict: 'E',
            controller: 'SmartTableCtrl',
            templateUrl: 'app/pages/reports/smart/smartTable.html'
        };
    }
})();