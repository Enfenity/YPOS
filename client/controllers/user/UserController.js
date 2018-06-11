angular.module('YPOS').controller('UserController', [
  '$scope',
  '$rootScope',
  '$mdDialog',
  'UserService',
  '$window',
  function(
    $scope,
    $rootScope,
    $mdDialog,
    userService,
    $window
  ){
    $scope.$on("UserCreated", function(){
      _setupList();
    });

    $scope.$on("UserUpdated", function(){
      _setupList();
    });

    $scope.addUser = function(ev) {
      $mdDialog.show({
        controllerUrl: '../controllers/user/UserCreateController.js',
        templateUrl: '../../templates/user/user-create.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };

    _setupList();

    function _setupList(){
      $scope.showProgress = true;

      userService.getAllUsers(function(err, response){
        if(err){
          console.error(err);
          $window.alert("Ooops, something went wrong");
        } else {
          for(var i = 0; i < response.data.length; i++){
            response.data[i].options = [
              {
                name: "Update",
                handle: function(item){
                  $rootScope.user = {
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    _id: item._id
                  };
                  $mdDialog.show({
                    controllerUrl: '../controllers/user/UserUpdateController.js',
                    templateUrl: '../../templates/user/user-update.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  });
                }
              },
              {
                name: "Delete",
                handle: function(item){
                  userService.deleteUser(item._id, function(err, response){
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