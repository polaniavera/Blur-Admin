/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.maps')
        .controller('InfoMapsCtrl', InfoMapsCtrl);

    /** @ngInject */
    function InfoMapsCtrl($timeout, $http, $scope, globalFactory) {
        function initialize() {
            var datos = [];
            var gaugeChart;
            var gaugeFuelChart1;
            var gaugeFuelChart2;
            var gaugesData;

            drawSpeedGauge();
            drawFuelGauge1();
            drawFuelGauge2();


            if (globalFactory.getDatos().length > 0) {
                datos = globalFactory.getDatos();
                var index = datos.length - 1;
                gaugesData = [datos[index].Velocidad, datos[index].TanqueConductor, datos[index].TanquePasajero];
            } else {
                gaugesData = [0, 0, 0];
            }

            setSpeedValue(gaugesData);
            setFuelValue1(gaugesData);
            setFuelValue2(gaugesData);
            
            
            function drawSpeedGauge() {
                gaugeChart = AmCharts.makeChart('speed-gauge', {
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
                        "bottomText": "0 Km/h",
                        "bottomTextYOffset": -10,
                        "endValue": 120
                    }],
                    "arrows": [{
                        //"value": datos[index].Velocidad
                    }],
                    "export": {
                        "enabled": true
                    }
                });
                //setInterval(randomValue, 2000);
                //setGaugeValue();
            }

            function drawFuelGauge1() {
                gaugeFuelChart1 = AmCharts.makeChart('fuel-gauge1', {
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
		                "startWidth": 5,
		                //"value": datos[index].TanqueConductor
		                }],
                    "export": {
                        "enabled": true
                    }
                });

                //if (gaugeFuelChart) {
                //    if (gaugeFuelChart.arrows) {
                //        if (gaugeFuelChart.arrows[0]) {
                //            if (gaugeFuelChart.arrows[0].setValue) {
                //                gaugeFuelChart.arrows[0].setValue(datos[index].nivel1);
                //                gaugeFuelChart.axes[0].setBottomText(datos[index].nivel1 + " Gal");
                //            }
                //        }
                //    }
                //}
            }

            function drawFuelGauge2() {
                gaugeFuelChart2 = AmCharts.makeChart('fuel-gauge2', {
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
                        "id": "GaugeArrow-2",
                        "innerRadius": 0,
                        "startWidth": 5,
                        //"value": datos[index].TanquePasajero
                    }],
                    "export": {
                        "enabled": true
                    }
                });
            }

            $scope.$on('markerClick', function (event, arg) {
                if (arg != null){
                    setSpeedValue(arg);
                    setFuelValue1(arg);
                    setFuelValue2(arg);
                }
            });

            // set value
            function setSpeedValue(gaugesData) {
                if (gaugeChart) {
                    if (gaugeChart.arrows) {
                        if (gaugeChart.arrows[0]) {
                            if (gaugeChart.arrows[0].setValue) {
                                gaugeChart.arrows[0].setValue(gaugesData[0]);
                                gaugeChart.axes[0].setBottomText(gaugesData[0] + " Km/h");
                            }
                        }
                    }
                }
            }
            function setFuelValue1(gaugesData) {
                if (gaugeFuelChart1) {
                    if (gaugeFuelChart1.arrows) {
                        if (gaugeFuelChart1.arrows[0]) {
                            if (gaugeFuelChart1.arrows[0].setValue) {
                                gaugeFuelChart1.arrows[0].setValue(gaugesData[1]);
                                gaugeFuelChart1.axes[0].setBottomText(gaugesData[1] + " Gal");
                            }
                        }
                    }
                }
            }
            function setFuelValue2(gaugesData) {
                if (gaugeFuelChart2) {
                    if (gaugeFuelChart2.arrows) {
                        if (gaugeFuelChart2.arrows[0]) {
                            if (gaugeFuelChart2.arrows[0].setValue) {
                console.log(gaugesData);
                                gaugeFuelChart2.arrows[0].setValue(gaugesData[2]);
                                gaugeFuelChart2.axes[0].setBottomText(gaugesData[2] + " Gal");
                            }
                        }
                    }
                }
            }

        }
        
        $timeout(function () {
            initialize();
        }, 1000);
    }

})();
