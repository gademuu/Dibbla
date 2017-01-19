(function () {
    'use strict'

    function MenuController($sessionStorage, $state) {
        const ctrl = this

        ctrl.user = $sessionStorage.user
        ctrl.goToItem = goToItem

        function goToItem(item) {
            $state.go('view-item', { item: item })
        }
        console.log('component ', ctrl.user)

    }

    angular
        .module('menu', [])
        .component('menu', {
            templateUrl: 'menu/menu.html',
            controller: MenuController,
            bindings: {

            }
        })

})()

