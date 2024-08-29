<template>
	<!-- 主题内容 -->
	<view class="contents">
		<!-- 图片及内容 -->
		<view class="top">
			<view class="img">
				<image src="../../static/img/home/bg1.jpg" mode=""></image>
			</view>
			<view class="right">
				<view class="list">
					<view class="name">
						<text style="color: #5555ff;
							font-weight: 600;
							font-size: 35rpx;">雕刻机</text>
					</view>
					<view class="name-content">
						<view class="iconfont icon-shang-chuan-shi-jian  shijian">

						</view>
						<view class="time">
							<uni-dateformat :date="now"></uni-dateformat>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="name">
						<text>设备编码</text>
					</view>
					<view class="name-content">
						dkj000001
					</view>
				</view>
				<view class="list">
					<view class="name">
						<text>规格型号</text>
					</view>
					<view class="name-content">
						70-1
					</view>
				</view>
				<view class="list">
					<view class="name">
						<text>故障项目</text>
					</view>
					<view class="name-content">
						2
					</view>
				</view>
			</view>
		</view>
		<!--底部地址及详情  -->
		<view class="foot">
			<view class="iconfont icon-shang-chuan-wei-zhi icon-img">

			</view>
			<view class="addres">
				门皮板车间某某区
			</view>
			<view class="detail">
				<button v-if="types==='详情'" @click="toDetail">详情</button>
				<button v-if="types==='通知'"  class="button" type="primary" @click="toggle('center')"><text
						class="button-text">通知</text></button>
			</view>
		</view>
		<!-- 弹出层 -->
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" >
				<view class="popup-content" ><text
						class="text" >已通知</text></view>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		toRefs,
		// Ref
	} from "vue";
	const props = defineProps({
		//子组件接收父组件传递过来的值
		// list:Object,
		types: String
	})
	const type = ref('center')
	const {
		types
	} = toRefs(props)
	let now = ref(Date.now())
	// 跳转到维修详情页
	const toDetail = () => {
		uni.navigateTo({
			url: "/pages/repairBill/repairDetail/repairdetail"
		})
	}
	const popup = ref(null)
	
	const toggle = () => {
			// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
			popup.value.open('center')
		}
</script>

<style lang="scss" scoped>
	//主题内容
	.contents {
		width: 750rpx;
		height: 400rpx;
		// background-color: red;
		margin-top: 15rpx;

		//图片及内容
		.top {
			width: 100%;
			height: 300rpx;
			// background-color: blue;
			display: flex;

			.img {
				padding-left: 10rpx;
				width: 230rpx;
				// background-color: yellow;
				height: 100%;

				&>image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				// background-color: green;
				width: 500rpx;
				height: 100%;

				// display: flex;
				.list {
					width: 500rpx;
					height: 75rpx;
					// background-color: blue;
					display: flex;

					.name-content {
						width: 320rpx;
						// background-color: red;
						display: flex;
						line-height: 75rpx;

						.shijian {
							color: red;
							font-size: 60rpx;
							margin-top: 8rpx;
						}

						.time {
							font-size: 26rpx;
							color: #909090;
						}
					}

					.name {
						line-height: 75rpx;
						width: 180rpx;
						height: 75rpx;
						// background-color: #55ffff;
					}
				}
			}
		}

		//位置 及详情
		.foot {
			display: flex;
			width: 100%;
			height: 100rpx;

			.icon-img {
				margin-top: 15rpx;
				color: red;
				font-size: 60rpx;
				width: 150rpx;
				height: 100rpx;
				// background-color: black;
			}

			.addres {
				line-height: 100rpx;
				text-align: left;
				// background-color: red;
				width: 400rpx;
				height: 100rpx;
			}

			.detail {
				width: 130rpx;
				height: 70rpx;

				// background-color: #5555ff;
				&>button {
					margin-top: 15rpx;
					margin-left: 15rpx;
					line-height: 70rpx;
					font-size: 30rpx;
					width: 130rpx;
					height: 70rpx;
					color: white;
					background-color: red;
					border-radius: 50rpx;
				}
			}
		}
		.text{
			width: 300rpx;
			height: 50rpx;
			background-color: red;
			color: white;
		}
	}
</style>
