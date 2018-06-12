angular.module('YPOS').service('ProviderService', [
  '$http',
  function(
    $http,
  ){

    this.getAllProviders = function (callback){
      $http.get(
        `${constants.baseUrl}v1/provider`
      ).then(function (response) {
          return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.createProvider = function (payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/provider`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.linkBusiness = function (id, payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/provider/${id}/business`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.deleteProvider = function (id, callback) {
      $http.delete(
        `${constants.baseUrl}v1/provider/${id}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

  }]);