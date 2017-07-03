(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }

    function NewWebsiteController($routeParams, $location, $timeout, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.createWebsite = createWebsite;

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
            WebsiteService.createWebsite(vm.userId, newWebsite);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.name = null;
            vm.description = null;
            //$location.url("/user/" + vm.userId + "/website");
        }
    }
    function EditWebsiteController($routeParams, $location, WebsiteService, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.currentWebsite = WebsiteService.findWebsiteById(vm.websiteId);
        // vm.currentWebsiteName = vm.currentWebsite.name;
        // vm.currentWebsiteDescription = vm.currentWebsite.description;
        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;

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
            WebsiteService.updateWebsite(vm.websiteId, editedWebsite);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsiteById(vm.websiteId);
            PageService.deletePagesByWebsiteId(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }

    }

})();
