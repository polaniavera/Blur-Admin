/**
 * @author v.lugovsky
 * created on 16.12.2015
 * modified c.polania
 * on 26.03.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts')
      .controller('chartCCtrl', chartCCtrl);

  /** @ngInject */
  function chartCCtrl($rootScope, $scope, baConfig, $element, globalFactory, dataFactory, toastr) {
    $rootScope.showBtnTruck = true;
    globalFactory.setFromMsg(false);
    var layoutColors = baConfig.colors;
    //var idConductorr = $element[0].childNodes[0].getAttribute('id');
    var idConductor = document.getElementById('chart-con');
    var idPasajero = document.getElementById('chart-pas');
    var chartData = [];

    getChartService();

    //LLamada al serrvicio GET desde el factory
    function getChartService() {   
      dataFactory.getByItem()
        .then(function (response) {
          chartData = [];
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

    //LLamada al servicio GET desde el factory
    function getRangeService() {
      dataFactory.getByRange()
        .then(function (response) {
          chartData = [];
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

    function sortData(response) {
      for (var i in response) {
        if (response[i].TanqueConductor !== null && response[i].TanquePasajero !== null && response[i].Fecha !== null && response[i].Hora !== null) {
          chartData.push({
            nivelTotal: Number(response[i].TanqueConductor) + Number(response[i].TanquePasajero),
            fecha: response[i].Fecha,
            hora: response[i].Hora,
            nivelC: Number(response[i].TanqueConductor),
            nivelP: Number(response[i].TanquePasajero),
            date: response[i].Fecha + ' ' + response[i].Hora
          });
        }
      }
      drawChartC();
      drawChartP();
      globalFactory.setDatos(chartData);
    }

    function drawChartC() {
      var chartConductor = AmCharts.makeChart(idConductor, {
        type: 'serial',
        theme: 'blur',
        color: layoutColors.defaultText,
        marginTop: 0,
        dataProvider: chartData,
        precision: 2,

        valueAxes: [{
          axisAlpha: 0,
          position: 'left',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          title: 'Tanque Conductor',
        }],

        graphs: [{
          id: 'g1',
          fillAlphas: 0.5,
          type: 'smoothedLine',
          valueField: 'nivelC',
          balloonText: "<div style='margin:5px; font-size:18px;'>Nivel:<b>[[value]]</b></div>",
        }],

        chartScrollbar: {
          graph: 'g1',
          //gridAlpha: 0.3,
          color: layoutColors.defaultText,
          scrollbarHeight: 70,
          backgroundAlpha: 0.05,
          selectedBackgroundAlpha: 0.1,
          selectedBackgroundColor: layoutColors.defaultText,
          graphFillAlpha: 0.25,
          autoGridCount: true,
          selectedGraphFillAlpha: 1,
          graphLineAlpha: 0.8,
          selectedGraphLineColor: layoutColors.defaultText,
          selectedGraphLineAlpha: 1
        },

        chartCursor: {
          categoryBalloonDateFormat: 'JJ:NN, DD MMMM',
          cursorPosition: 'mouse',
          cursorAlpha: 1,
        },

        categoryField: 'date',

        categoryAxis: {
          minPeriod: 'mm',
          parseDates: true,
        },

        export: {
          enabled: true,
          dateFormat: 'YYYY-MM-DD HH:NN:SS'
        }
      });

      chartConductor.addListener("dataUpdated", zoomChart);
      zoomChart();
      function zoomChart() {
        chartConductor.zoomToIndexes(chartData.length - 250, chartData.length - 100);
      }
    }

    function drawChartP() {
      var chartPasajero = AmCharts.makeChart(idPasajero, {
        type: 'serial',
        theme: 'blur',
        color: layoutColors.defaultText,
        marginTop: 0,
        dataProvider: chartData,
        precision: 2,

        valueAxes: [{
          axisAlpha: 0,
          position: 'left',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          title: 'Tanque Pasajero',
        }],

        graphs: [{
          id: 'g1',
          fillAlphas: 0.6,
          type: 'smoothedLine',
          valueField: 'nivelP',
          balloonText: "<div style='margin:5px; font-size:18px;'>Nivel:<b>[[value]]</b></div>"
        }],

        chartScrollbar: {
          graph: 'g1',
          //gridAlpha: 0.3,
          color: layoutColors.defaultText,
          scrollbarHeight: 70,
          backgroundAlpha: 0.05,
          selectedBackgroundAlpha: 0.1,
          selectedBackgroundColor: layoutColors.defaultText,
          graphFillAlpha: 0.25,
          autoGridCount: true,
          selectedGraphFillAlpha: 1,
          graphLineAlpha: 0.8,
          selectedGraphLineColor: layoutColors.defaultText,
          selectedGraphLineAlpha: 1
        },

        chartCursor: {
          categoryBalloonDateFormat: 'JJ:NN, DD MMMM',
          cursorPosition: 'mouse',
          cursorAlpha: 1,
        },

        categoryField: 'date',

        categoryAxis: {
          minPeriod: 'mm',
          parseDates: true,
        },

        export: {
          enabled: true,
          dateFormat: 'YYYY-MM-DD HH:NN:SS'
        }
      });

      chartPasajero.addListener("dataUpdated", zoomChart);
      zoomChart();
      function zoomChart() {
        chartPasajero.zoomToIndexes(chartData.length - 250, chartData.length - 100);
      }
    }




    //Listener del broadcast desde msgCtrl
    $scope.$on('chartClick', function (event) {
      getChartService();
    });

    //Listener del broadcast desde msgCtrl Rango
    $scope.$on('chartRangeClick', function (event) {
      getRangeService();
    });

  }
})();
