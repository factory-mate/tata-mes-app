<template>
  <view class="Box">
    <head-nav :title="container"></head-nav>
    <view class="context">
      <view class="title">拉手锁、合页、门锁锁具要怎么安装才正确呢？</view>
      <view class="info">
        <text class="public">系统公告</text>
        <uni-dateformat :date="now"></uni-dateformat>
      </view>
      <view class="cont">
        普通的门窗五金配件，指的是我们日常所经常看到的拉手、合页、锁具。那这些普通的门窗五金配件要怎么安装才正确呢？坚盾五金为大家介绍一下！门窗五金配件中的拉手的安装会比较简单些，不过要注意下在安装时要保证拉手的参数与推拉门推拉窗时匹配的，例如拉手的配套件要与门窗的厚度参数一致。合页一般会用在平开门窗上，在准备安装合页时，要看清楚厂家给你配的配件是否齐全，有时候缺一个螺丝缺一个钉子，会影响合页的安装呢。有的合页会分左右，所以在安装时要辨别左边与右边。重型的铝合金门，一般会用到3个合页哦！至于门窗中的门锁窗锁的安装，这是比较重要的部件，毕竟是掌控了门与窗的防盗“心脏”所在。如果业主安装不来，可以让门窗五金配件厂家派人上门安装。
      </view>
    </view>
  </view>
</template>

<script setup>
import HeadNav from '@/components/head/head.vue'
import { ref } from 'vue'
const container = ref('出新开向、锁具、合页、安装方式啦，请前往!')
const now = ref(Date.now())
</script>

<style scoped lang="scss">
.context {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 120rpx;
  background-color: #f2f2f2;
}

.title {
  font-size: 40rpx;
  padding: 40rpx 20rpx;
}

.public {
  font-size: 32rpx;
  padding: 30rpx;
  color: red;
}

.cont {
  padding: 20rpx;
  font-size: 32rpx;
  text-indent: 2em;
}
</style>
