(function () {
    angular
        .module("WebAppMaker")
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key =  "52d1d529d452712f85d4405dbfda9551";
        var secret = "8c74c37439c06498";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);

        }
    }
})();