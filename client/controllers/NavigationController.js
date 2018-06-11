angular.module('YPOS').controller('NavigationController', [
  '$scope',
  '$state',
  function($scope, $state){
    $scope.menu = [{
      title: 'User',
      icon: 'account_circle',
      clickHandler: function () {
        $state.go('user');
      }
    }];

  }]);