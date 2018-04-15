/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardBlockCtrl', DashboardBlockCtrl);

    /** @ngInject */
    function DashboardBlockCtrl($scope, baConfig) {
        //$scope.nombre = globalFactory.getDatos()[0][0].name + ' ' + globalFactory.getDatos()[0][0].lastname;
        var fecha = $scope.truck.Fecha + ' ' + $scope.truck.Hora;
        $scope.nivelTotal = ($scope.truck.TanqueConductor + $scope.truck.TanquePasajero).toFixed(1);
        //var labelSet = [];
        //labelSet.push('Tanque Conductor');
        //labelSet.push('Tanque Pasajero');
        //labelSet.push('Tanque Libre');
        //labelSet.push('Capacidad 120gal');
        //labelSet.push($scope.nombre);
        //labelSet.push('Ubicacion');
        //labelSet.push(fecha);       
    }
})();