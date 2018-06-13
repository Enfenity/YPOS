angular.module('YPOS').controller('CustomerCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'CustomerService',
  'UserService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    customerService,
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

      customerService.createCustomer(payload, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          setTimeout(function(){
            $rootScope.$broadcast("CustomerCreated");
            $mdDialog.cancel();
          }, 500);
        }
      });
    };

  }]);