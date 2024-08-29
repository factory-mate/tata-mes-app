<template>
	<view class="addSpace">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />
		<view class="space-detail">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="名称" required name="name">
					<uni-easyinput class="input" type="text" v-model="formData.name" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="负责人" required name="name">
					<uni-easyinput class="input" type="text" v-model="formData.name" placeholder="请输入"
						@focus="choosePeople" />
				</uni-forms-item>
				<uni-forms-item label="仓库类型" name="name">
					<uni-easyinput class="input" type="text" v-model="formData.name" placeholder="请输入"
						@focus="chooseClass" />
				</uni-forms-item>
				<uni-forms-item>
					<view class="uni-list">
						<view class="uni-db  test">启用仓库</view>
						<switch checked style="transform:scale(0.7)" />
					</view>
				</uni-forms-item>
				<uni-forms-item>
					<view class="uni-list">
						<view class="uni-db">设置默认</view>
						<switch checked style="transform:scale(0.7)" />
					</view>
				</uni-forms-item>
				<uni-forms-item>
					<view class="uni-list">
						<view class="uni-db">启用仓位管理</view>
						<switch checked style="transform:scale(0.7)" />
					</view>
				</uni-forms-item>
			</uni-forms>
			<view class="bot-btn">
				<button class="put-btn" @click="submit" size="mini">提交</button>
				<button class="put-btn" @click="clearForm" size="mini">取消</button>
			</view>
		</view>

		<view class="no-more">没有更多</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	const title = ref('新建仓库')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	const formData = reactive({
		id: '',
		name: '',
		checked: ''
	})

	const rules = ref({
		name: [{
				required: true,
				message: '不能为空',
				trigger: 'blur'
			},
			{
				min: 3,
				max: 5,
				message: '长度限制',
				trigger: 'blur'
			},
		]
	})
	//表单提交，跳转至
	const submit = () => {

	}
	//清空表单数据
	const clearForm = () => {}
	//选择负责人
	const choosePeople = () => {
		uni.navigateTo({
			url: '/pages/shipSpace/pages/principal/principal'
		})
	}
	//选择仓库类型
	const chooseClass = () => {
		uni.navigateTo({
			url: '/pages/storeManage/pages/StorageClassify/StorageClassify'
		})
	}
</script>

<style scoped lang="scss">
	.addSpace {
		.space-detail {
			background: #fff;
			margin: 20rpx;
			padding: 20rpx;
			border: 1px solid #bbb;
			border-radius: 4px;

			.uni-list {
				display: flex;
				align-items: center;
				justify-content: space-between;

				// .uni-db{
				// 	margin: 20px;
				// }
				.test {
					margin-left: 5px;
				}
			}

			.bot-btn {
				display: felx;

				.put-btn {
					margin: 0 50px;
					background: red;
				}
			}

		}

		.no-more {
			font-size: 14px;
			color: #999;
			text-align: center;
			margin: 100rpx;
		}
	}
</style>
