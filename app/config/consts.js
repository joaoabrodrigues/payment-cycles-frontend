angular.module('paymentCycle').constant('consts', {
    appName: 'Budget Manager',
    version: '1.0',
    owner: 'João Antônio Bezerra Rodrigues',
    year: '2017',
    site: 'http://joaoabrodrigues.com',
    apiUrl: 'https://payment-cycles.herokuapp.com/api',
    oapiUrl: 'https://payment-cycles.herokuapp.com/oapi',
    userKey: '_budget_manager_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])
