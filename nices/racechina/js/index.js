var mainApp = angular.module("main",[]);
mainApp.service('leancloud', function leancloud() {
    var ClassDefines = {
      'BaseInfo': {attributes: [
      		"nameEng", 
			"nameChi" ,	
			"lifeNumber", 
			"microchipNumber",
			"color", 	
			"birthday", 	
			"sex", 		
			"sort", 		
			"source", 	
			"breed",
			"passportFlag", 	
			"status1", 	
			"status2", 	
			"importDate"]},
      'ProductDetail': {attributes: ['size', 'price']}
    };
    return {
      angularizeAll: function () {
        angular.forEach(ClassDefines, function (classDefine, className) {
          var classObject = AV.Object.extend(className);
          angular.forEach(classDefine.attributes, function (attr) {
            Object.defineProperty(classObject.prototype, attr, {
              get: function () {
                return this.get(attr);
              },
              set: function (value) {
                this.set(attr, value);
              }
            });
          })
        })
      }
    }
  });
mainApp.run(function(leancloud) {
	leancloud.angularizeAll();
	AV.initialize("9yFukzmtOwmePyoc9GYjmHJ5-gzGzoHsz", "iUHln5KjOlOefVClzIDIEkXe");
});
mainApp.controller("mainController",function ($scope) {
	$scope.horseInfo = [];
	$scope.queryList = function (){
		debugger;
		var query = new AV.Query('BaseInfo');
		query.equalTo('birthday','2013-08-20');
		query.find().then(function(res){
			$scope.$apply(function(){
				$scope.horseInfo = res;
			});
		}, function (err){

		});
	};
	$scope.quitUser = function() {
		AV.User.logOut();
		window.location.href = "login.html";
	};
	if (AV.User.current()) {
		$scope.currentUser =  AV.User.current().get('username');
		$scope.queryList();
	}else{
		window.location.href = "login.html";
	}
});