// create the module and name it wodApp
var wodApp = angular.module('wodApp',['ui.bootstrap','ngRoute'] );

// configure our routes
wodApp.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'templates/home.html',
      controller  : 'mainController'
    })

    // route for the contact page
    .when('/search', {
      templateUrl : 'templates/search.html',
      controller  : 'searchController'
    })

    // route for the about page
    .when('/about', {
      templateUrl : 'templates/about.html',
      controller  : 'aboutController'
    })

    // route for the about page
    .when('/admin', {
      templateUrl : 'templates/admin.html',
      controller  : 'adminController'
    })

    // route for the about page
    .when('/createwod', {
      templateUrl : 'templates/createwod.html',
      controller  : 'createwodController'
    })

    ;


});
