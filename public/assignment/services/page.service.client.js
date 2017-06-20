(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var services = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "deletePagesByWebsite" : deletePagesByWebsite
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return pages.reduce(getMaxId, 0).toString();
        }

        function createPage(websiteId, page) {
            var newPageId = getNextId();
            var newPage = {
                _id: newPageId,
                name: page.name,
                websiteId: websiteId,
                title: page.title
            };
            pages.push(newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            function filterByWebsiteId(page){
                return page.websiteId === websiteId;
            }
            result = pages.filter(filterByWebsiteId);
            return result;
        }

        function findPageById(pageId) {
            for (p in pages){
                var page = pages[p];
                if(parseInt(page._id) === parseInt(pageId)){
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            pages[index].name = page.name;
            pages[index].description = page.description;
        }

        function deletePage(pageId) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);
            pages.splice(index);
        }

        function deletePagesByWebsite(websiteId){
            for(p in pages){
                var page = pages[p];
                if(page.websiteId === websiteId){
                    deletePage(page._id);
                }
            }
        }
    }
})();