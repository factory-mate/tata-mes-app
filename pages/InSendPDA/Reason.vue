<template>
	<view class="changeList">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="listMain" :style="'height:'+ (h-160) + 'px'">
			<DaTree ref="DaTreeRef" :data="roomTreeData" labelField="name" valueField="id" :showCheckbox='false'
				@change="handleTreeChange" @expand="handleExpandChange" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
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
	import {
		GetReason
	} from '@/api/PDA.js'
	import DaTree from '@/components/da-tree/index.vue'
	let branch = ref()
	const DaTreeRef = ref()
	const title = ref('原因选择')
	const h = ref('100') //页面高度	
	const more = ref('more') //加载更多
	const roomTreeData = ref([])
	const DayList = ref([]) //原因
	onShow(() => {
		branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
		// branch = uni.getStorageSync('unit')
		// setInterval(function(){
		//         uni.hideKeyboard();//隐藏软键盘
		// },60);
		// #ifdef APP-PLUS
		plus.key.addEventListener("keyup", keypress);
		// #endif 
		// #ifdef H5
		document.addEventListener("keyup", keypress);
		// #endif
	})
	onUnload(() => {
		// #ifdef APP-PLUS
		plus.key.removeEventListener("keyup", keypress);
		// #endif
		// #ifdef H5
		document.removeEventListener("keyup", keypress);
		// #endif
	})
	onHide(() => {
		// #ifdef APP-PLUS
		plus.key.removeEventListener("keyup", keypress);
		// #endif
		// #ifdef H5
		document.removeEventListener("keyup", keypress);
		// #endif
	})
	onBackPress(() => {
		// #ifdef APP-PLUS
		plus.key.removeEventListener("keyup", keypress);
		// #endif
		// #ifdef H5
		document.removeEventListener("keyup", keypress);
		// #endif
	})
	const keypress = (e) => {
		// codeType.value = ''
		console.log(e, "按键码");
		// if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
		// 	codeType.value = 'enter'
		// 	getWl()
		// }
		// if (e.keyCode == 66|| e.key=="Enter") {
		// 	codeType.value = 'enter'
		// 	getWl()
		// }
	}
	//加载页面
	onLoad((option) => {
		h.value = uni.getSystemInfoSync().windowHeight;
		GetReasonLists()
	})
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	//获取原因
	const GetReasonLists = async () => {
		uni.showLoading({
			title: '加载中'
		});
		const res = await GetReason()
		if (res.status == 200) {
			roomTreeData.value = JSON.parse(JSON.stringify(res.data).replace(/Child/g, "children"))
			mapReasonTree(roomTreeData.value)
			// ADDdisable(roomTreeData.value)
			console.log(roomTreeData.value, 'roomTreeData.value---');
			uni.hideLoading()
		} else {
			uni.hideLoading()
		}
	}
	let leve = 0
	const mapReasonTree = (data, leve = 0) => {
		if (data) {
			leve++
			data.forEach((item) => {
				Object.assign(item, {
					['leve']: leve,
					['id']: item['cReasonClassCode'],
					['name']: item['cReasonClassName'],
					['disabled']:item.cParentCode==null || item.leve===1 ? true : false
				})
				mapReasonTree(item.children, leve)
			})
		}
	}
	// const ADDdisable = (list) => {
	// 	list.forEach(item => {
	// 		if (item.leve == 1) {
	// 			item.disabled = true
	// 			if (item.children) {
	// 				ADDdisable(item.children)
	// 			}
	// 		} else {
	// 			item.disabled = false
	// 			if (item.children) {
	// 				ADDdisable(item.children)
	// 			}
	// 		}
	// 	})
	// }
	//树选中
	const doExpandTree = (keys, expand) => {
		DaTreeRef.value?.setExpandedKeys(keys, expand)
		const gek = DaTreeRef.value?.getExpandedKeys()
		console.log('当前已展开的KEY ==>', gek)
	}
	const doCheckedTree = (keys, checked) => {
		DaTreeRef.value?.setCheckedKeys(keys, checked)
		const gek = DaTreeRef.value?.getCheckedKeys()
		console.log('当前已选中的KEY ==>', gek)
	}
	const handleTreeChange = (allSelectedKeys, currentItem) => {
		if (currentItem.level == 0) {
			console.log('00');
		} else {
			uni.navigateTo({
				url: '/pages/InSendPDA/ReturnReapir?reasoninfo=' + JSON.stringify(currentItem)
			})
		}

		console.log('handleTreeChange ==>', allSelectedKeys, currentItem)
	}
	//同级节点只能展开一个
	const handleExpandChange = (expand, currentItem) => {
		if (expand) {
			DaTreeRef.value.setExpandedKeys('all', false)
		}
		DaTreeRef.value.setExpandedKeys([currentItem.key], expand)
		console.log('handleExpandChange ==>', expand, currentItem)
	}
</script>

<style scoped lang="scss">
	.changeList {
		padding-bottom: 10rpx;
		width: 100%;
		height: 100%;

		.listMain {
			margin-top: 2px;
			width: 100%;
			height: calc(100% - 240rpx);
			// border: 1px solid red;
			overflow-y: auto;
			font-size: 16px;

			.project {
				background: #fff;
				padding: 20rpx;
				margin: 30rpx 20rpx;
				border-radius: 4px;
				box-shadow: 0 0 10px #eee;


				.pro_top {
					display: flex;
					justify-content: space-between;
					padding: 10rpx 0;
				}

				.textHint {
					color: #999;
				}
			}
		}
	}
</style>