<template>
	<view>
		<head-nav :title="'已执行详情'"></head-nav>
		<view class="todo-detail">
			<detail :type="'img'" :BtnSta="'two'" :url="'/pages/repairs/pages/components/employee/employee'"></detail>
		</view>
	</view>
</template>

<script setup>
	import HeadNav from '@/components/head/head.vue'
</script>

<style scoped lang="scss">
	.todo-detail {
		width: 100%;
		position: absolute;
		top: 120rpx;
	}
</style>
