<template>
	<div>
		{{ message }}
		<button @click="testcli">组件4</button>
	</div>
</template>
<script>
	import testjs from 'css/test.css?ac=12345';
	import testjs from 'js/test.min.js?a=1';
	module.exports = {
		name: 'testasss',
		props: ['testa'],
		data: function () {
	        return {
	            message: 'Hello Vue 4!'
	        }
	    },
		methods:{
			testcli:function() {
				console.log(this);
				// console.log(wmui.loadVue('./views/test-name.vue'));
				console.log(test(44,44));
			}
		}
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
