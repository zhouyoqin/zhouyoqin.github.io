var mainApp = angular.module("main",[]);
mainApp.controller("mainController",function ($scope) {
  $scope.horseInfo = [];
  $scope.pageStatus = false;
  $scope.eachPageCount = 10;
  $scope.role = {
    0 : "普通用户",
    1 : "超级管理员",
    2 : "录入员",
    3 : "审核员"
  };
  
  if (AV.User.current()) {
    $scope.currentTable = window.location.href.indexOf("horse-stack",0)>0?"BaseInfo":"PreBaseInfo";
    if ($scope.currentTable == "PreBaseInfo") {
      $scope.pretable = window.location.href.indexOf("horse-prestack",0)>0?true:false;
    };
    $scope.roleid =  AV.User.current().get('role');
    queryList();
  }else{
    window.location.href = "login.html";
  };

  $scope.updateHorse = function(action,objId){
    switch(action){
      case "delete" :
        $scope.openEnsure("你是否确认删除这项内容?","马匹信息删除后无法恢复","delete");
        break;
      case "update":
        window.location.href = "horse-register.html#"+objId + ($scope.currentTable=="BaseInfo"?"#BaseInfo":"");
        break;
      case "check":
        window.location.href = "horse-check.html#"+objId;
        break;
    }
  };

  $scope.openEnsure = function (content1,content2,action,objId){
      $scope.ensureContent = content1;
      $scope.ensureTips = content2[0];
      $scope.ensureDate = content2[1];
      $scope.alertAction = action;
      $scope.currentId = objId;
      $("#alertEnsure").show();
  };
  $scope.yesEnsure = function (){
      switch($scope.alertAction){
        case "delete":
          var deleteobj = AV.Object.createWithoutData($scope.currentTable,$scope.currentId);
          deleteobj.destroy().then(function (success){
            $scope.$apply(function(){
              $("#alertEnsure").hide();
              queryList();
            });
          },function (error){});
          break;
        case "check":
          window.location.href = "horse-register.html#"+$scope.currentId;
          break;

      }
  };
  $scope.closeEnsure = function (){
      $("#alertEnsure").hide();
  };

	function queryList (){
		var query = new AV.Query($scope.currentTable);
    if ($scope.pretable == undefined){
      // baseinfo
    }else if($scope.pretable){
      query.equalTo('registerFlag', 0);
    }else{
      query.equalTo('registerFlag', 1);
    }
		query.count().then(function(count){
			$scope.$apply(function(){
        var sumPage = Math.ceil(count/$scope.eachPageCount);
        getPage(1,count,sumPage);
			});
		}, function (err){
		});
	};

  function getPage(curPage, sum, sumPage){
    var queryPage = new AV.Query($scope.currentTable);
    if ($scope.pretable == undefined){
      // baseinfo
    }else if($scope.pretable){
      queryPage.equalTo('registerFlag', 0);
    }else{
      queryPage.equalTo('registerFlag', 1);
    }
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