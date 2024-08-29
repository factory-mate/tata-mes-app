<template>
	<view class="changeList">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" rightText="设置默认" :title="title"
			@clickLeft="clickLeft" @clickRight="clickRight" />
		<view class="listMain">
			<!-- 列表项-->
			<view class="project">
				<view class="pro_top" v-for="(item,index) in list" :key="index" @click="checkMthod(index,item)">
					<view class=" dark">{{item.value}}</view>
					<view class=" hint" v-if="currentIndex === index">默认方式</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	const title = ref('处理方式选择')
	//加载页面
	onLoad((option) => {
		//方式字段
		console.log(option.meval,'444444444444444444');
	})
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	const clickRight = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/methodSetting/methodSetting'
		})
	}

	//处理方式数据
	const list = [{
			value: '返工'
		},
		{
			value: '返修'
		},
		{
			value: '重做'
		},
		{
			value: '让步接收'
		}
	]
	let currentIndex = ref(1)
	//选择方式
	const checkMthod = (index, item) => {
		currentIndex.value = index
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/detail/detail?value=' + item.value
		})
	}
</script>

<style scoped lang="scss">
	.changeList {
		padding-bottom: 10rpx;
		width: 100%;
		height: 100%;

		.listMain {
			margin-top: 2px;
			width: 100%;
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


				.pro_top {
					display: flex;
					justify-content: space-between;
					padding: 20rpx 0 60rpx 0;

					.hint {
						color: royalblue;
					}
				}

				.textHint {
					color: #999;
				}
			}
		}
	}
</style>
