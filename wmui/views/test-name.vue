<template>
	<div class="test">
		{{ message }}
		<button @click="testcli">组件二</button>
		===============
		<!--    这是全局组件    -->
		<testw :testw="message"></testw>
		<testw :testw = 'message'></testw>
	</div>
</template>
<script>
	// var testw = wmui.loadVue('./views/testw.vue');
	import tes_tw11 from './views/testw.vue';
	import './js/test.js';
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
				console.log(tes_tw11);
			}
		},
		components: {
			'testw':tes_tw11,
	        // 'test-name':wmui.loadVue('./views/test-name.vue')
	    },
	}
</script>
<style>
	p{
		padding:0;
		margin: 0;

	}
	div{
		margin: 0
	}
</style>
<style lang="css" scoped>
	#p{
		margin: 0;
	}
	.test,div,.asdfg{
		margin: 0;
		color:red;
	}
	.testww,.www div .ddd {
		margin: 0;
		color:red;
	}
	.cvy .fff {
		color:red;
	}
	span{
		border: 0
	}
</style>

