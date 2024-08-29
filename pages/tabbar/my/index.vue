<template>
  <view class="content">
    <view class="bgc-img"> </view>
    <view class="logo">
      <image
        src="../../../static/logo.png"
        mode=""
        class="logo-img"
      ></image>
    </view>

    <view class="main">
      <text style="margin-top: 140rpx; color: white">{{ userName }}</text>
      <button
        class="log-out"
        @click="logout"
      >
        注销
      </button>
    </view>

    <span
      style="color: white; position: absolute; bottom: 8px; left: 0; right: 0; font-size: smaller"
      >当前版本：7.29 18:30</span
    >
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const userName = ref('')
const h = ref(100)

const logout = () => {
  uni.removeStorageSync('token')
  uni.removeStorageSync('account')
  uni.reLaunch({ url: '/pages/login/login' })
}

onShow(() => {
  userName.value = uni.getStorageSync('User')?.UserName ?? ''
  h.value = uni.getSystemInfoSync().windowHeight
})

onLoad(() => {})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  text-align: center;
  height: 100vh;
  background-color: #971e23;

  .bgc-img {
    width: 100%;
    height: 300rpx;
  }

  .logo {
    width: 220rpx;
    height: 220rpx;
    border-radius: 24px;
    position: absolute;
    top: 190rpx;
    left: 265rpx;
    background-color: white;
    padding: 2rpx;
    z-index: 999;
    .logo-img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
  }

  .main {
    box-sizing: border-box;
    height: 20em;
    border: 1px solid #000;
    width: 100%;
    background-color: #971e23;
    border: 1rpx solid #971e23;
    border-radius: 60rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .log-out {
      width: 660rpx;
      height: 90rpx;
      border-radius: 32rpx;
      background-color: #464c5b;
      margin-bottom: 60rpx;
      color: white;
    }
  }
}
</style>
