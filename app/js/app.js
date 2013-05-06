'use strict';


// Declare app level module which depends on filters, and services
var App = angular.module('scheduleApp', ['scheduleApp.filters', 'scheduleApp.services', 'scheduleApp.directives']).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/home', {templateUrl: 'partials/start.html', controller: 'StartPageController'});
      $routeProvider.when('/look', {templateUrl: 'partials/look.html', controller: 'LookPageController'});
      $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'SettingsPageController'});
      $routeProvider.when('/schedule', {templateUrl: 'partials/schedule.html', controller: 'SchedulePageController'});
      $routeProvider.otherwise({redirectTo: '/home'});
    }]);