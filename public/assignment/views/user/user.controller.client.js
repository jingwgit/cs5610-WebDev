(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $timeout) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            if (username === undefined || username === null || username === "") {
                vm.error = "Please enter your username";
                return;
            }
            if (password === undefined || password === "" || password === null) {
                vm.error = "Please enter your password";
                return;
            }
            UserService.findUserByCredentials(username, password)
                .then(function (user) {
                    $location.url("/user/" + user._id);
                }, function (error) {
                    vm.error = "Username " + username + " does not exist."
                    $timeout(function() {
                        vm.error = null;
                    }, 5000);
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Passwords don't match.";
                return;
            }

            UserService
                .findUserByUsername(username)
                .then(function (user) {
                    vm.error = "Username already exists";
                }, function (error) {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    UserService.createUser(newUser)
                        .then(function(user){
                            $location.url("/user/" + user._id);
                        },function(error){
                            console.log(error);
                        });

                });
        }
    }

    function ProfileController($routeParams, $location, $timeout, UserService) {
        var vm = this;
        userId = $routeParams.userId;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        init();

        function init() {
            UserService
                .findUserById(userId)
                .then(function (user) {
                    vm.user = user;
                }, function (error) {
                    vm.error = "User not found!";
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.message = "Profile changes saved! "
                });

            $timeout(function () {
                vm.message = null;
            }, 3000);
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                }, function () {
                    vm.error = "Unable to unregister you!"
                });
        }
    }
})();
