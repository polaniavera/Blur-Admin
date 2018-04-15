/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.maps')
        .controller('GoogleMapsCtrl', GoogleMapsCtrl);

    /** @ngInject */
    function GoogleMapsCtrl($scope, $timeout, $rootScope, globalFactory, constantes, dataFactory,  toastr) {
        function initialize() {
            globalFactory.setFromMsg(false);
            $rootScope.showBtnTruck = true;
            var datos = [];
            var placa;
            var activeMarker;
            var infoWindow = new google.maps.InfoWindow();

            var centerLat = 4.7;
            var centerLng = -74.7;

            getMapService();

            //LLamada al servicio GET desde el factory
            function getMapService() {
                dataFactory.getByItem()
                    .then(function (response) {
                        datos = [];
                        sortData(response);
                        setMap();

                        //Leer placa del vehiculo
                        //Tener en cuenta que se debe cargar primero dashboard
                        if (globalFactory.getVehiculos()[1] != undefined) {
                            placa = globalFactory.getVehiculos()[0].Placa;
                        }

                        //Si la llamada viene desde el calendario se devuelve al otro controlador
                        // if (globalFactory.getFromMsg()) {
                        //     $rootScope.$broadcast('postService');
                        // }
                    }, function (error) {
                        toastr.error('No existen datos para los valores selecionados', 'Error');
                        if (globalFactory.getFromMsg()) {
                            $rootScope.$broadcast('postService');
                        } else {
                            setMap();
                        } 
                    }); 
            }


            //LLamada al servicio GET desde el factory
            function getRangeService() {
                dataFactory.getByRange()
                    .then(function (response) {
                        datos = [];
                        sortData(response);
                        setMap();

                        //Leer placa del vehiculo
                        //Tener en cuenta que se debe cargar primero dashboard
                        if (globalFactory.getVehiculos()[1] != undefined) {
                            placa = globalFactory.getVehiculos()[globalFactory.getItem() - 1].Placa;
                        }
                        //Si la llamada viene desde el calendario se devuelve al otro controlador
                        // if (globalFactory.getFromMsg()) {
                        //     $rootScope.$broadcast('postService');
                        // }
                    }, function (error) {
                        toastr.error('No existen datos para los valores selecionados', 'Error');
                        if (globalFactory.getFromMsg()) {
                            $rootScope.$broadcast('postService');
                        } else {
                            setMap();
                        }
                    });
            }



            //Ordena los datos que se trae desde la llamada al servicio en el factory
            function sortData(response) {
                for (var i in response) {
                    if (response[i].Latitud !== null && response[i].Longitud !== null && response[i].Fecha !== null && response[i].Hora !== null && response[i].TanqueConductor != null && response[i].TanquePasajero !== null) {
                        datos.push({
                            lat: Number(response[i].Latitud),
                            lng: Number(response[i].Longitud),
                            Fecha: response[i].Fecha,
                            Hora: response[i].Hora,
                            Velocidad: response[i].Velocidad,
                            TanqueConductor: response[i].TanqueConductor,
                            TanquePasajero: response[i].TanquePasajero,
                            nivelTotal: (Number(response[i].TanqueConductor) + Number(response[i].TanquePasajero)).toFixed(1)
                        });
                    }
                }
                centerLat = datos[0].lat;
                centerLng = datos[0].lng;
                globalFactory.setDatos(datos);
            }

            //Plotea el mapa
            function setMap() {
                var mapCanvas = document.getElementById('google-maps');
                var mapOptions = {
                    center: new google.maps.LatLng(centerLat, centerLng),
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(mapCanvas, mapOptions);
                var path = new google.maps.MVCArray();
                var service = new google.maps.DirectionsService();
                //aqui se pinta en el mapa
                var poly = new google.maps.Polyline({
                    path: datos,
                    //geodesic:true,
                    map: map,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                if (globalFactory.getExistData()) {
                    var startMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(centerLat, centerLng),
                        map: map,
                        title: datos[0].Hora
                    });
                    setMarkers(map);
                }             
            }

            //Dibuja las marcas sobre el mapa
            function setMarkers(map) {
                for (var i = 0; i < datos.length; i++) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(datos[i].lat, datos[i].lng),
                        map: map,
                        //icon: constantes.greenDot
                    });
                    // switch para cambiar el color de los marcadores
                    if (datos[i].Velocidad == 0) {
                        marker.setIcon(constantes.blueDot);
                    } else if (datos[i].Velocidad >= 70 && datos[i].Velocidad < 100){
                        marker.setIcon(constantes.yellowDot);
                    } else if (datos[i].Velocidad >= 100) {
                        marker.setIcon(constantes.yellowDot);
                    } else {
                        marker.setIcon(constantes.greenDot);
                    }
                    (function (i, marker) {
                        google.maps.event.addListener(marker, 'click', function () {
                            if (!infoWindow) {
                                infoWindow = new google.maps.InfoWindow();
                            }
                            var contentHtml =
                            '<div id="content">' +
                              '<div id="siteNotice">' +
                              '</div>' +
                              '<h1 id="firstHeading" class="firstHeading" style="color:black">' + placa + '</h1>' +
                              '<div id="bodyContent" style="color:black">' +
                              '<p style="color:black">' + datos[i].Fecha + ' - ' + datos[i].Hora + '</p>' +
                              '<p style="color:black">Velocidad: ' + datos[i].Velocidad + '</p>' +
                              '<p style="color:black">Nivel Conductor: ' + datos[i].TanqueConductor + '</p>' +
                              '<p style="color:black">Nivel Pasajero: ' + datos[i].TanquePasajero + '</p>' +
                              '<p style="color:black">Nivel Total: ' + datos[i].nivelTotal + '</p>' +
                            '</div>';
                            infoWindow.setContent(contentHtml);
                            infoWindow.open(map, marker);

                            // check to see if activeMarker is set
                            // if so, set the icon back to the default
                            activeMarker && activeMarker.setIcon(constantes.greenDot);

                            // set the icon for the clicked marker
                            marker.setIcon(constantes.redCar);

                            // update the value of activeMarker
                            activeMarker = marker;

                            //LLamada a evento de controlador externo y setear variable global
                            var gaugesData = [datos[i].Velocidad, datos[i].TanqueConductor, datos[i].TanquePasajero];
                            $rootScope.$broadcast('markerClick', gaugesData);

                        });
                    })(i, marker);
                }
            }

            //Listener del broadcast desde msgCtrl del rango
            $scope.$on('mapRangeClick', function (event) {
                getRangeService();
            });
        }

        $timeout(function () {
            initialize();
        }, 100);
    }

})();