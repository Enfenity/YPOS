angular.module('YPOS').controller('ProviderController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ProviderService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    providerService,
    $window
  ){
    $scope.$on("ProviderCreated", function(){
      _setupList();
    });

    $scope.$on("ProviderUpdated", function(){
      _setupList();
    });

    $scope.$on("ProviderBusinessLinked", function(){
      _setupList();
    });

    $scope.addRecord = function(ev) {
      $mdDialog.show({
        controllerUrl: '../controllers/provider/ProviderCreateController.js',
        templateUrl: '../../templates/provider/provider-create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };

    _setupList();

    function _setupList(){
      $scope.showProgress = true;

      providerService.getAllProviders(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          for(var i = 0; i < response.data.length; i++){
            response.data[i].options = [
              {
                name: "Link Business",
                handle: function(item){
                  $rootScope.provider = item;
                  $mdDialog.show({
                    controllerUrl: '../controllers/provider/ProviderLinkBusinessController.js',
                    templateUrl: '../../templates/provider/provider-link-business.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  });
                }
              },
              {
                name: "Delete",
                handle: function(item){
                  providerService.deleteProvider(item._id, function(err, response){
                    if(err){
                      console.error(err);
                      $window.alert("Ooops, something went wrong");
                    } else {
                      _setupList();
                    }
                  });
                }
              }
            ];
          }

          $scope.models = response.data;
          $scope.showProgress = false;
        }
      });
    }
  }]);