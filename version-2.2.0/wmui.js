// es6-promise.auto.min.js
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(t){for(var e=0;this._state===nt&&e<t.length;e++)this._eachEntry(t[e],e)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});
// http-vue-loader
(function umd(root,factory){
    if(typeof module==='object' && typeof exports === 'object' )
        module.exports=factory()
    else if(typeof define==='function' && define.amd)
        define([],factory)
    else
        root.httpVueLoader=factory()
})(this,function factory() {
    'use strict';

    var scopeIndex = 0;

    StyleContext.prototype = {

        withBase: function(callback) {

            var tmpBaseElt;
            if ( this.component.baseURI ) {

                // firefox和chrome需要在文档中插入或修改<style>时设置<base>。
                tmpBaseElt = document.createElement('base');
                tmpBaseElt.href = this.component.baseURI;

                var headElt = this.component.getHead();
                headElt.insertBefore(tmpBaseElt, headElt.firstChild);
            }

            callback.call(this);

            if ( tmpBaseElt )
                this.component.getHead().removeChild(tmpBaseElt);
        },

        scopeStyles: function(styleElt, scopeName) {
            function process() {

                var sheet = styleElt.sheet;
                var rules = sheet.cssRules;

                for ( var i = 0; i < rules.length; ++i ) {

                    var rule = rules[i];
                    if ( rule.type !== 1 )
                        continue;

                    var scopedSelectors = [];

                    rule.selectorText.split(/\s*,\s*/).forEach(function(sel) {
                        scopedSelectors.push(scopeName+' '+sel);
                        // segments[1] 父级
                        // scopeName 标示
                        // segments[2]最后一级
                        // 匹配出每层样式选择器
                        var segments = sel.match(/([^ :]+)(.+)?/);
                        // 组装成带标示的新样式选择器
                        scopedSelectors.push(segments[1] + scopeName + (segments[2]||''));
                        
                    });
                    // 把每行选择器与每行样式合并成新样式
                    var scopedRule = scopedSelectors.join(',') + rule.cssText.substr(rule.selectorText.length);
                    sheet.deleteRule(i);
                    sheet.insertRule(scopedRule, i);
                }
            }

            try {
                // firefox可能会失败表.css规则带有无效访问错误
                process();
            } catch (ex) {
                
                if ( ex instanceof DOMException && ex.code === DOMException.INVALID_ACCESS_ERR ) {

                    styleElt.sheet.disabled = true;
                    styleElt.addEventListener('load', function onStyleLoaded() {

                        styleElt.removeEventListener('load', onStyleLoaded);

                        // firefox需要这个超时，否则我们必须使用document.importNode(style, true)
                        setTimeout(function() {

                            process();
                            styleElt.sheet.disabled = false;
                        });
                    });
                    return;
                }

                throw ex;
            }
        },

        compile: function() {
            var hasTemplate = this.template !== null;

            var scoped = this.elt.hasAttribute('scoped');
            if ( scoped ) {

                // 无Template，无需可范围的样式
                if ( !hasTemplate )
                    return;

                // firefox不允许此属性
                this.elt.removeAttribute('scoped');
            }

            this.withBase(function() {

                this.component.getHead().appendChild(this.elt);
            });

            if ( scoped )

                this.scopeStyles(this.elt, '['+this.component.getScopeId()+']');
            return Promise.resolve();
        },

        getContent: function() {

            return this.elt.textContent;
        },

        setContent: function(content) {

            this.withBase(function() {

                this.elt.textContent = content;
            });
        }
    };

    function StyleContext(component, elt) {
        this.component = component;
        this.elt = elt;
    }


    ScriptContext.prototype = {

        getContent: function() {

            return this.elt.textContent;
        },

        setContent: function(content) {

            this.elt.textContent = content;
        },

        compile: function(module) {

            var childModuleRequire = function(childURL) {

                return httpVueLoader.require(resolveURL(this.component.baseURI, childURL));
            }.bind(this);

            var childLoader = function(childURL, childName) {

                return httpVueLoader(resolveURL(this.component.baseURI, childURL), childName);
            }.bind(this);

            try {
                Function('exports', 'require', 'httpVueLoader', 'module', this.getContent()).call(this.module.exports, this.module.exports, childModuleRequire, childLoader, this.module);
            } catch(ex) {

                if ( !('lineNumber' in ex) ) {

                    return Promise.reject(ex);
                }
                var vueFileData = responseText.replace(/\r?\n/g, '\n');
                var lineNumber = vueFileData.substr(0, vueFileData.indexOf(script)).split('\n').length + ex.lineNumber - 1;
                throw new (ex.constructor)(ex.message, url, lineNumber);
            }

            return Promise.resolve(this.module.exports)
            .then(httpVueLoader.scriptExportsHandler.bind(this))
            .then(function(exports) {

                this.module.exports = exports;
            }.bind(this));
        }
    };

    function ScriptContext(component, elt) {
        this.component = component;
        this.elt = elt;
        this.module = { exports:{} };
    }


    TemplateContext.prototype = {

        getContent: function() {
            return this.elt.innerHTML;
        },

        setContent: function(content) {

            this.elt.innerHTML = content;
        },

        getRootElt: function() {

            var tplElt = this.elt.content || this.elt;

            if ( 'firstElementChild' in tplElt )
                return tplElt.firstElementChild;

            for ( tplElt = tplElt.firstChild; tplElt !== null; tplElt = tplElt.nextSibling )
                if ( tplElt.nodeType === Node.ELEMENT_NODE )
                    return tplElt;

            return null;
        },

        compile: function() {

            return Promise.resolve();
        }
    };

    function TemplateContext(component, elt) {

        this.component = component;
        this.elt = elt;
    }



    Component.prototype = {

        getHead: function() {

            return document.head || document.getElementsByTagName('head')[0];
        },

        getScopeId: function() {

            if ( this._scopeId === '' ) {

                this._scopeId = 'data-s-' + (scopeIndex++).toString(36);
                this.template.getRootElt().setAttribute(this._scopeId, '');
            }
            return this._scopeId;
        },

        load: function(componentURL) {

            return httpVueLoader.httpRequest(componentURL)
            .then(function(responseText) {

                this.baseURI = componentURL.substr(0, componentURL.lastIndexOf('/')+1);
                var doc = document.implementation.createHTMLDocument('');

                // IE requires the <base> to come with <style>
                doc.body.innerHTML = (this.baseURI ? '<base href="'+this.baseURI+'">' : '') + responseText;

                for ( var it = doc.body.firstChild; it; it = it.nextSibling ) {

                    switch ( it.nodeName ) {
                        case 'TEMPLATE':
                            this.template = new TemplateContext(this, it);
                            break;
                        case 'SCRIPT':
                            this.script = new ScriptContext(this, it);
                            break;
                        case 'STYLE':
                            this.styles.push(new StyleContext(this, it));
                            break;
                    }
                }

                return this;
            }.bind(this));
        },

        _normalizeSection: function(eltCx) {

            var p;

            if ( eltCx === null || !eltCx.elt.hasAttribute('src') ) {

                p = Promise.resolve(null);
            } else {

                p = httpVueLoader.httpRequest(eltCx.elt.getAttribute('src'))
                .then(function(content) {

                    eltCx.elt.removeAttribute('src');
                    return content;
                });
            }

            return p
            .then(function(content) {

                if ( eltCx !== null && eltCx.elt.hasAttribute('lang') ) {

                    var lang = eltCx.elt.getAttribute('lang');
                    eltCx.elt.removeAttribute('lang');
                    return httpVueLoader.langProcessor[lang.toLowerCase()].call(this, content === null ? eltCx.getContent() : content);
                }
                return content;
            }.bind(this))
            .then(function(content) {

                if ( content !== null )
                    eltCx.setContent(content);
            });
        },

        normalize: function() {

            return Promise.all(Array.prototype.concat(
                this._normalizeSection(this.template),
                this._normalizeSection(this.script),
                this.styles.map(this._normalizeSection)
            ))
            .then(function() {

                return this;
            }.bind(this));
        },

        compile: function() {

            return Promise.all(Array.prototype.concat(
                this.template && this.template.compile(),
                this.script && this.script.compile(),
                this.styles.map(function(style) { return style.compile(); })
            ))
            .then(function() {

                return this;
            }.bind(this));
        }
    };

    function Component(name) {

        this.name = name;
        this.template = null;
        this.script = null;
        this.styles = [];
        this._scopeId = '';
    }

    function identity(value) {

        return value;
    }

    function parseComponentURL(url) {

        var comp = url.match(/(.*?)([^/]+?)\/?(\.vue)?(\.html)?(\.htm)?(\?.*|#.*|$)/);
        var files = '';
        var filename = '';
        var ext = '';
        if (comp[2] !== undefined) {
            files = comp[2];
        }
        if (comp[3] !== undefined) {
            filename = comp[3];
        }
        if (comp[4] !== undefined) {
            ext = comp[4];
        }
        return {
            name: comp[2],
            url: comp[1] + files + filename + ext
        };
    }

    function resolveURL(baseURL, url) {
        if (url.substr(0, 2) === './' || url.substr(0, 3) === '../') {
            return baseURL + url;
        }
        return url;
    }


    httpVueLoader.load = function(url, name) {

        return function() {

            return new Component(name).load(url)
            .then(function(component) {
                return component.normalize();
            })
            .then(function(component) {

                return component.compile();
            })
            .then(function(component) {

                var exports = component.script !== null ? component.script.module.exports : {};

                if ( component.template !== null )
                    exports.template = component.template.getContent();

                if ( exports.name === undefined )
                    if ( component.name !== undefined )
                        exports.name = component.name;

                exports._baseURI = component.baseURI;

                return exports;
            });
        };
    };


    httpVueLoader.register = function(Vue, url) {

        var comp = parseComponentURL(url);
        Vue.component(comp.name, httpVueLoader.load(comp.url));
    };

    httpVueLoader.install = function(Vue) {

        Vue.mixin({

            beforeCreate: function () {

                var components = this.$options.components;

                for ( var componentName in components ) {

                    if ( typeof(components[componentName]) === 'string' && components[componentName].substr(0, 4) === 'url:' ) {

                        var comp = parseComponentURL(components[componentName].substr(4));

                        var componentURL = ('_baseURI' in this.$options) ? resolveURL(this.$options._baseURI, comp.url) : comp.url;

                        if ( isNaN(componentName) )
                            components[componentName] = httpVueLoader.load(componentURL, componentName);
                        else
                            components[componentName] = Vue.component(comp.name, httpVueLoader.load(componentURL, comp.name));
                    }
                }
            }
        });
    };

    httpVueLoader.require = function(moduleName) {

        return window[moduleName];
    };

    httpVueLoader.httpRequest = function(url) {

        return new Promise(function(resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
                    xhr.responseType = 'text';

            xhr.onreadystatechange = function() {

                if ( xhr.readyState === 4 ) {

                    if ( xhr.status >= 200 && xhr.status < 300 )
                        resolve(xhr.responseText);
                    else
                        reject(xhr.status);
                }
            };

            xhr.send(null);
        });
    };

    httpVueLoader.langProcessor = {
        html: identity,
        js: identity,
        css: identity
    };

    httpVueLoader.scriptExportsHandler = identity;

    function httpVueLoader(url, name) {

        var comp = parseComponentURL(url);
        return httpVueLoader.load(comp.url, name);
    }
    return httpVueLoader;
});

/**
 * [wmui wmui.js插件 v2.2.0]
 * Author：侠客来
 * Date  : 2020-09-18
 * Email ：<1796627261@qq.com>
 * url   : https://github.com/wamkj/wmui
 * 调用组件     :wmui.loadVue(url)
 * 批量加载js   :wmui.loadJs([url])
 * 加载 css     :wmui.loadCss(url)
 * 合并对象     :wmui.objassign(obj1,obj2)
 * 本地缓存     :wmui.cache(key,value,有效期(s))
 * ajax请求
 * wmui.ajax({
 *   method:"get",
 *   dataType:"html",
 *   headers:{
 *       'token':'123'
 *   },
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
        // 调用组件
        loadVue:function(url){
            return httpVueLoader(url);
        },
        /**
         * [ajax post get请求]
         * wmui.ajax({
         *   method:"get",
         *   dataType:"html",
         *   headers:{
         *       'token':'123'
         *   },
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
            config.method = config.method.toUpperCase() || "GET"; 
            config.url = config.url || "";
            //true为异步，false为同步
            config.async = config.async === false ? false : true;
            //所传的数的数据类型
            config.dataType = config.dataType || "TEXT";
            if (config.dataType !="") {
                config.dataType = config.dataType.toUpperCase();
            }else{
                config.dataType = "TEXT";
            }
            // 请求头headers
            config.headers = config.headers || {};
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
            function setRequestHeader(){
                var headers = config.headers;
                for (var item in headers) {
                    xmlHttp.setRequestHeader(item, headers[item]);
                }
            }
            //获取XML 对象
            var xmlHttp = getXmlHttp(); 
            //请求数据data
            var postData = getUrlParama(config.data);
            if (config.contentType === "application/json;charset=utf-8") {
                //转化为json字符串
                postData = JSON.stringify(config.data); 
            }
            var configUrl = config.url;
            if (config.method === 'POST') {
                configUrl = config.url;
            }else if(config.method === 'GET') {
                //GET请求，参数是拼接到url上面；   
                postData = config.url.indexOf("?") >= 0 ? "&" + postData : "?" + postData;
                configUrl = config.url + postData;
            }
            xmlHttp.open(config.method,configUrl, config.async);
            //而POST请求需要设置请求头，用来传递参数
            // 设置请求头headers
            setRequestHeader();
            if (config.method === 'POST') {
                if (config.contentType === "application/json;charset=utf-8") {
                    xmlHttp.setRequestHeader('Content-Type',"multipart/form-data"); 
                }else{
                    xmlHttp.setRequestHeader('Content-Type',config.contentType); 
                }
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    var status = xmlHttp.status;
                    if (status >= 200 && status < 300 || status==304) {
                        if (config.dataType == "JSON") {
                            var responseText = JSON.parse(xmlHttp.responseText);
                        }else{
                            var responseText = xmlHttp.responseText;
                        }
                        config.success && config.success(responseText);
                    } else {
                        config.error && config.error(status);
                    }
                }
            };
            xmlHttp.send(postData);
            postData = null; //重置参数
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