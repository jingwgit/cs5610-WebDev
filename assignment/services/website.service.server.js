module.exports = function(app) {

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", description: "Test01"},
        {_id: "234", name: "Tweeter", developerId: "456", description: "Test02"},
        {_id: "456", name: "Gizmodo", developerId: "456", description: "Test03"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Test04"},
        {_id: "678", name: "Checkers", developerId: "123", description: "Test05"},
        {_id: "789", name: "Chess", developerId: "234", description: "Test06"}
    ];


    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.delete("/api/user/:userId/website", deleteWebsitesByUser);


    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        website._id = new Date().getTime() + "";
        website.developerId = userId;
        websites.push(website);
        res.send(website);
        // var newWebsiteId = getNextId();
        // var newWebsite = {
        //     _id: newWebsiteId,
        //     name: website.name,
        //     description: website.description,
        //     developerId: userId
        // };
        // websites.push(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var w in websites) {
            var website = websites[w];
            if (parseInt(website.developerId) === parseInt(userId)) {
                result.push(website);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            var website = websites[w];
            if (parseInt(website._id) === parseInt(websiteId)) {
                res.send(website);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        for (var w in websites) {
            if (parseInt(websites[w]._id) === parseInt(websiteId)) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if (parseInt(websites[w]._id) === parseInt(websiteId)) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsitesByUser(req, res) {
        var userId = req.params.userId;
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                websites.splice(w, 1);
                res.sendStatus(200);
            }
        }
    }
}


