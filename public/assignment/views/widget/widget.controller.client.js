
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);


    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        vm.getWidgetUrlForType = getWidgetUrlForType;
        //vm.trustThisContent = trustThisContent;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function getWidgetUrlForType(widgetType) {
            return 'views/widget/widget-' + widgetType.toLowerCase() +'.view.client.html';
        }

        // function trustThisContent(html) {
        //     //diligence to scrub any unsafe content
        //     return $sce.trustAsHtml(html);
        // }

        function getYoutubeEmbedUrl(link) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkParts = link.split('/');
            var id = linkParts[linkParts.length-1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        //vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
    }

    function CreateWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetType = $routeParams.widgetType;
        vm.createWidget = createWidget;
        vm.error = null;

        function createWidget() {
            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (vm.widgetUrl === null || vm.widgetUrl === undefined) {
                    vm.error = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING') {
                if (vm.widgetText === null || vm.widgetText === undefined) {
                    vm.error = "Text is required for Header";
                    return;
                }
            }
            var newWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            WidgetService.createWidget(vm.pageId, newWidget);
            console.log(WidgetService.findWidgetsByPageId(vm.pageId));
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.currentWidget = WidgetService.findWidgetById(vm.widgetId);
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;

        if (vm.currentWidget.widgetType === "HEADING") {
            vm.widgetName = vm.currentWidget.name;
            vm.widgetText = vm.currentWidget.text;
            vm.widgetSize = vm.currentWidget.size;
        } else if (vm.currentWidget.widgetType === "IMAGE") {
            vm.widgetName = vm.currentWidget.name;
            vm.widgetText = vm.currentWidget.text;
            vm.widgetUrl = vm.currentWidget.url;
            vm.widgetWidth = vm.currentWidget.width;
        } else if (vm.currentWidget.widgetType === "YOUTUBE") {
            vm.widgetName = vm.currentWidget.name;
            vm.widgetText = vm.currentWidget.text;
            vm.widgetUrl = vm.currentWidget.url;
            vm.widgetWidth = vm.currentWidget.width;
        }

        function editWidget() {
            var editedWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.currentWidget.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            WidgetService.updateWidget(vm.widgetId, editedWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

    }
})();