<template>
	<view class="inStorage">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="content">
			<view class="listMain">
				<scroll-view :style="'height:'+ (h-200) + 'px'" scroll-y='true' lower-threshold="50"
					show-scrollbar="true" @scrolltolower="scrolltolower">
					<view class="project" v-for="(item,index) in DevList" :key="index">
						<view class="wLIst">
							<uni-row class="demo-uni-row">
								<uni-col :span="10">
									<view class="demo-uni-col dark">序号：{{index+1}}</view>
								</uni-col>
								<uni-col :span="16">
									<view class="demo-uni-col dark">盘点单号：{{item.cCode}}</view>
								</uni-col>
							</uni-row>
							<uni-row class="demo-uni-row">
								<uni-col :span="10">
									<view class="demo-uni-col dark">物料编码：{{item.cInvCode}}</view>
								</uni-col>
								<uni-col :span="16">
									<view class="demo-uni-col dark">物料名称：{{item.cInvName}}</view>
								</uni-col>
							</uni-row>
							<uni-row class="demo-uni-row">
								<uni-col :span="10">
									<view class="demo-uni-col dark">规格型号：{{item.cInvStd}}</view>
								</uni-col>
								<uni-col :span="14">
									<button class="mini-btn" type="warn" plain="true" size="mini"
										@click="goPoint(item)">盘点</button>
								</uni-col>

							</uni-row>
						</view>
					</view>
					<uni-load-more :status="more"></uni-load-more>
				</scroll-view>
			</view>
		</view>
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
	import {
		STOCKTViewPage,
	} from '@/api/PDA.js'
	import permision from "@/common/permission.js"
	import _ from "lodash"
	let branch = ref()
	const h = ref('100') //页面高度
	const more = ref('more') //加载更多
	const title = ref('待盘点详情')
	const DevList = ref([])
	const current = ref(0)
	const codeType = ref('')
	//页面条数
	const pageSize = ref(10)
	//当前页
	const currentPage = ref(1)
	//总条数
	const total = ref(0)
	//总页数
	const pageTotal = ref(0)
	const mid = ref('')
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
	//加载页面
	onLoad((option) => {

		h.value = uni.getSystemInfoSync().windowHeight;
		mid.value = option.id
		GetList()
	})
	const keypress = (e) => {
		// codeType.value = ''
		console.log(e, "按键码");
		// if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
		// 	codeType.value = 'enter'
		// 	getWl()
		// }
		if (e.keyCode == 66 || e.key == "Enter") {
			codeType.value = 'enter'
		}
	}
	//获取列表数据
	const GetList = () => {
		uni.showLoading({
			title: '加载中'
		});
		STOCKTViewPage({
			"PageIndex": currentPage.value,
			"PageSize": pageSize.value,
			"OrderByFileds": "",
			"Conditions": `MID=${mid.value}`
		}).then(res => {
			if (res.status == 200) {
				DevList.value = [...DevList.value, ...res.data.data]
				uni.hideLoading()
				uni.stopPullDownRefresh()
			} else {
				uni.hideLoading()
			}
		})
	}
	//盘点
	const goPoint = (i) => {
		// console.log(i, 'i-------------------详情');
		// // let detail = JSON.stringify(i); // 这里转换成 字符串
		uni.navigateTo({
			url: `/pages/checkBills/checkPage/checkPage?mid=${mid.value}&itemInfo=`+JSON.stringify(i)
		})
	}
	//下拉
	onPullDownRefresh(() => {
		// console.log('下拉');
		currentPage.value = 1
		total.value = 0
		DevList.value = []
		GetList()

	})
	//上拉
	const scrolltolower = () => {
		more.value = 'loading'
		console.log('上拉');
		currentPage.value++
		if (currentPage.value > pageTotal.value) {
			more.value = 'no-more'
		} else {
			GetList()
		}

	}
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
</script>

<style lang="scss" scoped>
	.inStorage {
		width: 100%;
		padding-bottom: 10rpx;

		.uni-padding-wrap {
			margin: 20rpx 10rpx;
		}

		.content {
			width: 100%;
			font-size: 12px;

			.RUDetail {
				padding: 20rpx;

				.demo-uni-col {
					margin: 10rpx;
				}
			}

			.listMain {
				margin-top: 2px;
				width: 100%;
				height: calc(100% - 240rpx);
				overflow-y: auto;
				font-size: 14px;

				.RUlist {
					background: #fff;
					font-size: 12px;
					margin: 20rpx 10rpx;
					border-radius: 4px;
					box-shadow: 0 0 10px #b5b5b5;

					.demo-uni-row {
						display: flex;
						justify-content: space-between;
						padding: 20rpx;
					}
				}
			}

			.listMain {
				margin-top: 2px;
				width: 100%;
				height: calc(100% - 240rpx);
				overflow-y: auto;
				font-size: 14px;

				.project {
					background: #fff;
					font-size: 12px;
					margin: 20rpx 10rpx;
					border-radius: 4px;
					box-shadow: 0 0 10px #b5b5b5;

					.demo-uni-row {
						display: flex;
						justify-content: space-between;
						padding: 20rpx;

						.mini-btn {
							margin-left: 40%;
						}
					}
				}

				.projects {
					background: #fff;
					font-size: 12px;
					margin: 20rpx 10rpx;

					.demo-uni-row {
						display: flex;
						justify-content: space-between;
						padding: 10rpx;
					}
				}

			}

			.two-button {
				display: flex;
				justify-content: center;
				margin-top: -15px;

				.mini-btn {
					// position: fixed;
					// bottom: 30rpx;
					// left: 39%;
				}
			}
		}
	}
</style>