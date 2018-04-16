/**
 * @author c.polania
 * created on 23.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin')
        .factory('dataFactory', dataFactory);

    /** @ngInject */
    function dataFactory($http, $q, constantes, globalFactory) {

        var dataFactory = {};

        // Obtiene el registro mas reciente de todos los vehiculos
        dataFactory.getDashboard = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(constantes.urlGetDashboard)
            .success(function (data) {
                defered.resolve(data);
            })
            .error(function (err) {
                defered.reject(err)
            });
            return promise;
        };

        dataFactory.getCustomer = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        // Obtiene todos los registros filtrados por usuario, item y fecha
        dataFactory.getByItem = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(constantes.urlGetByItem + globalFactory.getItem() + '/' + globalFactory.getDate())
            .success(function (data) {
                console.log(data);
                globalFactory.setExistData(true);
                defered.resolve(data);
            })
            .error(function (err) {
                globalFactory.setExistData(false);
                defered.reject(err)
            });
            return promise;
        };
        
        // Obtiene los registros filtrados por usuario, item y un rango de fecha
        dataFactory.getByRange = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(constantes.urlGetByRange + globalFactory.getItem() + '/' + globalFactory.getDate() + '/' + globalFactory.getFinalDate())
                .success(function (data) {
                    globalFactory.setExistData(true);
                    defered.resolve(data);
                })
                .error(function (err) {
                    globalFactory.setExistData(false);
                    defered.reject(err)
                });
            return promise;
        };

        // Obtiene todos los items de un usuario
        dataFactory.getItemsByUser = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(constantes.urlGetItemsByUser)
                .success(function (data) {
                    defered.resolve(data);
                })
                .error(function (err) {
                    defered.reject(err)
                });
            return promise;
        };

        // Obtiene las estaciones almacenadas en la BD
        dataFactory.getEstaciones = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(constantes.urlGetEstaciones)
                .success(function (data) {
                    defered.resolve(data);
                })
                .error(function (err) {
                    defered.reject(err)
                });
            return promise;
        };

        // Obtiene los reportes almacenados en el server (arreglar)
        dataFactory.downloadFile = function () {
            $http({
                method: 'GET',
                url: constantes.urlGetFile,
                responseType: 'arraybuffer'
            }).success(function (data, status, headers) {
                headers = headers();
                // var filename = headers['x-filename'];
                var filename = 'reporte.pdf';
                var contentType = headers['content-type'];
                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);
                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);
                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }).error(function (data) {
                console.log(data);
            });
        };










        return dataFactory;
    }
})();