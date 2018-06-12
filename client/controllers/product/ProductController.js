angular.module('YPOS').controller('ProductController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ProductService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    productService,
    $window
  ){
    $scope.$on("ProductCreated", function(){
      _setupList();
    });

    $scope.$on("ProductUpdated", function(){
      _setupList();
    });

    $scope.getPaymentRequirement = function(value) {
      var stringValue = "Not Recognized";

      switch(value){
        case 0:
          stringValue = "Full";
          break;
        case 1:
          stringValue = "Pre-Authorized";
          break;
        case 2:
          stringValue = "Optional";
          break;
      }

      return stringValue;
    };

    $scope.addRecord = function(ev) {
      $mdDialog.show({
        controllerUrl: '../controllers/product/ProductCreateController.js',
        templateUrl: '../../templates/product/product-create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };

    _setupList();

    function _setupList(){
      $scope.showProgress = true;

      productService.getAllProducts(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          for(var i = 0; i < response.data.length; i++){
            response.data[i].options = [
              {
                name: "Update",
                handle: function(item){
                  $rootScope.product = JSON.parse(JSON.stringify(item));
                  $mdDialog.show({
                    controllerUrl: '../controllers/product/ProductUpdateController.js',
                    templateUrl: '../../templates/product/product-update.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  });
                }
              },
              {
                name: "Delete",
                handle: function(item){
                  productService.deleteProduct(item._id, function(err, response){
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