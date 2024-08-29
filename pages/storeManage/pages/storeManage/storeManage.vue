<template>
	<view class="storage">
		<uni-nav-bar dark shadow background-color="red" status-bar rightText="新建" left-icon="left" :title="title"
			@clickLeft="clickLeft"  @clickRight="clickRight"/>
		<view class="search-wl">
			<uni-section title="" type="line">
				<uni-search-bar radius="100" cancelButton="none" placeholder="请输入仓库">
				</uni-search-bar>
			</uni-section>
		</view>
		<view class="stoage-list" v-for="(item,index) in storageData" :key="index">
			<view class="left-list">
				<view class="store-name">{{item.name}}</view>
				<view class="store-pepo">
					负责人：{{item.peop}}
				</view>
			</view>
			<!-- 默认状态判断 -->
			<view class="moren" v-if="item.statue==true">默认仓库</view>
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
	const title = ref('仓库管理')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	const clickRight=()=>{
		uni.navigateTo({
			url: '/pages/storeManage/pages/addStorage/addStorage'
		})
	}

	//仓库数据
	const storageData = [{
			name: '成品仓1',
			peop: '李四',
			max: 1000,
			safe: 500,
			min: 200,
			statue: true
		},
		{
			name: '成品仓2',
			peop: '张三',
			max: 1000,
			safe: 500,
			min: 200,
			statue: false
		},
		{
			name: '成品仓3',
			peop: '王五',
			max: 1000,
			safe: 500,
			min: 200,
			statue: false
		},
		{
			name: '成品仓4',
			peop: '赵一',
			max: 1000,
			safe: 500,
			min: 200,
			statue: false
		},
		{
			name: '半成品仓',
			peop: '程程',
			max: 1000,
			safe: 500,
			min: 200,
			statue: false
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

			.moren {
				color: blue;
			}

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

		.no-more {
			font-size: 14px;
			color: #999;
			text-align: center;
			margin: 100rpx;
		}
	}
</style>
