/**
 * [js原生树状插件 1.0.0]
 */
;(function (undefined) {
    "use strict"
    var _global;
    var wm = {
      // 显示菜单
      minTree:function(res){
        init(res);
      },
      getMinTree:function(res){
        var id = document.getElementsByName(res.check_name);
        var value = '';
        for(var i = 0; i < id.length; i++){
          if(id[i].checked)
          value =value +','+id[i].value;
        }
        if (value.substr(0,1)==',') value=value.substr(1);
        res.success(value);
      }
    }       
    function init(res){
        var dul=document.createElement("ul");
        dul.marginLeft="0px";
        dul.style.padding="0px 30px";
        var style = document.createElement("style");
        style.type = "text/css";
        // 添加基础样式
        var stylevalue='ul{list-style: none;}li{list-style: none;padding: 0px; }.item{width:25px; height:14px;margin: 3px 0 0px 5px;display:inline-block;}input{width:14px; height:14px; margin:0px;float:left;}ul i{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB4SURBVDhPYyAb/H628//7ix1YMUgOqgwTvDjd9P//7+1Y8YcbM/7/+ngOu2Z8Gv98Xf0fJI+O/zxc+5/hyZESsAJSMEgPZRq/v55KEgZrvL8jAaskPgzSQ77Gcys8/3+6X0cSBukZAI2gCAUxSMEgPdD0QypgYAAAbv0MOBEX0zcAAAAASUVORK5CYII=) no-repeat 0 0;}ul i.unfold {background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC7SURBVDhPYxg84Peznf/fX+zAikFyUGW4wYvTTf///96OFX+4MeP/r4/n8BuCz4A/X1f/B8mj4z8P1yIMfXKkBKyQFAzSA9VOgQEgv4H8iC3wcGGQ+u+vp0IMAHFApmHzOy4MMgRkwP0dCf8Zfr47DDYR3Xl48b3ZYEPABvz58xvsFJCJpGCQZrABIABywcsbRVgV4sIgS8+t8IQY8OntHbBpn+7XEY1BFsINAAGQASABUjA4FgYYMDAAAEhaNnljlpTZAAAAAElFTkSuQmCC) no-repeat 0 0;}.finalchart{width: 20px;display: inline-block;margin: 3px 0 0px 5px;height: 14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAABY0lEQVQoU4WQv0oDQRDGvyzHRROEsxMtLFJa+QCCD2AqOyvBB7BREGx8BvUFxM5SLAVB8AUsPAJeIRxIAiF/zJns7u2uM7c5iZDgD4abnfu+mdmtXD8N3Veng0V04zecH+8giiJfuHzsOcYY47TWTkrpxuOxG40y1/roupOLe3d19+p6Pa8TLtegL4QQCIIAYRiiurSEoFqDCGtF02ezgZuHd/T7fQirvaGEM5UDhhJjfX2z9YI0+UQcxxBGq6I7I0nI4kwDI4rVaBkH+03s7TbhrMVgMKAJSlEnL2YhRz4dOJwAK+vA2hZNJgMjjJRQBtD+XIgnZOJgimYU5tegJsW+bCrFDJ8ZFueUW0MrEGSQ+KZ8npjrXMvJZI0vCksrMYvEDNcsjyHoWRW0n/ZHXMI1vsfMSvRK0zswLGZB2Z1zNWOonJ7dkvx/2u0ujg63UUnT1CVJgizLpr/mU6/X0Wg08APYyvqHisTIzAAAAABJRU5ErkJggg==) no-repeat 0 0}a{ text-decoration: none; color:#666; opacity: 0.9;}.fold{ display:none;}';
        try{
        　　style.appendChild(document.createTextNode(stylevalue));
        }catch(ex){
        　　style.styleSheet.cssText = stylevalue;//针对IE
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);

        document.getElementById(res["container"]).appendChild(dul);
        // 判断是否被选中
        if(typeof(res.check) != 'undefined' && res.check.length > 0){
          for(var i=0; i<res['data'].length; i++){
            var id = res['data'][i][res['id_name']];
            res['data'][i]['check'] = false;
            for(var k=0; k<res.check.length; k++){
              if(id == res.check[k]){
                res['data'][i]['check'] = true;
                break;
              };
            };
          };
        };
        for (var i=0;i<res['data'].length;i++) {
            var li=document.createElement("li");
            var ul=document.createElement("ul");
            var a=document.createElement("a");
            var div=document.getElementById(res["container"]);
            var check=false,box=null;
            $(a).attr("href","javascript:void(0)");
            var that=res['data'][i];
            $(a).text(that[res['id_title']]);
            $(a).attr("leaf","true");//默认都是叶子结点
            //遍历数据 添加属性
            for(var pro in that){
                if(pro!="id"){
                  $(a).attr(pro,that[pro]);
                }
            }
            $(li).append(a);
            $(li).attr("id",that[res['id_name']]);
            li.style.marginLeft="21px";//默认
            if(res.checkBox){
                check=true;
            }
            if(check){
              box=document.createElement("input");
              box.setAttribute("type","checkbox");
              $(box).attr("name",res['check_name']);
              $(box).attr("value",that[res['id_name']]);
              if(res['data'][i]['check']) {
                box.checked = true;
              }
              $(a).append(box);
            }
                
            //添加节点
            var parentId=document.getElementById(that[res['pid_name']]);
            if(parentId){
                var ibiao=parentId.getElementsByTagName("i");    
                //添加标签图标
                if(ibiao.length<1){
                 ibiao=document.createElement("i");
                //父元素的子元素 :a标签  在开头添加元素
                $(parentId).find("a").prepend(ibiao);
                $(ibiao).addClass("item");
                if (res.default_open) {
                  $(ibiao).addClass("unfold");
                }
                //非叶子节点
                $(ibiao).parent().attr("leaf","false"); //含有子元素 修改为不是叶子结点
                parentId.style.marginLeft="0px";//默认
                }
                // console.log(parentId.parentNode.style.marginLeft);   
                ul.appendChild(li);
                if (res.default_open) {
                  ul.style.display="block";
                }
                ul.style.marginLeft=14+"px";
                ul.className="fold ul-"+that[res['pid_name']];
                parentId.appendChild(ul);
            }else{
                li.style.marginLeft="21px";//默认
                $("#"+res["container"]).children(0).append(li);
            }
        }
      
      //i图标标签添加点击事件
      $(".item").click(function(){
        show(this,1,res);
      })
       // 节点悬浮事件
        $("#"+res["container"]+" a").hover(function(){
            this.style.backgroundColor="rgb(179,231,255)";
        },function(){
            this.style.backgroundColor="white";
        })
       //节点点击事件
       $("#"+res["container"]+" a").click(function(){
           var a=$(this);
           var div=document.getElementById(res["container"]);
           //只能点击图标 才展开
           if(res.onlyIcon==false){
              var ibiao=a.find("i");
              show(ibiao,'',res);
           }
       })
       //checkbox点击事件
        $("#"+res["container"]+" input[type=checkbox]").click(function(){
            //点击父元素 子元素全部选上
          var inputs=this.parentElement.parentElement.getElementsByTagName("input");
          for(var i=0;i<inputs.length;i++){
              if($(this).is(":checked")){
                $(inputs[i]).prop("checked",true);//推荐使用prop
              }else{
                $(inputs[i]).prop("checked",false);
              }
          }
        })
    }
    function show(sender,flag,res){
        var div=document.getElementById(res["container"]);
        //只能点击图标 才展开
        if(res.onlyIcon==false){
          if(flag==1){
            return;
          }
        }

        var ibiao=$(sender);
        var par=$(sender).parent().parent();//li标签
        var id=par.attr("id");
        par.find(".ul-"+id).slideToggle(300);//ul元素可见
        ibiao.toggleClass("unfold");//切换图标
    }

// 最后将对象暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = wm;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return wm;
        });
    } else {
        !('wm' in _global) && (_global.wm = wm);
    }
}());