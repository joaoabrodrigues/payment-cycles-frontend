(function(){
    angular.module('paymentCycle').controller('PaymentCycleCtrl',[
        '$http',
        'msgs',
        PaymentCycleController
    ])

    function PaymentCycleController($http, msgs) {
        const vm = this
        const url = 'https://payment-cycles.herokuapp.com/api/v1/paymentCycles'

        vm.refresh = function() {
           $http.get(url).then(function(response) {
                vm.paymentCycle = {}
                vm.paymentCycles = response
           })
        }

        vm.create = function() {
            $http.post(url, vm.paymentCycle).then(function(response){
                vm.refresh()
                msgs.addSuccess('Successful Operation!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.refresh()
    }
})()