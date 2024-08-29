<template>
	<view class="changeList">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" @clickRight="clickRight" />
		<view class="listMain">
			<!-- 列表项-->
			<view class="project" @click="checkMthod">
				<view class="pro_top">
					<view class=" dark">毛刺</view>
				</view>
			</view>
			<view class="project" @click="checkMthod">
				<view class="pro_top">
					<view class=" dark">起皮</view>
				</view>
			</view>
			<view class="project" @click="checkMthod">
				<view class="pro_top">
					<view class=" dark">质量不符</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const title = ref('不良原因选择')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	const clickRight = () => {
		console.log(11111);
	}
	//选择方式
	const checkMthod = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/detail/detail'
		})
	}
</script>

<style scoped lang="scss">
	.changeList {
		padding-bottom: 10rpx;
		width: 100%;
		height: 100%;
		.listMain{
			margin-top: 2px;
			width:100%;
			height: calc(100% - 240rpx);
			// border: 1px solid red;
			overflow-y: auto;
			font-size: 14px;
			.project {
				background: #fff;
				padding: 20rpx;
				margin: 30rpx 20rpx;
				border-radius: 4px;
				box-shadow: 0 0 10px #eee;
				

				.pro_top{
					display: flex;
					justify-content: space-between;
					padding: 20rpx 0 60rpx 0;
				}
				.textHint{
					color: #999;
				}
			}
		}
	}

</style>
