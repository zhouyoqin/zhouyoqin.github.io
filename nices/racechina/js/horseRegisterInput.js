/**
 * Created by zhouyoqin on 10/08/2016.
 */
var mainApp = angular.module("main",[]);
mainApp.controller("mainController",function ($scope) {
  var HorseObject = AV.Object.extend("BaseInfo");
  var PreHorseObject = AV.Object.extend("PreBaseInfo");
  // 辅助变量
  $scope.countrys = [{"code":"ALG","name":"阿尔及利亚"},{"code":"ARG","name":"阿根廷"},{"code":"AUS","name":"澳大利亚"},{"code":"AUT","name":"奥地利"},{"code":"AZE","name":"阿塞拜疆"},{"code":"BAR","name":"巴巴多斯岛"},{"code":"BEL","name":"比利时"},{"code":"BHR","name":"巴林"},{"code":"BOL","name":"玻利维亚"},{"code":"BRZ","name":"巴西"},{"code":"BUL","name":"保加利亚"},{"code":"CAN","name":"加拿大"},{"code":"CEY","name":"锡兰"},{"code":"CHI","name":"智利"},{"code":"CHN","name":"中国"},{"code":"COL","name":"哥伦比亚"},{"code":"CRI","name":"哥斯达黎加"},{"code":"CRO","name":"克罗地亚"},{"code":"CUB","name":"古巴"},{"code":"CYP","name":"塞浦路斯"},{"code":"CZE","name":"捷克斯洛伐克"},{"code":"DEN","name":"丹麦"},{"code":"DOM","name":"多米尼加共和国"},{"code":"ECU","name":"厄瓜多尔"},{"code":"EGY","name":"埃及"},{"code":"FIN","name":"芬兰"},{"code":"FR","name":"法国"},{"code":"GB","name":"英国"},{"code":"GEO","name":"乔治亚苏维埃共和国"},{"code":"GER","name":"德国"},{"code":"GR","name":"希腊"},{"code":"GTM","name":"危地马拉"},{"code":"HK","name":"香港"},{"code":"HOL","name":"荷兰"},{"code":"HUN","name":"匈牙利"},{"code":"IND","name":"印度"},{"code":"IRA","name":"伊朗"},{"code":"IRE","name":"爱尔兰"},{"code":"ISR","name":"以色列"},{"code":"ITY","name":"意大利"},{"code":"JAM","name":"牙买加"},{"code":"JPN","name":"日本"},{"code":"KAZ","name":"哈萨克斯坦"},{"code":"KEN","name":"肯尼亚"},{"code":"KOR","name":"韩国"},{"code":"LEB","name":"黎巴嫩"},{"code":"LIB","name":"利比亚"},{"code":"LUX","name":"卢森堡"},{"code":"MAL","name":"马来西亚"},{"code":"MAU","name":"毛里求斯"},{"code":"MDA","name":"摩尔多瓦"},{"code":"MEX","name":"墨西哥"},{"code":"MOR","name":"摩洛哥"},{"code":"MTA","name":"马耳他"},{"code":"NDO","name":"印尼"},{"code":"NOR","name":"挪威"},{"code":"NZ","name":"新西兰"},{"code":"PAK","name":"巴基斯坦"},{"code":"PAN","name":"巴拿马"},{"code":"PHI","name":"菲律宾"},{"code":"POL","name":"波兰"},{"code":"POR","name":"葡萄牙"},{"code":"PR","name":"波多黎各"},{"code":"PRY","name":"巴拉圭"},{"code":"QA","name":"卡塔尔"},{"code":"RUM","name":"罗马尼亚"},{"code":"RUS","name":"俄罗斯"},{"code":"SAF","name":"南非"},{"code":"SEN","name":"塞内加尔"},{"code":"SLV","name":"塞尔瓦多"},{"code":"SPA","name":"西班牙"},{"code":"SRB","name":"塞尔维亚"},{"code":"SRH","name":"南罗得西亚"},{"code":"SUD","name":"苏丹"},{"code":"SVK","name":"斯洛伐克"},{"code":"SVN","name":"斯洛文尼亚"},{"code":"SWE","name":"瑞典"},{"code":"SWI","name":"瑞士"},{"code":"THA","name":"泰国"},{"code":"TRI","name":"特立尼达岛"},{"code":"TUN","name":"突尼斯"},{"code":"TUR","name":"土耳其"},{"code":"UAE","name":"阿拉伯联合酋长国"},{"code":"UKR","name":"乌克兰"},{"code":"URU","name":"乌拉圭"},{"code":"USA","name":"美国"},{"code":"VEN","name":"委内瑞拉"},{"code":"YUG","name":"南斯拉夫"},{"code":"ZIM","name":"津巴布韦"},{"code":"KGZ","name":"吉尔吉斯斯坦"}];
  $scope.horseSort = ["种公马","种母马","马驹","其他"];
  $scope.horseColor = ["白","骝","褐骝","黑","栗","青","其它"];
  $scope.horseColor2 = {"白":"wh.","骝":"b.","褐骝":"br.","黑":"bl.","栗":"ch.","青":"gr.","其它":""};
  $scope.horseBreed = [{"breed":"纯血马","breed2":"Thoroughbred"},{"breed":"纯血马系","breed2":"Non-thoroughbred"},{"breed":"汗血马","breed2":""},{"breed":"阿拉伯马","breed2":"Arabian horse"},{"breed":"温血马","breed2":""},{"breed":"夸特马","breed2":"Quarter horse"},{"breed":"弗里斯兰","breed2":""},{"breed":"果下马","breed2":""},{"breed":"半血马","breed2":""},{"breed":"国产马","breed2":""},{"breed":"阿哈捷金马","breed2":"Akhal-Teke horse"},{"breed":"美国银河马","breed2":"American albino"},{"breed":"美国骑乘马","breed2":"American saddlebred"},{"breed":"安格鲁诺曼马","breed2":"Anglo-norman"},{"breed":"安格鲁阿拉伯马","breed2":"Anglo-arab"},{"breed":"阿帕鲁萨马","breed2":"Appaloosa"},{"breed":"阿尔登马","breed2":"Ardennes"},{"breed":"巴布马(柏布马)","breed2":"Barb"},{"breed":"比利时挽马(布拉邦逊马)","breed2":"Belgian Draft horse or Belgian Heavy Horse"},{"breed":"克里福兰骝马","breed2":"Cleveland bay"},{"breed":"顿河马","breed2":"Don"},{"breed":"弗里斯马","breed2":"Friesian"},{"breed":"基德兰马(奇特兰)","breed2":"Gidran"},{"breed":"哈克尼马","breed2":"Hackney"},{"breed":"哈弗灵格马","breed2":"Haflinger"},{"breed":"汉诺威马","breed2":"Hanoverian"},{"breed":"荷斯坦马(俗语“霍士丹”)","breed2":"Holstein"},{"breed":"卡巴金马","breed2":"Kabardin"},{"breed":"利比察马(利皮扎马)","breed2":"Lipizzaner"},{"breed":"麦克伦堡马","breed2":"Mecklenburg"},{"breed":"迷你矮马(微型马)","breed2":"Miniature horse"},{"breed":"摩根马","breed2":"Morgan"},{"breed":"诺曼马","breed2":"Norman"},{"breed":"奥登堡马","breed2":"Oldenburg"},{"breed":"奥尔洛夫快步马","breed2":"Orlov trotter"},{"breed":"美国花马","breed2":"Paint horses"},{"breed":"帕拉米诺马","breed2":"Palomino"},{"breed":"贝尔修伦马","breed2":"Percheron"},{"breed":"美国品脱马","breed2":"Pinto"},{"breed":"设特兰矮马","breed2":"Shetland pony"},{"breed":"夏尔马","breed2":"Shire"},{"breed":"苏维埃挽马","breed2":"Soviet draught horse"},{"breed":"标准马","breed2":"Standardbred"},{"breed":"萨福克马","breed2":"Suffolk"},{"breed":"田纳西走马","breed2":"Tennessee walking horse"},{"breed":"威尔士矮马","breed2":"Welsh pony"},{"breed":"沃腾堡马","breed2":"Wurttemburg"},{"breed":"荷兰温血马","breed2":"KWPN"},{"breed":"韦斯特法伦马","breed2":"Westphalian"},{"breed":"特拉克纳马","breed2":"Trakehner"},{"breed":"爱尔兰运动马","breed2":"Irish sport horse"},{"breed":"蒙古马","breed2":"Mongolian pony"},{"breed":"法拉贝拉矮马","breed2":"Falabella pony"},{"breed":"法国快步马","breed2":"French trotter"},{"breed":"丹麦温血马","breed2":"Danish warmblood"},{"breed":"布拉邦逊马(勃拉邦逊马)","breed2":"Brabant"},{"breed":"布琼尼马","breed2":"Budenny"},{"breed":"库斯塔奈马","breed2":"Kustanai horse"},{"breed":"库素姆马","breed2":"Kushum Horse"},{"breed":"安达卢西亚马(纯种西班牙马)","breed2":"Andalucian horse(Pure Spanish Horse or PRE)"},{"breed":"塞拉法兰西马(法国骑乘马)","breed2":"Selle francais (SF)"},{"breed":"里海马","breed2":"Caspian horse"},{"breed":"猎狐马","breed2":"Hunter horse"},{"breed":"普氏野马(蒲氏野马)","breed2":"Przewalskii horse"},{"breed":"鞑靼野马(太盘马)","breed2":"Tarpan horse"},{"breed":"霍世丹马","breed2":"Holstein"},{"breed":"比利时温血马","breed2":"Belgium warmblood"},{"breed":"藏格尔涉义德","breed2":"Zangersheide"},{"breed":"其他","breed2":""}];
  $scope.horseBreed2 = {"纯血马":"Thoroughbred","纯血马系":"Non-thoroughbred","汗血马":"","阿拉伯马":"Arabian horse","温血马":"","夸特马":"Quarter horse","弗里斯兰":"","果下马":"","半血马":"","国产马":"","阿哈捷金马":"Akhal-Teke horse","美国银河马":"American albino","美国骑乘马":"American saddlebred","安格鲁诺曼马":"Anglo-norman","安格鲁阿拉伯马":"Anglo-arab","阿帕鲁萨马":"Appaloosa","阿尔登马":"Ardennes","巴布马(柏布马)":"Barb","比利时挽马(布拉邦逊马)":"Belgian Draft horse or Belgian Heavy Horse","克里福兰骝马":"Cleveland bay","顿河马":"Don","弗里斯马":"Friesian","基德兰马(奇特兰)":"Gidran","哈克尼马":"Hackney","哈弗灵格马":"Haflinger","汉诺威马":"Hanoverian","荷斯坦马(俗语“霍士丹”)":"Holstein","卡巴金马":"Kabardin","利比察马(利皮扎马)":"Lipizzaner","麦克伦堡马":"Mecklenburg","迷你矮马(微型马)":"Miniature horse","摩根马":"Morgan","诺曼马":"Norman","奥登堡马":"Oldenburg","奥尔洛夫快步马":"Orlov trotter","美国花马":"Paint horses","帕拉米诺马":"Palomino","贝尔修伦马":"Percheron","美国品脱马":"Pinto","设特兰矮马":"Shetland pony","夏尔马":"Shire","苏维埃挽马":"Soviet draught horse","标准马":"Standardbred","萨福克马":"Suffolk","田纳西走马":"Tennessee walking horse","威尔士矮马":"Welsh pony","沃腾堡马":"Wurttemburg","荷兰温血马":"KWPN","韦斯特法伦马":"Westphalian","特拉克纳马":"Trakehner","爱尔兰运动马":"Irish sport horse","蒙古马":"Mongolian pony","法拉贝拉矮马":"Falabella pony","法国快步马":"French trotter","丹麦温血马":"Danish warmblood","布拉邦逊马(勃拉邦逊马)":"Brabant","布琼尼马":"Budenny","库斯塔奈马":"Kustanai horse","库素姆马":"Kushum Horse","安达卢西亚马(纯种西班牙马)":"Andalucian horse(Pure Spanish Horse or PRE)","塞拉法兰西马(法国骑乘马)":"Selle francais (SF)","里海马":"Caspian horse","猎狐马":"Hunter horse","普氏野马(蒲氏野马)":"Przewalskii horse","鞑靼野马(太盘马)":"Tarpan horse","霍世丹马":"Holstein","比利时温血马":"Belgium warmblood","藏格尔涉义德":"Zangersheide","其他":""};
  $scope.horseSex = [];
  $scope.horseSource = ["进口","国产","国外"];
  $scope.horseStatus2 = ["正常","死亡"];
  $scope.horseUseful = ["比赛","繁殖"];
  // $scope.yesNo = ["是","否"];
  $scope.yesNo = [{
    value : 1,
    name  : "是"
  },{
    value : 0,
    name  : "否"
  }];

  // $scope.alertOpen = false;
  $scope.show = false;
  $scope.invalid = {
      nameEng     : false,
      countryCode : false,
      sire        : false,
      dam         : false,
      sort        : false,
      sex         : false,
      color       : false,
      breed       : false,
      birthday    : false,
      source      : false,
      importDate  : false,
      useful      : false,
      importCountry : false,
      status      : false,
      exportDate  : false
  };
  $scope.quitUser = function() {
    AV.User.logOut();
    window.location.href = "login.html";
  };
  // 判断用户是否登录且是否有权限
  if (AV.User.current()) {
    $scope.currentUser =  AV.User.current().get("username");
    if (AV.User.current().get("role") != 1) {
      window.location.href = "horse-register.html"
    };
  }else{
    window.location.href = "login.html";
  };
  if (window.location.href.split("#")[1]) {
    $scope.currentHorseID = window.location.href.split("#")[1];
    // 回填
    var query = new AV.Query("BaseInfo");
    query.get($scope.currentHorseID).then(function(data){
      $scope.$apply(function(){
        debugger;
        $scope.currentHorse =  JSON.parse(JSON.stringify(data));
        $scope.currentHorse.birthday          = new Date($scope.currentHorse.birthday);
        $scope.currentHorse.deadDate          = new Date($scope.currentHorse.deadDate);//status2为死亡需要填写
        $scope.currentHorse.importDate        = new Date($scope.currentHorse.importDate);
        $scope.currentHorse.exportDate        = new Date($scope.currentHorse.exportDate);
        $scope.currentHorse.issueDate         = new Date($scope.currentHorse.issueDate);//签发日期
        $scope.currentHorse.examinationDate   = new Date($scope.currentHorse.examinationDate);//检查日期
        switch($scope.currentHorse.sort){
          case "种公马":
            $scope.horseSex = ["公马"];
            break;
          case "种母马":
            $scope.horseSex = ["母马"];
            break;
          case "马驹":
            $scope.horseSex = ["公驹","母驹"];
            break;
          case "其他":
            $scope.horseSex = ["公马","母马","骟马"];
            break;
        }
      });
    }, function (err){
    });
  }else{
    $scope.currentHorse = {
      "nameEng"           : "",
      "nameChi"           : "",
      "nameOther"         : "",
      "countryCode"       : "",
      "lifeNumber"        : "",
      "microchipNumber"   : "",

      "sire"              : "",//leancloud对象
      "sireName"          : "",
      "dam"               : "",
      "damName"           : "",

      "sort"              : "",//种类
      "sex"               : "",
      "color"             : "",
      "breed"             : "",//品种
      "sex2"              : "",
      "color2"            : "",
      "breed2"            : "",//品种

      "birthday"          : "",
      "source"            : "",
      "deadDate"          : "",//status2为死亡需要填写
      "status1"           : "",
      "status2"           : "",//当种类为种公马时，状态为死亡/不再种用/开始种用
      // source进口才会需要填写，马匹需要填2个状态。
      "importDate"        : "",
      "useful"            : "",
      "importCountry"     : "",
      // source国产/国外，status1为出口才会需要填写
      "exportDate"        : "",
      "registerFlag"      : 0,

      "feeder"            : "",//leancloud对象
      "owner"             : "",
      "racecourse"        : "",
      "feederName"        : "",//leancloud对象
      "ownerName"         : "",
      "racecourseName"    : "",

      "issueDate"         : "",//签发日期
      "examinationDate"   : "",//检查日期
      "passportFlag"      : 0,
      "passportPrint"     : 0,
      "studBookReference" : "",//登记册参照页

      "headDetail"        : "",
      "neckDetail"        : "",
      "bodyDetail"        : "",
      "leftForce"         : "",
      "rightForce"        : "",
      "leftHind"          : "",
      "rightHind"         : "",
      "headDetail2"       : "",
      "neckDetail2"       : "",
      "bodyDetail2"       : "",
      "leftForce2"        : "",
      "rightForce2"       : "",
      "leftHind2"         : "",
      "rightHind2"        : ""
    }
  }

  // save
  $scope.saveHorse = function(){
    if ($scope.currentHorse.source == "进口") {
      $scope.invalid = {
        nameEng     : false,
        countryCode : false,
        sire        : false,
        dam         : false,
        sort        : false,
        sex         : false,
        color       : false,
        breed       : false,
        birthday    : false,
        source      : false,
        importDate  : false,
        useful      : false,
        importCountry : false,
        status      : false
      };
    }else{
      $scope.invalid = {
        nameEng     : false,
        countryCode : false,
        sire        : false,
        dam         : false,
        sort        : false,
        sex         : false,
        color       : false,
        breed       : false,
        birthday    : false,
        source      : false,
        status      : false
      };
    };
    if ($scope.currentHorse.status1 == "出口") {
      $scope.invalid.exportDate = false;
    };
    for(i in $scope.invalid){
      if ($scope.currentHorse[i] == undefined || $scope.currentHorse[i] == ""){
        if(i == "status"){
          if($scope.currentHorse.status1 == "" || $scope.currentHorse.status2 == ""){
            $scope.invalid[i] = true;
            return;
          }else if($scope.currentHorse.status2 == "死亡" && $scope.currentHorse.deadDate == ""){
            $scope.invalid[i] = true;
            return;
          }
          continue;
        }
        $scope.invalid[i] = true;
        return;
      };
    }
    // 保存对象
    if (window.location.href.split("#")[1]) {
      var horseObj = AV.Object.createWithoutData('BaseInfo', window.location.href.split("#")[1]);
    }else{
      var horseObj = new PreHorseObject();
    }
    horseObj.set("nameEng"           ,$scope.currentHorse.nameEng)
    horseObj.set("nameChi"           , $scope.currentHorse.nameChi);
    horseObj.set("nameOther"         , $scope.currentHorse.nameOther);
    horseObj.set("countryCode"       , $scope.currentHorse.countryCode);
    horseObj.set("lifeNumber"        , $scope.currentHorse.lifeNumber);
    horseObj.set("microchipNumber"   , $scope.currentHorse.microchipNumber);
    horseObj.set("sire"              , $scope.currentHorse.sire);
    horseObj.set("sireName"          , $scope.currentHorse.sireName);
    horseObj.set("dam"               , $scope.currentHorse.dam);
    horseObj.set("damName"           , $scope.currentHorse.damName);
    horseObj.set("sort"              , $scope.currentHorse.sort);
    horseObj.set("sex"               , $scope.currentHorse.sex);
    horseObj.set("color"             , $scope.currentHorse.color);
    horseObj.set("breed"             , $scope.currentHorse.breed);
    horseObj.set("sex2"              , $scope.currentHorse.sex2);
    horseObj.set("color2"            , $scope.horseBreed2[$scope.currentHorse.color]);
    horseObj.set("breed2"            , $scope.horseBreed2[$scope.currentHorse.breed]);
    horseObj.set("birthday"          , getFormatDate($scope.currentHorse.birthday));
    horseObj.set("source"            , $scope.currentHorse.source);
    horseObj.set("deadDate"          , getFormatDate($scope.currentHorse.deadDate));//status2为死亡需要填写
    horseObj.set("status1"           , $scope.currentHorse.status1);
    horseObj.set("status2"           , $scope.currentHorse.status2);//当种类为种公马时，状态为死亡/不再种用/开始种用
    horseObj.set("importDate"        , getFormatDate($scope.currentHorse.importDate));
    horseObj.set("useful"            , $scope.currentHorse.useful);
    horseObj.set("importCountry"     , $scope.currentHorse.importCountry);
    horseObj.set("exportDate"        , getFormatDate($scope.currentHorse.exportDate));
    horseObj.set("registerFlag"      , $scope.currentHorse.registerFlag);
    if ($scope.currentHorse.feeder != "") {
      horseObj.set("feeder"        , $scope.currentHorse.feeder);
    };
    if ($scope.currentHorse.racecourse != "") {
      horseObj.set("racecourse"        , $scope.currentHorse.racecourse);
    };
    if ($scope.currentHorse.owner != "") {
      horseObj.set("owner"             , $scope.currentHorse.owner);
    };
    horseObj.set("feederName"        , $scope.currentHorse.feederName);//leancloud对象
    horseObj.set("ownerName"         , $scope.currentHorse.ownerName);
    horseObj.set("racecourseName"    , $scope.currentHorse.racecourseName);
    horseObj.set("issueDate"         , getFormatDate($scope.currentHorse.issueDate));//签发日期
    horseObj.set("examinationDate"   , getFormatDate($scope.currentHorse.examinationDate));//检查日期
    horseObj.set("passportFlag"      , $scope.currentHorse.passportFlag);
    horseObj.set("passportPrint"     , $scope.currentHorse.passportPrint);
    horseObj.set("studBookReference" , $scope.currentHorse.studBookReference);//登记册参照页

    horseObj.set("headDetail"        , $scope.currentHorse.headDetail);
    horseObj.set("neckDetail"        , $scope.currentHorse.neckDetail);
    horseObj.set("bodyDetail"        , $scope.currentHorse.bodyDetail);
    horseObj.set("leftForce"         , $scope.currentHorse.leftForce);
    horseObj.set("rightForce"        , $scope.currentHorse.rightForce);
    horseObj.set("leftHind"          , $scope.currentHorse.leftHind);
    horseObj.set("rightHind"         , $scope.currentHorse.headDetail2);
    horseObj.set("headDetail2"       , $scope.currentHorse.headDetail2);
    horseObj.set("neckDetail2"       , $scope.currentHorse.neckDetail2);
    horseObj.set("bodyDetail2"       , $scope.currentHorse.bodyDetail2);
    horseObj.set("leftForce2"        , $scope.currentHorse.leftForce2);
    horseObj.set("rightForce2"       , $scope.currentHorse.rightForce2);
    horseObj.set("leftHind2"         , $scope.currentHorse.leftHind2);
    horseObj.set("rightHind2"        , $scope.currentHorse.rightHind2);

    var queryName = new AV.Query("BaseInfo");
    queryName.equalTo("nameEng",$scope.currentHorse.nameEng);
    queryName.count().then(function(count){
      if (window.location.href.split("#")[1]) {
        if (count > 1) {
          makeAlert("英文名不唯一");
          return;
        }
      }else{
        if (count > 0) {
          makeAlert("英文名不唯一");
          return;
        }
      }
      horseObj.save().then(function(horseObj){
        console.log("horseid:" + horseObj.id);
        makeAlert("保存成功！","horse-register.html");

      }, function(err){
        makeAlert("保存失败！</br>" + err.message);
      });
    }, function(err){
      makeAlert("请求失败！<br/>" + err.message);
    });
  };
  $scope.dateChange = function(datename,status){
    if (status) {
      $scope.currentHorse[datename] = $scope[datename].getFullYear();
    }else{
      $scope.currentHorse[datename] = getFormatDate($scope[datename]);
    }
  };
  // 表单联动 
  $scope.sortChange = function(){
    switch($scope.currentHorse.sort){
      case "种公马":
        $scope.currentHorse.sex = "公马";
        $scope.horseSex = ["公马"];
        $scope.horseStatus2 = ["开始种用","不在种用","死亡"];
        break;
      case "种母马":
        $scope.currentHorse.sex = "母马";
        $scope.horseSex = ["母马"];
        $scope.horseStatus2 = ["正常","死亡"];
        break;
      case "马驹":
        $scope.currentHorse.sex = "";
        $scope.horseSex = ["公驹","母驹"];
        $scope.horseStatus2 = ["正常","死亡"];
        break;
      case "其他":
        $scope.currentHorse.sex = "";
        $scope.horseSex = ["公马","母马","骟马"];
        $scope.horseStatus2 = ["正常","死亡"];
        break;
    }
  };
  $scope.sourceChange = function(){
    switch($scope.currentHorse.source){
      case "进口":
        $scope.sourceImport = true;
        $scope.currentHorse.status1 = "进口";
        $scope.horseStatus1 = ["进口"];

        break;
      case "国产":
        $scope.sourceImport = false;
        $scope.currentHorse.status1 = "";
        $scope.horseStatus1 = ["出口","国产","国外"];
        break;
      case "国外":
        $scope.sourceImport = false;
        $scope.currentHorse.status1 = "";
        $scope.horseStatus1 = ["出口","国产","国外"];
        break;
    }
  };
  // 选择弹窗逻辑+清除
  $scope.openAlert = function(obj){
    $scope.alertSearched = false;
    $scope.alertItem = obj;
    switch(obj){
      case "sire":
        $scope.alertContent = {
          head    : "马匹搜索",
          input1    : "",
          input2    : "",
          input1tag    : "nameEng",
          input2tag    : "lifeNumber",
          input1label : "马名（英文）：",
          input2label : "护照号：",
          warning   : "该马匹不存在",
          radiovalue  : 0,
          searchTable : "BaseInfo",
          searchRes : []
        };
        break;
      case "dam":
        $scope.alertContent = {
          head    : "马匹搜索",
          input1    : "",
          input2    : "",
          input1tag    : "nameEng",
          input2tag    : "lifeNumber",
          input1label : "马名（英文）：",
          input2label : "护照号：",
          warning   : "该马匹不存在",
          radiovalue  : 0,
          searchTable : "BaseInfo",
          searchRes : []
        };
        break;
      case "feeder":
        $scope.alertContent = {
          head    : "育马者搜索",
          input1    : "",
          input2    : "",
          input1tag    : "name",
          input2tag    : "name2",
          input1label : "中文名：",
          input2label : "英文名：",
          warning   : "该育马者不存在",
          radiovalue  : 0,
          searchTable : "Feeder",
          searchRes : []
        };
        break;
      case "owner":
        $scope.alertContent = {
          head    : "马主搜索",
          input1    : "",
          input2    : "",
          input1tag    : "name",
          input2tag    : "name2",
          input1label : "中文名：",
          input2label : "英文名：",
          warning   : "该马主不存在",
          radiovalue  : 0,
          searchTable : "Owner",
          searchRes : []
        };
        break;
      case "racecourse":
        $scope.alertContent = {
          head    : "马场搜索",
          input1    : "",
          input2    : "",
          input1tag    : "name",
          input2tag    : "name2",
          input1label : "中文名：",
          input2label : "英文名：",
          warning   : "该马场不存在",
          radiovalue  : 0,
          searchTable : "Racecourse",
          searchRes : []
        };
        break;
    }
    // $scope.alertOpen = true;
    $("#alertOpen").show();
  };
  $scope.alertClose = function(){
    $("#alertOpen").hide();
    // $scope.alertOpen = false;
  };
  $scope.alertSearch = function(){
    var query1 = new AV.Query($scope.alertContent.searchTable);
    var query2 = new AV.Query($scope.alertContent.searchTable);
    query1.startsWith($scope.alertContent.input1tag,$scope.alertContent.input1);
    query2.startsWith($scope.alertContent.input2tag,$scope.alertContent.input2);
    var queryAlert = AV.Query.and(query1,query2);
    queryAlert.find().then(function(data){
      $scope.$apply(function(){
        if(data.length == 0){$scope.alertContent.warningShow = true;return;}else{$scope.alertContent.warningShow = false;}
        $scope.alertSearched = true;
        $scope.alertleancloud = data;
        $scope.alertContent.searchRes =  JSON.parse(JSON.stringify(data));
      });
    }, function (err){
    });
  };
  $scope.ensureAlert = function(){
      var index = $scope.alertContent.radiovalue;
      switch($scope.alertItem){
      case "sire":
        $scope.showSire = true;
        $scope.currentHorse.sire = $scope.alertleancloud[index];
        $scope.currentHorse.sireName = $scope.alertContent.searchRes[index]["nameChi"];
        break;
      case "dam":
        $scope.showDam = true;
        $scope.currentHorse.dam = $scope.alertleancloud[index];
        $scope.currentHorse.damName = $scope.alertContent.searchRes[index]["nameChi"];
        break;
      case "feeder":
        $scope.showFeeder = true;
        $scope.currentHorse.feeder = $scope.alertleancloud[index];
        $scope.currentHorse.feederName = $scope.alertContent.searchRes[index]["name"];
        break;
      case "owner":
        $scope.showOwner = true;
        $scope.currentHorse.owner = $scope.alertleancloud[index];
        $scope.currentHorse.ownerName = $scope.alertContent.searchRes[index]["name"];
        break;
      case "racecourse":
        $scope.showRacecourse = true;
        $scope.currentHorse.racecourse = $scope.alertleancloud[index];
        $scope.currentHorse.racecourseName = $scope.alertContent.searchRes[index]["name"];
        break;
      }
      // $scope.alertOpen = false;
      $("#alertOpen").hide();
  };
  $scope.clearSelect = function(obj){
    switch(obj){
      case "sire":
        $scope.showSire = false;
        $scope.currentHorse.sire = "";
        $scope.currentHorse.sireName = "";
        break;
      case "dam":
        $scope.showDam = false;
        $scope.currentHorse.dam = "";
        $scope.currentHorse.damName = "";
        break;
      case "feeder":
        $scope.showFeeder = false;
        $scope.currentHorse.feeder = "";
        $scope.currentHorse.feederName = "";
        break;
      case "owner":
        $scope.showOwner = false;
        $scope.currentHorse.owner = "";
        $scope.currentHorse.ownerName = "";
        break;
      case "racecourse":
        $scope.showRacecourse = false;
        $scope.currentHorse.racecourse = "";
        $scope.currentHorse.racecourseName = "";
        break;
      }
  };

});