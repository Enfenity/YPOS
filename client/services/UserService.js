angular.module('YPOS').service('UserService', [
  '$http',
  function(
    $http,
  ){

    this.getAllUsers = function (callback){
      $http.get(
        `${constants.baseUrl}v1/user`
      ).then(function (response) {
          return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.createUser = function (payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/user`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.updateUser = function (id, payload, callback) {
      
      $http.put(
        `${constants.baseUrl}v1/user/${id}`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.deleteUser = function (id, callback) {
      $http.delete(
        `${constants.baseUrl}v1/user/${id}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

  }]);