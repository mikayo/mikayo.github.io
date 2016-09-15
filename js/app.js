"use strict";

var app = angular.module('portfolio', ["ui.router"]);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    /*
    // remove trailing slash
    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path();
        var hasTrailingSlash = path[path.length-1] === '/';

        if(hasTrailingSlash) {
            //if last charcter is a slash, return the same url without the slash
            var newPath = path.substr(0, path.length - 1);
            return newPath;
        }

    });
    */
    
    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "main.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: "about.html"
        })
        .state('experience', {
            url: "/experience",
            templateUrl: "experience.html",
            controller: "DisplayCtrl"
        })

});

app.controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(currentLocation) {
        return currentLocation === $location.path();
    };
}]);

app.controller('DisplayCtrl', ['$scope', function($scope) {

    $scope.show = [];

    $scope.init = function() {
        $scope.show= [false, false, false];
    };

    $scope.toggleShow = function(num) {
        $scope.show[num] ^= true;
    };
}]);
