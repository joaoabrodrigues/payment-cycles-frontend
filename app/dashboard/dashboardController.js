(function() {
  angular.module('paymentCycle').controller('DashboardController', [
    '$http',
    'consts',
    DashboardController
  ])

  function DashboardController($http, consts) {
    const vm = this
    vm.getSummary = function() {
      const url = 'https://payment-cycles.herokuapp.com/api/v1/paymentSummary'
      $http.defaults.headers.common.userEmail = JSON.parse(localStorage.getItem(consts.userKey)).email
      $http.defaults.headers.common.Authorization = JSON.parse(localStorage.getItem(consts.userKey)).token
      $http.get(url).then(function(response){
        const {credit = 0, debt = 0} = response.data
        vm.credit = credit
        vm.debt = debt
        vm.total = credit - debt
      })
    }

    vm.getSummary()
  }
})()
