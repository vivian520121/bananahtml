(function (app) {
    app.factory('registerService', ['$http', 'config', "util", function ($http, config, util) {
        return{
          register: function (telephone, pass,code) {
                return $http({
                    url: config.server + 'user/register',
                    method: "post",
                    params: { telephone:telephone, pass: pass,code:code},
                   
                })
            },
            getCode:function(telephone, pass){
            	return $http({
                    url: config.server + 'api/send/code',
                    method: "post",
                     params: { telephone: telephone}
                   
                })
            }
        }
    }]);
})(angular.module('app.services'));