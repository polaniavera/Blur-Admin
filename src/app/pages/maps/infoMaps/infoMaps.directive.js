/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.maps')
        .directive('infoMaps', infoMaps);

    /** @ngInject */
    function infoMaps() {
        return {
            restrict: 'E',
            controller: 'InfoMapsCtrl',
            templateUrl: 'app/pages/maps/infoMaps/infoMaps.html'
        };
    }
})();