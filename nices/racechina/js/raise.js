/**
 * Created by wangjiahe on 04/08/2016.
 */
var APP_ID = '9yFukzmtOwmePyoc9GYjmHJ5-gzGzoHsz';
var APP_KEY = 'iUHln5KjOlOefVClzIDIEkXe';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var feederApp = angular.module("raise", []);
feederApp.controller("raiseController", function ($scope) {
    var itemCount = 0;
    /*default item number per page*/
    $scope.eachPageCount = 10;
    $scope.curPage = 1;
    $scope.sumPage = 1;
    $scope.toModify = '';
    $scope.queryList = function (curPage) {
        $scope.reset();
        var query = new AV.Query('Feeder');
        query.count().then(function (count) {
            console.log(count);
            $scope.sumPage = Math.ceil(count / $scope.eachPageCount);
            $scope.curPage = curPage > $scope.sumPage ? $scope.sumPage : curPage;
            getPage($scope.curPage, count, $scope.sumPage);
        }, function (err) {

        });
    };

    function getPage(curPage, sum, sumPage) {
        var queryPage = new AV.Query('Feeder');
        queryPage.ascending('createdAt');
        queryPage.limit($scope.eachPageCount);
        queryPage.skip($scope.eachPageCount * (curPage - 1));
        queryPage.find().then(function (res) {
            $scope.$apply(function () {
                $scope.feederInfo = JSON.parse(JSON.stringify(res));
                generPageHtml(curPage, sum, sumPage);
            });
        });
    };

    $scope.deleteFeeder = function (feeder) {
        var r = confirm("你是否确认删除这项内容:");
        if (r == true) {
            var feederObj = AV.Object.createWithoutData('Feeder', feeder.objectId);
            feederObj.destroy().then(function (success) {
                $scope.$apply(function () {
                    $scope.queryList($scope.curPage);
                });
            }, function (error) {

            });
        }
        else {

        }
    };

    $scope.updateOrAddFeeder = function (feeder) {
        $scope.isTableShow = false;
        $scope.isModifyShow = true;
        if (feeder == '' || feeder == undefined) {
            $scope.updateOrAdd = "育马者添加";
        }
        else {
            console.log(feeder);
            $scope.updateOrAdd = "育马者修改";
            $scope.nameOfFeeder = feeder.name;
            $scope.telOfFeeder = feeder.tel;
            $scope.addressOfFeeder = feeder.address;
            $scope.emailOfFeeder = feeder.email;

        }
        $scope.toModify = feeder.objectId;
    };

    $scope.reset = function () {
        $scope.isTableShow = true;
        $scope.isModifyShow = false;
        $scope.nameOfFeeder = "";
        $scope.telOfFeeder = "";
        $scope.emailOfFeeder = "";
        $scope.addressOfFeeder = "";
        $scope.faxOfFeeder = "";
        $scope.invalid_name = "";
    }

    $scope.commit = function () {
        var name = $scope.nameOfFeeder;
        var tel = $scope.telOfFeeder;
        var email = $scope.emailOfFeeder;
        var fax = $scope.faxOfFeeder;
        var address = $scope.addressOfFeeder;
        if (name == undefined || name == '') {
            $scope.invalid_name = "请输入姓名!";
            return;
        }
        else {
            $scope.invalid_name = "";
        }

        if (tel == undefined || tel == '') {
            $scope.invalid_tel = "请输入电话号码!";
            return;
        }
        else if (tel.length != 11) {
            $scope.invalid_tel = "请正确输入11位手机号码!";
            return;
        }
        else {
            $scope.invalid_tel = "";
        }

        if (address == undefined || address == '') {
            $scope.invalid_address = "请输入联系地址!";
            return;
        }
        else {
            $scope.invalid_address = "";
        }
        if ($scope.toModify == '') {
            var FeederObject = AV.Object.extend('Feeder');
            var feeder = new FeederObject();
            feeder.set('name', name);
            feeder.set('tel', tel);
            feeder.set('email', email);
            feeder.set('fax', fax);
            feeder.set('address', address);
            feeder.save().then(function (data) {
                $scope.queryList($scope.curPage);
                $scope.back();
            }, function (err) {

            });
        }
        else {
            var feeder = AV.Object.createWithoutData('Feeder', $scope.toModify);
            feeder.set('name', name);
            feeder.set('tel', tel);
            feeder.set('email', email);
            feeder.set('fax', fax);
            feeder.set('address', address);
            feeder.save().then(function (data) {
                $scope.queryList($scope.curPage);
            }, function (err) {

            });
        }
    }


    function generPageHtml(curPage, sum, sumPage) {
        $('#kkpager').show();
        kkpager.generPageHtml({
            pno: curPage,
            //总页码
            total: sumPage,
            //总数据条数
            totalRecords: sum,
            //链接前部
            hrefFormer: '',
            //链接尾部
            hrefLatter: '',
            getLink: function (n) {
                return 'javascript:;';
            },
            //,
            mode: 'click',//默认值是link，可选link或者click
            click: function (n) {
                // 翻页事件
                $scope.curPage = n;
                getPage(n, sum, sumPage);
            }
        }, true);
    };

    $scope.quitUser = function () {
        AV.User.logOut();
        window.location.href = "login.html";
    };
    if (AV.User.current()) {
        $scope.currentUser = AV.User.current().get('username');
        $scope.isManager = AV.User.current().get('role') == 1 ? true : false;
        $scope.queryList($scope.curPage);
    } else {
        window.location.href = "login.html";
    };


});


