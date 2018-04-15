(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('TrafficChartCtrl', TrafficChartCtrl);

    /** @ngInject */
    function TrafficChartCtrl($scope, $timeout, baConfig, layoutPaths, globalFactory) {

        $scope.nivelTotal = ($scope.truck.nivel1 + $scope.truck.nivel2).toFixed(1);

        var graphData = [];
        graphData.push({ label: 'Tanque Conductor', level: $scope.truck.nivel1 });
        graphData.push({ label: 'Tanque Pasajero', level: $scope.truck.nivel2 });
        graphData.push({ label: 'Tanque Libre', level: $scope.nivelTotal });

        $scope.transparent = baConfig.theme.blur;
        var dashboardColors = baConfig.colors.dashboard;
        var layoutColors = baConfig.colors;

        //obtener ubicacion
        //var map = new google.maps.Map(document.getElementById('google-maps-hidden'), { mapTypeId: google.maps.MapTypeId.TERRAIN });
        //var coordenates = new google.maps.LatLng($scope.truck.latitud, $scope.truck.longitud);
        //var request = {
        //    location: coordenates,
        //    radius: 2000
        //};
        //var service = new google.maps.places.PlacesService(map);
        //service.nearbySearch(request, callback);
        //function callback(results, status) {
        //    var pepe = results.length;
        //}

        function drawPie() {
            var pieChart = AmCharts.makeChart($scope.truck.idTruck, {
                type: 'pie',
                startDuration: 0,
                theme: 'blur',
                addClassNames: true,
                color: '#209e91',
                labelTickColor: '#dfb81c',
                legend: {
                    enabled: false
                },
                innerRadius: '30%',
                defs: {
                    filter: [
                        {
                            id: 'shadow',
                            width: '200%',
                            height: '200%',
                            feOffset: {
                                result: 'offOut',
                                in: 'SourceAlpha',
                                dx: 0,
                                dy: 0
                            },
                            feGaussianBlur: {
                                result: 'blurOut',
                                in: 'offOut',
                                stdDeviation: 5
                            },
                            feBlend: {
                                in: 'SourceGraphic',
                                in2: 'blurOut',
                                mode: 'normal'
                            }
                        }
                    ]
                },
                dataProvider: graphData,
                valueField: 'level',
                titleField: 'label',
                export: {
                    enabled: true
                },
                creditsPosition: 'bottom-left',
                autoMargins: false,
                marginTop: 10,
                alpha: 0.7,
                marginBottom: 0,
                marginLeft: 0,
                pullOutRadius: 0,
                pathToImages: layoutPaths.images.amChart,
                responsive: {
                    enabled: true,
                    rules: [
                      {
                          maxWidth: 900,
                          overrides: {
                               valueAxes: {
                                  labelsEnabled: false
                              },
                              legend: {
                                  enabled: false
                              }
                          }
                      },
                      {
                          maxWidth: 200,
                          overrides: {
                              valueAxes: {
                                  labelsEnabled: false
                              },
                              marginTop: 30,
                              marginBottom: 30,
                              marginLeft: 30,
                              marginRight: 30
                          }
                      }
                    ]
                }
            });

            pieChart.addListener('init', handleInit);
            pieChart.addListener('rollOverSlice', function (e) {
                handleRollOver(e);
            });

            pieChart.invalidateSize();
        }

        function handleInit() {
            pieChart.legend.addListener('rollOverItem', handleRollOver);
        }

        function handleRollOver(e) {
            var wedge = e.dataItem.wedge.node;
            wedge.parentNode.appendChild(wedge);
        }

        $timeout(function () {
            //var inputs = document.getElementsByTagName("div");
            //for (var i = 0; i < inputs.length; i++) {
            //    console.log((inputs[i].id));
            //}
            drawPie();
        }, 10);
   
    }
})();