<template>
	<view class="storage">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="stoage-list"  v-for="(item,index) in storageData" :key="index">
			<view class="left-list">
				<view class="store-name">{{item.name}}</view>
				<view class="store-pepo">
					负责人：{{item.peop}}
				</view>
			</view>
			<view class="right-list">
				<view class="item">最大库存量：{{item.max}}</view>
				<view class="item">安全库存：{{item.safe}}</view>
				<view class="item">最低库存量：{{item.min}}</view>
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
	const title = ref('选择仓库')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	
	//仓库数据
	const storageData= [
		{
			name:'成品仓1',
			peop:'李四',
			max:1000,
			safe:500,
			min:200
		},
		{
			name:'成品仓2',
			peop:'张三',
			max:1000,
			safe:500,
			min:200
		},
		{
			name:'成品仓3',
			peop:'王五',
			max:1000,
			safe:500,
			min:200
		},
		{
			name:'成品仓4',
			peop:'赵一',
			max:1000,
			safe:500,
			min:200
		},
		{
			name:'半成品仓',
			peop:'程程',
			max:1000,
			safe:500,
			min:200
		},
	]
</script>

<style scoped lang="scss">
	.storage {
		.stoage-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			padding: 20rpx;
			margin: 30rpx 20rpx;
			border-radius: 4px;
			box-shadow: 0 0 10px #eee;
			font-size: 12px;

			.left-list {
				.store-name {
					font-size: 18px;
					margin: 30rpx 0;
				}

				.store-pepo {
					font-size: 12px;
					color: gray;
				}
			}

			.right-list {
				font-size: 12px;
				color: grey;
				.item {
					margin: 10rpx 0;
				}
			}
		}
		.no-more{
			font-size: 14px;
			color: #999;
			text-align: center;
			margin: 100rpx;
		}
	}
</style>
