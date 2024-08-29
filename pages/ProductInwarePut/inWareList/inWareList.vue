<template>
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
    />
    <view class="headSty">
      <view class="RUtext">已入库</view>
      <view class="line"></view>
    </view>
    <view class="HeadTop">
      <uni-row class="demo-uni-row">
        <uni-col :span="16">
          <view class="demo-uni-col dark">产品编码：{{ PUTDetail.cInvCode }}</view>
        </uni-col>
        <uni-col :span="8">
          <view class="demo-uni-col dark">数量：{{ PUTDetail.SumnQuantity }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row">
        <uni-col :span="16">
          <view class="demo-uni-col dark">产品名称：{{ PUTDetail.cInvName }}</view>
        </uni-col>
        <uni-col :span="8">
          <view class="demo-uni-col dark">箱数：{{ PUTDetail.CountcBarCode }}</view>
        </uni-col>
      </uni-row>
    </view>
    <view class="content">
      <text
        v-if="!DatalIST.length"
        style="font-size: 16px; margin: 20px 30%"
        >暂无数据，请添加</text
      >
      <view
        class="listMain"
        :style="'height:' + (h - 240) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in DatalIST"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark"></view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationName }}</view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, toRefs, reactive, nextTick, watch } from 'vue'
import {
  onLoad,
  onShow,
  onUnload,
  onHide,
  onBackPress,
  onReachBottom,
  onPullDownRefresh
} from '@dcloudio/uni-app'
import { ProudctList } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('成品入库')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const PUTDetail = ref('')
const DatalIST = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
})
onUnload(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
onHide(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
onBackPress(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  PUTDetail.value = JSON.parse(option.inWareProdcut) // 详情参数字符串转对象
  ProductInList()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//获取已入库列表
const ProductInList = () => {
  uni.showLoading({
    title: '加载中'
  })
  ProudctList({
    Conditions: `PID=${PUTDetail.value.MID} && cInvCode=${PUTDetail.value.cInvCode}`,
    OrderByFileds: 'utfs'
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      DatalIST.value = res.data
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value
      })
    }
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // if (current.value == 1) {
  // 	currentPage.value = 1
  // 	total.value = 0
  // 	DJliST.value = []
  // 	GetPageList()
  // }
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // // console.log('上拉');
  // if (current.value == 1) {
  // 	currentPage.value++
  // 	if (currentPage.value > pageTotal.value) {
  // 		more.value = 'no-more'
  // 	} else {
  // 		GetPageList()
  // 	}
  // }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;
  .HeadTop {
    font-size: 14px;
    margin: 5px 10px;
    .text {
      padding: 5px 0;
    }
  }
  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .headSty {
    width: 100%;
    height: 100%;

    // display: flex;
    .RUtext {
      margin-top: 10px;
      width: 100px;
      padding: 3px;
      text-align: center;
      border: 1px solid gray;
      // border-radius: 10px;
    }

    .line {
      // height: 1px;
      width: 100%;
      border: 1px solid gray;
      // margin-top: 10px;
    }
  }

  .content {
    width: 100%;
    font-size: 12px;

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .project {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;
        padding-bottom: 10px;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;

          .mini-btn {
            margin-left: 60rpx;
          }
        }

        .four-btn {
          display: flex;
          margin: 10px;
        }
      }
    }
  }

  .BTN {
    text-align: center;
    justify-content: space-between;
    margin: 10px 0;

    .mini-btn {
      margin: 0 10px;
    }
  }
}
</style>
