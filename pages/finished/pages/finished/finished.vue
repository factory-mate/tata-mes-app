<template>
	<view>
		<head-nav :title="title" :RType="'date'">
		</head-nav>

		<view class="content">
			<!-- 搜索框 -->
			<uni-section title="" type="line">
				<uni-search-bar  radius="100" cancelButton="none" placeholder="请输入内容">
				</uni-search-bar>
			</uni-section>
			<!-- 动态 -->
			<newsform :msg="msg" :wen="wen" :container="container" :btimes="btimes" :style="'text'" :mark="'goDetail'"
				:toUrl="'/pages/finished/pages/components/detail/detail'">
			</newsform>
		</view>
	</view>
</template>

<script setup>
		import HeadNav from '@/components/head/head.vue'
	import {
		ref,
		toRefs
	} from 'vue'
	const title = ref('已办消息')
	const wen = ref('设备故障完工通知')
	const msg = ref('完工通知')
	const container = ref('您提交的设备故障维修已完成，请确认')
	const btimes = ref('通知次数：1')
</script>

<style scoped lang="scss">
	.content{
		position: absolute;
		width: 100%;
		top: 120rpx;
	}
</style>
