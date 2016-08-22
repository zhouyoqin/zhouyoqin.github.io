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
        closeAction = "removeAlert()";
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
function removeAlert() {
    document.body.removeChild(document.getElementById("error-msg"));
}
function jumpLocation(location){
    window.location.href = location;
}