angular.module('YPOS').controller('ProductCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ProductService',
  'BusinessService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    productService,
    businessService,
    $window
  ){
    var vm = this;

    $scope.model = {
      paymentRequirement: 0
    };

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

      $scope.model.business = {
        name: vm.business.name,
        id: vm.business._id
      };

      $scope.model.price = parseInt($scope.model.price);
      $scope.model.tax = parseInt($scope.model.tax);
      $scope.model.qtyInStock = parseInt($scope.model.qtyInStock);
      $scope.model.paymentRequirement = parseInt($scope.model.paymentRequirement);

      productService.createProduct($scope.model, function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          $rootScope.$broadcast("ProductCreated");
          $mdDialog.cancel();
        }
      });
    };

  }]);