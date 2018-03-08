(function (app) {
    app.factory('startService', ['$http', 'config', "util", function ($http, config, util) {
        return {
            start: function (filter) {
                return $http({
                    url: config.server + 'banana/start',
                    method: "post"

                })
            },
            
            small:function(skip,classify,pace,like){
                return $http({
                    url:config.server + "banana/LikeName",
                    method:"post",
                   params: {pace:pace,like:like,skip:skip,classify:classify}
                })
            },
            collectionDream:function(id,is_collection){
                return $http({
                    url:config.server + "api/dream/collection?id=" + id+"&is_collection="+is_collection,
                    method:"get",
                })
            },
            search:function (keyword){
                return $http({
                    url: config.server + 'api/index/search?keyword='+keyword,
                    method:"get"
                })
            },
            dreamDetail: function (id) {
                return $http({
                    url: config.server + 'api/dream/show?id=' + id,
                    method: "get"
                })
            },
            index: function (type, page) {
                var url = util.format('{0}api/index/home?type={1}&page={2}', config.server,type,page);
                return $http({
                    url: url,
                    method: "get"
                })
            },
            news_info: function (id) {
                return $http({
                    url: config.server + 'api/index/news_info?id='+id,
                    method: "get"
                })
            },
            user_search: function (keyword) {
                return $http({
                    url: config.server + 'api/index/user_search?keyword='+keywords,
                    method: "get"
                })
            },
            news_info: function (id) {
                return $http({
                    url: config.server + 'api/index/news_info?id=' + id,
                    method: "get"
                })
            },
            add_interaction: function (data) {
                return $http({
                    url: config.server + 'api/interaction/store',
                    method:"post",
                    data:data
                })
            },
            add_comment: function (data) {
                return $http({
                    url: config.server + '/api/interaction/comment',
                    method:"post",
                    data:data
                })
            },
            
        };
    }]);
})(angular.module('app.services'));