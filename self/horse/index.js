var horseApp = angular.module("horse",[]);
horseApp.controller('horseController',function ($scope) {
	$scope.horseinfo = [
		{
			"id"   : 1,
			"name" : "horse1",
			"owner": "owner1",
			"rider": "rider1"
		},{
			"id"   : 2,
			"name" : "horse2",
			"owner": "owner2",
			"rider": "rider2"
		},{
			"id"   : 333,
			"name" : "horse333",
			"owner": "owner333",
			"rider": "rider333"
		},{
			"id"   : 555,
			"name" : "horse555",
			"owner": "owner555",
			"rider": "rider555"
		}
	];
	$scope.showAlert = false;
	$scope.deleteHorse = function (index){
		debugger;		
		var horses = $scope.horseinfo;
		var newhorses = [];
		for(var horse in horses){
			if(horse != index){
				newhorses.push(horses[horse]);
			}
		}
		$scope.horseinfo = newhorses;
	};

	$scope.alertOpen = function (){
		$scope.showAlert = true;
	};
	$scope.alertSubmit = function (){
		if($scope.newHorse.id == undefined || $scope.newHorse.id == ""){
			alert("id未填写");
			return;
		}
		$scope.horseinfo.push($scope.newHorse);
		$scope.newHorse = null;
		$scope.showAlert = false;
	};
	$scope.alertCancel = function (){
		$scope.showAlert = false;
	};


});