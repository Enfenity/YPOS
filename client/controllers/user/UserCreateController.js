angular.module('YPOS').controller('UserCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'UserService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    userService,
    $window
  ){
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function() {
      userService.createUser($scope.model, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          $rootScope.$broadcast("UserCreated");
          $mdDialog.cancel();
        }
      });
    };

  }]);