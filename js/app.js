var app = angular.module('App', ['ngRoute']);

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
app.controller('mailController', function($scope) {
    $scope.var = 'Mail'
})

//Destinatario
app.controller('destController', function($scope, $http) {
    $scope.GuardarDestinatario = function() {
        var datos = "{ 'nombre': '"+ $scope.Nombre +"'  , 'correo': '"+ $scope.Correo +"'  }";
        console.log(JSON.stringify(datos))

        $http({
            method: 'POST',
            url: 'http://localhost:300/api/receptor',
            data: JSON.stringify(datos)
        }).then(function sucess(response) {
            console.log("Correcto")
            console.log(response)
        }, function error(response) {
            console.log("Error")
            console.log(response)
        })
    }
})