<template>
	<div>
		<div>
			{{ message }}
			<button @click="testcli">组件一</button>
			<testasss :testa='message'></testasss>
			<testw :testw="message"></testw>
			<test-name :testname='message'></test-name>
		</div>
	</div>
	
</template>
<script>

	import test-name from "./views/test-name.vue?a=12";
	// 无扩展名时不能在后面加参数
	import testw from "./views/testw";
	var aaaaaaa= 11123456;
	function asdfgh() {
		alert(aaaaaaa);
	}
	Vue.use(testw);

	// export default
	// module.exports =
	export default {
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
			// console.log(this);
	  	},
		methods:{
			testcli:function() {
				asdfgh();
			}
		},
		components: {
			'test-name':test-name,
	        'testasss':wmui.loadVue("./views/testasss.vue")
	    },
	}
</script>
<style lang="css">
	p{
		padding:0;
		margin: 0;

	}
	div{
		margin: 0
	}
</style>
