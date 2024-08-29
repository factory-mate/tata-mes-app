<template>
	<view class="classify">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" rightText="工位设置"  :title="title"
			@clickLeft="clickLeft" @clickRight="clickRight" />
		<view class="class-list" :style="'height:'+ (h-260) + 'px'">
			<view class="item">
				<checkbox value="cb" />A车间001工位
			</view>
			<view class="item">
				<checkbox value="cb" />A车间002工位
			</view>
			<view class="item">
				<checkbox value="cb" />A车间003工位
			</view>
			<view class="item">
				<checkbox value="cb" />A车间004工位
			</view>
			<view class="item">
				<checkbox value="cb" />A车间005工位
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
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	const h = ref('100')
	const title = ref('工位选择')
	//加载页面
	onLoad((option) => {
		h.value = uni.getSystemInfoSync().windowHeight;
	})
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	const clickRight=()=>{
		uni.navigateTo({
			url:'/pages/IssueQuality/pages/stationSetting/stationSetting'
		})
	}
</script>

<style scoped lang="scss">
	.class-list {
		overflow-y: auto;

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

	.no-more {
		font-size: 14px;
		color: #999;
		text-align: center;
		margin: 100rpx;
	}
</style>
