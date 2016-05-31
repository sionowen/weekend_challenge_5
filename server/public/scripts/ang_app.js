var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "HomeController"
    })
    .when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: "FavoritesController"
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);


myApp.controller('APIController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory ) {

  var key = 'dbe92a3331ae40f8de244e72527278c5';
  var baseURL = 'http://api.petfinder.com/';
  $scope.dataFactory = DataFactory;
  $scope.breed = '';
  $scope.selectAnimal = 'dog';
  $scope.listPets = ['barnyard', 'bird', 'cat', 'dog', 'horse', 'pig', 'reptile', 'smallfurry']
  $scope.animal = {};

  $scope.getRandomAnimal = function(targetAnimal) {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + targetAnimal;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {

        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;
        console.log($scope.animal);
      }
    )
  }

  // petId: { type: String, required: true },
  // petName: { type: String, required: false},
  // imgURL: { type: String, required: false},
  // description: { type: String, required: false},
  $scope.addToFavorites = function(){
    var data = {
      petId: $scope.animal.id.$t,
      petName: $scope.animal.name.$t,
      imgURL: $scope.animal.media.photos.photo[3].$t,
      description: $scope.animal.description.$t.substr(0,100),
      species: $scope.animal.animal.$t
    }

    $scope.dataFactory.factorySaveFavorite(data).then(function(){
      $scope.count = $scope.dataFactory.factoryGetFavorites().length;
    })

  }


  $scope.favorites = [];
  $scope.count = 0;



    if($scope.dataFactory.factoryGetFavorites() === undefined) {
      $scope.dataFactory.factoryRefreshFavoriteData().then(function(){
        $scope.favorites = _($scope.dataFactory.factoryGetFavorites()).sortBy('species').value();
        $scope.count = $scope.favorites.length;
      });

    } else{
      $scope.favorites = _($scope.dataFactory.factoryGetFavorites()).sortBy('species').value();
      $scope.count = $scope.favorites.length;
    }


        // $scope.favorites = _(response.data).sortBy('species').value();
        // console.log('scope favorites', $scope.favorites);
        // $scope.count = $scope.favorites.length;
        // console.log('count', $scope.count);





}]);
