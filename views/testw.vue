<template>
	<div>
		{{ message }}
		<button @click="testcli">组件三11</button>
		
	</div>
</template>
<script>
	
	import testjs from 'js/test.js';
	module.exports = {
		name: 'testw',
		props: ['testw'],
		data: function () {
	        return {
	            message: 'Hello Vue 3!'
	        }
	    },
		methods:{
			testcli:function() {
				console.log(this);
				// console.log(wm.loadVue('./views/test-name.vue'));
				console.log(test(33,33));
			}
		}
	}
</script>
<style lang="css" scoped>
	p{
		padding:0;
		margin: 0;

	}
	div{
	    color: #03A9F4;
	}
</style>
