(function (angular, undefined) {
	'use strict';
	var module = angular.module('ngFileModel');

	module.directive('filePreview', ['$timeout', '$parse', function ($timeout, $parse) {
		return {
			link: function (scope, elm, attrs) {
				var reader = new FileReader();
				var docPlaceholder = attrs.docPlaceholder;
				var placeholder = attrs.placeholder;
				var img;

				if(elm[0].tagName.toLowerCase() === 'img'){
					img = elm;
				}else{
					img = elm.html('<img/>').find('img');
				}

				scope.$watch(attrs.filePreview, function(file){
					if(file){
						if(file.type.indexOf('image') === 0) {
							reader.readAsDataURL(file);
						} else {
							img.attr('src', docPlaceholder);
						}
					} else{
						img.attr('src', placeholder);
					}
				});

				reader.onload = function (e) {
						img.attr('src', e.target.result);
				};
			}
		};
	}]);
})(angular);
