angular.module('YPOS').controller('BusinessUpdateController', [
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

    $scope.model = $rootScope.business;

    delete $rootScope.business;
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function() {
      
      var payload = {
        name: $scope.model.name
      };

      businessService.updateBusiness($scope.model._id, payload, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          setTimeout(function(){
            $rootScope.$broadcast("BusinessUpdated");
            $mdDialog.cancel();
          }, 500);
        }
      });
    };

  }]);