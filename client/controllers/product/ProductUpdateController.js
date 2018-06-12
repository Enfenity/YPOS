angular.module('YPOS').controller('ProductUpdateController', [
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
    var productId = $rootScope.product._id;

    $scope.model = {
      name: $rootScope.product.name,
      description: $rootScope.product.description,
      price:$rootScope.product.price,
      tax: $rootScope.product.tax,
      qtyInStock: $rootScope.product.qtyInStock,
      paymentRequirement: $rootScope.product.paymentRequirement,
      currency: $rootScope.product.currency
    };

    delete $rootScope.product;
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function() {

      $scope.model.price = parseInt($scope.model.price);
      $scope.model.tax = parseInt($scope.model.tax);
      $scope.model.qtyInStock = parseInt($scope.model.qtyInStock);
      $scope.model.paymentRequirement = parseInt($scope.model.paymentRequirement);

      productService.updateProduct(productId, $scope.model, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          setTimeout(function(){
            $rootScope.$broadcast("ProductUpdated");
            $mdDialog.cancel();
          }, 500);
        }
      });
    };

  }]);