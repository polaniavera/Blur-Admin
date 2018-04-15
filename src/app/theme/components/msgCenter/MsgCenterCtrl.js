/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('MsgCenterCtrl', MsgCenterCtrl);

    /** @ngInject */
    function MsgCenterCtrl($http, $timeout, $scope, $rootScope, $state, globalFactory, dataFactory) {
        function initialize() {

            $scope.vehiculos;
            getItems();

            //Obtiene los items para poblar la lista
            function getItems() {
                dataFactory.getItemsByUser()
                    .then(function (response) {
                        globalFactory.setVehiculos(response);
                        $scope.vehiculos = globalFactory.getVehiculos();
                    }, function (error) {
                        $scope.status = 'Unable to load customer data: ' + error.message;
                    });
            }

            //Rutina para almacenamiento de fecha en variable global
            $scope.dateLabel = globalFactory.getDate();
            $scope.itemSelected = globalFactory.getItem();

            //seleccion item
            $scope.selectItem = function (item) {
                globalFactory.setItem(item.IdItem);
                globalFactory.setFromMsg(true);
                $scope.placa = item.Placa;
            };

            //seleccion fecha
            $scope.select = function (date) {
                globalFactory.setDate(formatDate(date));
                globalFactory.setFromMsg(true);
            };

            //Rutina para enviar al controlador segun la pagina
            $scope.search = function () {
                console.log('item ' + globalFactory.getItem());
                console.log(globalFactory.getDate() + ' - ' + globalFactory.getFinalDate() + ' - ' + globalFactory.getItem());
                if ($state.current.title == "Mapas") {
                    $rootScope.$broadcast('mapRangeClick');
                } if ($state.current.title == "Graficas") {
                    $rootScope.$broadcast('chartRangeClick');
                } else if ($state.current.title == "Reportes") {
                    $rootScope.$broadcast('tableClick');
                }
            };

            //Rutina que se ejecuta luego de la llamada al servicio y presentacion de datos
            $scope.$on('postService', function (event) {
                if (globalFactory.getExistData()) {
                    $scope.dateLabel = globalFactory.getDate();
                    $scope.itemSelected = globalFactory.getItem();
                } else {
                    var fecha = new Date(globalFactory.getDate());
                    $scope.selectedDate = fecha.setDate(fecha.getDate() + 1);
                }
            });


            $scope.dtpOptions = {
                showWeeks: false
            };

            //Rutina para abrir el calendario
            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };

            var start = moment().subtract(29, 'days');
            var end = moment();

            function cb(start, end) {
                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }

            $('#reportrange').daterangepicker({
                startDate: start,
                endDate: end,
                ranges: {
                    'Hoy': [moment(), moment()],
                    'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                    'Ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                    'Este Mes': [moment().startOf('month'), moment().endOf('month')],
                    'Mes Anterior': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);

            cb(start, end);

            $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
                //do something, like clearing an input
                globalFactory.setDate(picker.startDate.format('YYYY-MM-DD'));
                globalFactory.setFinalDate(picker.endDate.format('YYYY-MM-DD'));
                globalFactory.setFromMsg(true);
            });

        }
            
        $timeout(function () {
            initialize();
        }, 10);

    }

    //Formatea de un string a date
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

})();