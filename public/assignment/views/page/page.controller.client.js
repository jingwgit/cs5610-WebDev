(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
    }
    function NewPageController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.createPage = createPage;

        function createPage() {
            if(vm.pageName === null || vm.pageName === undefined || vm.pageName === ""){
                vm.error = "Page name cannot be empty";
                $timeout(function(){
                    vm.error = null;
                }, 3500);
                return;
            }
            var newPage = {
                name: vm.pageName,
                description: vm.pageDescription
            };
            PageService.createPage(vm.websiteId, newPage);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.pageName = null;
            vm.pageDescription = null;
        }
    }
    function EditPageController($routeParams, $location, $timeout, PageService, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.currentPage = PageService.findPageById(vm.pageId);
        vm.editPage = editPage;
        vm.deletePage = deletePage;

        function editPage() {
            if(vm.currentPage.name === null
                || vm.currentPage.name === undefined
                || vm.currentPage.name === ""){
                vm.error = "Page name cannot be empty";
                $timeout(function(){
                    vm.error = null;
                }, 3500);
                return;
            }
            var editedPage = {
                name: vm.currentPage.name,
                description: vm.currentPage.description
            };
            PageService.updatePage(vm.pageId, editedPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage() {
            PageService.deletePageById(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();