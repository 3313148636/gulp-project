function $(str){
    var tar = null;
    if(tar = str.match(/^#(.+)/)){
        var ele = document.getElementById(tar[1]);
    }
    if(tar = str.match(/^\.(.+)/)){
        var ele = document.getElementsByClassName(tar[1]);
    }
    if(tar = str.match(/^[a-z](.*)/i)){
        var ele = document.getElementsByTagName(tar[0]);
    }
    return ele;
}
$.ajax = function(obj){
    var req = window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest();
    switch(obj.type){
        case "get":{
            req.open("get",obj.url,true);
            req.onreadystatechange=function(){
                if (req.readyState==4 && req.status==200){
                    obj.success(req.responseText);
                }
            }        
            req.send();
            break;
        }
        case "post":{
            req.open("post",obj.url,true);
            req.onreadystatechange = function(){
                if(req.readyState == 4&& req.status==200){
                    obj.success(req.responseText);
                }
            }
            req.send();
        }
        case "jsonp":{
            var ran = parseInt( Math.random()*10000000+new Date().getTime() );
            var _script = document.createElement("script");
            _script.src = obj.url + "&" + obj.callback + "=_cbk" + ran;
            console.log(_script.src);
            window["_cbk" + ran] = function(data){
                obj.success(data);
                _script.remove();
            }
            document.body.appendChild(_script);
        }
    }
}

// $ajax({
//     type:"get"/ "post" /"jsonp",
//     url:xxxxxx,
//     callback:"cb",
//     success : function(data){
//         console.log(data);
//     }
// });