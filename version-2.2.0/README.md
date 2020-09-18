# wmui.js是一款直接html文件中使用Vue组件功能的小编译器，也可以称呼为vue实时编译插件

一款实现在html文件中直接引用vue组件，无需依赖nodejs，也不用编译打包，实时编写，实时运行，操作简单，兼容性良好的多功能小编译器或插件。

wmui.js实现任意Vue组件在html文件文本中直接加载调用 （ES6的语法需要转化成ES5的语法）

特点：  
1、可以在html中直接使用vue组件，也就是说老项目也可以用vue组件了，封装了es6-promise.auto、http-vue-loader为一体

2、已注册的组件之间可以相互注册使用，全局组件可以在子组件和兄弟组件之间可以直接使用

3、使用简单，直接wmui.loadVue('组件地址')即可加载注册到vue.js，也可以直接使用http-vue-loader.js中的方法

4、只需加载必要的vue.js,无需额外依赖

5、可以完美脱离nodejs

6、支持ie8以上浏览器

7、支持设置scoped局部样式

8、体积比较小，只有10几kb而已

9、此处省略.....个字，好处需自己体会！哈哈

注意事项：  
1、首先加载或者引入vue.js  
2、再次加载或者引入wmui.js  
3、创建vue实例，在components注册组件，用wmui.loadVue('组件地址')来加载挂载vue组件  
4、目前style样式类似只支持css，后续完善对less以及scss的支持！    

### 案例
		<div id="app">
			<test :model='message'></test>
			<test-name :testname='message'></test-name>
		</div>
		<script src="./js/vue.js"></script>
		<script src="./js/wmui.js"></script>
		<script type="text/javascript">
		    var app = new Vue({
		    el: '#app',
		    data: function () {
		        return {
		            message: 'Hello Vue 1!',
		            count: 0,
		            test:0,
		            menulist:[]
		        }
		    },
			created:function(e) {
		  		// console.log(this);
		  	},
		    components: {
		    	'test': wmui.loadVue('./views/test.vue'),
		        'test-name':wmui.loadVue('./views/test-name.vue')
		    },
		    methods: {
		        
		    }
		});
		</script>

  
 二、支持
  

  调用组件		:wmui.loadVue(url)  
  批量加载js	:wmui.loadJs([url])  
  加载 css     :wmui.loadCss(url)  
  合并对象		:wmui.objassign(obj1,obj2)  
  本地缓存		:wmui.cache(key,value,有效期(s))  
  ajax请求
  wmui.ajax({  
     method:"get",  
     url:'',  
     dataType:"html",  
     headers:{  
        'token':'123'  
     },  
     data:{},  
     async : true,  
     success:function(message){  
        console.log(message);  
     }  
    });  
 加载js代码：wmui.loadJsCode(code)  
 加载css代码：wmui.loadCssCode(code)  
 
 
