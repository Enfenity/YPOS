angular.module('YPOS').service('BusinessService', [
  '$http',
  function(
    $http,
  ){

    this.getAllBusinesses = function (callback){
      $http.get(
        `${constants.baseUrl}v1/business`
      ).then(function (response) {
          return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.createBusiness = function (payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/business`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.updateBusiness = function (id, payload, callback) {
      
      $http.put(
        `${constants.baseUrl}v1/business/${id}`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.deleteBusiness = function (id, callback) {
      $http.delete(
        `${constants.baseUrl}v1/business/${id}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

  }]);