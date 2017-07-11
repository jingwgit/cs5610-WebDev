(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "deletePagesByWebsite" : deletePagesByWebsite
        };
        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
            // var newPageId = getNextId();
            // var newPage = {
            //     _id: newPageId,
            //     name: page.name,
            //     websiteId: websiteId,
            //     description: page.description
            // };
            // pages.push(newPage);
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var result = [];
            // function filterByWebsiteId(page){
            //     return page.websiteId === websiteId;
            // }
            // result = pages.filter(filterByWebsiteId);
            // return result;
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId ;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // for (p in pages){
            //     var page = pages[p];
            //     if(parseInt(page._id) === parseInt(pageId)){
            //         return page;
            //     }
            // }
            // return null;
        }

        function updatePage(pageId, page) {
            var url = "/api/page/"+ pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
            // var oldPage = findPageById(pageId);
            // var index = pages.indexOf(oldPage);
            // pages[index].name = page.name;
            // pages[index].description = page.description;
        }

        function deletePage(pageId) {
            var url = "/api/page/"+ pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // var oldPage = findPageById(pageId);
            // var index = pages.indexOf(oldPage);
            // pages.splice(index, 1);
        }

        function deletePagesByWebsite(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // for(p in pages){
            //     var page = pages[p];
            //     if(page.websiteId === websiteId){
            //         deletePage(page._id);
            //     }
            // }
        }
    }
})();