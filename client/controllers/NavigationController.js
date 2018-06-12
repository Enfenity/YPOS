angular.module('YPOS').controller('NavigationController', [
  '$scope',
  '$state',
  function($scope, $state){
    $scope.menu = [
      {
        title: 'User',
        icon: 'account_circle',
        clickHandler: function () {
          $state.go('user');
        }
      },
      {
        title: 'Business',
        icon: 'business',
        clickHandler: function () {
          $state.go('business');
        }
      },
      {
        title: 'Customer',
        icon: 'face',
        clickHandler: function () {
          $state.go('customer');
        }
      },
      {
        title: 'Provider',
        icon: 'accessibility',
        clickHandler: function () {
          $state.go('provider');
        }
      },
      {
        title: 'Product',
        icon: 'card_giftcard',
        clickHandler: function () {
          $state.go('product');
        }
      },
      {
        title: 'Shopping Cart',
        icon: 'shopping_cart',
        clickHandler: function () {
          $state.go('shopping-cart');
        }
      }
    ];

  }]);