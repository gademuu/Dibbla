(function () {
'use strict';

    angular
        .module('authentication', [])
        .service('authenticationService', authenticationService)

    authenticationService.$inject = []

    function authenticationService() {
        const users = new Set([
            { id: 1, username: 'herman', password: 'dibbla', myItems: [{name: 'Magic cards', info:'They are fun to play with, some cards have a bit of a value.', id: 1}, {name: 'Old moped', info:'it has seen it best days..', id: 2}] },
            { id: 2, username: 'carl', password: 'dibbla', myItems: [{name: 'Laptop', id: 3}, {name: 'Screw driver', id: 4}]}
        ])

        function generateId() {
            let usersArr = Array.from(users)
            let highestId = usersArr[usersArr.length - 1].id

            return ++highestId
        }

        this.registerUser = function (username, password) {
            let user = {}
            user.username = username
            user.password = password
            user.id = generateId()

            return user
        }

        this.getUserById = function (userId) {
            return Array.from(users).find(x => x.id === userId)
        }

        this.getUserByCredentials = function (username, password) {
            return Array.from(users).find(x => x.username === username && x.password === password)
        }

        this.getUsers = function () {
            return users
        }

        this.deleteUser = function (user) {
            users.delete(user)
        }

    }
})()
