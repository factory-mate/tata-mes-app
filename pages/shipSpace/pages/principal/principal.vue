<template>
	<view class="principal">
		<uni-nav-bar dark shadow background-color="red" status-bar left-icon="left" :title="title"
			@clickLeft="clickLeft" />

		<view class="table-cont">
			<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
				@selection-change="selectionChange">
				<uni-tr>
					<uni-th width="30" align="center">工号</uni-th>
					<uni-th width="30" align="center">姓名</uni-th>
					<uni-th width="30" align="center">部门</uni-th>
					<uni-th width="30" align="center">职位</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td align="center">{{ item.id }}</uni-td>
					<uni-td align="center">
						<view class="name">{{ item.name }}</view>
					</uni-td>
					<uni-td align="center">{{ item.date }}</uni-td>
					<uni-td align="center">{{ item.patr }}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view class="no-more">没有更多</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	const title = ref('选择负责人')
	//头部左侧,返回上一页
	const clickLeft = () => {
		uni.navigateBack({
			delta: 1,
		})
	}
	//表格数据
	const loading =ref(false)
	const selectedIndexs = ref()
	//多选处理
	const selectionChange =(e)=>{
		// selectedIndexs = e.detail.index
	}
	const tableData = [
		 {
		        id: '001',
		        name: '张三',
		        date: '线条车间',
				patr:'主任'
		    },
		    {
		        id: '002',
		        name: '李四',
		        date: '线条车间',
				patr:'主任'
		    },
		    {
		        id: '003',
		        name: '王五',
		        date: '线条车间',
				patr:'主任'
		    }
	]
</script>

<style scoped lang="scss">
	.table-cont{
		margin: 20rpx;
	}

.no-more{
			font-size: 14px;
			color: #999;
			text-align: center;
			margin: 100rpx;
		}
</style>
