angular.module('YPOS').controller('CustomerLinkBusinessController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'CustomerService',
  'BusinessService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    customerService,
    businessService,
    $window
  ){

    var vm = this;

    $scope.showProgress = true;
    $scope.dependenciesLoaded = false;

    _loadDependencies();

    function _loadDependencies(){

      businessService.getAllBusinesses(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          $scope.businesses = response.data;
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
        name: vm.business.name
      };

      customerService.linkBusiness($rootScope.customer._id, payload, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          $rootScope.$broadcast("CustomerBusinessLinked");
          $mdDialog.cancel();
        }
      });
    };

  }]);