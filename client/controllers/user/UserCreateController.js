angular.module('YPOS').controller('UserCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'UserService',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    userService
  ){
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function() {
      userService.createUser($scope.model, function(err, response){
        if(err){
          userService.handleHttpError(err, $scope);
        } else {
          setTimeout(function(){
            $rootScope.$broadcast("UserCreated");
            $mdDialog.cancel();
          }, 500);
        }
      });
    };

  }]);