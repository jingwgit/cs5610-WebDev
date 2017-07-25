(function () {
    angular
        .module("utility", [])
        .directive("wdSortable", wdSortable);

    function wdSortable() {

        function linker(scope, element, atrributes, $routeParams) {
            var pageId = $routeParams.pageId;
            console.log(pageId);
            var start = -1;
            var end = -1;
            $(element).sortable({
                start: function (event, ui) {
                    start = ($(ui.item).index());
                },
                stop: function (event, ui) {
                    end = ($(ui.item).index());
                    scope.sortableController.sortWidgets(start, end, pageId);
                }
            });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.sortWidgets = sortWidgets;

        function sortWidgets(start, end, pageId) {
            WidgetService.sortWidgets(start,end, pageId);
        }
    }
})();