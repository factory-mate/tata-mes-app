# cc-radioView

#### 使用方法 
```使用方法
	
<!-- radioData:单选数据 curIndex：当前选择序列 @change：单选事件 -->
<cc-radioView :radioData="items" :curIndex="current" @change="radioChange"></cc-radioView>
					
```

#### HTML代码实现部分
```html

<template>
	<view>

		<!-- radioData:单选数据 curIndex：当前选择序列 @change：单选事件 -->
		<cc-radioView :radioData="items" :curIndex="current" @change="radioChange"></cc-radioView>

		<button class="botBtn" type="primary" @click="submitBtnClick">完成</button>

		<!-- 设置按钮下面仍然可以滑动 -->
		<view style="height: 30px;"></view>
	</view>
</template>

<script>
	export default {

		data() {
			return {

				items: [{
						value: '1',
						name: '事项一'
					},
					{
						value: '2',
						name: '事项二',
						checked: ''
					},
					{
						value: '3',
						name: '事项三'
					},
					{
						value: '4',
						name: '事项四'
					},
					{
						value: '5',
						name: '事项五'
					},
					{
						value: '6',
						name: '事项六'
					},
					{
						value: '7',
						name: '事项七'
					},
					{
						value: '8',
						name: '事项八'
					},

				],
				current: 0,

			};
		},
		onLoad(e) {

			let tmpObj = {};
			if (typeof(e.obj) === 'string') {

				tmpObj = JSON.parse(e.obj);
				// 查找元素位置
				this.current = this.items.findIndex((el) => {
					return el.name === tmpObj.name
				});


			}

			console.log("序列 = " + this.current);
			console.log("正向传值 = " + JSON.stringify(tmpObj));
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}

			},
			submitBtnClick: function(e) {
				console.log("选中的条目 = " + JSON.stringify(this.items[this.current]));

				this.$eventHub.$emit('fire', this.items[this.current]);

				uni.navigateBack({
					delta: 1
				})

			}
		}
	};
</script>

<style>
	/*每个页面公共css */



	.botBtn {
		width: 90%;
		margin-left: 5%;
		margin-top: 80rpx;
		height: 92rpx;
		/* background-color: #F36526 !important; */

	}
</style>


```
