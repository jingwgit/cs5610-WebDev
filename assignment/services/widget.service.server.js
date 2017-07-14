module.exports = function(app) {

    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    //
    // ];
    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    ];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads'});

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

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", sortWidgets);

    function sortWidgets(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }




    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        var newWidgetId = new Date().getTime() + "";
        var newWidget = null;
        if(widget.widgetType === 'HEADING') {
            newWidget = createHeader(pageId, widget, newWidgetId);
        } else if(widget.widgetType === 'IMAGE') {
            newWidget = createImage(pageId, widget, newWidgetId);
        } else if(widget.widgetType === 'YOUTUBE') {
            newWidget = createYouTube(pageId, widget, newWidgetId);
        }

        if(newWidget !== null) {
            widgets.push(newWidget);
            res.send(widget);
        } else {
            res.sendStatus(404);
        }
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for (var w in widgets) {
            var widget = widgets[w];
            if (parseInt(widget.pageId) === parseInt(pageId)) {
                result.push(widget);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            var widget = widgets[w];
            if (parseInt(widget._id) === parseInt(widgetId)) {
                res.send(widget);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        var index = null;
        for (var w in widgets) {
            if (parseInt(widgets[w]._id) === parseInt(widgetId)) {
                index = w;
                break;
            }
        }
        if(index === null) {
            console.log("index = null");
            res.sendStatus(404);
            return;
        }

        var type = widget.widgetType;
        if(type === 'HEADING') {
            widgets[index].name = widget.name;
            widgets[index].text = widget.text;
            widgets[index].size = widget.size;
            res.sendStatus(200);
        } else if(type === 'IMAGE') {
            widgets[index].name = widget.name;
            widgets[index].text = widget.text;
            widgets[index].url = widget.url;
            widgets[index].width = widget.width;
            res.sendStatus(200);
        } else if(type === 'YOUTUBE') {
            widgets[index].name = widget.name;
            widgets[index].text = widget.text;
            widgets[index].url = widget.url;
            widgets[index].width = widget.width;
            res.sendStatus(200);
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (parseInt(widgets[w]._id) === parseInt(widgetId)) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createHeader(pageId, widget, widgetId) {
        var newHeader = {
            _id: widgetId,
            widgetType: 'HEADING',
            pageId: pageId,
            size: widget.size,
            text: widget.text,
            name: widget.name

        }
        return newHeader;
    }

    function createImage(pageId, widget, widgetId) {
        var newImage = {
            _id: widgetId,
            widgetType: 'IMAGE',
            pageId: pageId,
            name: widget.name,
            width: width,
            url: widget.url
        }
        return newImage;
    }

    function createYouTube(pageId, widget, widgetId) {
        var newYouTube = {
            _id: widgetId,
            widgetType: 'YOUTUBE',
            pageId: pageId,
            name: widget.name,
            width: widget.width,
            url: widget.url
        }
        return newYouTube;
    }

}


