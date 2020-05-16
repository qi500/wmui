<template>
	<div>
		{{ message }}
		<button @click="testcli">组件二</button>
		===============
		<!-- 这是全局组件 -->
		<testw :testw="message"></testw>
		<!-- <testw :testw = 'message'></testw> -->
	</div>
</template>
<script>

	
	module.exports = {
		name: 'test-name',
		props: ['testname'],
		data: function () {
	        return {
	            message: '组件二!'
	        }
	    },
		methods:{
			testcli:function() {
				console.log(test(3,10));
			}
		},
		components: {
			// 'testw':testw,
	        // 'test-name':wmui.loadVue('./views/test-name.vue')
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
