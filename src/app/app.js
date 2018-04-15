'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])
    .service('globalFactory', function () {
        var globalDate = {};
        var globalFinalDate = {};
        var globalCliente = {};
        var globalVehiculos = {};
        var globalDatos = {};
        var estaciones = {};
        var existData = {};
        var fromMsg = {};
        var item = {};

        this.getDate = function () {
            return globalDate;
        };
        this.setDate = function (value) {
            globalDate = (value);
        };
        this.getFinalDate = function () {
            return globalFinalDate;
        };
        this.setFinalDate = function (value) {
            globalFinalDate = (value);
        };
        this.getCliente = function () {
            return globalCliente;
        }
        this.setCliente = function (value) {
            globalCliente = value;
        }
        this.getVehiculos = function () {
            return globalVehiculos;
        }
        this.setVehiculos = function (value) {
            globalVehiculos = value;
        }
        this.getDatos = function () {
            return globalDatos;
        }
        this.setDatos = function (value) {
            globalDatos = value;
        }
        this.getExistData = function () {
            return existData;
        }
        this.setExistData = function (value) {
            existData = value;
        }
        this.getFromMsg = function () {
            return fromMsg;
        }
        this.setFromMsg = function (value) {
            fromMsg = value;
        }
        this.getItem = function () {
            return item;
        }
        this.setItem = function (value) {
            item = value;
        }
        this.getEstaciones = function () {
            return estaciones;
        }
        this.setEstaciones = function (value) {
            estaciones = value;
        }

        this.setDate(formatDate(new Date()));
        this.setFromMsg(false);
        this.setItem(1);
    });

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}