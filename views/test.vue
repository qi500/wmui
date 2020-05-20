<template>
	<div class="test">
			{{ message }}
			<button @click="testcli">组件一</button>
			<testasss :testa='message'></testasss>
			<testw :testw="message"></testw>
			<test-name :testname='message'></test-name>
			<input type="text" name=""    / >
	</div>
	
</template>
<script>

	import testname from "./views/test-name.vue?a=12";
	// 无扩展名时不能在后面加参数
	import testw from "./views/testw";
	var aaaaaaa= 11123456;
	function asdfgh() {
		alert(aaaaaaa);
	}
	Vue.use(testw);

	// export default
	// module.exports =
	module.exports ={
		name: 'test',
		props: ['model'],
		data: function () {
	        return {
	            message: '组件一',
	            aaa:'444',
	            menulist:[]
	        }
	    },
	    created:function(e) {
	  	},
		methods:{
			testcli:function() {
				asdfgh();
			}
		},
		components: {
			'test-name':testname,
	        'testasss':wmui.loadVue("./views/testasss.vue")
	    },
	}
</script>
<style lang="css" scoped>
	p{
		padding:0;
		margin: 0;

	}
	.test{
		margin: 0;
		color:#4CAF50;
	}
</style>
