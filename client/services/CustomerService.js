angular.module('YPOS').service('CustomerService', [
  '$http',
  function(
    $http,
  ){

    this.getAllCustomers = function (callback){
      $http.get(
        `${constants.baseUrl}v1/customer`
      ).then(function (response) {
          return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.createCustomer = function (payload, callback) {
      $http.post(
        `${constants.baseUrl}v1/customer`,
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
        `${constants.baseUrl}v1/customer/${id}/business`,
        payload
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

    this.deleteCustomer = function (id, callback) {
      $http.delete(
        `${constants.baseUrl}v1/customer/${id}`
      ).then(function (response) {
        return callback(null, response);
        },
        function (err) {
          return callback(err, null);
        });
    };

  }]);