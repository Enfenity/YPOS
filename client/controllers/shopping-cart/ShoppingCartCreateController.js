angular.module('YPOS').controller('ShoppingCartCreateController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'ShoppingCartService',
  'ProductService',
  '$q',
  '$http',
  '$window',
  function (
    $scope,
    $rootScope,
    $mdDialog,
    cartService,
    productService,
    $q,
    $http,
    $window) {

    var vm = this;

    $scope.showProgress = false;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.buy = function () {
      // create a shopping cart
      var items = [];

      // Loop over the list of products and them to the cart
      for(var i = 0; i < $scope.products.length; i++) {
        var singleProduct = $scope.products[i];

        if(singleProduct.qtyToBuy && singleProduct.qtyToBuy > 0){
          items.push({
            "type": 0,
            "product": {
              "business": {
                "name": singleProduct.business.name
              },
              "name": singleProduct.name,
              "description": singleProduct.description,
              "price": singleProduct.price,
              "tax": singleProduct.tax,
              "qtyInStock": singleProduct.qtyInStock,
              "paymentRequirement": singleProduct.paymentRequirement,
              "currency": singleProduct.currency
            },
            "qty": parseInt(singleProduct.qtyToBuy)
          });
        }

      }

      var cartPayload = {
        customer: {
          user: {
            firstName: vm.customer.user.firstName,
            lastName: vm.customer.user.lastName,
            email: vm.customer.user.email
          }
        },
        items : items
      };

      if(items.length > 0){
        $scope.showProgress = true;
        cartService.createCart(cartPayload, function(err, response){
          $scope.showProgress = false;
          if(err){
            console.error(err);
            $window.alert("Ooops, something went wrong");
          } else {
            setTimeout(function(){
              $rootScope.$broadcast("ShoppingCartCreated");
              $mdDialog.cancel();
            }, 500);

          }
        });
      }
    };

    _setupList();

    function _setupList() {
      $scope.showProgress = true;

      let customerPromise = $http.get(
        `${constants.baseUrl}v1/customer`
      );

      let productPromise = $http.get(
        `${constants.baseUrl}v1/product`
      );

      $q.all(
        [
          customerPromise,
          productPromise
        ]
      ).then(response => {
        $scope.customers = response[0].data;

        for(var i = 0; i < response[1].data.length; i++){
          response[1].data[i].qtyToBuy = 0;
        }

        $scope.products = response[1].data;

        $scope.showProgress = false;
      }, error => {
        console.error(error);
        $window.alert("Ooops, something went wrong");
      });
    }
  }]);