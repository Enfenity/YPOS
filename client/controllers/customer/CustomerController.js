angular.module('YPOS').controller('CustomerController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'CustomerService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    customerService,
    $window
  ){
    $scope.$on("CustomerCreated", function(){
      _setupList();
    });

    $scope.$on("CustomerUpdated", function(){
      _setupList();
    });

    $scope.$on("CustomerBusinessLinked", function(){
      _setupList();
    });

    $scope.addRecord = function(ev) {
      $mdDialog.show({
        controllerUrl: '../controllers/customer/CustomerCreateController.js',
        templateUrl: '../../templates/customer/customer-create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };

    _setupList();

    function _setupList(){
      $scope.showProgress = true;

      customerService.getAllCustomers(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          for(var i = 0; i < response.data.length; i++){
            response.data[i].options = [
              {
                name: "Link Business",
                handle: function(item){
                  $rootScope.customer = item;
                  $mdDialog.show({
                    controllerUrl: '../controllers/customer/CustomerLinkBusinessController.js',
                    templateUrl: '../../templates/customer/customer-link-business.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  });
                }
              },
              {
                name: "Delete",
                handle: function(item){
                  customerService.deleteCustomer(item._id, function(err, response){
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