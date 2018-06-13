angular.module('YPOS').controller('BusinessController', [
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
    $scope.$on("BusinessCreated", function(){
      _setupList();
    });

    $scope.$on("BusinessUpdated", function(){
      _setupList();
    });

    $scope.addRecord = function(ev) {
      $mdDialog.show({
        controllerUrl: '../controllers/business/BusinessCreateController.js',
        templateUrl: '../../templates/business/business-create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };

    _setupList();

    function _setupList(){
      $scope.showProgress = true;

      businessService.getAllBusinesses(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          for(var i = 0; i < response.data.length; i++){
            response.data[i].options = [
              {
                name: "Update",
                handle: function(item){
                  $rootScope.business = JSON.parse(JSON.stringify(item));
                  $mdDialog.show({
                    controllerUrl: '../controllers/business/BusinessUpdateController.js',
                    templateUrl: '../../templates/business/business-update.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  });
                }
              },
              {
                name: "Delete",
                handle: function(item){
                  businessService.deleteBusiness(item._id, function(err, response){
                    if(err){
                      console.error(err);
                      $window.alert("Ooops, something went wrong");
                    } else {
                      setTimeout(function(){
                        _setupList();
                      }, 500);

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