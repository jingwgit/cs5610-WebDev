(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        init();

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });
        }
    }

    function NewWebsiteController($routeParams, $location, $timeout, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        init();

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });
        }

        function createWebsite() {
            if(vm.name === null || vm.name === undefined || vm.name === ""){
                vm.error = "Website name cannot be empty";
                $timeout(function(){
                    vm.error = null;
                }, 3500);
                return;
            }
            var newWebsite = {
                name: vm.name,
                description: vm.description
            };
            WebsiteService
                .createWebsite(vm.userId, newWebsite)
                .then(function () {
                    vm.message = "Successfully created new website!";
                    $timeout(function(){
                        vm.message = null;
                    }, 3500);
                }, function () {
                    vm.error = "Unable to create website!"
                    $timeout(function(){
                        vm.error = null;
                    }, 3500);
            });

            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });

            vm.name = null;
            vm.description = null;
            //$location.url("/user/" + vm.userId + "/website");
        }
    }
    function EditWebsiteController($routeParams, $location, WebsiteService, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;

        init();

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (cur) {
                    vm.currentWebsite = cur;
                });
        }


        function editWebsite(){
            if(vm.currentWebsite.name === null
                || vm.currentWebsite.name === undefined
                || vm.currentWebsite.name === ""){
                vm.error = "website name cannot be empty";
                $timeout(function(){
                    vm.error = null;
                }, 3500);
                return;
            }
            var editedWebsite = {
                name: vm.currentWebsite.name,
                description: vm.currentWebsite.description
            };
            WebsiteService
                .updateWebsite(vm.websiteId, editedWebsite)
                .then(function () {
                    vm.message = "Website changes saved!"
                    $timeout(function(){
                        vm.error = null;
                    }, 3500);
                });

            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });

            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite(){
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function () {
                    PageService
                        .deletePagesByWebsite(vm.websiteId);
                    $location.url("/user/"+vm.userId+"/website");
                }, function () {
                    vm.error = "Unable to delete website!"
                    $timeout(function(){
                        vm.error = null;
                    }, 3500);
                });
        }

    }

})();
