<template>
  <view class="changeList">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      title="已扫描列表"
      @clickLeft="clickLeft"
      right-icon="home"
      @clickRight="clickHome"
    />
    <view class="head-text">
      <view class="st-two">
        <view class="wahouse">
          仓库：
          <text>{{ ListData.length != 0 ? ListData[0].cWhName : '' }}</text>
        </view>
        <view class="unit">总数：{{ ListData.length }}</view>
      </view>
      <view class="wastation">
        库位：
        <text>{{ ListData.length != 0 ? ListData[0].cPosCode : '' }}</text>
        <text
          v-if="ListData.length ? ListData[0].PosTypeName == '待分配' : ''"
          style="color: yellow; float: right"
        >
          {{ ListData.length != 0 ? ListData[0].PosTypeName : '' }}
        </text>
        <text
          v-if="ListData.length ? ListData[0].PosTypeName == '未入库' : ''"
          style="color: red; float: right"
        >
          {{ ListData.length != 0 ? ListData[0].PosTypeName : '' }}
        </text>
        <text
          v-if="ListData.length ? ListData[0].PosTypeName == '部分入库' : ''"
          style="color: orange; float: right"
        >
          {{ ListData.length != 0 ? ListData[0].PosTypeName : '' }}
        </text>
        <text
          v-if="ListData.length ? ListData[0].PosTypeName == '全部入库' : ''"
          style="color: green; float: right"
        >
          {{ ListData.length != 0 ? ListData[0].PosTypeName : '' }}
        </text>
      </view>
    </view>
    <view class="content">
      <up-list
        lower-threshold="50"
        show-scrollbar="true"
        @scrolltolower="scrolltolower"
        :style="'height:' + (h - 330) + 'px'"
      >
        <view
          v-for="(item, index) in ListData"
          :key="index"
          class="listCon"
        >
          <uni-swipe-action class="move-list">
            <uni-swipe-action-item
              :right-options="options"
              @click="onClick(item.PBARCODE)"
            >
              <view class="index-demo">
                <view class="total">{{ index + 1 }}</view>
              </view>

              <view class="project">
                <view class="project-fir">
                  <view>
                    单号：<text>{{ item.cCode }}</text>
                  </view>
                  <view>{{ item.ScanTime }}</view>
                </view>
                <view class="project-sec">
                  <view>
                    单内序号：<text>{{ item.ProductIndex }}</text>
                  </view>
                  <view>
                    包号：<text>{{ item.Pbarcode }}</text>
                  </view>
                </view>
                <view class="project-thre">
                  <view>
                    发货批号：<text>{{ item.SendBatch }}</text>
                  </view>
                  <view>
                    仓位：<text>{{ item.cPosCode }}</text>
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </uni-swipe-action>
        </view>
        <uni-load-more
          v-if="ListData.length"
          :status="more"
        />
      </up-list>
    </view>
    <view class="button-wl">
      <button
        class="canel-btn"
        plain="true"
        @click="DeleteAll"
      >
        清空
      </button>
      <view class="buttSty">
        <uni-section
          title=""
          type="line"
          class="buttInp"
        >
          <up-input
            class="inputSty"
            prefixIcon="scan"
            v-model="searchValue"
            :focus="focusType"
            placeholder="请扫描库位"
          />
        </uni-section>

        <button
          class="scan-btn"
          type="primary"
          @click="getsTATION"
        >
          库位
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { TimeCha } from '@/utils/time.js'
import { ref, nextTick } from 'vue'
import _ from 'lodash'
import permision from '@/common/permission.js'
import { onLoad, onShow, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import {
  deleteScanInfo,
  getStationInfo,
  getInfoList,
  CleartAll,
  putRuKU,
  errLog
} from '@/api/inStorage.js'

const focusType = ref(true)
const options = [
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  }
]

const clickHome = () => {
  if (ListData.value.length) {
    uni.showModal({
      content: '已扫描条码未入库，确认退出？',
      success: function (res) {
        if (res.confirm) {
          uni.switchTab({
            url: '/pages/tabbar/workHome/index'
          })
          uni.removeStorageSync('wuList')
          ListData.value = []
        } else if (res.cancel) {
        }
      }
    })
  } else {
    uni.switchTab({
      url: '/pages/tabbar/workHome/index'
    })
    uni.removeStorageSync('wuList')
    ListData.value = []
  }
}

const clickLeft = () => uni.navigateBack({ delta: 1 })

const onClick = _.debounce((val) => {
  uni.showModal({
    content: '确认删除？',
    success: function (res) {
      if (res.confirm) {
        deleteScanInfo([val], 1).then((res) => {
          if (res.success) {
            uni.showToast({ title: '删除成功' })
            ListData.value = []
            currentPage.value = 1
            listAjaxData()
          } else {
            uni.showToast({
              title: res.RspMsg ?? '删除失败'
            })
          }
        })
      }
    }
  })
}, 300)

//列表数据
const more = ref('no-more')
const pageSize = ref(5)
const currentPage = ref(1)
//总条数
const totalPages = ref(0)
//总页数
const KpageTotal = ref(0)
const ListData = ref([])
//页面高度
const h = ref('100')

const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 500)
}
const listAjaxData = _.debounce(() => {
  uni.showLoading({
    title: '加载中'
  })
  getInfoList({
    ctype: 1,
    cposcode: '',
    PageIndex: currentPage.value,
    RowCount: pageSize.value,
    bUserControl: true
  })
    .then((res) => {
      if (res.success) {
        uni.hideLoading()
        uni.stopPullDownRefresh()
        ListData.value = [...ListData.value, ...res.RspData.Data]
        totalPages.value = res.RspData.AllRowCount
        KpageTotal.value = res.RspData.AllPageCount
      } else {
        uni.hideLoading()
        uni.showToast({ title: '获取数据失败' })
      }
    })
    .finally(() => uni.hideLoading())
}, 0)

onPullDownRefresh(() => {
  currentPage.value = 1
  totalPages.value = 0
  ListData.value = []
  listAjaxData()
})

const scrolltolower = () => {
  // more.value = 'loading'
  // currentPage.value++
  // if (currentPage.value > KpageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	listAjaxData()
  // }
}

//清空
const DeleteAll = _.debounce(() => {
  if (ListData.value.length == 0) return false

  uni.showModal({
    // title: '提示',
    content: '确认全部清空？',
    success: function (res) {
      if (res.confirm) {
        ListData.value = []
        uni.removeStorageSync('wuList')
        uni.showToast({
          title: '确认清空'
        })
      }
    }
  })
}, 300)

const searchValue = ref('')
let detailMsg = ref({
  PBARCODE: '',
  cposcode: '',
  ccode: '',
  cposname: '',
  cWhName: '',
  logisticsname: '',
  scantime: '',
  sendbatch: ''
})
//输入框测试库位
const getsTATION = _.debounce((res) => {
  if (searchValue.value == '') {
    uni.showToast({
      icon: 'none',
      title: '请扫描库位'
    })
    return false
  }
  let lisLen = ListData.value.filter((item) => {
    return item.cPosCode != searchValue.value
  })
  if (lisLen.length) {
    uni.showModal({
      showCancel: false,
      content: searchValue.value + '库位不同，请检查库位！',
      success: function (res) {}
    })
    searchValue.value = ''
  } else {
    uni.navigateTo({
      url: `/pages/inStorage/pages/components/listStation/listStation?code=${searchValue.value}`
    })
    searchValue.value = ''
  }
}, 500)

onShow(() => {
  ListData.value = uni.getStorageSync('wuList') ? JSON.parse(uni.getStorageSync('wuList')) : []
  totalPages.value = ListData.value.length
  setfocus()
})

//加载页面
onLoad((option) => {
  currentPage.value = 1
  // listAjaxData()
  h.value = uni.getSystemInfoSync().windowHeight
})
</script>

<style scoped lang="scss">
.changeList {
  background: #fff;
  padding-bottom: 10rpx;
  position: absolute;
  width: 100%;

  .head-text {
    font-size: 40rpx;
    margin: 20rpx;
    background: #fff;
    border-bottom: 1px solid #bbb;

    .st-two {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .wahouse {
        padding: 20rpx;
      }

      .unit {
        padding-right: 20rpx;
      }
    }

    .wastation {
      padding: 20rpx;
    }
  }

  .content {
    overflow-y: auto;

    .listCon {
      .move-list {
        background: #fff;
        border: 1px solid #bbb;
        border-radius: 4px;
        margin: 20rpx;

        .index-demo {
          width: 0;
          height: 0;
          border-top: 24px solid ghostwhite;
          border-right: 30px solid transparent;
        }

        .total {
          position: absolute;
          top: 0;
          font-size: 12px;
          margin: 2px;
        }

        .project {
          font-size: 12px;
          padding: 0 20rpx 20rpx 10rpx;

          .project-fir {
            display: flex;
            justify-content: space-between;
            margin: 10rpx 0;
          }

          .project-sec {
            display: flex;
            justify-content: space-between;
            margin: 10rpx 0;
          }

          .project-thre {
            display: flex;
            justify-content: space-between;
            margin: 10rpx 0;
          }
        }
      }
    }
  }

  //底部按钮
  .button-wl {
    width: 100%;
    position: absolute;

    .canel-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
    }

    .buttSty {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 30rpx 0 10rpx;

      .buttInp {
        flex: 1;
        margin-top: 0;
      }

      .scan-btn {
        width: 200rpx;
        // height: 60rpx;
        border-radius: 30rpx;
        text-align: center;
        // margin-bottom: 10rpx;
        font-size: 16px;
        // margin:0 20rpx;
        background: red;
      }
    }
  }
}
</style>
