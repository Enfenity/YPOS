angular.module('YPOS').controller('UserUpdateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'UserService',
  '$window',
  function (
    $scope,
    $rootScope,
    $mdDialog,
    userService,
    $window
  ) {

    $scope.model = $rootScope.user;

    delete $rootScope.user;

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.save = function () {

      var payload = {
        firstName: $scope.model.firstName,
        lastName: $scope.model.lastName,
        email: $scope.model.email
      };

      userService.updateUser($scope.model._id, payload, function (err, response) {
        if (err) {
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {

          $rootScope.$broadcast("UserUpdated");
          $mdDialog.cancel();
        }
      });
    };

  }]);