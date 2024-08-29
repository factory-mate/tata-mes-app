<template>
	<view class="box" >
		    <view class="left" @click="back">
				<image class="img" src="../../static/img/icons/left.png" mode=""></image>
				<span class="tex" >返回</span>
			</view>
			<view class="middle">
				{{title}}
			</view>
			<view class="right">
				<view class="iconfont icon-zengjia" v-if="RType ==='add'" @click="add"
				style="margin-left: 15rpx;">
				</view>
				<view class="dateSty" v-if="RType ==='date'">
					<uni-datetime-picker v-model="single" type="date" @change="changeTime">
						<i class="iconfont icon-rili" style="font-size: 40rpx;"></i>
					</uni-datetime-picker>
				</view>
				<view v-if="RType==='text1'" @click="message1">
					<text class="text2">{{rightText}}</text>
				</view>
				<view v-if="RType==='text'" @click="message">
					<text class="text2">{{rightText}}</text>
				</view>
			</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="您确定提交设备申请吗？" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		
		<!--全部完工弹出层 -->
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog title="您确定全部完工吗？" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup >
	
	import { toRefs ,ref,reactive,watch} from 'vue'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  title: String, //标题
	  RType:{ //右侧状态    add  添加   date  时间
		  type:String,
		  default:''
	  },
	  NavUrl:{ //跳转的url
		type:String,
		default:''
	  },
	  rightText:{
		  type:String,
		  default:'全部已读'
	  }
	})
	
	//使用父组件传递过来的值
    const {title,btnType,NavUrl,rightText} =toRefs(props)
	const data=reactive({
		single:''
	})
	const {single} =toRefs(data)
	const back=()=>{
		uni.navigateBack({
		})
	}
	//点击添加跳转页面
	const add=()=>{
		uni.navigateTo({
			url:props.NavUrl
		})
	}
	const changeTime=(val)=>{
		console.log(val,'time')
	}
	
	// 弹出层
	const popup1 = ref('null')
	const popup = ref('null')
	const message1=()=>{
		popup1.value.open()
	}
	const message=()=>{
		popup.value.open()
	}
	const confirm=()=>{
		popup.value.close()
		popup1.value.close()
	}
	const close=()=>{
		popup.value.close()
		popup1.value.close()
	}
</script>

<style lang="scss" scoped>
	.box{
		// box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		background-color: red;
		// line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 0rpx;//真机运行头部边距设置
		left: 0;
		z-index: 9999;
		.left{
			width: 150rpx;
			// background-color: blue;
			padding-top: 35rpx;
			vertical-align: middle;
			display: flex;
			padding-left: 30rpx;
			.img{
				width: 50rpx;
				height: 50rpx;
				display: inline-block;
				vertical-align: middle;
				// color: red;
			}
			.tex{
				display: inline-block;
				vertical-align: middle;
				color: white;
			}
			
		}
		.middle{
			width: 300rpx;
			height: 120rpx;
			color: white;
			line-height: 120rpx;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.right{
			width: 170rpx;
			height: 120rpx;
			// background-color: blue;
			line-height: 120rpx;
			text-align: center;
			color: white;
		}
	}
	.text2{
		font-weight: 400;
		font-size: 32rpx;
		margin-right: 18rpx;
	}
</style>
<style scoped>
	.dateSty >>> .uni-calendar-item__weeks-box  .uni-calendar-item--checked{
		background:red;
	}
	.dateSty >>> .uni-datetime-picker--btn{
		background-color: red;
	}
</style>