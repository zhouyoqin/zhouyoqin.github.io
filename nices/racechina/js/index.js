var mainApp = angular.module("main",[]);
mainApp.service('leancloud', function leancloud() {
    var ClassDefines = {
      'BaseInfo': {attributes: ["objectId","nameEng","nameChi","lifeNumber","microchipNumber","color", 	
			"birthday", "sex", "sort", "source", "breed", "passportFlag", "status1", "status2", "importDate"]}
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
	AV.init({ 
      appId: '9yFukzmtOwmePyoc9GYjmHJ5-gzGzoHsz', 
      appKey: 'iUHln5KjOlOefVClzIDIEkXe' 
    });
});
mainApp.controller("mainController",function ($scope) {
  $scope.horseInfo = [];
  $scope.pageStatus = false;
  $scope.eachPageCount = 10;
  $scope.updateHorse = function(action,objId){
    switch(action){
      case 0 :
        // delete
        break;
      case 1:
        // change
        window.location.href = "horse-register-input.html#"+objId;

    }
  };
  $scope.quitUser = function() {
    AV.User.logOut();
    window.location.href = "login.html";
  };
  if (AV.User.current()) {
    $scope.currentUser =  AV.User.current().get('username');
    $scope.isManager =  AV.User.current().get('role') ==1?true:false;
    queryList();
  }else{
    window.location.href = "login.html";
  };

	function queryList (){
		var query = new AV.Query('BaseInfo');
		query.count().then(function(count){
			$scope.$apply(function(){
        var sumPage = Math.ceil(count/$scope.eachPageCount);
        getPage(1,count,sumPage);
			});
		}, function (err){
		});
	};

  function getPage(curPage, sum, sumPage){
    var queryPage = new AV.Query('BaseInfo');
    queryPage.limit($scope.eachPageCount);
    queryPage.skip($scope.eachPageCount * (curPage-1));
    queryPage.find().then(function(res){
      $scope.$apply(function(){
        $scope.horseInfo = res;
        generPageHtml(curPage, sum, sumPage)
      });
    });
  };

	function generPageHtml(curPage, sum, sumPage){
      $('#kkpager').show();
      kkpager.generPageHtml({
          pno : curPage,
          //总页码
          total : sumPage,
          //总数据条数
          totalRecords : sum,
          //链接前部
          hrefFormer : '',
          //链接尾部
          hrefLatter : '',
          getLink : function(n){
              return 'javascript:;';
          },
          //,
          mode : 'click',//默认值是link，可选link或者click
          click : function(n){
              // 翻页事件
              getPage(n, sum, sumPage);
          }
      }, true);
	};
});