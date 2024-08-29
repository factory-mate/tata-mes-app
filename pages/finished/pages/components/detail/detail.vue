<template>
	<head-nav :title="'已办任务详情'"></head-nav>
	<view class="finished-box">
		<detail :type="'img'"  ></detail>
	</view>
</template>

<script setup>
	import HeadNav from '@/components/head/head.vue'
</script>

<style scoped lang="scss">
	.finished-box {
		position: absolute;
		width: 100%;
		top: 120rpx;
	}
</style>
