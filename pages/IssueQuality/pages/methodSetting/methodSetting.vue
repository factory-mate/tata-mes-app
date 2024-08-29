<template>
	<view class="classify">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left"  :title="title"
			@clickLeft="clickLeft"/>
		<view class="popup-content">
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
	const title = ref('处理方式设置')
	//全部展开数据
	const Baselist = [{
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
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}

	const switch1Change = () => {}
	const getIndex = () => {}
</script>

<style scoped lang="scss">
	.classify {
		overflow-y: hidden;
		background: #FFF;

		.popup-content {
			.meth-list {
				padding: 20rpx 40rpx;

				.item {
					font-size: 36rpx;
					padding: 10rpx;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
