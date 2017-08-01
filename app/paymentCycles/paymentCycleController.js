(function(){
    angular.module('paymentCycle').controller('PaymentCycleCtrl',[
        '$http',
        PaymentCycleController
    ])

    function PaymentCycleController($http) {
        const vm = this

        vm.create = function() {
            const url = 'https://payment-cycles.herokuapp.com/api/v1/paymentCycles'
            $http.post(url, vm.paymentCycle).then(function(response){
                vm.paymentCycle = {}
                console.log('Success!')
            })
        }
    }
})()