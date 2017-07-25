module.exports = function(app) {
    var widgetModel = require("../model/widget/widget.model.server");

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    //app.delete("/api/widget/:widgetId", deleteWidget);
    app.delete("/api/page/:pageId/widget/:widgetId", deleteWidgetFromPage);
    app.delete("/api/page/:pageId/widget", deleteWidgetsByPage);
    app.put("/page/:pageId/widget", sortWidgets);

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var name          = req.body.name;
        var myFile        = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        if(widgetId) {//for image edit
            for (var w in widgets) {
                if (parseInt(widgets[w]._id) === parseInt(widgetId)) {
                    widgets[w].url = './uploads/'+filename;
                    break;
                }
            }
            var callbackUrl   = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

            res.redirect(callbackUrl);
        } else {// for create new image
            var newImageId = new Date().getTime() + "";
            var newImage = {
                _id: newImageId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: width,
                url: './uploads/'+filename
            };
            widgets.push(newImage);
            var callbackUrl   = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newImageId;

            res.redirect(callbackUrl);

        }
    }

    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.final;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            });
    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.send(widget);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
               res.send(widgets);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
               res.send(widget);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteWidgetFromPage(req, res) {
        var widgetId = req.params.widgetId;
        var pageId = req.params.pageId;
        widgetModel
            .deleteWidgetFromPage(pageId, widgetId)
            .then(function (status) {
               res.send(status);
            });
    }

    function deleteWidgetsByPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .deleteWidgetsByPage(pageId)
            .then(function (status) {
                res.send(status);
            });
    }
};


