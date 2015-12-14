$(function() {
    
    $(window).scroll(function() {
        var $this = $(this);
        var targetTop = $(this).scrollTop();
        var footerTop = $("#footer").offset().top;
        var height = $(window).height();
        
        console.dir(targetTop);

    })
} ());