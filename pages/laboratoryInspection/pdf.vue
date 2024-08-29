
<template>
	<view class="content">
		<!-- <web-view src="https://doc.etuanjian.com/?furl=az727AGrnrwFdYIWLZn9reBwtzc1ijoUn34Bp2f8@Q1IcxywEu7JqvevF8Hd1vlT56zJmR6oAIGl59jHnAVgaCHqgByGP9pL" ></web-view> -->
		<web-view src="http://171.13.38.94:10900/期末真题B.pdf" ></web-view>
		<!-- <web-view src="http://171.13.38.94:10900/f60aac48-b2af-4a29-b19d-818903ad955a.docx" ></web-view> -->
	</view>
</template>


<script setup>
	import {
		ref,
		toRefs,
		reactive,
		nextTick,
		watch
	} from 'vue'
	import {
		onLoad,
		onShow,
		onUnload,
		onHide,
		onBackPress,
		onReachBottom,
		onPullDownRefresh
	} from "@dcloudio/uni-app";
</script>

<style>
</style>