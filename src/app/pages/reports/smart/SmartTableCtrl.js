/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('SmartTableCtrl', SmartTableCtrl);

    /** @ngInject */
    function SmartTableCtrl($scope, $filter, editableOptions, editableThemes, $timeout, $rootScope, globalFactory, dataFactory, toastr, $state) {

        $scope.smartTablePageSize = 50; 

        // function initialize() {
        $rootScope.showBtnTruck = true;
        globalFactory.setFromMsg(false);
        var datos = [];

        getTableService();

        //LLamada al serrvicio GET desde el factory
        function getTableService() {
            dataFactory.getByItem()
                .then(function (response) {
                    datos = [];
                    sortData(response);

                    //Si a llamada viene desde el calendario se devuelve al otro controlador
                    if (globalFactory.getFromMsg()) {
                        $rootScope.$broadcast('postService');
                    }
                }, function (error) {
                    toastr.error('No existen datos para los valores selecionados', 'Error');
                    if (globalFactory.getFromMsg()) {
                        $rootScope.$broadcast('postService');
                    }
                });
        }

        //Ordena los datos que se trae desde la llamada al servicio en el factory
        function sortData(response) {
            for (var i in response) {
                if (response[i].Latitud !== null && response[i].Longitud !== null && response[i].Fecha !== null && response[i].Hora !== null && response[i].TanqueConductor != null && response[i].TanquePasajero !== null) {
                    datos.push({
                        id:Number(i)+1,
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

            $scope.smartTableData = datos;
            globalFactory.setDatos(datos);
            // $state.reload();
        }

        //Listener del broadcast desde msgCtrl
        $scope.$on('tableClick', function (event) {
            getTableService();
        });
        //   }

        // $scope.smartTableData = globalFactory.getDatos();
        console.log(globalFactory.getDatos());

        //download
        $scope.downloadFile = function () {
            dataFactory.downloadFile();
        };

        //   $timeout(function () {
        //       initialize();
        //   }, 100);   
    }

})();