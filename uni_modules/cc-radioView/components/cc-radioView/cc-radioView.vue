<template>
	<view class="uni-list">
		<radio-group @change="radioChange" class="rradSty">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radioData" :key="item.value">
				<view class="leftRadio">
					<radio :value="item.value" :checked="index === curIndex" />
				</view>
				<view class="rightText">{{item.name}}</view>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		props: {
			// 左边标题栏
			leftTitle: {
				type: String,
				default: ""
			},

			// 当前index
			curIndex: {
				type: [Number, String],
				default: 0
			},
			// 数据源
			radioData: {
				type: Array,
				default () {

					return [];
				}
			}

		},
		data() {
			return {

			}
		},
		methods: {

			radioChange(e) {


				this.$emit("change", e);

			},
		}

	}
</script>

<style>
	@import './uni.css';

	.uni-list-cell {
		justify-content: flex-start;
		padding: 0;

	}

	.leftRadio {
		margin-left: 0rpx;
	}

	.rightText {
		margin-left: 12rpx;
	}
	.rradSty{

		display:flex;
	}
</style>