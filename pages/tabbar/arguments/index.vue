<template>
  <view class="content"> 设置 </view>
  <!-- 测试vuex -->
  <view>{{ $store.state.num }}</view>
  <view>{{ $store.state.count }}</view>
  <button @click="myadd">++</button>

  <!-- <view>
		<button @click="open">打开颜色选择器</button>
		需要声明 ref
		<t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker>

	</view> -->
  <view class="tcc">
    <button @click="open1">打开弹窗</button>
    <uni-popup
      ref="popup"
      type="bottom"
      >底部弹出 Popup</uni-popup
    >
    <!-- <view class="" ref="box"> -->

    <!-- </view> -->
  </view>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
const myadd = () => {
  store.commit('add')
}
const color = {
  r: 255,
  g: 0,
  b: 0,
  a: 0.6
}
let colorPicker = ref(null)
const open = (item) => {
  colorPicker.value.open()
}
const confirm = (e) => {
  // console.log(e.hex);
  let icolor = e.hex
  console.log(icolor)
  uni.setStorage({
    key: 'ICON-COLOR',
    data: icolor
  })
  store.dispatch('changColor', icolor)
  uni.switchTab({
    url: '/pages/tabbar/home/index'
  })
}
const popup = ref(null)
const open1 = () => {
  popup.value.open('center')
}
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
  margin-top: 200upx;
}
</style>
