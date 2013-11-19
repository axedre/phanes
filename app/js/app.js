"use strict";

angular.module("phanesApp", [
  "ngRoute",
  "phanesApp.filters",
  "phanesApp.services",
  "phanesApp.directives",
  "phanesApp.controllers",
  "ui.bootstrap"
])
.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {templateUrl: "partials/view.html", controller: "MyCtrl1"});
  $routeProvider.when("/grid", {templateUrl: "partials/grid.html", controller: "MyCtrl1"});
  $routeProvider.when("/navbar-default", {templateUrl: "partials/navbar-default.html", controller: "MyCtrl1"});
  $routeProvider.when("/navbar-static", {templateUrl: "partials/navbar-static.html", controller: "MyCtrl1"});
  $routeProvider.when("/navbar-fixed", {templateUrl: "partials/navbar-fixed.html", controller: "MyCtrl1"});
  $routeProvider.otherwise({redirectTo: "/"});
}]);
