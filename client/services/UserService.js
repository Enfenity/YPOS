angular.module('YPOS').service('UserService', [
  '$http',
  '$window',
  function(
    $http,
    $window
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

    this.handleHttpError = function (err, scope) {

      var validationError = false;

      if(err.data && err.data.results && err.data.results.errors && err.data.results.errors.length > 0) {
        switch(err.data.results.errors[0].code){
          case 100001:
            validationError = true;
            scope.emailAlreadyExistsError = err.data.results.errors[0].message;
            break;
        }
      }

      if(!validationError) {
        console.error(err);
        $window.alert("Ooops, something went wrong");
      }

    }

  }]);