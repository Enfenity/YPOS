angular.module('YPOS').controller('BusinessCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'BusinessService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    businessService,
    $window
  ){
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function() {
      businessService.createBusiness($scope.model, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          $rootScope.$broadcast("BusinessCreated");
          $mdDialog.cancel();
        }
      });
    };

  }]);