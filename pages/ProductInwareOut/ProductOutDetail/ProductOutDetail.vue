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
      <view class="RUtext">待出库产品</view>
      <view class="line"></view>
    </view>
    <view class="content">
      <view class="listMain">
        <view
          class="project"
          v-for="(item, index) in DetailList"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">产品编码：{{ item.cInvCode }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
            </uni-col>
            <uni-col :span="10">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                  size="mini"
                  @click="OutInware(item, index)"
                >
                  下架
                </button>
              </view>
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
import { ProudctOutDetail } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('销售出库')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const detailData = ref({})
const itemUID = ref('')
const DetailList = ref([])
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
  detailData.value = JSON.parse(option.detail)
  itemUID.value = JSON.parse(option.detail).UID
  OutDetailList()
})
const keypress = (e) => {
  console.log(e, '按键码')
}
//出库信息详情
const OutDetailList = () => {
  uni.showLoading({
    title: '加载中'
  })
  ProudctOutDetail({
    val: itemUID.value
  }).then((res) => {
    if (res.status == 200) {
      DetailList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value
      })
    }
  })
}
//下架按钮
const OutInware = (i, index) => {
  let OutItem = JSON.stringify(i) // 这里转换成 字符串
  uni.navigateTo({
    url: '/pages/ProductInwareOut/ProductOut/ProductOut?OutItem=' + OutItem
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

  .headSty {
    width: 100%;
    height: 100%;
    // display: flex;
    margin-top: 10px;

    .RUtext {
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
}
</style>
