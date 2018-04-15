/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardFuelGaugeCtrl', DashboardFuelGaugeCtrl);

    /** @ngInject */
    function DashboardFuelGaugeCtrl($scope, $timeout, baConfig) {
        var layoutColors = baConfig.colors;
        var chart;
        var arrow;
        var axis;

        var nivel1 = $scope.truck.TanqueConductor;
        var nivel2 = $scope.truck.TanquePasajero;

        $scope.gauges = [{
            description: 'T. Conductor',
            level: nivel1
        }, {
            description: 'T. Pasajero',
            level: nivel2
        }
        ];

        function drawGauge1() {
            var gaugeChart1 = AmCharts.makeChart('object1-' + $scope.truck.IdItem, {
                "type": "gauge",
                "marginBottom": 0,
                "marginTop": 0,
                "theme": "light",
                "axes": [{
                    "labelsEnabled": false,
                    "startAngle": -45,
                    "endAngle": 45,
                    "axisThickness": 1,
                    "axisAlpha": 0.2,
                    "tickAlpha": 0.8,
                    "valueInterval": 40,
                    "bands": [{
                        "color": "#cc4748",
                        "endValue": 40,
                        "startValue": 0,
                        "innerRadius": "90%",
                    }, {
                        "color": "#ffffff",
                        "endValue": 120,
                        "startValue": 40
                    }],
                    "bottomText": "0 Gal",
                    "bottomTextYOffset": -20,
                    "endValue": 120
                }],
                "arrows": [{
                    "alpha": 1,
                    "borderAlpha": 0,
                    "color": "#FF8000",
                    "nailAlpha": 0,
                    "id": "GaugeArrow-1",
                    "innerRadius": 0,
                    "startWidth": 5
                }],
                "export": {
                    "enabled": true
                }
            });

            setInterval(randomValue1(gaugeChart1), 2000);
        }

        function drawGauge2() {
            var gaugeChart2 = AmCharts.makeChart('object2-' + $scope.truck.IdItem, {
                "type": "gauge",
                "marginBottom": 0,
                "marginTop": 0,
                "theme": "light",
                "axes": [{
                    "labelsEnabled": false,
                    "startAngle": -45,
                    "endAngle": 45,
                    "axisThickness": 1,
                    "axisAlpha": 0.2,
                    "tickAlpha": 0.8,
                    "valueInterval": 40,
                    "bands": [{
                        "color": "#cc4748",
                        "endValue": 40,
                        "startValue": 0,
                        "innerRadius": "90%",
                    }, {
                        "color": "#ffffff",
                        "endValue": 120,
                        "startValue": 40
                    }],
                    "bottomText": "0 Gal",
                    "bottomTextYOffset": -20,
                    "endValue": 120
                }],
                "arrows": [{
                    "alpha": 1,
                    "borderAlpha": 0,
                    "color": "#FF8000",
                    "nailAlpha": 0,
                    "id": "GaugeArrow-1",
                    "innerRadius": 0,
                    "startWidth": 5
                }],
                "export": {
                    "enabled": true
                }
            });

            setInterval(randomValue2(gaugeChart2), 2000);
        }

        // set random value
        function randomValue1(gaugeChart) {
            if (gaugeChart) {
                if (gaugeChart.arrows) {
                    if (gaugeChart.arrows[0]) {
                        if (gaugeChart.arrows[0].setValue) {
                            gaugeChart.arrows[0].setValue(nivel1);
                            gaugeChart.axes[0].setBottomText(nivel1 + " Gal");
                        }
                    }
                }
            }
        }

        // set random value
        function randomValue2(gaugeChart) {
            if (gaugeChart) {
                if (gaugeChart.arrows) {
                    if (gaugeChart.arrows[0]) {
                        if (gaugeChart.arrows[0].setValue) {
                            gaugeChart.arrows[0].setValue(nivel2);
                            gaugeChart.axes[0].setBottomText(nivel2 + " Gal");
                        }
                    }
                }
            }
        }

        $timeout(function () {
            drawGauge1();
            drawGauge2();
        }, 10);
    }

})();
