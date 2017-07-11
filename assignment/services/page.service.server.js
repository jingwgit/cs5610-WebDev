module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];


    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.delete("/api/website/:websiteId/page", deletePagesByWebsiteId);



    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._id = new Date().getTime() + "";
        page.websiteId = websiteId;
        pages.push(page);
        res.send(page);
        // var newWebsiteId = getNextId();
        // var newWebsite = {
        //     _id: newWebsiteId,
        //     name: website.name,
        //     description: website.description,
        //     developerId: userId
        // };
        // websites.push(newWebsite);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for (var p in pages) {
            var page = pages[p];
            if (parseInt(page.websiteId) === parseInt(websiteId)) {
                result.push(page);
            }
        }
        res.send(result);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            var page = pages[p];
            if (parseInt(page._id) === parseInt(pageId)) {
                res.send(page);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        for (var p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pageId)) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pageId)) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                pages.splice(p, 1);
                res.sendStatus(200);
            }
        }
    }
}


