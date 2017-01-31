(function () {
    'use strict'

    angular
        .module('authentication')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authenticationService', '$sessionStorage', '$state', '$timeout', 'Upload'];
    function RegisterController(authenticationService, $sessionStorage, $state, $timeout, Upload) {
        const vm = this

        vm.registerUser = registerUser
        vm.ProfilePicture = {}
        vm.user = {}

        function registerUser() {
            Upload.base64DataUrl(vm.ProfilePicture).then(
                function successCallback(base64Url) {
                    vm.ProfilePicture.Image = base64Url
                    vm.user.ProfilePicture = vm.ProfilePicture

                    authenticationService.registerUser(vm.user)
                        .then(function (response) {
                            console.log('Success: ', response.status)
                            $sessionStorage.user = response.data
                            $state.go('item-list')
                    },
                    function errorCallback(response){
                        console.log('Fail: ', response.status)
                    })
                }, function errorCallback(response) {
                    console.log('Fail: ', { error: { "message": response.data } })
            })
        }
    }
})();