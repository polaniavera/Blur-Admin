/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.maps')
        .directive('googleMaps', googleMaps);

    /** @ngInject */
    function googleMaps() {
        return {
            restrict: 'E',
            controller: 'GoogleMapsCtrl',
            templateUrl: 'app/pages/maps/googleMaps/googleMaps.html'
        };
    }
})();