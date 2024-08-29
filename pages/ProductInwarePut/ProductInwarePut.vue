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
    <view style="display: flex; align-items: center; margin-left: 10px">
      <view style="display: flex; align-items: center; justify-content: flex-start">
        <view style="width: 40px">仓库:</view>
        <view style="width: 160px">
          <!-- 搜索框 -->
          <uni-section
            v-if="branch != 'alps'"
            title=""
            type="line"
          >
            <uni-search-bar
              radius="100"
              cancelButton="none"
              :focus="focusType"
              @blur="setfocus"
              @confirm="getWares"
              v-model="WsearchValue"
              placeholder="请输入仓库编码"
            >
            </uni-search-bar>
          </uni-section>
          <input
            v-else
            class="inputSty"
            :disabled="disabled"
            v-model="WsearchValue"
            @input="getWares"
            :focus="focusType"
            @blur="setfocus"
            placeholder="请扫描仓库"
            placeholder-style="font-size:12px"
          />
        </view>
        <!-- 	<view style="width: 80px;">
					<button class="mini-btn" type="warn" size="mini" @click="ClearInput">重置</button>
				</view> -->
      </view>
      <view class="demo-uni-col dark">{{ WareName }}</view>
    </view>
    <view class="headSty">
      <view class="RUtext">入库通知单</view>
      <view class="line"></view>
    </view>
    <!-- 通知单 -->
    <view
      class="search-wl"
      style="display: flex; align-items: center"
    >
      <!-- 搜索框 -->
      <input
        class="inputSty"
        v-model="InfosearchValue"
        placeholder="请输入通知单"
        placeholder-style="font-size:12px"
      />
      <button
        class="mini-btn"
        style="
          color: black;
          backgroundcolor: #e8e873;
          bordercolor: #e8e873;
          width: 20%;
          height: 30px;
        "
        type="warn"
        size="mini"
        @click="getSearch"
      >
        搜索
      </button>
    </view>
    <view class="content">
      <view class="listMain">
        <scroll-view
          :style="'height:' + (h - 240) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view
            class="project"
            v-for="(item, index) in PDAInWareList"
            :key="index"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">通知单号：{{ item.cCode }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">部门：{{ item.cDepCode }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark"></view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                    size="mini"
                    @click="GetDetail(item, index)"
                  >
                    详情
                  </button>
                </view>
              </uni-col>
            </uni-row>
          </view>
          <uni-load-more
            :status="more"
            v-if="PDAInWareList.length"
          ></uni-load-more>
        </scroll-view>
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
import { GetWare, ProudctInWareList } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import loginVue from '../login/login.vue'
let branch = ref()
const title = ref('成品入库')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true) //仓库输入框聚焦
const disabled = ref(false) //仓库
const WsearchValue = ref('') //仓库
const WareName = ref('') //仓库名称
const InfosearchValue = ref('') //通知单
const PDAInWareList = ref([]) //入库列表
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
  setfocus()
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
})
//仓库聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//获取仓库
const getWares = _.debounce(async () => {
  uni.showLoading({
    title: '加载中'
  })
  const res = await GetWare({
    Conditions: `cWareHouseCode=${WsearchValue.value}`,
    OrderByFileds: 'utfs'
  })
  if (res.status == 200) {
    if (res.data.length) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      WareName.value = res.data[0].cWareHouseName
      disabled.value = true
      GetList()
    } else {
      uni.showToast({
        icon: 'none',
        title: '仓库错误，请重新扫描'
      })
      WsearchValue.value = ''
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}, 500)
//仓库列表
const GetList = async () => {
  uni.showLoading({
    title: '加载中'
  })
  PDAInWareList.value = []
  const res = await ProudctInWareList({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: InfosearchValue.value
      ? `cInWareHouseCode=${WsearchValue.value} && cCode=${InfosearchValue.value}`
      : `cInWareHouseCode=${WsearchValue.value}`
  })
  if (res.status == 200) {
    InfosearchValue.value = ''
    uni.hideLoading()
    uni.stopPullDownRefresh()
    PDAInWareList.value = [...PDAInWareList.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}
//搜索通知单
const getSearch = async () => {
  GetList()
}
//详情按钮
const GetDetail = (i, index) => {
  let DetailInfo = JSON.stringify(i) // 这里转换成 字符串
  uni.navigateTo({
    url: '/pages/ProductInwarePut/ProductDetail/ProductDetail?DetailInfo=' + DetailInfo
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  PDAInWareList.value = []
  GetList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    GetList()
  }
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

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .headSty {
    width: 100%;
    height: 100%;

    // display: flex;
    .RUtext {
      margin: 0 auto;
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
    margin: 10px 0;
  }
}
</style>
