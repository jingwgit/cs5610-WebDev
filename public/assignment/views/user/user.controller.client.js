(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "Username does not exist.";
            } else {
                $location.url("/user/" + user._id);
            }
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
            var user = UserService.findUserByUsername(username);
            if (user === null) {
                user = {
                    username: username,
                    password: password,
                    firstName: "",
                    lastName: "",
                    email: ""
                };
                UserService.createUser(user);
                user = UserService.findUserByUsername(username);
                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Username already exists.";
            }
        }
    }

    function ProfileController($routeParams, $location, $timeout, UserService) {
        var vm = this;
        vm.user = UserService.findUserById($routeParams.userId);
        vm.updateUser = updateUser;

        function updateUser() {
            var updatedUser = {
                _id: $routeParams.userId,
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                email: vm.user.email
            };
            UserService.updateUser($routeParams.userId, updatedUser);
            vm.updatedMessage = "Profile changes saved!";

            $timeout(function () {
                vm.updatedMessage = null;
            }, 5000);
        }
    }
})();
