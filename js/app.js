var app = angular.module('App', ['ngRoute']);
var rutaApi = 'http://localhost:3030/api/';
var ubicacion = null;

//Rutas
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : '../pages/mailForm.html',
        controller  : 'mailController'
    })
    .when('/destinatario',{
        templateUrl : '../pages/destForm.html',
        controller  : 'destController'
    })
    .otherwise({
        redirectTo: '/'
    })
})

//Form
app.controller('mailController', function($scope, $http) {
    function obtenerDatos(){
        $http({
            method: 'GET',
            url: rutaApi + 'receptores'
        }).then(function sucess(response){
            $scope.destinatarios = response.data
        }, function error(response) {

        });
    }

    $scope.EnviarCorreo = function() {
        $scope.mostrarLoading = true;
        var mensaje = new Object;
        mensaje.correo = $scope.seleccion;
        mensaje.mensaje = $scope.mensaje;
        mensaje.asunto = $scope.asunto;

        $http({
            method: 'POST',
            url: rutaApi + 'enviar',
            data: mensaje,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST'
        }).then(function sucess(response) {
            limpiarCampos()
            $scope.mostrarResultado = true;
            $scope.mensajeResultado = 'Mensaje enviado satisfactoriamente';
        }, function error(response) {
            $scope.mostrarResultado = true;
            $scope.mensajeResultado = 'No se pudo enviar el mensaje al destinatario';
        })

        $scope.mostrarLoading = false;
    }

    function limpiarCampos() {
        $scope.seleccion = '';
        $scope.mensaje = '';
        $scope.asunto = '';
    }

    obtenerDatos()
})

//Destinatario
app.controller('destController', function($scope, $http) {
    $scope.GuardarDestinatario = function() {
        $scope.mostrarLoading = true;
        var destinatario = new Object;
        destinatario.nombre = $scope.Nombre;
        destinatario.correo = $scope.Correo;

        $http({
            method: 'POST',
            url: rutaApi + 'receptor',
            data: destinatario,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST'
        }).then(function sucess(response) {
            limpiarCampos()
            $scope.mostrarResultado = true;
            $scope.mensajeResultado = 'Datos almacenados correctamente';
        }, function error(response) {
            $scope.mostrarResultado = true;
            $scope.mensajeResultado = 'No se pudo almacenar los datos';
        })

        $scope.mostrarLoading = false;
    }

    function limpiarCampos() {
        $scope.Nombre = '';
        $scope.Correo = '';
    }
})

//Directivas
app.directive('loading', function () {
    return {
        restrict: 'AE',
        template: '<div class="form-group text-center">'+
                    '<div class="lds-ripple"><div></div><div></div></div>'+
                  '</div>'
    };
});

app.directive('resultado', function () {
    return {
        restrict: 'AE',
        template: '<div class="form-group">' +
                    '<div class="card bg-dark text-white">'+
                        '<div class="card-body">{{ mensajeResultado }}</div>'+
                    '</div>'+
                  '</div>'
    };
});