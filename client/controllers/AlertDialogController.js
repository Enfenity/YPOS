angular.module('YPOS').controller('AlertDialogController', [
  '$scope',
  '$mdDialog',
  function($scope, $mdDialog){
    $scope.ok = function() {
      $mdDialog.cancel();
    };

  }]);