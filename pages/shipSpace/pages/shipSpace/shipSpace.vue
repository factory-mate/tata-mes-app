<template>
	<view class="shipSpace">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" rightText="新建" :title="title"
			@clickLeft="clickLeft" @clickRight="clickRight" />
		<view class="search-wl">
			<uni-section title="" type="line">
				<uni-search-bar radius="100" cancelButton="none" placeholder="请输入仓位">
				</uni-search-bar>
			</uni-section>
		</view>
		<view class="space-list" v-for="(item,index) in spaceList" :key="index">
			<view class="space-fir">
				<view class="sapce-id">
					{{item.id.value}}
				</view>
				<view class="space-state">
					{{item.state.value}}
				</view>
			</view>
			<view class="peo">
				<view class="sapce-name">{{item.peo.name}}：</view>
				<view class="peo">{{item.peo.ispeo}}</view>
			</view>
		</view>
		<view class="space-more">没有更多</view>
	</view>
	
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const title = ref('仓位管理')
	//右侧新建，跳转到新建页面
	const clickRight = () => {
		uni.navigateTo({
			url: '/pages/shipSpace/pages/newAdd/newAdd'
		})
	}
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}

	//仓位列表数据
	const spaceList = [{
			id: {
				value: 'A01-001'
			},
			state: {
				value: '空'
			},
			peo: {
				name: '负责人',
				ispeo: '张琳'
			}
		},
		{
			id: {
				value: 'A01-001'
			},
			state: {
				value: '部分入库'
			},
			peo: {
				name: '负责人',
				ispeo: '张三'
			}
		},
		{
			id: {
				value: 'A01-001'
			},
			state: {
				value: '全齐'
			},
			peo: {
				name: '负责人',
				ispeo: '李四'
			}
		},
		{
			id: {
				value: 'A01-001'
			},
			state: {
				value: '空'
			},
			peo: {
				name: '负责人',
				ispeo: '王尔'
			}
		}
	]
</script>

<style scoped lang="scss">
	.shipSpace {
		.space-list {
			background: #fff;
			padding: 20rpx;
			margin: 30rpx 20rpx;
			border-radius: 4px;
			box-shadow: 0 0 10px #eee;
			font-size: 12px;

			.space-fir {
				display: flex;
				justify-content: space-between;
				margin: 20rpx 0;
			}

			.space-state {
				color: red;
			}

			.peo {
				display: flex;
				color: #999;
			}
		}
		.space-more{
			font-size: 14px;
			color: #999;
			text-align: center;
			margin: 100rpx;
		}
	}
</style>
