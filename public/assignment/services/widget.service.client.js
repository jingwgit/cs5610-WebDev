(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService() {
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

        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget
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

            return widgets.reduce(getMaxId, 0).toString();
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
                width: widget.width,
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


        function createWidget(pageId, widget) {
            var newWidgetId = getNextId();
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
            }

        }

        function findWidgetsByPageId(pageId) {
            result = [];
            for (w in widgets) {
                var widget = widgets[w];
                if (parseInt(widget.pageId) === parseInt(pageId)) {
                    result.push(widget);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for (w in widgets) {
                var widget = widgets[w];
                if (parseInt(widget._id) === parseInt(widgetId)) {
                    return widget;
                }
            }
            return null;
        }


        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            var type = oldWidget.widgetType;
            if(type === 'HEADING') {
                widgets[index].name = widget.name;
                widgets[index].text = widget.text;
                widgets[index].size = widget.size;
            } else if(type === 'IMAGE') {
                widgets[index].name = widget.name;
                widgets[index].text = widget.text;
                widgets[index].url = widget.url;
                widgets[index].width = widget.width;
            } else if(type === 'YOUTUBE') {
                widgets[index].name = widget.name;
                widgets[index].text = widget.text;
                widgets[index].url = widget.url;
                widgets[index].width = widget.width;
            }
        }

        function deleteWidget(widgetId) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widgets.splice(index, 1);
        }

    }
})();