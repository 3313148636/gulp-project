console.log("login.js执行了，接下来，准备加载配置文件！");

require(["../js/config"],function(){
    require(["jquery","jquery.hover"],function($){
        console.log($); 
        console.log($.prototype.hoverdir);
    })
});