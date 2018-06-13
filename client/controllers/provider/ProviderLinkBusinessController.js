angular.module('YPOS').controller('ProviderLinkBusinessController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ProviderService',
  'BusinessService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    providerService,
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

      providerService.linkBusiness($rootScope.provider._id, payload, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          setTimeout(function(){
            $rootScope.$broadcast("ProviderBusinessLinked");
            $mdDialog.cancel();
          }, 500);
        }
      });
    };

  }]);