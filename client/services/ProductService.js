angular.module('YPOS').service('ProductService', [
  '$http',
  function(
    $http,
  ){

    this.getAllProducts = function (callback){
      $http.get(
        `${constants.baseUrl}v1/product`
      ).then(function (response) {
          return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.createProduct = function (payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/product`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.updateProduct = function (id, payload, callback) {
      $http.put(
        `${constants.baseUrl}v1/product/${id}`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.deleteProduct = function (id, callback) {
      $http.delete(
        `${constants.baseUrl}v1/product/${id}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

  }]);