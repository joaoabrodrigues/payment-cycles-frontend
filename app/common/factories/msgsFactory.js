(function(){
    angular.module('paymentCycle').factory('msgs', [
        'toastr',
        MsgsFactory
    ])

    function MsgsFactory(toastr) {

        function addMsg(msgs, title, method) {
            if (msgs instanceof Array) {
                msgs.forEach(msg => toastr[method](msg, title))
            } else {
                toastr[method](msgs, title)
            }
        }

        function addSuccess(msgs) {
            addMsg(msgs, 'Success', 'success')
        }

        function addError(msg) {
            addMsg(msg, 'Error', 'error')
        }

        return { addSuccess, addError }
    }
})()