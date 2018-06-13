angular.module('YPOS').controller('ProviderCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ProviderService',
  'UserService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    providerService,
    userService,
    $window
  ){
    var vm = this;

    $scope.showProgress = true;
    $scope.dependenciesLoaded = false;

    _loadDependencies();

    function _loadDependencies(){

      userService.getAllUsers(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          $scope.users = response.data;
          $scope.showProgress = false;
          $scope.dependenciesLoaded = true;
        }
      });
    }

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function() {
      var payload = {
        user: {
          firstName: vm.user.firstName,
          lastName: vm.user.lastName,
          email: vm.user.email
        }
      };

      providerService.createProvider(payload, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          setTimeout(function(){
            $rootScope.$broadcast("ProviderCreated");
            $mdDialog.cancel();
          }, 500);
        }
      });
    };

  }]);