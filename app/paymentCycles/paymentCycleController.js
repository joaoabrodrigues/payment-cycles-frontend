(function(){
    angular.module('paymentCycle').controller('PaymentCycleCtrl',[
        '$http',
        '$location',
        'msgs',
        'tabs',
        'consts',
        PaymentCycleController
    ])

    function PaymentCycleController($http, $location, msgs, tabs, consts) {
        const vm = this
        const url = 'https://payment-cycles.herokuapp.com/api/v1/paymentCycles'

        vm.refresh = function() {
            const page = parseInt($location.search().page) || 1
            $http.defaults.headers.common.userEmail = JSON.parse(localStorage.getItem(consts.userKey)).email
            $http.get(`${url}/getByUser?skip=${(page - 1) * 10}&limit=10`).then(function(response) {
                vm.paymentCycle = {credits: [{}], debts: [{status: 'PENDENTE'}]}
                vm.paymentCycles = response.data
                vm.calculateValues()

                $http.get(`${url}/count`).then(function(response) {
                    vm.pages = Math.ceil(response.data.value / 10)
                    tabs.show(vm, {tabList: true, tabCreate: true})
                })
           })
        }

        vm.showTabList = function() {
           tabs.show(vm, {})
           vm.refresh()
        }

        vm.showTabUpdate = function(paymentCycle) {
            vm.paymentCycle = paymentCycle
            vm.calculateValues()
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(paymentCycle) {
            vm.paymentCycle = paymentCycle
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        vm.create = function() {
            vm.paymentCycle.userEmail = JSON.parse(localStorage.getItem(consts.userKey)).email
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

        vm.addCredit = function(index) {
            vm.paymentCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value, date}) {
            vm.paymentCycle.credits.splice(index + 1, 0, {name, value, date})
            vm.calculateValues()
        }

        vm.deleteCredit = function(index) {
            if (vm.paymentCycle.credits.length > 1) {
                vm.paymentCycle.credits.splice(index, 1)
            } else {
                vm.paymentCycle.credits = [{}]
            }
            vm.calculateValues()
        }

        vm.addDebt = function(index) {
            vm.paymentCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status, date}) {
            vm.paymentCycle.debts.splice(index + 1, 0, {name, value, status, date})
            vm.calculateValues()
        }

        vm.deleteDebt = function(index) {
            if (vm.paymentCycle.debts.length > 1) {
                vm.paymentCycle.debts.splice(index, 1)
            } else {
                vm.paymentCycle.debts = [{}]
            }
            vm.calculateValues()
        }

        vm.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0

            if (vm.paymentCycle) {
                vm.paymentCycle.credits.forEach(function({value}) {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.paymentCycle.debts.forEach(function({value}) {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.total = vm.credit - vm.debt
            }
        }

        vm.refresh()
    }
})()