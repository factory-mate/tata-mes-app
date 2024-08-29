<template>
	<view class="classify">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="popup-content" :style="'height:'+ (h-260) + 'px'">
			<view class="meth-list">
				<radio-group class="uni-list" @change="radioChange">
					<label class="uni-list-cell" v-for="(item,index) in stationlist" :key="index">
						<view>
							<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
						</view>
						<view>
							<label class="label-2-text" :for="item.name">
								<text>{{item.value}}</text>
							</label>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
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
	const title = ref('基础信息设置')
	//加载页面
	onLoad((option) => {
		h.value = uni.getSystemInfoSync().windowHeight;
	})
	//全部展开数据
	const stationlist = [{
			value: '任务单内所有工位'
		},
		{
			value: '所有车间所有工位'
		}
	]
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	const radioChange = () => {}
	const switch1Change = () => {}
	const getIndex = () => {}
</script>

<style scoped lang="scss">
	.popup-content {
		overflow-y: auto;

		.meth-list {
			padding: 20rpx 40rpx;

			.uni-list {
				.uni-list-cell {
					display: flex;
					padding: 20rpx;
				}
			}

			.item {
				font-size: 36rpx;
				padding: 10rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
