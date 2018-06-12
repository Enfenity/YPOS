angular.module('YPOS').controller('ShoppingCartController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ShoppingCartService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    shoppingCartService,
    $window
  ){
    $scope.$on("ShoppingCartCreated", function(){
      _setupList();
    });

    $scope.addRecord = function(ev) {
      $mdDialog.show({
        controllerUrl: '../controllers/shopping-cart/ShoppingCartCreateController.js',
        templateUrl: '../../templates/shopping-cart/shopping-cart-create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };
    $scope.getItemChips = function(items){

      var mapped = [];
      
      for(var i = 0; i < items.length; i++){
        mapped.push(`${items[i].product.name} * ${items[i].qty}`);
      }
      
      return mapped;
    };

    _setupList();

    function _setupList(){
      $scope.showProgress = true;

      shoppingCartService.getAllCarts(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          
          for(var j = 0; j < response.data.length; j++){
            response.data[j].options = [
              {
                name: "Delete",
                handle: function(item){
                  shoppingCartService.deleteCart(item._id, function(err, response){
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