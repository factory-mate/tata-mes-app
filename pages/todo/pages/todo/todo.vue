<template>
	<view>
		<!-- <head-nav :title="title" :RType="'date'"></head-nav> -->
		
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" rightText="日期" :title="title"  @clickLeft="clickLeft" @clickRight="clickRight" />
		<view class="content">
			<!-- 搜索框 -->
			<uni-section title="" type="line">
				<uni-search-bar radius="100" cancelButton="none" placeholder="请输入内容11">
				</uni-search-bar>
			</uni-section>
			<!-- 动态 -->
			<newsform :msg="msg" :wen="wen" :container="container" :btimes="btimes" :style="'button'"
				:toUrl="'/pages/todo/pages/components/detail/detail'">
			</newsform>
		</view>
		 <uni-calendar 
		    ref="calendar"
		    :insert="false"
		    @confirm="confirm"
		     />
	</view>
</template>

<script setup>
	import HeadNav from '@/components/head/head.vue'
	import { ref } from 'vue'
	const title = ref('待办消息')
	const wen = ref('设备故障完工通知')
	const msg = ref('完工通知')
	const container = ref('出新开向、锁具、合页、安装方式啦，请前往!')
	const btimes = ref('通知次数：1')
	// ref  绑定
	const calendar=ref()
	
	// 左侧
	const clickLeft=()=>{
		uni.navigateBack({
		})
	}
	// 右侧
	const clickRight=()=>{
		console.log('右侧bar');
		 calendar.value.open();
	}
	// 日历事件
	const confirm=(e) => {
			console.log("点击",e);
		}
</script>

<style scoped lang="scss">
.content{
	position: absolute;
	top: 120rpx;
}
</style>
