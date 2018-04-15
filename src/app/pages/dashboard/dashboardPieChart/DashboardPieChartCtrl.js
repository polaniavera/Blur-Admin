/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil) {
        var nivel1 = $scope.truck.TanqueConductor;
        var nivel2 = $scope.truck.TanquePasajero;
        var totalCom = (nivel1 + nivel2).toFixed(1);
        var percentage = 100;
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.charts = [{
            color: pieColor,
            description: 'T. Conductor',
            stats: nivel1,
            capacidad: '120 gal.',//truck.capacity
            percent: getPercentage(nivel1)
        }, {
            color: pieColor,
            description: 'T. Pasajero',
            stats: nivel2,
            capacidad: '120 gal.',
            percent: getPercentage(nivel2)
        }//, {
        //    color: pieColor,
        //    description: 'Total',
        //    stats: totalCom,
        //    capacidad: '240 gal.',
        //    percent: getPercentage(totalCom/2)
        //}
        ];

        function getPercentage(currentValue) {
            percentage = Math.round((currentValue * 100) / 120);//aqui se divide por truck.capacity...
            return percentage;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round',
                });
            });

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function (index, chart) {
                if (index == 0)
                    $(chart).data('easyPieChart').update(getPercentage(nivel1));//aqui pasar valor recibido del serv. $rootScope.trucks[n].tanqueConductor
                if (index == 1)
                    $(chart).data('easyPieChart').update(getPercentage(nivel2));//aqui pasar valor recibido del serv. $rootScope.trucks[n].tanquePasajero
                //if (index == 2)
                //    $(chart).data('easyPieChart').update(getPercentage(totalCom / 2));
            });
        }

        $timeout(function () {
            loadPieCharts();
            updatePieCharts();
        }, 1000);
    }
})();