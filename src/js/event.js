	//兼容getElementsByClassName方法
	(function(){
		if(!document.getElementsByClassName){
			document.getElementsByClassName = function(classname){
				var allEle = document.getElementsByTagName("*");
				var temp = [];
				for(var i=0; i<allEle.length; i++){
					if( allEle[i].className.indexOf(classname) != -1){
						temp.push( allEle[i] );
					}
				}
				return temp;
			}
		}
	})();
	
	//获取元素相对于页面位置1
	function getPagePosition(target){
			
		var sumLeft = target.offsetLeft;
		var sumTop = target.offsetTop;
		
		while(target.offsetParent != null){
			sumLeft += target.offsetParent.offsetLeft;
			sumTop += target.offsetParent.offsetTop;
			target = target.offsetParent;
		}
		return {
			pageLeft:sumLeft,
			pageTop:sumTop
		};
	}
	
	//获取元素相对于页面位置2
	function getPagePosition2(target){	
		if(target == null){
			return {
				pageLeft:0,
				pageTop:0
			}
		}	
		var page = getPagePosition2(target.offsetParent);
		return{
			pageLeft : target.offsetLeft + page.pageLeft,
			pageTop : target.offsetTop + page.pageTop
		};
	}
	
	//跨浏览器事件对象
	var EventUtil = {
		addHandler:function(element, type, handle){
			if(element.addEventListener){
				element.addEventListener(type, handle, false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handle);
			}else{
				element["on"+type] = handle;
			}
		},
		removeHandler:function(element, type, handle){
			if(element.removeEventListener){
				element.removeEventListener(type, handle, false);
			}else if(element.detachEvent){
				element.detachEvent("on"+type,handle);
			}else{
				element["on"+type] = null;
			}
		},
		getEvent:function(event){
			return event ? event : window.event;
		},
		getTarget:function(event){
			return event.target || event.srcElement;
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		getStyle:function(eve){
			if(eve.currentStyle){
				return eve.currentStyle;
			}else{
				return getComputedStyle(eve);
			}
		}
	};
	
	//改变透明度
	function opacity(ele){
		ele.onmouseover = function(){
			var opc = Number( getStyle(this).opacity );
			clearInterval(ele.timer);
			ele.timer = setInterval(function(){
				opc -= 0.01;
				this.style.opacity = opc;
				if(opc <= 0){
					this.style.opacity = 0;
					clearInterval(ele.timer);
				}
			}.bind(this),30);
		};
		ele.onmouseout = function(){
			var opc = Number( getStyle(this).opacity );
			clearInterval(ele.timer);
			ele.timer = setInterval(function(){
				opc += 0.01;
				this.style.opacity = opc;
				if(opc >= 1){
					clearInterval(ele.timer);
				}
			}.bind(this),30);
		};
	}
	
	function getStyle(eve){
		if(eve.currentStyle){
			return eve.currentStyle;
		}else{
			return getComputedStyle(eve);
		}
	}