<template>
	<view class="classify">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="popup-content" :style="'height:'+ (h-260) + 'px'">
			<view class="meth-list" v-for="(item,index) in Baselist" :key="item.index">
				<view class="item" @click="getIndex(index,item)">
					<view>
						{{item.value}}
					</view>
					<view>
						<switch checked @change="switch1Change" style="transform:scale(0.6)" />
					</view>
				</view>
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
	const Baselist = [{
			value: '工位名称'
		},
		{
			value: '异常单号'
		},
		{
			value: '日期'
		},
		{
			value: '产品名称'
		},
		{
			value: '流转卡号'
		},
		{
			value: '工序名称'
		},
		{
			value: '数量'
		},
		{
			value: '产线名称'
		},
		{
			value: '长'
		},
		{
			value: '宽'
		},
		{
			value: '高'
		}
	]
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	
	const switch1Change = () => {}
	const getIndex=()=>{}
</script>

<style scoped lang="scss">
	.popup-content {
		overflow-y: auto;
		.meth-list {
			padding:20rpx 40rpx;

			.item {
				font-size: 36rpx;
				padding: 10rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
