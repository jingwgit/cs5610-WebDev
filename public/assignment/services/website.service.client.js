(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http) {
            var websites = [
                {_id: "123", name: "Facebook", developerId: "456", description: "Test01"},
                {_id: "234", name: "Tweeter", developerId: "456", description: "Test02"},
                {_id: "456", name: "Gizmodo", developerId: "456", description: "Test03"},
                {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Test04"},
                {_id: "678", name: "Checkers", developerId: "123", description: "Test05"},
                {_id: "789", name: "Chess", developerId: "234", description: "Test06"}
            ];

            var api = {
                'createWebsite': createWebsite,
                'findAllWebsitesForUser': findAllWebsitesForUser,
                'findWebsiteById': findWebsiteById,
                'updateWebsite': updateWebsite,
                'deleteWebsite': deleteWebsite,
                'deleteWebsitesByUser': deleteWebsitesByUser
            };
            return api;

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
            // var newWebsiteId = getNextId();
            // var newWebsite = {
            //     _id: newWebsiteId,
            //     name: website.name,
            //     description: website.description,
            //     developerId: userId
            // };
            // websites.push(newWebsite);
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // result = [];
            // for (w in websites) {
            //     var website = websites[w];
            //     if (parseInt(website.developerId) === parseInt(userId)) {
            //         result.push(website);
            //     }
            // }
            // return result;
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId ;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // for (w in websites) {
            //     var website = websites[w];
            //     if (parseInt(website._id) === parseInt(websiteId)) {
            //         return website;
            //     }
            // }
            // return null;
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+ websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
            // var oldWebsite = findWebsiteById(websiteId);
            // var index = websites.indexOf(oldWebsite);
            // websites[index].name = website.name;
            // websites[index].description = website.description;
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // var oldWebsite = findWebsiteById(websiteId);
            // var index = websites.indexOf(oldWebsite);
            // websites.splice(index, 1);
        }

        function deleteWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            // for (w in websites) {
            //     website = websites[w];
            //     if (website.developerId === userId) {
            //         deleteWebsiteById(website._id);
            //     }
            // }
        }
    }
})();