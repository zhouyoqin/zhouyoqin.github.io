var mainApp = angular.module("main",[]);
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
        $scope.horseInfo = JSON.parse(JSON.stringify(res));
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