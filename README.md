# vue wmui.js是一款直接html中使用Vue组件功能的httpLoadVue   
QQ技术群：726982781  

一款实现在html中直接使用vue组件的js，操作简单，兼容性良好。

wmui.js实现任意Vue组件在html中加载调用 

特点：  
1、可以在html中直接使用vue组件，也就是说老项目也可以用vue组件了，采用XMLHttpRequest读取文件

2、已注册的组件之间可以相互注册使用，全局组件可以在子组件和兄弟组件之间可以直接使用

3、使用简单，直接wmui.loadVue('组件地址')即可加载注册到vue.js

4、只需加载必要的vue.js,无需额外依赖

5、可以完美脱离nodejs、npm、webpack

6、支持ie8以上浏览器

7、支持设置scoped局部样式

8、体积比较小，只有10几kb而已

9、此处省略.....个字，好处需自己体会！哈哈

注意事项：
1、首先加载或者引入vue.js
2、再次加载或者引入wmui.js
3、创建vue实例，在components注册组件，用wmui.loadVue('组件地址')来加载挂载vue组件


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
	
二、vue组件里调用vue组件或者js,css：
1、局部注册调用Vue组件：(可以把vue组件文件后缀改为html)
	语法：

	//注意：组件名称中不能有特殊符号，文件名后缀可以不写，运行时发现没写会自动补全.vue后缀
	
	//import 组件名称 from '组件路径';
	例：import testasss from './views/testasss.vue';

	//在components中注册
	components: {
		//'组件名称':组件名称,
		'testasss':testasss,

		//也可以直接用wmui.loadVue方法加载，无需import方式导入,这两种写法都是等价相同的
		//'testasss':wmui.loadVue("./views/testasss.vue")
	},

2、全局注册调用Vue组件：
	语法：


	//注意：全局组件不能超出父级范围,子组件和兄弟组件之间可以直接使用
	
	//import 组件名称 from '组件路径';
	例：import testasss from './views/testasss.vue';
	
	//Vue.use(组件名称);
	Vue.use(testasss);

3、Vue组件里引用css或者js：
	语法：

	//注意：必须带文件名后缀！而且是是挂载到全局，不是挂载到文件别名下！！！
	
	//import 文件别名或者类名等 from '文件路径';
	例：import testasss from './views/testasss.vue';
	
	//引入css
	import test from './css/test.css';

	//引入js
	import test from './js/test.js';

	或者简写：
	//引入css
	import './css/test.css';

	//引入js
	import './js/test.js';
  
  
  
  三、支持
  

  调用组件		:wmui.loadVue(url)  
  批量加载js	:wmui.loadJs([url])  
  加载 css     :wmui.loadCss(url)  
  合并对象		:wmui.objassign(obj1,obj2)  
  本地缓存		:wmui.cache(key,value,有效期(s))  
  ajax请求
  wmui.ajax({  
      method:"get",  
     url:'',  
     data:{},  
     async : true,  
     success:function(message){  
        console.log(message);  
     }  
    });  
 加载js代码：wmui.loadJsCode(code)  
 加载css代码：wmui.loadCssCode(code)  
 
 
