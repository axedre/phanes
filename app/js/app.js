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
  $routeProvider.otherwise({redirectTo: "/"});
}]);
