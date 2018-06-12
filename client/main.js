var app = angular.module(
  'YPOS',
  [
    'ui.router',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages'
  ]);

app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider.state({
    name: 'user',
    url: '/user.html',
    templateUrl: 'templates/user/user.html'
  });
  
  $stateProvider.state({
    name: 'customer',
    url: '/customer.html',
    templateUrl: 'templates/customer/customer.html'
  });
  
  $stateProvider.state({
    name: 'business',
    url: '/business.html',
    templateUrl: 'templates/business/business.html'
  });

  $stateProvider.state({
    name: 'provider',
    url: '/provider.html',
    templateUrl: 'templates/provider/provider.html'
  });

  $stateProvider.state({
    name: 'product',
    url: '/product.html',
    templateUrl: 'templates/product/product.html'
  });

  $stateProvider.state({
    name: 'shopping-cart',
    url: '/shopping-cart.html',
    templateUrl: 'templates/shopping-cart/shopping-cart.html'
  });

  $urlRouterProvider.otherwise('/user.html');

});

app.config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
});

app.config(function($mdThemingProvider) {
  var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')
});