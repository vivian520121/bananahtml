(function (app) {
    //全局配置 
  
    app.constant("config", {
        
        server: 'http://www.bananatrip.cn/',
       
    });
    
      app.config(function ( $stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    });
    
})(angular.module('app'));

