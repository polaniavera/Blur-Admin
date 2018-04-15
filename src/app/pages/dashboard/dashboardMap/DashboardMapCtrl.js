/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardMapCtrl', DashboardMapCtrl);

    function DashboardMapCtrl($http, $rootScope, $scope, globalFactory, dataFactory, constantes) {

        $rootScope.showBtnTruck = false;
        $scope.info;
        getDashboard();

        getEstaciones();

        function getDashboard() {
            dataFactory.getDashboard()
                .then(function (response) {
                    $scope.info = response;
                    console.log(response);
                    //globalFactory.setVehiculos(response);
                    drawMap(response[1]);
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }

        function getEstaciones() {
            dataFactory.getEstaciones()
                .then(function (response) {
                    globalFactory.setEstaciones(response);
                }, function (error) {
                    $scope.status = 'Unable to load stations from DB: ' + error.message;
                });
        }

        function drawMap(vehiculos) {
            var markerBounds = new google.maps.LatLngBounds();
            var markerArr = [];

            var map = new google.maps.Map(document.getElementById('amChartMap'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                //zoom: 2
            });

            for (var i = 0; i < vehiculos.length; i++) {
                var locationPoint = new google.maps.LatLng(vehiculos[i].Latitud, vehiculos[i].Longitud);
                var markerItem = new google.maps.Marker({
                    position: locationPoint,
                    map: map,
                    title: "Placa: " + vehiculos[i].Placa + "\n" + "Tanque C: " + vehiculos[i].TanqueConductor +
                    "\n" + "Tanque P: " + vehiculos[i].TanquePasajero + "\n" + "Fecha: " + vehiculos[i].Fecha +
                    "\n" + "Hora: " + vehiculos[i].Hora,
                    animation: google.maps.Animation.DROP,
                    label: vehiculos[i].Placa
                });

                markerArr.push(markerItem);
                markerBounds.extend(locationPoint);
            }

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markerArr,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            map.fitBounds(markerBounds);

            // Adicionar las marcas de las estaciones
            // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            // for (var j = 0; j < globalFactory.getEstaciones().length; j++){
            //     if (globalFactory.getEstaciones()[j].Latitud != null) {
            //         var stationPoint = new google.maps.LatLng(globalFactory.getEstaciones()[j].Latitud, globalFactory.getEstaciones()[j].Longitud);
            //         new google.maps.Marker({
            //             position: stationPoint,
            //             map: map,
            //             //label: globalFactory.getEstaciones()[j].Campo,
            //             icon: constantes.machin
            //         });
            //         //stationMarker.setPosition(stationPoint);
            //         markerBounds.extend(stationPoint);
            //         console.log(globalFactory.getEstaciones()[j].Latitud + ' - ' +  globalFactory.getEstaciones()[j].Longitud);
            //     }
            // }
            
        }

    }
})();