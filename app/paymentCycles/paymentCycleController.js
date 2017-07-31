(function(){
    angular.module('paymentCycle').controller('PaymentCycleCtrl',[
        '$http',
        PaymentCycleController
    ])

    function PaymentCycleController($http) {
        const vm = this

        vm.create = function() {
            const url = 'http://localhost:3003/v1/api/paymentCycles'
            $http.post(url, vm.paymentCycle).then(function(response){
                vm.paymentCycle = {}
                console.log('Success!')
            })
        }
    }
})()