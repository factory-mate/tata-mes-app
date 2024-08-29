<template>
	<view class="Box">
		<view class="user">
			<image class='img' src="../../static/img/icons/user.png"></image>
			<view class="time">
				<view class="iconfont icon-shang-chuan-shi-jian" style="color:red;"></view>
				<!-- 时间 -->
				<uni-section title="基础用法" type="line" class="timeSty">
					<view class="example-body">
						<uni-dateformat :date="now"></uni-dateformat>
					</view>
				</uni-section>
			</view>
		</view>

		<!-- 完工通知 -->
		<view class="midle">
			<view class="mbox">
				<view class="info">{{msg}}</view>
				<view class="text">{{wen}}</view>
			</view>
			<view class="right">
				<view class="container">{{container}}</view>
				<!-- 已办详情内容箭头 -->
				<view class="iconfont  icon-arrow-right" style="color:#b0b0b0;margin-left: 30rpx;" v-if="mark ==='goDetail'" @click="goDetail"></view>
			</view>
		</view>

		<!-- 底部按钮 /详情-->
		<view class="bottom">
			<view class="times">{{btimes}}</view>
			<view>
				<view  v-if="style==='button'" @click="goDetail">
					<view class="butSty" style="background: red;">执行</view>
				</view>
				<view class="iconfont icon-arrow-right" v-if="style==='arrow'" @click="goDetail"></view>
				<view v-if="style==='text'">
					<text>已执行</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		toRefs
	} from "vue";
	//父组件的传值
	const props = defineProps({
		msg: String,
		wen: String,
		container: String,
		btimes: String,
		mark: { //内容详情标记箭头
			type: String,
			default: ''
		},
		style: {
			type: String,
			default: ''
		},
		toUrl: { //跳转的url
			type: String,
			default: ''
		}
	})
	const {
		msg,
		wen,
		container,
		btimes,
		toUrl
	} = toRefs(props)
	// 搜索栏设置
	const search = (res) => {
		// uni.showToast({
		// 	title: '搜索：' + res.value,
		// 	icon: 'none'
		// })
	}
	const input = (res) => {
		console.log('----input:', res)
	}
	const blur = () => {
		uni.showToast({
			title: 'blugoDetailr事件，输入值为：' + res.value,
			icon: 'none'
		})
	}
	const now = ref(Date.now())

	//动态页面路径跳转
	const goDetail = () => {
		uni.navigateTo({
			url: toUrl.value
		})
	}
</script>
<style lang="scss" scoped>
	.Box {
		background-color: #f2f2f2;
		margin-bottom: 30rpx;
		box-shadow: 0 5px 5px #eee;
		box-sizing: border-box;
		// padding: 20rpx;
		margin: 20rpx;
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		background-color: #fff;
	}

	//用户头像/时间
	.user {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx;
		border-bottom: 1px solid #eee;
	}

	.img {
		height: 50rpx;
		width: 50rpx;
		margin-bottom: 0;
	}

	.time {
		display: flex;
		align-items: center;
		.timeSty{
			margin-top: 0;
			margin-left: 10rpx;
		}
	}

	//云朵图标设置
	.iconfont {
		font-size: 50rpx;
		margin-right: 10rpx;
	}

	//完工通知
	.midle {
		padding: 30rpx;
	}

	.mbox {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.info {
		color: red;
		position: absolute;
		top: 4px;
		left: 0;
		font-size: 24rpx;
	}

	.text {
		font-size: 34rpx;
		font-weight: 500;
	}

	.container {
		text-align: center;
		font-size: 32rpx;
		margin: 40rpx 0rpx;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	//底部通知/按钮
	.bottom {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		border-top: 1px solid #eee;
		.butSty{
			width: 120rpx;
			text-align: center;
			line-height: 60rpx;
			color: #fff;
			border-radius: 50px;
		}
	}
	.iconfont{
		font-size: 28rpx;
	}
</style>
