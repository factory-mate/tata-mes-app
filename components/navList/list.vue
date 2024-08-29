<template>
	<view class="page-body" :style="'height:'+height+'px'">
		<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop"
			scroll-with-animation>
			<view class="nav-left-item" @click="categoryClickMain(index)" :key="index"
				:class="index==categoryActive?'active':''" v-for="(item,index) in classifyData">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
			<view v-for="(foods,index) in classifyData" :key="index" class="box" :id='index'>
				<view class="item_box_head">{{foods.name}}</view>	
				<view :id="i==0?'first':''" class="nav-right-item" v-for="(item,i) in foods.foods" :key="i" @click="cart(item.name)">
					<image :src="item.icon" />
					<view>{{item.name}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import demo from '@/utils/classifyData.json';
	import {
		ref,
		toRefs,
		reactive,
		computed,
		onMounted,
		nextTick
	} from 'vue'
	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'
	const data = reactive({
		timeoutId: null,
		name: "wkiwi",
		height: 0,
		categoryActive: 0,
		scrollTop: 0,
		scrollLeftTop: 0,
		scrollHeight: 0,
		classifyData: demo,
		arr: [0, 584, 1168, 1752, 2336, 2805, 3274, 3858, 4442, 4911, 5380, 5734, 6203, 6672,
		7017], //初始值，后边计算会根据手机适配覆盖
		leftItemHeight: 51, //49行会计算出新值进行覆盖
		navLeftHeight: 0, //左边scroll-view 内层nav的总高度
		diff: 0, //左边scroll-view 内层nav的总高度与视口之差
		tabBarHeight: 0, //如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
	})
	const {
		timeoutId,
		name,
		height,
		categoryActive,
		scrollTop,
		scrollLeftTop,
		scrollHeight,
		classifyData,
		arr,
		leftItemHeight,
		navLeftHeight,
		diff,
		tabBarHeight
	} = toRefs(data)
	const getHeightList = () => {
		let selectorQuery = uni.createSelectorQuery();
		selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
		
			leftItemHeight.value  =  rects[0].height;
			navLeftHeight.value = leftItemHeight.value * rects.length;
			diff.value  =  navLeftHeight.value  - height.value ;
			console.log(rects,1111111111111,height.value );
		});
		selectorQuery.selectAll('.box').boundingClientRect(function(rects) {
			let arr1 = [];
			let top = -60;
			console.log(rects,22222222222,classifyData.value.length);
			rects.forEach(function(rect){
				// console.log(rect,"--re");
	// 					rect.id      // 节点的ID
	// 					rect.dataset // 节点的dataset
	// 					rect.left    // 节点的左边界坐标
	// 					rect.right   // 节点的右边界坐标
	// 					rect.top     // 节点的上边界坐标
	// 					rect.bottom  // 节点的下边界坐标
	// 					rect.width   // 节点的宽度
	// 					rect.height  // 节点的高度
				top += rect.height;
				arr1.push(top)
				})
				
				arr.value = arr1
				console.log(data.arr,"---", rects.length)
			}).exec()
	}
	const scroll = (e) => {
		if (timeoutId.value) {
			clearTimeout(timeoutId.value);
		}
		// console.log(e,55555555555);
		timeoutId.value = setTimeout(function(){ //节流
			scrollHeight.value = e.detail.scrollTop+1
			//+1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
			//若想使切换参考线为屏幕顶部请删除 _this.height/2
			for (let i = 0; i < arr.value.length;i++) {
				let height1 = arr.value[i];
				let height2 =arr.value[i+1];
				if (!height2 || (scrollHeight.value >= height1 && scrollHeight.value < height2)) {
					categoryActive.value = i;
					(diff.value > 0) && (scrollLeftTop.value = Math.round((categoryActive.value * diff.value) /
						(classifyData.value.length - 1)));
					return false;
				}
			}
			categoryActive.value = 0;
			timeoutId.value = undefined;
		}, 10)
	}
	const categoryClickMain = (index) => {
		categoryActive.value = index;
		scrollTop.value ==arr.value[index] ? scrollTop.value = scrollTop.value+1 : scrollTop.value = arr.value[index]//防止两次相等造成点击不触发滚动时间
	}
	const cart = (text) => {
		uni.showToast({
			title: text,
			icon: "none",
		})
	}
	onMounted(() => {
		console.log('moutend');
		getHeightList()
	})
	onShow(() => {
		console.log('onshow');
	})
	onLoad(() => {
		height.value = uni.getSystemInfoSync().windowHeight - tabBarHeight.value;
	})
	// onReady(()=>{
	// 	console.log('onReady');
	// 	getHeightList()
	// })
</script>

<style scoped lang="scss">
	.page-body {
		display: flex;
		background: #fff;
		overflow: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 25%;
		background: #fafafa;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 2rpx #f1f1f1;
		border-bottom: solid 2rpx #f1f1f1;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-left-item:last-child {
		border-bottom: none;
	}

	.nav-right {
		width: 75%;
	}

	.box {
		display: block;
		overflow: hidden;
		border-bottom: 20upx solid #f3f3f3;

		/* min-height: 100vh; */
		/*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */
		.item_box_head {
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			padding: 20rpx;
			border-bottom: 8px solid #eee;
		}
	}

	.box:last-child {
		border: none;
		min-height: 100vh;
	}

	.nav-right-item {
		width: 28%;
		// width: 100%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
		background: #fff;
	}

	.nav-right-item image {
		width: 150upx;
		height: 150upx;
	}

	.active {
		color: #FF80AB;
		background: #fff;
		border-right: 0;
	}

	::-webkit-scrollbar {
		/*取消小程序的默认导航条样式*/
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
