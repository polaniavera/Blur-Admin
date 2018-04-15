/**
 * @author c.polania
 * created on 23.07.2017
 */
angular.module('BlurAdmin')
    .constant('constantes', {
        urlGetDashboard: 'http://monitoreoapp.azurewebsites.net/api/registro/getDashboard/1',
        urlGetByItem: 'http://monitoreoapp.azurewebsites.net/api/registro/getByItem/1/',
        urlGetItemsByUser: 'http://monitoreoapp.azurewebsites.net/api/item/getItems/1',
        urlGetByRange: 'http://monitoreoapp.azurewebsites.net/api/registro/getByItemRange/1/',
        urlGetEstaciones: 'http://monitoreoapp.azurewebsites.net/api/registro/estaciones',
        urlGetFile: 'http://monitoreoapp.azurewebsites.net/api/registro/file',
        greenDot: 'assets/img/green-dot.png',
        redDot: 'assets/img/red-dot3.png',
        redCar: 'assets/img/red-car.png',
        yellowDot: 'assets/img/yellow-dot.png',
        blueDot: 'assets/img/blue-dot.png',
        orangeDot: 'assets/img/orange-dot.png',
        machin: 'assets/img/machin.png'

    });