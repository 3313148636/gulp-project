	//拖拽
	function dragHandle(ele,ele_){
	    var total,_total;
		if(arguments.length ==1 ){
			total = {_width : window.innerWidth,_height : window.innerHeight};
			_total = {left_ : 0,top_ : 0};
		}else{
			total = {_width : ele_.offsetWidth,_height : ele_.offsetHeight};
			_total = {left_ : getPagePosition(ele_).pageLeft,top_ : getPagePosition(ele_).pageTop};
		}
		ele.onmousedown = function(e){
			var e = e || event;
			var mousePos = {x:e.offsetX,y:e.offsetY};
			document.onmousemove = function(e){
				var e = e || event;
				var left = e.clientX - mousePos.x - _total.left_;
				var top = e.clientY - mousePos.y - _total.top_;
				var _left = Math.max(0,Math.min(left,total._width - ele.offsetWidth));
				var _top = Math.max(0,Math.min(top,total._height - ele.offsetHeight));
				ele.style.left = _left + "px";
				ele.style.top = _top + "px";
			}
		}
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
	
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

	