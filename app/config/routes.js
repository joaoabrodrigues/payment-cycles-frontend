angular.module('paymentCycle').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('paymentCycle', {
      url: "/paymentCycle?page",
      templateUrl: "paymentCycles/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
  }
])
