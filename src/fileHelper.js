(function (angular, undefined) {
	'use strict';
	var module = angular.module('ngFileModel');

	module.service('fileHelper', [function(){
		var self = this;
		self.transformRequest = function (data){
			var fd = new FormData();
			angular.forEach(data, function(value, key) {
				fd.append(key, value);
			});
			return fd;
		};
		self.headers = {'Content-Type':undefined, enctype:'multipart/form-data'};
	}]);
})(angular);
