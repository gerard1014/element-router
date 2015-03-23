(function (angular, undefined) {
	'use strict';
	var module = angular.module('ngFileModel', []);
	module.directive('ngModel', ['$timeout', '$parse', function ($timeout, $parse) {
		return {
			require: '?ngModel',
			link: function (scope, elm, attrs, ctrl) {
				// only override file input's model
				if(attrs.type === 'file'){
					var modelExp = $parse(attrs.ngModel);

					elm.on('change', function(evt){
						$timeout(function(){
							var file = evt.target.files[0];
							modelExp.assign(scope, file);
							ctrl.$setDirty();
							validate(file, attrs);
						});
					});;

					var validate = function (file, attrs){
						ctrl.$setValidity('maxSize', true);
						ctrl.$setValidity('accept', true);

						if(!file){ return; }

						if(attrs.accept){
							var acceptedExtensions = attrs.accept.split(',');
							var fileExt = '.' + getExtension(file.name);

							for (var i = 0; i < acceptedExtensions.length; i++) {
								var extension = acceptedExtensions[i].toLowerCase();
								if(extension == fileExt){
									ctrl.$setValidity('accept', true);
									return;
								}
							}
							ctrl.$setValidity('accept', false);
						} else if(attrs.maxSize){
							ctrl.$setValidity('maxSize', file.size <= parseInt(attrs.maxSize));
						}
					}

					var getExtension = function (fileName){
						var split = fileName.split('.');
						if(split.length > 1){
							return split.pop().toLowerCase();
						}else{
							return '';
						}
					}
				}
			}
		};
	}]);
})(angular);


(function(angular, undefined){
	var module = angular.module('ngFileModel');
	module.directive('form', [function () {
		return {
      restrict: 'E',
      require: 'form',
			link: function (scope, element, attrs, ctrl) {
        ctrl.$submitted = false;
        element.on('submit', function () {
          scope.$apply(function () {
            ctrl.$submitted = true;
          });
        });
      }
		}
	}]);
	
})(angular);

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
