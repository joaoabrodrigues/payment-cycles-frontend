(function() {
  angular.module('paymentCycle').controller('DashboardController', [
    '$http',
    DashboardController
  ])

  function DashboardController($http) {
    const vm = this
    vm.getSummary = function() {
      const url = 'https://payment-cycles.herokuapp.com/api/v1/paymentSummary'
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
