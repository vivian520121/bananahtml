(function () {
    angular.module('app', ['ionic', 'app.controllers', 'app.services', 'app.filters', 'app.directives'])
      .config(["$ionicConfigProvider", function ($ionicConfigProvider) {
          //ionic全局配置
          $ionicConfigProvider.views.maxCache(10);
          // $ionicConfigProvider.views.swipeBackEnabled(false);
          $ionicConfigProvider.platform.android.tabs.position('bottom');
          $ionicConfigProvider.platform.android.navBar.alignTitle("center");
          $ionicConfigProvider.backButton.text('返回');
          $ionicConfigProvider.form.checkbox("circle");
         // $ionicConfigProvider.templates.maxPrefetch(0);
      }])
    .config(["$httpProvider", function ($httpProvider) {
        var token = window.localStorage['token'];
        if (token) {
            $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        $httpProvider.interceptors.push('authHttpInterceptor');
    }])
   .run(["$ionicPlatform", "msg", "$rootScope", "$timeout", "$http", "userService", "$state", "$ionicLoading","jpushService",
       function ($ionicPlatform, msg, $rootScope, $timeout, $http, userService, $state, $ionicLoading, jpushService) {
           $ionicPlatform.registerBackButtonAction(function (e) {
               if ($rootScope.backButtonPressedOnceToExit) {
                   ionic.Platform.exitApp();
                   $rootScope.$destroy()
               } else {
                   $rootScope.backButtonPressedOnceToExit = true;
                   $ionicLoading.show({ template: '再按一次退出系统', duration: 500 });
                   $timeout(function () {
                       $rootScope.backButtonPressedOnceToExit = false
                   }, 2000)
               }
               $ionicPlatform.preventDefault();
               $ionicPlatform.stopPropagation();
               return false
           }, 101);
           // userService.isLogin().then(null, function (error) {
           //     console.log(JSON.stringify(error));
           //     localStorage.removeItem('user');
           //     localStorage.removeItem('token');
           //     $http.defaults.headers.common["Authorization"] = undefined;
           //     $state.go('login');
           // });
           $ionicPlatform.ready(function () {
               if (window.cordova && cordova.platformId === 'ios' && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                   cordova.plugins.Keyboard.disableScroll(true);
               }
               if (window.StatusBar) {
                  StatusBar.styleLightContent();
               }
               var receiveNotification = function (event) {
                   alert("receiveMessageIniOSCallback是" + +JSON.stringify(event));
               };
               var setTagsWithAliasCallback = function (event) {
                   window.alert('result code:' + event.resultCode + ' tags:' + event.tags + ' alias:' + event.alias);
               };
               if (window.cordova) {
                   jpushService.init({
                       stac: setTagsWithAliasCallback,
                       oniac: receiveNotification,
                       notify: receiveNotification
                   });
                   //启动极光推送服务
                   var onGetRegistrationID = function (registrationID) {
                       try {
                           if (registrationID.length == 0) {
                               var t1 = window.setTimeout(getRegistrationID, 1000);
                           } else {
                               alert("RegistrationID是" + registrationID);
                               localStorage.setItem('jpush', registrationID);
                           }
                       } catch (exception) {
                           alert("onGetRegistrationID err:" + JSON.stringify(exception));
                       }
                   };
                   var getRegistrationID = function () {
                       window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
                   };
                   getRegistrationID();
               }
           });
       }]);
    angular.module("app.controllers", []);
    angular.module("app.services", []);
    angular.module("app.filters", []);
    angular.module("app.directives", []);
})();
