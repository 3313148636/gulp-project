function $(a){var b=null;if(b=a.match(/^#(.+)/))var c=document.getElementById(b[1]);if(b=a.match(/^\.(.+)/))var c=document.getElementsByClassName(b[1]);if(b=a.match(/^[a-z](.*)/i))var c=document.getElementsByTagName(b[0]);return c}$.ajax=function(a){var b=window.ActiveXObject?new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest;switch(a.type){case"get":{b.open("get",a.url,!0),b.onreadystatechange=function(){4==b.readyState&&200==b.status&&a.success(b.responseText)},b.send();break}case"post":b.open("post",a.url,!0),b.onreadystatechange=function(){4==b.readyState&&200==b.status&&a.success(b.responseText)},b.send();case"jsonp":{var c=parseInt(1e7*Math.random()+new Date().getTime()),d=document.createElement("script");d.src=a.url+"&"+a.callback+"=_cbk"+c,console.log(d.src),window["_cbk"+c]=function(b){a.success(b),d.remove()},document.body.appendChild(d)}}};