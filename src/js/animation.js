function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return window.getComputedStyle(ele,null)[attr];
    }
}
function animation(ele,obj,time,callback){
    ele.deg = 0;
    ele.t = time/90;
    ele.fn = callback;
    ele.timer ? clearInterval( ele.timer ) : null;
    var start = {};
    for(var attr in obj){
        if(attr == "opacity"){
            start[attr] = parseFloat( getStyle(ele,attr) )*100;
        }else{
            start[attr] = parseInt( getStyle(ele,attr) );
        }
    }
    ele.timer = setInterval(function(){
        ele.deg ++;
        if(ele.deg == 90){
            clearInterval(ele.timer);
            if(ele.fn){
                ele.fn();
            }
        }
        for(var attr in obj){
            if (attr == 'opacity') {
                var end = Math.round((obj[attr] * 100 - start[attr]) * Math.sin(ele.deg * Math.PI / 180));
                ele.style[attr] = (start[attr] + end) / 100;
                ele.style.filter = 'alpha(opacity=' + (start[attr] + end) + ')';
            } else {
                var end = Math.round((obj[attr] - start[attr]) * Math.sin(ele.deg * Math.PI / 180));
                ele.style[attr] = start[attr] + end + 'px';
            }
        }
    },ele.t);
}