angular.module('YPOS').service('ShoppingCartService', [
  '$http',
  function(
    $http,
  ){

    this.getAllCarts = function (callback){
      $http.get(
        `${constants.baseUrl}v1/shopping-cart`
      ).then(function (response) {
          return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.createCart = function (payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/shopping-cart`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.addItem = function (id, payload, callback) {
      // $http.post(
      //   `${constants.baseUrl}v1/shopping-cart/${id}/item`,
      //   payload
      // ).then(function (response) {
      //   return callback(null, response);
      //   },
      //   function (err) {
      //     return callback(err, null);
      //   });
    };

    this.removeItem = function (id, itemId, callback) {
      $http.delete(
        `${constants.baseUrl}v1/shopping-cart/${id}/item/${itemId}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.deleteCart = function (id, callback) {
      $http.delete(
        `${constants.baseUrl}v1/shopping-cart/${id}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

  }]);