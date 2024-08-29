<template>
	<view class="yui-no-data" :style="innerStyle">
		<image class="image-wrapper" mode="widthFix" :src="imgUrl" />
		<view class="desc-wrapper">{{props.description}}</view>
	</view>
</template>

<script setup>
	import {ref,toRefs,reactive,computed} from 'vue'
	const props = defineProps({
		// 图片下方的描述文字
		description: {
			type: String,
			default: "暂无数据"
		},
		// 容器内边距
		padding: {
			type: String,
			default: "40rpx 0"
		}
		
	})
	const data=reactive({
		imgUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
	})
	const {imgUrl} = toRefs(data)
	const innerStyle = computed(() => {
	  return props.padding.value
	})
</script>

<style lang="scss" scoped>
	.yui-no-data {
		text-align: center;

		.image-wrapper {
			width: 300rpx;
		}

		.desc-wrapper {
			font-size: 12px;
			padding: 12rpx 32rpx;
			color: #666;
			text-align: center;
		}
	}
</style>
