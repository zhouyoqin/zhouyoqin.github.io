/**
 * Created by zhou on 2015/7/26.
 */
$(document).ready(function() {
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
    
    $("#weixin").hover(function(){
        $("#card").css('left','18%');
        $("#card").toggle();
    });
    $("#app").hover(function(){
        $("#card").css('left','44%');
        $("#card").toggle();
    });

    $("#btnSub").mouseover(function(){
        $("#pros").css('height','90px');
    });
    $("#pros").mouseover(function(){
        $("#pros").css('height','90px');
    });
    $("#btnSub").mouseout(function(){
        $("#pros").css('height','0');
    });
    $("#pros").mouseout(function(){
        $("#pros").css('height','0');
    });

});