(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

    function NewWebsiteController($routeParams, $timeout, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        vm.createNewWebsite = createNewWebsite;

        function createNewWebsite() {
            if(vm.websiteName === null || vm.websiteName === undefined || vm.websiteName === ""){
                vm.errorText = "Website name cannot be empty";
                $timeout(function(){
                    vm.errorText = null;
                }, 3500);
                return;
            }
            newWebsite = {
                name: vm.websiteName,
                description: vm.websiteDescription
            };
            WebsiteService.createWebsite(vm.uid, newWebsite);
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            vm.websiteName = null;
            vm.websiteDescription = null;
        }
    }
    function EditWebsiteController($routeParams, $location, $window, WebsiteService, PageService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        vm.currentWebsite = WebsiteService.findWebsiteById(vm.wid);
        vm.currentWebsiteName = vm.currentWebsite.name;
        vm.currentWebsiteDescription = vm.currentWebsite.description;
        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;

        function editWebsite(){
            if(vm.currentWebsiteName === null || vm.currentWebsiteName === undefined || vm.currentWebsiteName === ""){
                vm.errorText = "website name cannot be empty";
                $timeout(function(){
                    vm.errorText = null;
                }, 3500);
                return;
            }
            var editedWebsite = {
                name: vm.currentWebsiteName,
                description: vm.currentWebsiteDescription
            };
            WebsiteService.updateWebsite(vm.wid, editedWebsite);
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            $location.url("/user/"+vm.uid+"/website");
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.wid);
            PageService.deletePagesByWebsite(vm.wid);
            $location.url("/user/"+vm.uid+"/website");
        }

    }

})();
