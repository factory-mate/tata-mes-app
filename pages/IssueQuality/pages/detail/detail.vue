<template>
	<view class="changeList">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" rightText="全部展开" :title="title"
			@clickLeft="clickLeft" @clickRight="OpenAll" />
		<!-- 搜索框 -->
		<view class="top-search">
			<uni-section title="" type="line">
				<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="单号/名称/卡号"
					placeholder-style="font-size:12px" />
			</uni-section>
		</view>
		<!-- 基础信息 -->
		<view class="All-detail" :style="'height:'+ (h-245) + 'px'">
			<view class="project">
				<view class="pro_hh">
					<view class=" pro_l">异常单号：</view>
					<view class=" light">55632488555 </view>
				</view>
				<view class="pro_hh">
					<view class=" pro_l">产品名称：</view>
					<view class=" pro_R">普通门套竖挺（米）免漆 </view>
				</view>
				<view class="pro_hh">
					<view class=" pro_l">流转卡号：</view>
					<view class=" pro_R">741852963 </view>
				</view>
				<view class="pro_hh">
					<view class=" pro_l">工序名称：</view>
					<view class=" pro_R">包装</view>
				</view>
				<view class="pro_hh">
					<view class=" pro_l">数量：</view>
					<view class=" pro_R">1</view>
				</view>
				<view class="pro_hh">
					<view class=" pro_l">产线名称：</view>
					<view class=" pro_R">产线代码 </view>
				</view>
			</view>

			<!-- 处理方式 -->
			<view class="resolve">
				<view class="fir-res">
					<view class="line"></view>
					<view class="method" @click="checkMthod"><text style="color: red;"></text>处理方式:<text
							class="met-value">{{method}}</text></view>
				</view>
				<!-- 返修 -->
				<view class="list-text" v-if="method==='返修'">
					<view class="item">
						返修工位:
					<input class="inputSty" v-model="searchValue" :focus="focusType" placeholder="请输入内容"
						placeholder-style="font-size:12px" />
					</view>

					<view class="item">
						不良原因:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						补充说明:
						<input class="inputSty" v-model="searchValue" :focus="focusType" placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item" @click="checkPerson">
						审 核 人：
						<text style="margin-left: 20rpx;">xxxxx</text>
					</view>
					<view class="item">
						补充说明:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
				</view>
				<!-- 返工 -->
				<view class="list-text" v-if="method==='返工'">
					<view class="item" @click="checkStation">
						返工工位:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item" @click="checkReason">
						不良原因:
						<text style="margin-left: 20rpx;">xxxxx</text>
					</view>
					<view class="item">
						当前物料报废:
					</view>
					<view class="item">
						补充说明:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
				</view>
				<!-- 重做 -->
				<view class="list-text" v-if="method==='重做'">
					<view class="item">
						重做原因:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						补充说明:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						当前物料报废:
					</view>
				</view>
				<!-- 让步接收 -->
				<view class="list-text" v-if="method==='让步接收'">
					<view class="item" @click="checkReason">
						不良原因
					</view>
					<view class="item">
						补充说明:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
				</view>
			</view>
			<!-- 状态 -->
			<view class="state">
				<view class="fir-res">
					<view class="line"></view>
					<view class="method">状态</view>
				</view>
				<view class="list-text">
					<view class="item">
						申 报 人 :
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						审 核 人 :
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						补充说明:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						审核时间:
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
					<view class="item">
						<text style="width: 110rpx;">备注:</text>
						<input class="inputSty" v-model="searchValue" :focus="focusType"  placeholder="请输入内容"
							placeholder-style="font-size:12px" />
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮，需要判断权限 -->
		<view class="botm-btn">
			<button class="fir-btn" size="mini" style="background: red;color: #fff;">回退</button>
			<button size="mini" style="background: red;color: #fff;">审核通过</button>
		</view>
		<view class="botm-btn">
			<button class="fir-btn" size="mini" style="background: red;color: #fff;">关闭</button>
			<button class="fir-btn" size="mini" style="background: red;color: #fff;">取消</button>
			<button size="mini" style="background: red;color: #fff;">提交</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,nextTick
	} from 'vue'
	import {
		onLoad,
		onShow,
	} from "@dcloudio/uni-app";
	const h = ref('100')
	const val = ref()
	const searchValue = ref()
	const focusType = ref(false)
	let method = ref('返修')
	// const setfocus=()=>{
	// 	focusType.value=false
	// 	nextTick(()=>{
	// 		focusType.value=true
	// 	})
	// }
	//加载页面
	onLoad((option) => {
		//处理方式
		if (!option.value) {
			let met = uni.getStorageSync('meVal')
			method = met
		} else {
			method = option.value
			uni.setStorageSync('meVal', method)
		}

		h.value = uni.getSystemInfoSync().windowHeight;
	})
	const change = () => {}
	//全部展开页面跳转
	const OpenAll = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/baseSetting/baseSetting'
		})
	}
	//跳转处理方式页面
	const checkMthod = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/methods/methods?meval=' + method
		})
	}
	//审核人页面跳转
	const checkPerson = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/personal/personal'
		})
	}
	//不良原因页面跳转
	const checkReason = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/reasons/reasons'
		})
	}
	//工位页面跳转
	const checkStation = () => {
		uni.navigateTo({
			url: '/pages/IssueQuality/pages/stations/stations'
		})
	}

	const title = ref('质量异常详情')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	//处理方式弹窗数组值
	let methods = ref('返修')
	const getIndex = (index, item) => {
		methods.value = item.value
	}
</script>

<style scoped lang="scss">
	.changeList {
		background: #FFF;
		padding-bottom: 10rpx;

		.top-search {
			padding: 0 20rpx;
			border-bottom: 1px solid #bbb;
		}

		.All-detail {
			overflow-y: auto;

			.project {
				background: #fff;
				padding: 20rpx;
				margin: 30rpx 20rpx;

				.pro_hh {
					width: 100%;
					display: flex;
					line-height: 60rpx;

					.pro_l {
						width: 160rpx;
					}
				}

				.demo-uni-row {
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
				}
			}

			//处理方式
			.resolve {
				background: #fff;
				margin: 20rpx;
				padding: 20rpx 0;
				border: 1px solid #bbb;
				border-radius: 4px;

				.fir-res {
					display: flex;
					align-items: center;

					.line {
						width: 10rpx;
						height: 30rpx;
						margin: 0 20rpx;
						border-radius: 20rpx;
						background: blue;
					}

					.method {
						width: 100%;
						box-sizing: border-box;
						padding-right: 20rpx;

						.met-value {
							float: right;
							text-align: right;
							color: red;
						}
					}

					.inp-btn {
						width: 30rpx;
					}
				}

				.list-text {
					margin: 20rpx;
					padding: 20rpx;

					.item {
						padding: 10rpx;
						display: flex;
						align-items: center;
						font-size: 14px;
					}
				}
			}

			//状态
			.state {
				margin: 20rpx;
				background: #fff;
				padding: 20rpx;
				border: 1px solid #bbb;
				border-radius: 4px;

				.fir-res {
					display: flex;
					align-items: center;

					.line {
						width: 10rpx;
						height: 30rpx;
						// margin: 0 20rpx;
						border-radius: 20rpx;
						background: blue;
					}

					.method {
						margin-left: 20rpx;
					}

					.inp-btn {
						width: 30rpx;
					}
				}

				.list-text {
					margin: 20rpx;
					padding: 20rpx;

					.item {
						padding: 10rpx;
						display: flex;
						align-items: center;
						font-size: 14px;
					}
				}
			}
		}

		.botm-btn {
			float: right;
			margin: 20rpx;
			color: #fff;
			padding: 20rpx;

			.fir-btn {
				margin: 0 20rpx;
			}
		}

		//弹窗
		.popup {
			.uni-popup {
				width: 600rpx;

				.popup-content {
					.pou-head {
						width: 600rpx;
						height: 100rpx;
						background: salmon;
						line-height: 100rpx;

						.head-text {
							padding: 20rpx;
							font-size: 36rpx;
						}

						.icon {
							float: right;
							margin: 10rpx 20rpx;
						}
					}

					.meth-list {
						padding: 20rpx;

						.item {
							font-size: 36rpx;
							// margin: 20rpx;
							padding: 10rpx;
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
		}

	}
</style>
