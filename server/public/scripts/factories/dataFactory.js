myApp.factory('DataFactory', ['$http', function($http){
  console.log('dataFactory running');

  var favorites = undefined;

  function getFavoriteData(){
   var promise = $http.get('/pet/favorites')
    .then(function (response){
    favorites = response.data;
    })
    return promise;
  }

  function saveFavorite(data){
    var promise = $http.post('/pet', data)
    .then(function() {
      console.log('Post /pets')
      return getFavoriteData();
    })
    return promise;
  }


  var publicApi = {
    factorySaveFavorite: function(data){
      return saveFavorite(data);
    },

    factoryRefreshFavoriteData: function(){
      return getFavoriteData();
    },

    factoryGetFavorites: function(){
      return favorites;
    }

  };



  return publicApi;


}])
