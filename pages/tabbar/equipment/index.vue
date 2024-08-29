
<!-- <template>
	<view>设备</view>
	




</template>

<script>



</script> -->

<style lang="scss" >



</style>
<template>
	<button @click="scanCode">扫一扫</button>
</template>
<script setup>
	const scanCode=()=>{
		uni.scanCode({
		    success: function (res) {
		        console.log('条码类型：' + res.scanType);
		        console.log('条码内容：' + res.result);
		    },
		});
		// 扫码成功后跳转到设备故障项目
		// uni.navigateTo({
		// 	url:'/pages/repairs/pages/components/project/project'
		// })
	}
</script>

