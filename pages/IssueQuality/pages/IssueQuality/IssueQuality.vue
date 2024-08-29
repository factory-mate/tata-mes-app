<template>
  <view class="changeList">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
      @clickRight="clickRight"
      right-text="全部展开"
    />
    <!-- 搜索框 -->
    <view class="top-search">
      <uni-section
        title=""
        type="line"
      >
        <input
          class="inputSty"
          v-model="searchValue"
          :focus="focusType"
          placeholder="单号/名称/卡号"
          placeholder-style="font-size:12px"
        />
      </uni-section>
    </view>
    <view
      class="listMain"
      :style="'height:' + (h - 260) + 'px'"
    >
      <!-- 列表 项-->
      <view
        class="project"
        @click="goDetail"
      >
        <view class="pro_top">
          <view class="dark">工位：{{}}</view>
          <view class="light">时间：{{}} </view>
        </view>
        <!-- <view class="hint" :style="{color:item.repairstatusname=='待处理'?'royalblue' : item.repairstatusname=='待审核'?'orange' :'green'}">状态：{{item.repairstatusname}}</view> -->
        <view class="textHint"
          >产品：{{}}
          <text style="margin: 0 30px">数量：{{}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { questionData } from '@/api/IssueQuality.js'
const h = ref('100')
const title = ref('质量异常')
const searchValue = ref()
const focusType = ref(false)
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
})
onShow(() => {
  AjaxData()
})
let DataList = ref([])
const AjaxData = async () => {}

//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
const clickRight = () => {
  uni.navigateTo({
    url: '/pages/IssueQuality/pages/baseSetting/baseSetting'
  })
}
//列表跳转详情页
const goDetail = () => {
  uni.navigateTo({
    url: '/pages/IssueQuality/pages/detail/detail'
  })
}
</script>

<style scoped lang="scss">
.changeList {
  padding-bottom: 10rpx;
  width: 100%;
  height: 100%;

  .top-search {
    padding: 0 20rpx;
    border-bottom: 1px solid #eee;
  }

  .listMain {
    margin-top: 2px;
    width: 100%;
    height: calc(100% - 240rpx);
    overflow-y: auto;
    font-size: 14px;

    .project {
      background: #fff;
      padding: 20rpx;
      margin: 30rpx 20rpx;
      border-radius: 4px;
      box-shadow: 0 0 10px #eee;

      .pro_top {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0 60rpx 0;
      }

      .hint {
        color: green;
        margin-bottom: 20px;
        margin-left: 250px;
      }

      .textHint {
        color: #999;
      }
    }
  }
}
</style>
