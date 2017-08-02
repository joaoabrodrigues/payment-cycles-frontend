(function(){
    angular.module('paymentCycle').controller('PaymentCycleCtrl',[
        '$http',
        'msgs',
        'tabs',
        PaymentCycleController
    ])

    function PaymentCycleController($http, msgs, tabs) {
        const vm = this
        const url = 'https://payment-cycles.herokuapp.com/api/v1/paymentCycles'

        vm.refresh = function() {
           $http.get(url).then(function(response) {
                vm.paymentCycle = {}
                vm.paymentCycles = response.data
                tabs.show(vm, {tabList: true, tabCreate: true})
           })
        }

        vm.showTabList = function() {
           tabs.show(vm, {})
           vm.refresh()
        }

        vm.showTabUpdate = function(paymentCycle) {
            vm.paymentCycle = paymentCycle
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(paymentCycle) {
            vm.paymentCycle = paymentCycle
            tabs.show(vm, {tabDelete: true})
        }

        vm.create = function() {
            $http.post(url, vm.paymentCycle).then(function(){
                vm.showTabList()
                msgs.addSuccess('Create Successful!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.update = function() {
            const updateUrl = `${url}/${vm.paymentCycle._id}`
            $http.put(updateUrl, vm.paymentCycle).then(function() {
                vm.refresh()
                msgs.addSuccess('Update Successful!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.delete = function() {
            const deleteUrl = `${url}/${vm.paymentCycle._id}`
            $http.delete(deleteUrl, vm.paymentCycle).then(function(){
                vm.refresh()
                msgs.addSuccess('Delete Successful!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.refresh()
    }
})()