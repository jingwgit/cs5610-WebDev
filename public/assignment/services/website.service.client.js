(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService() {
            var websites = [
                {_id: "123", name: "Facebook", developerId: "456", description: "Test01"},
                {_id: "234", name: "Tweeter", developerId: "456", description: "Test02"},
                {_id: "456", name: "Gizmodo", developerId: "456", description: "Test03"},
                {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Test04"},
                {_id: "678", name: "Checkers", developerId: "123", description: "Test05"},
                {_id: "789", name: "Chess", developerId: "234", description: "Test06"}
            ];

            var services = {
                'createWebsite': createWebsite,
                'findWebsitesByUser': findWebsitesByUser,
                'findWebsiteById': findWebsiteById,
                'updateWebsite': updateWebsite,
                'deleteWebsiteById': deleteWebsiteById,
                'deleteWebsitesByUser': deleteWebsitesByUser
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

            return websites.reduce(getMaxId, 0).toString();
        }

        function createWebsite(userId, website) {
            var newWebsiteId = getNextId();
            var newWebsite = {
                _id: newWebsiteId,
                name: website.name,
                description: website.description,
                developerId: userId
            };
            websites.push(newWebsite);
        }

        function findWebsitesByUser(userId) {
            result = [];
            for (w in websites) {
                var website = websites[w];
                if (parseInt(website.developerId) === parseInt(userId)) {
                    result.push(website);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for (w in websites) {
                var website = websites[w];
                if (parseInt(website._id) === parseInt(websiteId)) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites[index].name = website.name;
            websites[index].description = website.description;
        }

        function deleteWebsiteById(websiteId) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1);
        }

        function deleteWebsitesByUser(userId) {
            for (w in websites) {
                website = websites[w];
                if (website.developerId === userId) {
                    deleteWebsiteById(website._id);
                }
            }
        }
    }
})();