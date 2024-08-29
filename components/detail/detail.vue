<template>
	<view class="bBox">
		<!-- 图片区域 -->
		<view class="header">
			<view v-if="type==='img'">
				<view class="img-text">
					<image class="logo" src="../../static/img/home/bg5.jpg" @click="previewImage">
					</image>
					<text>设备照片</text>
				</view>
			</view>
			<view v-if="type==='add'">
				<view class="picker">
					<uni-file-picker limit="1" :del-icon="false" disable-preview :imageStyles="imageStyles"
						file-mediatype="image"></uni-file-picker>
					<view style="text-align: center; padding:20rpx 0;">上传图片</view>
				</view>
			</view>
		</view>
		<!-- 信息区域 -->
		<view class="middle">
			<!-- 标题 -->
			<view class="msg">
				<view class="iconfont icon-gu-zhang-xin-xi" style="color: red;"></view>
				<view class="title">维修信息</view>
			</view>
			<!-- 内容 -->
			<view class="context">
				<view class="left">
					<view class="item">维修单号：</view>
					<view class="item">来源类型：</view>
					<view class="item">来源单据号：</view>
					<view class="item">制单人：</view>
					<view class="item">备注：</view>

				</view>
				<view class="right">
					<view class="item">故障申报单</view>
					<view class="item">系统生成</view>
					<view class="item">系统生成</view>
					<view class="item">系统生成</view>
					<view class="item">
						<input placeholder="点击输入文本">
					</view>
				</view>
			</view>
		</view>
		<!-- 项目区域 -->
		<view class="bottom">
			<!-- 标题 -->
			<view class="msg">
				<view class="iconfont icon-gu-zhang-xin-xi" style="color: red;"></view>
				<view class="title">维修项目</view>
			</view>
			<!-- 故障项目第一条 -->
			<view class="redtext">
				<text>传送链块、传送链条检查</text>
			</view>
			<view class="project">
				<view class="left">
					<view class="item">编码：</view>
					<view class="item">项目标签：</view>
					<view class="item">原因大类：</view>
					<view class="item">原因分类：</view>
					<view class="item">描述：</view>

				</view>
				<view class="right">
					<view class="item">jimvbu888888</view>
					<view class="item">巡检项目</view>
					<view class="item">机器故障</view>
					<view class="item">螺丝松动</view>
					<view class="item">
						<input placeholder="点击输入文本">
					</view>
				</view>
			</view>
			<!-- 故障项目第二条 -->
			<view class="redtext">
				<text>传送链块、传送链条检查</text>
			</view>
			<view class="project">
				<view class="left">
					<view class="item">编码：</view>
					<view class="item">项目标签：</view>
					<view class="item">原因大类：</view>
					<view class="item">原因分类：</view>
					<view class="item">描述：</view>

				</view>
				<view class="right">
					<view class="item">jimvbu888888</view>
					<view class="item">巡检项目</view>
					<view class="item">机器故障</view>
					<view class="item">螺丝松动</view>
					<view class="item">
						<input placeholder="点击输入文本">
					</view>
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="one-box" v-if="BtnSta==='one'" @click="BthThing">
				<button class="btn" type='warn' size="mini">选择维修人员</button>
			</view>
			<view class="btn-box" v-if="BtnSta==='two'">
				<button class="btn1" @click="inputDialogToggle" size="mini">回退</button>
				<button class="btn" @click="inputconfirm" size="mini">确认</button>
			</view>
		</view>
		<!-- 撤销对话弹出框 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="撤销原因"  placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>

		<!-- 确认弹出框 -->
		<uni-popup ref="confirmpopup" type="dialog">
			<uni-popup-dialog title="确定提交完工申请吗？" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		toRefs
	} from 'vue'
	const inputDialog = ref(null)
	const confirmpopup = ref(null)
	//父组件的传值
	const props = defineProps({
		url: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: ''
		},
		BtnSta: {
			type: String,
			default: ''
		}
	})
	const {
		type
	} = toRefs(props)
	//选择维修人员跳转
	const BthThing = () => {
		uni.navigateTo({
			url: props.url
		})
	}
	//撤销对话弹出框
	const inputDialogToggle = () => {
		inputDialog.value.open()
	}
	const dialogInputConfirm = () => {
		uni.navigateTo({
			url: '/pages/finished/pages/finished/finished'
		})
	}
	//完工申请确认弹出框
	const inputconfirm = () => {
		confirmpopup.value.open()
	}
	const close = () => {
		confirmpopup.value.close()
	}
	const confirm = () => {
		confirmpopup.value.close()
		uni.navigateTo({
			url: '/pages/finished/pages/finished/finished'
		})
	}

	//图片放大设置
	const previewImage = () => {
		uni.previewImage({
			urls: ["../../static/img/home/bg5.jpg"],
			current: 0,
			// success(res) {
			// 	console.log(res);
			// },
			// fail(res){
			// 	console.log(res);
			// },
			// complete(res) {
			// 	console.log(res);
			// }
		})
	}
</script>

<style lang="scss" scoped>
	.bBox {
		background-color: #f2f2f2;
		width: 100%;
	}

	.header {
		background: #fff;
		margin-bottom: 20rpx;
		// width: 100%;
	}

	.middle {
		width: 100%;
	}

	.logo {
		width: 400rpx;
		height: 300rpx;
		margin: 20rpx;
	}

	.img-text {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		font-size: 32rpx;
		padding: 20rpx;
	}

	.msg {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		padding: 20rpx;
		background: #fff;
		border-bottom: 1px solid #eee;
	}

	.iconfont {
		font-size: 50rpx;
		margin-right: 30rpx;
	}

	.context {
		display: flex;
		background: #fff;
		font-size: 30rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.left{
			min-width: 220rpx;
		}
	}

	.right {
		flex: 1;
	}

	.item {
		padding: 20rpx;
	}

	.redtext {
		color: red;
		padding: 20rpx;
		font-size: 28rpx;
		background-color: #fff;
	}

	.project {
		display: flex;
		padding: 0 20rpx;
		background: #fff;
		font-size: 30rpx;
		.left{
			min-width: 220rpx;
		}
	}

	.btn-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx;
		// position: fixed;
		// bottom: 0;
	}

	.one-box {
		margin-top: 6rpx;
		background: #fff;
		padding: 20rpx 0;
		position: absolute;
		left:50%;
		margin-left: -150rpx;
	}

	.btn {
		width: 300rpx;
		background-color: red;
		color: #fff;

	}

	.btn1 {
		width: 300rpx;
		background-color: #fff;
		color: red;
		border: 1rpx solid #ff0000;
	}

	::v-deep .file-picker__box {
		margin: 0 auto;
		margin-top: 20rpx;
	}
</style>
