angular.module('imageBrowserApp', [])
.controller('ImageController', function($scope, $http) {
    $scope.imageRows = [];
    $scope.selectedImage = null;

    // Fetching images from picsum.photos
    $http.get('https://picsum.photos/list')
        .then(function(response) {
            var images = response.data.map(function(imageData) {
                return {
                    id: imageData.id,
                    url: 'https://picsum.photos/id/' + imageData.id + '/50/50'
                };
            });

            // Limit to 3 rows with 10 images per row
            var imagesPerRow = 10;
            var numRows = 3;
            for (var i = 0; i < images.length && i < numRows * imagesPerRow; i += imagesPerRow) {
                $scope.imageRows.push(images.slice(i, i + imagesPerRow));
            }
        });

    $scope.selectImage = function(image) {
        $scope.selectedImage = {
            id: image.id,
            url: 'https://picsum.photos/id/' + image.id + '/350/350'
        };
    };
});