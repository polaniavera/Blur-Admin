/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardSpeedGaugeCtrl', DashboardSpeedGaugeCtrl);

    /** @ngInject */
    function DashboardSpeedGaugeCtrl($timeout, $http, $scope) {
        function initialize() {
            var gaugeSpeedChart;

            drawSpeedGauge();

            function drawSpeedGauge() {
                gaugeSpeedChart = AmCharts.makeChart($scope.truck.IdItem, {
                    "type": "gauge",
                    "marginBottom": 0,
                    "marginTop": 0,
                    "theme": "light",
                    "axes": [{
                        "axisThickness": 1,
                        "axisAlpha": 0.2,
                        "tickAlpha": 0.8,
                        "valueInterval": 10,
                        "bands": [{
                            "color": "#84b761",
                            "endValue": 120,
                            "startValue": 80
                        }, {
                            "color": "#fdd400",
                            "endValue": 80,
                            "startValue": 40
                        }, {
                            "color": "#cc4748",
                            "endValue": 40,
                            "startValue": 0
                        }],
                        "bottomText": $scope.truck.Velocidad + " Km/h",
                        "bottomTextYOffset": 0,
                        "endValue": 120
                    }],
                    "arrows": [{
                        "value": $scope.truck.Velocidad
                            }],
                    "export": {
                        "enabled": true
                    }
                });
            }
        }

        $timeout(function () {
            initialize();
        }, 500);
    }

})();
