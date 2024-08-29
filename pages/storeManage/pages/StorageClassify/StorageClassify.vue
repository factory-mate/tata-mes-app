<template>
	<view class="classify">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="class-list">
			<view class="item">
				<checkbox value="cb"/>普通仓
			</view>
			<view class="item">
				<checkbox value="cb" />线边仓
			</view>
			<view class="item">
				<checkbox value="cb" />委外仓
			</view>
			<view class="item">
				<checkbox value="cb" />边框仓
			</view>
			<view class="item">
				<checkbox value="cb" />普通仓
			</view>
		</view>
		<view class="no-more">没有更多</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	const title = ref('类型')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
</script>

<style scoped lang="scss">
	.class-list {
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			padding: 20rpx;
			margin: 30rpx 20rpx;
			border-radius: 4px;
			box-shadow: 0 0 10px #eee;
			font-size: 12px;
		}
	}
	.no-more{
		font-size: 14px;
		color: #999;
		text-align: center;
		margin: 100rpx;
	}
</style>
