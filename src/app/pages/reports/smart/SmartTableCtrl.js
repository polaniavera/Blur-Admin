/**
 * @author c.polania
 * created on 13.08.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reports')
      .controller('SmartTableCtrl', SmartTableCtrl);

  /** @ngInject */
  function SmartTableCtrl($scope, $rootScope, $filter, $timeout, toastr, editableOptions, editableThemes, globalFactory, dataFactory) {
      function initialize() {
        $rootScope.showBtnTruck = true;
          globalFactory.setFromMsg(false);
          var datos = [];
          $scope.smartTablePageSize = 20;
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
          }

          //Listener del broadcast desde msgCtrl
          $scope.$on('tableClick', function (event) {
              getTableService();
          });
      }
      
        $scope.showGroup = function (user) {
        if (user.group && $scope.groups.length) {
            var selected = $filter('filter')($scope.groups, { id: user.group });
            return selected.length ? selected[0].text : 'Not set';
        } else return 'Not set'
        };

        $scope.showStatus = function (user) {
        var selected = [];
        if (user.status) {
            selected = $filter('filter')($scope.statuses, { value: user.status });
        }
        return selected.length ? selected[0].text : 'Not set';
        };


        //$scope.removeUser = function (index) {
        //    $scope.users.splice(index, 1);
        //};

        //$scope.addUser = function () {
        //    $scope.inserted = {
        //        id: $scope.users.length + 1,
        //        name: '',
        //        status: null,
        //        group: null
        //    };
        //    $scope.users.push($scope.inserted);
        //};

        //editableOptions.theme = 'bs3';
        //editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        //editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';   

        //download
        $scope.downloadFile = function () {
            dataFactory.downloadFile();
        };

      $timeout(function () {
          initialize();
      }, 100);

  }

})();