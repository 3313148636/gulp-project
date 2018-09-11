$.fn.draggble = function(){
    var that = this;
    var mousePos = null;
    //$(this).css("position", "fixed");
    $(this).mousedown(function(e){
        console.log(1);
        mousePos = {
            x : e.offsetX,
            y : e.offsetY
        }
        $(document).bind("mousemove", _mousemove);
    })
    $(document).mouseup(function(){
        $(this).unbind("mousemove",_mousemove)
    })
    function _mousemove(e){
        var _left = e.clientX - mousePos.x;
        var _top = e.clientY - mousePos.y;
        var left = Math.max(0,Math.min(_left,$(window).width()-$(that).outerWidth())) +"px";
        var top = Math.max(0,Math.min(_top,$(window).height()-$(that).outerHeight())) +"px";
        $(that).css({"left":left,"top":top});
    }
}