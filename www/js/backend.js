angular.module('gla')
.factory('Backend', function($http){
    var _baseUrl = 'http://notebook2reveal.com/presentation/';
    // var _baseUrl = 'http://192.168.1.22:3000/presentation/';

    var _generate = function(notes, callbacks){
        var url = _baseUrl + 'generate';
        var params = {notes: JSON.stringify(notes)};

        $http.post(url, params).success(function(data, status) {
            callbacks.success(data.id);
        }).error(function(response, status){
            callbacks.error();
        });
    };

    return {
        generate: _generate,
        getUrl: function(id){
            return _baseUrl + 'get?id='+id;
        }
    }
});
