/**
 * Created by zhou on 2015/7/26.
 */
$(document).ready(function() {
    var newWindowWidth = $(window).width();
    if(newWindowWidth < 768)
    {
        $("#main-bk").attr("src", "http://mttsmart.oss-cn-beijing.aliyuncs.com/mtt%2Fmain-small.png" );
        $("#buy-box").css("bottom","5%");
        //$("#sub-header").hide();
    }
    else{
        $("#main-bk").attr("src", "http://mttsmart.oss-cn-beijing.aliyuncs.com/mtt%2Fmain.png" );
        $("#buy-box").css("bottom","30%");
        //$("#sub-header").show();
    }

    $(window).bind("resize", resizeWindow);
    function resizeWindow(e) {
        var newWindowWidth = $(window).width();
        if(newWindowWidth < 768)
        {
            $("#main-bk").attr("src", "http://mttsmart.oss-cn-beijing.aliyuncs.com/mtt%2Fmain-small.png" );
            $("#buy-box").css("bottom","5%");
            //$("#sub-header").hide();
        }
        else{
            $("#main-bk").attr("src", "http://mttsmart.oss-cn-beijing.aliyuncs.com/mtt%2Fmain.png" );
            $("#buy-box").css("bottom","30%");
            //$("#sub-header").show();
        }
    }


    $("#video1-a").click(function () {
        $("#video1").css("display","block");
    });
    $("#video1").click(function () {
        $("#video1").css("display","none");
    });
    $("#video2-a").click(function () {
        $("#video2").css("display","block");
    });
    $("#video2").click(function () {
        $("#video2").css("display","none");
    });
    $("#video3-a").click(function () {
        $("#video3").css("display","block");
    });
    $("#video3").click(function () {
        $("#video3").css("display","none");
    });

    $("#footerWeixin").hover(function () {
        $("#footerWeixinCode").toggle();
    });
    $("#header-switch").click(function(){
        $("#header-switch").toggle();
        $("#header-switch2").toggle();
        $("#header-pros").toggle();
        $("#header-ul").toggle();

        $("#content").toggle();
        $("#footerHr").toggle();
        $("footer").toggle();
        $("body").css("background-color","rgba(0, 0, 0, 0.4)")
            .css("height","100%")
            .css("width","100%")
            .css("margin","0")
            .css("position","fixed");
    });
    $("#header-switch2").click(function(){
        $("#header-switch").toggle();
        $("#header-switch2").toggle();
        $("#header-pros").toggle();
        $("#header-ul").toggle();

        $("#content").toggle();
        $("#footerHr").toggle();
        $("footer").toggle();
        $("body").css("background-color","#e5e5e5")
            .css("position","relative");

    });
});