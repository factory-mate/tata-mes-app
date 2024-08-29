<template>
	<view class="u-wrap">
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
			 :scroll-into-view="itemId">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
				 @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item , index) in tabbar" :key="index">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1" @click="featureC(item1.cat, item1.name)">
								<image v-if="item1.icon != ''" class="item-menu-image" :src="item1.icon" mode=""></image>
								<view v-else class="item-menu-image row-c" style="background-color: #F4F6F8;"><text style="font-size: 20rpx;color: #d0d0d0;">加载失败</text></view>
								<view class="item-menu-name">{{item1.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script setup>
	import categroy from '@/utils/data3.json';
	import {ref,toRefs,reactive,computed,onMounted,nextTick } from 'vue'
	import {onLoad,onReady,onShow} from '@dcloudio/uni-app'
	const data=reactive({
		scrollTop: 0, //tab标题的滚动条位置
		oldScrollTop: 0, // tab标题的滚动条旧位置
		current: 0, // 预设当前项的值
		menuHeight: 0, // 左边菜单的高度
		menuItemHeight: 0, // 左边菜单item的高度
		itemId: '', // 栏目右边scroll-view用于滚动的id
		// tabbar: JSON.parse(uni.getStorageSync('categroy')), // 渲染的数据，放在最后供你们测试
		tabbar:categroy,
		arr: [], // 储存距离顶部高度的数组
		scrollRightTop: 10, // 右边栏目scroll-view的滚动条高度
		timer: null // 定时器
	})
	const {scrollTop,oldScrollTop,current,menuHeight,menuItemHeight,itemId,tabbar,arr,scrollRightTop,timer}=toRefs(data)
	
	onReady(()=> {
		getMenuItemTop()
	})

	// * 获取一个目标元素的高度
	// * @elClass 元素的类名
	// * @dataVal 储存高度的对象
	const getElRect=(elClass, dataVal)=> {
		new Promise((resolve, reject) => {
			const query = uni.createSelectorQuery().in(this);
			query.select('.' + elClass).fields({
				size: true
			}, res => {
				// 如果节点尚未生成，res值为null，循环调用执行
				if (!res) {
					setTimeout(() => {
						getElRect(elClass);
					}, 10);
					return;
				}
				dataVal = res.height;
				resolve();
			}).exec();
		})
	}

	// * 获取右边菜单每个item到顶部的距离
	// * 储存到 arr 数组里面用于后面滚动判断
   const getMenuItemTop=()=> {
   		new Promise(resolve => {
   			let selectorQuery = uni.createSelectorQuery();
   			selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
   				// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
   				if(!rects.length) {
   					setTimeout(() => {
   						getMenuItemTop()
   					}, 10)
   					return 
   				}
   				rects.forEach((rect) => {
   					// 视情况而定，这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
   					// this.arr.push(rect.top - rects[0].top);
   					arr.value.push(rect.top)
   					resolve()
   				})
   			}).exec()
   		})
   	}
	// * 观测元素相交状态
	// * 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
	// * 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
	const observer=()=> {
		tabbar.value.map((val, index) => {
			let observer = uni.createIntersectionObserver(this)
			observer.relativeTo('.right-box', {
				top: 0
			}).observe('#item' + index, res => {
				if (res.intersectionRatio > 0) {
					let id = res.id.substring(4);
					leftMenuStatus(id);
				}
			})
		})
	}

	// 设置左边菜单的滚动状态
	// * @index 传入的 ID
	const leftMenuStatus=async(index)=> {
		current.value = index
		// 如果为0，意味着尚未初始化value
		if (menuHeight.value == 0 || menuItemHeight.value == 0) {
			await getElRect('menu-scroll-view', 'menuHeight')
			await getElRect('u-tab-item', 'menuItemHeight')
		}
		// 将菜单活动item垂直居中
		scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
	}

	// * 点击左边的栏目切换
	// * @index 传入的 ID
	const swichMenu=async(index)=> {
		if(arr.value.length == 0) {
			await getMenuItemTop();
		}
		if (index == current.value) return;
		scrollRightTop.value = oldScrollTop.value;
		nextTick(()=>{
			scrollRightTop.value = arr.value[index];
			current.value = index;
			leftMenuStatus(index);
		})
	}

	// * 右边菜单滚动
	// * 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
	const rightScroll=async(e)=> {
		oldScrollTop.value = e.detail.scrollTop;
		if(arr.value.length == 0) {
			await getMenuItemTop();
		}
		if(timer.value) return ;
		if(!menuHeight) {
			await getElRect('menu-scroll-view', 'menuHeight');
		}
		setTimeout(() => { // 节流
			timer.value = null;
			// scrollHeight为右边菜单垂直中点位置
			// let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
			// scrollHeight为右边菜单头部位置
			let scrollHeight = e.detail.scrollTop + 20;
			for (let i = 0; i < arr.value.length; i++) {
				let height1 = arr.value[i];
				let height2 = arr.value[i + 1];
				if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
					leftMenuStatus(i);
					return ;
				}
			}
		}, 10)
	}

</script>
<style scoped lang="scss">
	.u-wrap {
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	
	.u-search-box {
		padding: 18rpx 30rpx;
	}
	
	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}
	
	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #06A446;
		font-size: 30rpx;
		font-weight: 500;
		background: #D6FFE7;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #06A446;
		height: 52rpx;
		left: 0;
		top: 29rpx;
	}
	
	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.class-item:last-child {
		min-height: 100vh;
	}
	
	.item-title {
		font-size: 26rpx;
		color: red;
		font-weight: bold;
	}
	
	.item-menu-name {
		margin-top: 8rpx;
		font-weight: normal;
		font-size: 24rpx;
		color: blue;
	}
	
	.item-container {
		// display: flex;
		// flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 100%;
		border: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}

</style>