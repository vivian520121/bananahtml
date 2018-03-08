(function (app) {
    app.controller('registerCtrl', ["$scope", "registerService", "storage", "$state", "msg", "$http", "util","$timeout",
        function ($scope, registerService, storage, $state, msg, $http, util, $timeout) {

$scope.vm={
	        telephone:'',
	        code:'',
	      waitSeconds:'获取验证码'
	
            };


$scope.register = function () {
            msg.loading('注册中...');
            registerService.register($scope.vm.telephone, $scope.vm.code,$scope.vm.pass).then(function (result) {
                msg.success(result.data.message);
//              storage.setObject('user', result.data.data.user);
//              storage.set('token', result.data.data.token);
//              $http.defaults.headers.common["Authorization"] = 'Bearer ' + result.data.data.token;
               
               $state.go('login');
            }, function (error) {
               
                msg.error(error.data.message);
            });
        }

       $scope.getCode = function () {
            // if (!util.isMobile($scope.vm.mobile)) {
            //     msg.text('请输入正确的手机号');
            //     return;
            // }
            if ($scope.vm.waitSeconds!="获取验证码") {
               msg.text('请稍后再试', true);
               return;
            }
            $scope.vm.waitSeconds = "正在发送";
            registerService.getCode($scope.vm.telephone).then(function (result) {
                wait(50);
                // $scope.returncode = result.data;
                msg.success(result.data.code);
            }, function (error) {
                $scope.vm.waitSeconds = "获取验证码";
                wait(0);
                msg.error(error.data.Message);
            });
        };
        var wait = function (seconds) {
            if (seconds > 0) {
                $scope.vm.waitSeconds = "" + seconds + "秒";
            } else {
                $scope.vm.waitSeconds = "获取验证码";
            }
            $timeout(function () {
                if (seconds >= 1)
                    wait(seconds - 1);
            }, 1000);
        };
		
	}]);
    })(angular.module('app.controllers'));