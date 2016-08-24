var APP_ID = "9yFukzmtOwmePyoc9GYjmHJ5-gzGzoHsz";
var APP_KEY = "iUHln5KjOlOefVClzIDIEkXe";
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
function quitUser() {
    AV.User.logOut();
    window.location.href = "login.html";
};
/*
*传入Date()对象获取yyyy-mm-dd
*/ 
function getFormatDate(date){
    if (date == "" || isNaN(date)) {return "";};
    date = new Date(date);
    var month,day;
    if((date.getMonth() + 1) < 10){
        month = "0" + (date.getMonth() + 1);
    }else{
        month = date.getMonth() + 1;
    }
    if(date.getDate() < 10){
        day = "0" + date.getDate();
    }else{
        day = date.getDate();
    }
    return date.getFullYear() + "-" + month + "-" + day;
}

/*
*传入错误信息，生成弹窗
*/
function makeAlert(mes,location) {
    var closeAction = "";
    if (location == undefined){
        closeAction = "removeAlert(\"error-msg\")";
    }else{
        closeAction = "jumpLocation(\"" + location + "\")";
    }
    var alertDiv=document.createElement("div");
    alertDiv.setAttribute('id','error-msg');
    alertDiv.innerHTML = "<div class='err-head'>提示</div>" +
                    "<div class='err-content'>" +
                        "<p>" + mes + "</p>" + 
                    "</div>" +
                    "<div class='btns'>"+
                        "<a onclick='" + closeAction + "' href='javascript:;' class='btn_basic'>我知道了</a>"+
                    "</div>";
    var first=document.body.firstChild;//得到页面的第一个元素
    document.body.insertBefore(alertDiv,first);//在得到的第一个元素之前插入
}
function removeAlert(id) {
    document.body.removeChild(document.getElementById(id));
}
function jumpLocation(location){
    window.location.href = location;
}

/*
*makeloading
*/
function makeLoading() {
    var alertDiv=document.createElement("div");
    alertDiv.setAttribute('id','loading');
    alertDiv.setAttribute('class','loading_basic');
    alertDiv.innerHTML = "<img src='img/loading.gif' alt=''>";
    var first=document.body.firstChild;//得到页面的第一个元素
    document.body.insertBefore(alertDiv,first);//在得到的第一个元素之前插入
}
function closeLoading(){
    document.body.removeChild(document.getElementById("loading"));
}
