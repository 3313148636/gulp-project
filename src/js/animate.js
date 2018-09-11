//定点缓冲运动 animate(box,{left:800,top:200,width:200,height:200});
	function animate2(ele,obj,callback){
			var num = 0;
			for(var attr in obj){
				(function(attr){
					var target = obj[attr];
					ele[attr + "timer"] = setInterval(function(){
						var current = parseInt ( getStyle(ele)[attr] );
						if(current<target){
							var speed = Math.ceil( (target-current)/8 );
						}else{ 
							var speed = Math.floor( (target-current)/8 );
						}
						ele.style[attr] = current + speed + "px";
						if(parseInt ( getStyle(ele)[attr] ) == target){
							clearInterval(ele[attr + "timer"]);
							num++;
							if(num == Object.keys(obj).length){
								callback ? callback():"";
							}
						}
					},30);
				})(attr);
			}
		}
		
	function getStyle(eve){
		if(eve.currentStyle){
			return eve.currentStyle;
		}else{
			return getComputedStyle(eve);
		}
	}
	
	function animate(ele,obj,callback){
		var num = 0;
		if(ele.isMoving) return;
		ele.isMoving = true;
		for(var attr in obj){
			(function(attr){
				var target = obj[attr];
				ele[attr + "timer"] = setInterval(function(){
					if(attr == "opacity"){
						var current = parseFloat ( getStyle(ele)[attr] )*100;
						if(current<target){
							var speed = Math.ceil( (target-current)/8 );
						}else{
							var speed = Math.floor( (target-current)/8 );
						}
						ele.style.opacity = (current + speed)/100;
						ele.style.filter = "alpha(opacity="+(current + speed)+")"
						if(ele.style.opacity == target/100) {
							clearInterval(ele["opacitytimer"]);
							num++;
							if(num == Object.keys(obj).length){
								ele.isMoving = false;
								callback ? callback():"";
							}
						}
					}else{
						var current = parseInt ( getStyle(ele)[attr] );
						if(current<target){
							var speed = Math.ceil( (target-current)/8 );
						}else{
							var speed = Math.floor( (target-current)/8 );
						}
						ele.style[attr] = current + speed + "px";
						if(parseInt ( getStyle(ele)[attr] ) == target){
							clearInterval(ele[attr + "timer"]);
							num++;
							if(num == Object.keys(obj).length){
								ele.isMoving = false;
								callback ? callback():"";
							}
						}
					}
				},30);
			})(attr);
		}
	}
	
	function animate1(ele, options, callback){
		if(ele.isMoving) return;
		ele.isMoving = true;
		for(var attr in options) {
			(function(prop){
				var targetvalue = options[prop];  //获取到终点值
				ele[prop+"-timer"] = setInterval(function(){
					if(prop == "opacity") {
						var currentValue = parseFloat(getStyle(ele)[prop])*100;
						var speed = (targetvalue - currentValue)/7;
						speed = speed>0?Math.ceil(speed):Math.floor(speed);
						ele.style.opacity = (currentValue + speed)/100;
						ele.style.filter = "alpha(opacity="+(currentValue + speed)+")"
						if(ele.style.opacity == targetvalue/100) {
							clearInterval(ele["opacity-timer"]);
							if(isOver()) {
								callback ? callback() : "";
							}
						}
					} else {
						var currentValue = parseInt(getStyle(ele)[prop]);
						var speed = (targetvalue - currentValue)/7;
						speed = speed>0?Math.ceil(speed):Math.floor(speed);
						ele.style[prop] =  currentValue + speed + "px";
					}
					if(parseInt(getStyle(ele)[prop]) == targetvalue) {
						clearInterval(ele[prop+"-timer"]);
						if(isOver()) {
							callback ? callback() : "";
						}
					}
				}, 30);
				
			})(attr);
		}		
		function isOver() {
			var flag = true;
			for(var attr in options) {
				var targetval = options[attr];
				var curtVal = parseInt(getStyle(ele)[attr]);
				if(attr == "opacity") {
					curtVal = getStyle(ele)[attr]*100;
				}
				if(curtVal != targetval) {
					flag = false;
					return flag;
				}
			}
			ele.isMoving = false;
			return flag;
		}
	}