
/**
 * [wmui wmui.js插件 v2.1.4]
 * Author：仙客来
 * Date  : 2020-05-20
 * Email ：<1796627261@qq.com>
 * url   : https://github.com/wamkj/wmui
 * 调用组件		:wmui.loadVue(url)
 * 批量加载js	:wmui.loadJs([url])
 * 加载 css     :wmui.loadCss(url)
 * 合并对象		:wmui.objassign(obj1,obj2)
 * 本地缓存		:wmui.cache(key,value,有效期(s))
 * ajax请求
 * wmui.ajax({
 *   method:"get",
 *   url:'',
 *   data:{},
 *   async : true,
 *   success:function(message){
 *       console.log(message);
 *   }
 * });
 * 加载js代码：wmui.loadJsCode(code)
 * 加载css代码：wmui.loadCssCode(code)
 * 
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        var wm = factory();
        wm.__esModule = true;
        wm['default'] = wm;
        module.exports = wm;
    } else {
        root.wmui = factory();
    }
}(this, function () {
    var wmui = {
        /**
         * 解析组件内容
         */
        parseComponent: function (content, options) {
            if (!content) throw Error("content is null.");
            if (!options) options = {};

            // 匹配出模板字符串
            var template = content.match(/(<template.*?>)[\s\S]*?(<\/template>)/gmi);
            var html = "";
            if (template != null && template.length > 0) {
                for (var i = 0; i < template.length; i++) {
                    html += template[i].replace(/^(<template.*?>)+|(<\/template>)+$/gmi,'');
                }
            }

            // 匹配出所有style样式内容
            var stylesone = content.match(/(<style.*?>)[\s\S]*?(<\/style>)/gmi);
            var style = "";
            if (stylesone != null && stylesone.length > 0) {
                // 生成页面id字符串
                var randomStr = 'data-v-'+this.randomStr(8);

            	// 匹配出其中一个style中的样式
                var stylesone_str = "";
    	        for (var i = 0; i < stylesone.length; i++) {
                    // 解析样式
                    var parseTemplateStyles = this.parseTemplateStyles(randomStr,stylesone[i],style,html);
                    style = parseTemplateStyles.style;
                    html = parseTemplateStyles.html;
                    
    	        }
            }
            
            // 合并style样式
            if (style) {
                var index = html.lastIndexOf("</");
                if (index !== -1) {
                    html = html.substr(0, index) + style + html.substr(index);
                }
            }
            options.template = html;


            // 匹配挂载javascript字符串
      		var scriptsone = content.match(/(<script.*?>)[\s\S]*?(<\/script>)/gmi);
      		var script = "";
      		if (scriptsone != null && scriptsone.length > 0) {
            	
    	        for (var i = 0; i < scriptsone.length; i++) {
    	        	script += scriptsone[i].replace(/^(<script.*?>)+|(<\/script>)+$/gmi,'');
    	        }
    	    }

            // 更新javascript字符串
            var scripttxt_options = this.parseimports(script,options);
            var oldscript = script;
            scripttxt = scripttxt_options.scripttxt;
            options = scripttxt_options.options;

            // 生成export default或module.exports=或exports=内容部分正则
            var edmheadstrRegExp = /(export.*?default.*{[\s\S]*})+|(module\.exports.*\=.*{[\s\S]*})+|(exports.*\=.*{[\s\S]*})/gmi;
            
            // 执行组件export default或module.exports=头部js
            var edmheadstr = scripttxt.replace(edmheadstrRegExp,'').replace(/(^\s*)|(\s*$)/g, "");
            if (edmheadstr != null && edmheadstr.length >0) {
                var edmheadstrs = edmheadstr.replace(/import [\s\S]*? from (['"])(?:(?!\1).)*?\1\;/gmi,'').replace(/import (['"])(?:(?!\1).)*?\1\;/gmi, "").replace(/(^\s*)|(\s*$)/g, "");
                if (edmheadstrs != null  && edmheadstrs.length >0) {
                    try {
                        this.loadJsCode(edmheadstrs);
                    }catch(err) {
                        throw new Error("Compile error: The script part of the Vue component is compiled incorrectly. Please check the syntax："+edmheadstrs);
                    }
                }
            }

            // 转化成函数挂载到全局
            var scriptstrtxts = scripttxt.match(edmheadstrRegExp);
            if (scriptstrtxts != null && scriptstrtxts.length > 0 ) {
                scriptstrtxts = scriptstrtxts.join('');
                script = "(" + /{[\s\S]*}/gmi.exec(scriptstrtxts) + ")";

                // 把字符串转当成js执行
                // var obj = eval(script);
                try {
                    var obj = (new Function("return " + script))();

                }catch(err) {
                    throw new Error("Compile error: The script part of the Vue component is compiled incorrectly. Please check the syntax："+oldscript);
                }
                // 把每个对象中的函数方法添加到options上
                for (var prop in obj) {
                    options[prop] = obj[prop];
                }
            }
            
            
            return options;
        },
        // 生成字符串
        randomStr:function (len) {
            len = len || 32;
        　　var $chars = 'abcdefhijkmnprstwxyz123456780';
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
        },
        // 解析样式
        parseTemplateStyles:function(randomStr,stylesonei,style,html) {
            // 拿出样式部分内容
            stylesone_str = stylesonei.replace(/^(<style.*?>)+|(<\/style>)+$/gmi,'');

            // 检查style标签
            var stylesonestrAttrs = stylesonei.match(/<style[^>]*>/gmi);
            if (stylesonestrAttrs != null && stylesonestrAttrs.length > 0) {
                stylesonestrAttrs = stylesonestrAttrs[0].replace(/^(<style)+|(>)+$/gmi,'');
            }else{
                stylesonestrAttrs = '';
            }

            // 检查是否存在Attr标签
            if (stylesone_str.length>0) {
                var styles_classlist= stylesone_str.match(/.*?\{/gmi);
                // 检查是否有scoped，有为局部样式
                if (stylesonestrAttrs.toLowerCase().indexOf('scoped') >-1 && styles_classlist != null && styles_classlist.length >0) {
                    // 更新style对应的template标签
                    stylesone_str = this.parseStyles(styles_classlist,stylesone_str,randomStr);
                    html = this.parseTemplates(html,randomStr);
                    
                }
                // 生成style样式
                style += "<component :is=\"'style'\"";
                style += stylesonestrAttrs;
                style += ">";
                style += stylesone_str;
                style += "</component>\r\n";
            }
            return {style:style,html:html};
        },
        // 解析样式模板
        parseStyles:function(styles_classlist,stylesone_str,randomStr) {
            for (var scti = 0; scti < styles_classlist.length; scti++) {
                // 单个class样式类名
                var classItemName = styles_classlist[scti].replace(/\{/gmi,'');
                var classItemNamekey = classItemName.split(",");
                // 如果批量设置样式
                if (classItemNamekey.length>1) {
                    for (var cink = 0; cink < classItemNamekey.length; cink++) {
                        // 更新style样式
                        var classItemNameRegExp = new RegExp("\\"+classItemNamekey[cink], '');
                        stylesone_str = stylesone_str.replace(classItemNameRegExp,classItemNamekey[cink]+"["+randomStr+"] ");
                    }
                }else{
                    var classItemNameRegExp = new RegExp(classItemName+'\{+|'+classItemName+'\\s+\{', '');
                    stylesone_str = stylesone_str.replace(classItemNameRegExp,classItemName+"["+randomStr+"] {");
                }
                
            }
            return stylesone_str;
        },
        // 解析模板
        parseTemplates:function(html,randomStr) {
            var htmls = html.replace(/<!--[\w\W\r\n]*?-->/gmi, '');
            var htmlslist = htmls.match(/<[^/].*?>/gmi);
            for (var i = 0; i < htmlslist.length; i++) {
                var replacestr = htmlslist[i].substr(0,htmlslist[i].length - 1);
                // 检查是否是带/的标签
                replacestr = replacestr.replace(/(\s*$)/g, "");
                var replacestrxg = replacestr.substr(replacestr.length - 1,1);
                
                if (replacestrxg == '/') {
                    replacestr = replacestr.substr(0,replacestr.length - 1);
                    var newstr = replacestr+' '+randomStr+' />';
                }else{
                    var newstr = replacestr+' '+randomStr+' >';
                }
                html = html.replace(htmlslist[i],newstr);
            }
            return html;
        },
        /**
         * [parseimports 解析import操作]
         * @param  {[type]} script  [js原始字符串]
         * @param  {[type]} options [返回选项]
         */
        parseimports:function(script,options) {
        	// 剔除js注释代码
        	var scripttxts = script.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n').replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n');
        	// 匹配出import导入项(import '路径')
            var importsurl = scripttxts.match(/import (['"])(?:(?!\1).)*?\1/gmi);
            
            if (importsurl != null && importsurl.length > 0) {
                for (var i = 0; i < importsurl.length; i++) {
                    // 匹配出import 路径
                    var importsurlval = importsurl[i].match(/(['"])(?:(?!\1).)*?\1/gmi);
                    if (importsurlval != null && importsurlval.length > 0) {
                        var imporsurlsrc = importsurlval[0].replace(/^["|'](.*)["|']$/gmi,"$1");
                    }else{
                        var imporsurlsrc = '';
                    }
                    if (imporsurlsrc != '') {
                        var imporurlspos = imporsurlsrc.split("/");
                        var filenamestrurl = imporurlspos[imporurlspos.length-1];
                        if (filenamestrurl.split('?') != null && filenamestrurl.split('?').length > 1) {
                            filenamestrurl = filenamestrurl.split('?')[0];
                        }
                        var imporsurlcpp = filenamestrurl.split(".");
                        // 没有后缀添加后缀
                        if (imporsurlcpp.length<2) {
                            var importurltype = '';
                        }else{

                            var importurltype = imporsurlcpp[imporsurlcpp.length-1].toLowerCase();
                        }
                        // 判断import文件类型，支持js、css
                        if (importurltype == 'js') {
                            this.loadJs([imporsurlsrc]);
                        }else if (importurltype == 'css') {
                            this.loadCss([imporsurlsrc]);
                        }else{
                            throw Error("Compile error: file import error, "+importurltype+" type file is not supported. CSS, JS are currently supported");
                        }
                    }
                }
            }

            // 匹配出import导入项(import 名称 from '路径')
        	var imports = scripttxts.match(/import [\s\S]*? from (['"])(?:(?!\1).)*?\1/gmi);
        	var scripttxt = scripttxts;
            if (imports != null && imports.length > 0) {
            	for (var i = 0; i < imports.length; i++) {
            		// 匹配出import 名称
            		var importskey = imports[i].match(/import [\s\S]*? from/gmi);
            		if (importskey != null && importskey.length > 0) {
            			var importname = importskey[0].replace(/^(import .*?)+|( from)+$/gmi,'');
            		}else{
            			var importname = '';
            		}

            		// 匹配出import 路径
    	        	var importsval = imports[i].match(/(['"])(?:(?!\1).)*?\1/gmi);
    	        	if (importsval != null && importsval.length > 0) {
    	        		var imporssrc = importsval[0].replace(/^["|'](.*)["|']$/gmi,"$1");
    	        	}else{
            			var imporssrc = '';
            		}

            		if (importname != '' && imporssrc != '') {
            			var imporspos = imporssrc.split("/");
                        var filenamestr = imporspos[imporspos.length-1];
                        if (filenamestr.split('?') != null && filenamestr.split('?').length > 1) {
                            filenamestr = filenamestr.split('?')[0];
                        }
            			var imporssrcpp = filenamestr.split(".");
    					// 没有后缀添加后缀
    					if (imporssrcpp.length<2) {
    						var importtype = 'vue';
    					}else{

    						var importtype = imporssrcpp[imporssrcpp.length-1].toLowerCase();
    					}
    					// 判断import文件类型，默认为vue，支持js、css、vue、html
    					if (importtype == 'vue' || importtype == 'html') {
                            
                            if (importname.match(/^[a-zA-Z\$_][a-zA-Z\d_]*$/) == null) {
                                throw new Error("Compile error: The name of "+importname+" is malformed. Please check the syntax："+imports[i]);
                            }
                            // 匹配出对应import部分替换成对应变量
    						var scriptsstrRegExp = new RegExp(imports[i],"gmi");
                            scripttxt = scripttxt.replace(imports[i],"var "+importname+" = wmui.loadVue('"+imporssrc+"')");
                            
    						// 匹配自动Vue.use部分
    						var scriptstrsregexp = new RegExp("Vue\.use\(.*?"+importname+".*)","gmi");
    				        var vueusestrs = scripttxt.match(scriptstrsregexp);
    				        if (vueusestrs != null && vueusestrs.length>0) {
    				        	var vueusestr = vueusestrs.join('').replace(scriptstrsregexp,'Vue.component("'+importname+'",wmui.loadVue("'+imporssrc+'"));')
    					        // 没有后缀添加后缀
    					        if (imporssrcpp.length<2) {
    					        	var vueusestr = vueusestrs.join('').replace(scriptstrsregexp,'Vue.component("'+importname+'",wmui.loadVue("'+imporssrc+'.vue"));')
    					        }
    					        scripttxt = scripttxt.replace(scriptstrsregexp,vueusestr);
    				        }

    					}else if (importtype == 'js') {
    						options[importname] = this.loadJs([imporssrc]);
    					}else if (importtype == 'css') {
    						options[importname] = this.loadCss([imporssrc]);
    					}else{
    						throw Error("Compile error: file import error, "+importtype+" type file is not supported. CSS, JS ,html and Vue are currently supported");
    					}
            		}
    	        }
            }
            return {scripttxt:scripttxt,options:options};
        },
        /**
         * 加载单文件组件
         */
        loadVue: function (url, options) {
        	
            var target = this;
            return function(resolve, reject) {
            	target.ajax({
    			    method:"get",
    			    url:url,
                    data:{_loadVue:new Date().getTime(),_callback:window.location.href},
    			    async : true,
    			    success:function(message){
    			        var options = target.parseComponent(message, options);
    		            resolve(options);
    			    }
    			    
    			});
            }
        },
        /**
         * [ajax post get请求]
         * wmui.ajax({
    	 *   method:"get",
    	 *   url:'',
    	 *   async : true,
    	 *   success:function(message){
         *       console.log(message);
    	 *   }
    	 * });
         * @param  {[type]} obj [参数]
         */
    	ajax: function (config) {
            config = config || {};
            //GET：用"GET"方式发送数据,只能256KB;POST：用"POST"方式发送数据
            config.method = config.method.toUpperCase() || "GET"||"get"; 
            config.url = config.url || "";
            //true为异步，false为同步
            config.async = config.async === false ? false : true;
            //所传的数的数据类型
            config.dataType = config.dataType || "text"; 
            //默认表单格式 config.dataType='json'
            config.contentType = config.contentType || "application/x-www-form-urlencoded;charset=utf-8"; 
            config.data = config.data || null;
            function getXmlHttp() {
    	        var obj = null;
    	        //非IE浏览器创建XmlHttpRequest对象
    	        if (window.XMLHttpRequest) obj = new XMLHttpRequest();
    	        //IE浏览器创建XmlHttpRequest对象
    	        if (window.ActiveXObject) {
    	            try {
    	                obj = new ActiveXObject('Microsoft.XMLHTTP');
    	            } catch (e) {
    	                try {
    	                    obj = new ActiveXObject("msxml2.XMLHTTP");
    	                } catch (ex) {
    	                }
    	            }
    	        }
    	        return obj;
    	    }
    		//获取XML 对象
            var xmlHttp = getXmlHttp(); 
            //请求数据data
            var postData = getUrlParama(config.data); 
            if (config.contentType === "application/json;charset=utf-8" && config.dataType === "json") {
            	//转化为json字符串
                postData = JSON.stringify(config.data); 
            }
            if (config.method === 'POST' || config.method === 'post') {
                xmlHttp.open(config.method, config.url, config.async);
                //而POST请求需要设置请求头，用来传递参数
                if (config.contentType === "application/json;charset=utf-8" && config.dataType === "json") {
                    xmlHttp.setRequestHeader('Content-Type',"multipart/form-data"); 
                }else{
                	xmlHttp.setRequestHeader('Content-Type',config.contentType); 
                }

            }else if(config.method === 'GET' || config.method === 'get') {
            	//GET请求，参数是拼接到url上面；   
                if (config.contentType === "application/json;charset=utf-8" && config.dataType === "json") {
                	// 设置get方式json的参数名getjson
                	xmlHttp.open(config.method, config.url + '?GetJson='+ encodeURIComponent(postData), config.async);
                }else{
                	postData = config.url.indexOf("?") >= 0 ? "&" + postData : "?" + postData; 
                	xmlHttp.open(config.method, config.url + postData, config.async);
                }
                postData = null; //重置参数
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    var status = xmlHttp.status;
                    if (status >= 200 && status < 300 || xhr.status==304) {
                        config.success && config.success(xmlHttp.responseText);
                    } else {
                        config.error && config.error(status);
                    }
                }
            };
            xmlHttp.send(postData);
            /**
    	 	 * [getUrlParama url参数拼接]
    	 	 * @param  {[any]} data [待拼接数据]
    	 	 */
    	    function getUrlParama(data) {
    	        var params = [];
    	        for (var key in data) {
    	            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    	        }
    	        //添加&字符串并返回
    	        return params.join('&');
    	    }
        },
        //创建一个script标签
        loadJsCode:function(code) {
            var script = document.createElement("script");  //创建一个script标签
            script.type = "text/javascript";
            try {
                //IE浏览器认为script是特殊元素,不能再访问子节点;报错;
                script.appendChild(document.createTextNode(code));
            }
            catch (ex) {
                script.text = code;
            }
            var docres=document.getElementsByTagName('head')[0].appendChild(script);
            if (docres) {
            	document.getElementsByTagName('head')[0].removeChild(script);
            }
        },
        //创建一个script标签
        loadCssCode:function(code) {
            var style = document.createElement("style");  //创建一个script标签
            style.type = "text/css";
            try {
                //IE浏览器认为script是特殊元素,不能再访问子节点;报错;
                style.appendChild(document.createTextNode(code));
            }
            catch (ex) {
                style.text = code;
            }
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        /**
    	 * [useJs 动态加载js]
    	 * @param  {[type]}   url      [地址['./jquery.min.js','./vue.min.js']]
    	 * @param  {Function} callback [回调函数:js-load-ok]
    	 */
        loadJs:function(src, callback,el) {
        	function arraySync(bsFunc, ar) {
    	    	var callback = arguments[arguments.length - 1];
    		    if (ar.length == 0) {
    		        callback(0, []);
    		        return;
    		    }
    		    var sendErr = false;
    		    var finishNum = ar.length;
    		    var result = [];
    		    var args = [0, 0];
    		    for (var index = 2; index < arguments.length - 1; ++index) {
    		        args.push(arguments[index]);
    		    }
    		    args.push(function (err, r) {
    		        if (err) {
    		            if (!sendErr) {
    		                sendErr = true;
    		                callback(err);
    		            }
    		            return;
    		        }
    		        --finishNum;
    		        result[r.i] = r.v;
    		        if (finishNum == 0) {
    		            callback(0, result);
    		        }
    		    });
    		    for (var i = 0; i < ar.length; ++i) {
    		        args[0] = ar[i];
    		        args[1] = i;
    		        bsFunc.apply(null, args);
    		    }
    	    }
        	var removelist =[];
            arraySync(function (one, i, c) {
                var cur_script = document.createElement("script");
                cur_script.type = 'text/javascript';
                cur_script.src = one;
                cur_script.addEventListener('load', function () {
                    c(0, {
                        i: i,
                        v: {}
                    });
                }, false);
                removelist.push(cur_script);
                if (el != undefined && el != '') {
                    document.getElementById(el).appendChild(cur_script);
                }else{
                    document.head.appendChild(cur_script);
                    
                }
                
            }, src, function (err, r) {
                for (var i = 0; i < removelist.length; i++) {
                    if (el != undefined && el != '') {
                        document.getElementById(el).removeChild(removelist[i]);
                    }else{
                        document.head.removeChild(removelist[i]);
                        
                    }
                }
                removelist = null;
                //全部加载完成后执行的回调函数
                if(typeof(callback)!="undefined"){
                    if (err) {
                        callback(err.message);
                    } else {
                        callback("js-load-ok");
                    }
                }
            });
            return this.loadJs;
        },
        /**
    	 * [importCSS 动态加载css]
    	 * @param  {[type]}   url      [地址]
    	 */
        loadCss:function(url) {
        	if(!url || url.length === 0){
    	        throw new Error('argument "url" is required !');
    	    }
    	    var head = document.getElementsByTagName('head')[0];
    	    var link = document.createElement('link');
    	    link.href = url;
    	    link.rel = 'stylesheet';
    	    link.type = 'text/css';
    	    head.appendChild(link);
        },
        /**
    	 * [objassign 对象合并]
    	 * @param  {[type]} objone [对象1]
    	 * @param  {[type]} objtwo [对象2]
    	 */
        objassign:function(objone,objtwo) {
        	if (typeof Object.assign != 'function') {
    	        Object.assign = function(target) {
    	            'use strict';
    	            if (target == null) {
    	              throw new TypeError('Cannot convert undefined or null to object');
    	            }
    	         
    	            target = Object(target);
    	            for (var index = 1; index < arguments.length; index++) {
    	              var source = arguments[index];
    	              if (source != null) {
    	                for (var key in source) {
    	                  if (Object.prototype.hasOwnProperty.call(source, key)) {
    	                    target[key] = source[key];
    	                  }
    	                }
    	              }
    	            }
    	            return target;
    	        };
    	    }
    	    return Object.assign(objone,objtwo);
        },
        /**
    	 * [cache 本地缓存]
    	 * 读取：cache(key)
    	 * 设置：cache(key,value)
    	 * 删除单个：cache(key,null)
    	 * 清除所有：cache(null)
    	 * @param  {[type]} key   [索引]
    	 * @param  {[type]} value [缓存值]
    	 * @param  {[type]} time  [有效期(秒)]
    	 */
        cache:function(key,value,time) {
        	if (typeof key != 'undefined' && key != null && typeof value != 'undefined' && value != null) {
                if (typeof time !== 'undefined' && time != null) {
                    var expirse = Number(Math.round(new Date() / 1000))+Number(time);
                    var setdata = {value: value, expirse:expirse};
                    console.log(key,JSON.stringify(setdata));
                    window.localStorage.setItem(key, JSON.stringify(setdata));
                }else{
                    var setdata = {value: value};
                    window.localStorage.setItem(key, JSON.stringify(setdata));
                }
            }else if(typeof key !== 'undefined' && key !== null  && typeof value === 'undefined' ) {
                var getvalue = JSON.parse(window.localStorage.getItem(key));
                if (getvalue && getvalue != undefined && getvalue != null) {
                    if (getvalue.expirse != undefined && getvalue.expirse != null && getvalue.expirse < Math.round(new Date() / 1000)) {
                        window.localStorage.removeItem(key);
                        return '';
                    } else {
                        
                        return getvalue.value;
                    }
                }
                return '';
            }else if(typeof key !== 'undefined' && key !== null && typeof value !== 'undefined' && value === null) {
                window.localStorage.removeItem(key);
            }else{
                window.localStorage.clear();
            }
        }

    };
    return wmui;
}));