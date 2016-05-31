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


myApp.controller('APIController', ['$scope', '$http', function($scope, $http) {
  console.log('APIController running');
  var key = 'dbe92a3331ae40f8de244e72527278c5';
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = '';
  $scope.selectAnimal = 'dog';
  $scope.listPets = ['barnyard', 'bird', 'cat', 'dog', 'horse', 'pig', 'reptile', 'smallfurry']
  $scope.animal = {};
  getFavorites();
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
      description: $scope.animal.description.$t.substr(0,100)

    }


    $http.post('/pet', data)
      .then(function() {
        console.log('Post /pets')
        getFavorites();
      })


  }

  function getFavorites(){
    $http.get('/pet/favorites')
      .then(function (response){
        response.data.forEach(function (pet){

        });

        $scope.favorites = response.data;
        console.log($scope.favorites);
        $scope.count = $scope.favorites.length;
        console.log($scope.count);
      })
  }



}]);
