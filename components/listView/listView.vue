<template>
	<view class="listMain">
		<view class="listItem">
			<view class="itemCon">
				<img :src="avatarList[0].url" alt="">
				<view class="itemRight">
					<view class="itemhead">
						<view class="itemName">
							雕刻机
						</view>
						<view class="itemTime">
							<i class="iconfont icon-shang-chuan-shi-jian" style="color: red;"></i>
							2020年8月4日 23: 00: 04
						</view>
					</view>
					<view class="itemHint">
						设备编号 <span>56767</span>
					</view>
					<view class="itemHint">
						设备编号 <span>56767</span>
					</view>
				<!-- 	<view class="iconfont icon-arrow-right"
					style="line-height: 150rpx; margin-left: 340rpx; color:#afafaf ; font-size: 45rpx; display: inline-block;"
					@click="checklist"
					>
					</view> -->
					<view class="itemHint">
						设备编号 <span>56767</span>
					</view>
				</view>
				<!-- 详情右箭头          -->
				<view v-if="rarrow==='right'" class="iconfont icon-arrow-right" @click="goDetail('已检测')"></view>
			</view>

			<view class="itemBottom">
				<i class="iconfont icon-shang-chuan-wei-zhi iconSty"></i>
				<view class="hintText">门皮板件区域dsdsadasdas</view>				
				<view class="butSty" v-if="props.text1==='保养'" @click="clickNavUrl('保养')">{{props.text1}}</view>
				<view class="butSty2" v-if="props.text2==='指派'" @click="clickNavUrl('指派')">{{props.text2}}</view>
				<view class="butSty" v-if="props.text3==='抢单'" @click="clickNavUrl('抢单')">{{props.text3}}</view>
				<view class="butSty" v-if="props.text4==='详情'" @click="clickNavUrl('详情')">{{props.text4}}</view>
				<view class="butSty" v-if="props.text5==='通知'" @click="clickNavUrl('通知')">{{props.text5}}</view>
				<view class="butSty" v-if="props.text6==='检测'" @click="clickNavUrl('检测')">{{props.text6}}</view>	
				<view  v-if="props.text7==='已检测'">{{props.text7}}</view>	
			</view>
		</view>
		
		<!-- 指派人员弹出框 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="确定对此任务进行抢单吗？" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		
		<!-- 通知弹窗 -->
		<uni-popup ref="popup1" background-color="153, 153, 153"  >
			<view class="popup-content" style="" ><text
					class="text" >已通知</text></view>
		</uni-popup>
	</view>	
</template>

<script setup>
	import {
		ref,
		toRefs,
		reactive
	} from 'vue'
	const props = defineProps({
		text1: { //保养
			type: String,
			default: ''
		},
		text2: { //指派
			type: String,
			default: ''
		},
		text3: { //抢单
			type: String,
			default: ''
		},
		text4: { //详情
			type: String,
			default: ''
		},
		text5: { //通知
			type: String,
			default: ''
		},
		text6: { //检测
			type: String,
			default: ''
		},
		text7: { //已检测
			type: String,
			default: ''
		},
		url: { //跳转的url
			type: String,
			default: ''
		},
		detailUrl:{
			type: String,
			default: ''
		},
		emp: { //指派人员跳转路径
			type: String,
			default: ''
		},
		rarrow:{
			type:String,
			default:''
		}
		// customObj: {
		//   type: Object,
		//   default: () => {
		//     return {}
		//   }
		// }
	})
	// 通知弹出层
	const popup = ref('popup')
	const popup1 = ref(null)
	const data = reactive({
		avatarList: [{
			url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
		},{
			url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
		},{
			url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
		}
		]
	})
	const {
		avatarList
	} = toRefs(data)
	// 图片预览  方法
	// const imgFangda=(val)=>{
	// 	uni.previewImage({
	// 		current:0,
	// 		urls:['https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',]
	// 	})
	// }
	const clickNavUrl = (val) => {
		switch (val){
			case '保养':
				uni.navigateTo({
					url: props.url
				})
			break;
			case '指派':
				uni.navigateTo({
					url: props.url
				})
			break;
			case '抢单':
				popup.value.open()
			break;
			case '详情':
				uni.navigateTo({
					url: props.url
				})
			break;
			case '通知':
				popup1.value.open('center')
			break;
			case '检测':
				uni.navigateTo({
					url: props.url
				})
			break;
			default:
				break;
		}
	}
	const goDetail=(val)=>{
		console.log(props.url,"--09");
		console.log(val,'--10');
		if(val===props.text7){
			console.log('11');
			uni.navigateTo({
				url:props.url
			})
		}else{
			uni.navigateTo({
				url:props.detailUrl
			})
		}
		
	}
	const close = () => {
		popup.value.close()
	}
	const confirm = () => {
		popup.value.close()
	}

</script>

<style scoped lang="scss">
	.listMain {
		width: 100%;
		height: 80%;
	}

	.listItem {
		box-sizing: border-box;
		padding: 20rpx;
		// background-color: #eee;
		border: 1px solid #eee;
		border-radius: 4px;
		margin: 20rpx
	}

	.itemCon {
		width: 100%;
		display: flex;
		align-items: center;

		img {
			width: 160rpx;
			height: 160rpx;
			display: block;
		}

		.itemRight {
			flex: 1;

			.itemhead {
				width: 100%;
				padding-left: 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.itemName {
					font-weight: 500;
				}

				.itemTime {
					font-size: 12px;
					line-height: 30px;
				}
			}

			.itemHint {
				font-size: 14px;
				padding-left: 20rpx;
				box-sizing: border-box;
				line-height: 26px;
			}
		}
	}

	.itemBottom {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.iconSty {
			display: block;
			color: red;
			width: 40rpx;
		}

		.hintText {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 100rpx;
		}

		.butSty {
			width: 60px;
			line-height: 30px;
			background-color: red;
			text-align: center;
			border-radius: 50px;
			color: #fff;
			font-size: 14px;
		}
		
		.butSty2{
			width: 60px;
			line-height: 30px;
			background-color: #fff;
			text-align: center;
			border-radius: 50px;
			color: red;
			border: 1rpx solid #ff0000;
			font-size: 14px;
		}
	}

	.button {

		margin-top: 15rpx;
		margin-left: 15rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		width: 120rpx;
		height: 60rpx;
		color: white;
		background-color: red;
		border-radius: 50rpx;

	}

	.popup-content {
		width: 200rpx;
		height: 80rpx;
		background-color: red;
		color: white;
		border-radius: 30rpx;
		text-align: center;
		line-height: 80rpx;
	}


	.leftButton {
		width: 60px;
		line-height: 30px;
		text-align: center;
		border-radius: 50px;
		border: 1rpx solid #ff0000;
		color: #ff0000;
		font-size: 14px;
	}
	
</style>
