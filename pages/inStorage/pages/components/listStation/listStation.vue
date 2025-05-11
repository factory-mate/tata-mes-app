<template>
  <view class="bgc">
    <uni-nav-bar
      class="nav-bar"
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
      right-icon="home"
      @clickRight="clickHome"
    />
    <view class="newsBox">
      <uni-section
        title=""
        type="line"
      >
        <uni-segmented-control
          class="button"
          :current="current"
          :values="items"
          :style-type="styleType"
          :active-color="activeColor"
          @clickItem="onClickItem"
        />
        <view class="head-text">
          <view class="st-two">
            <view class="wahouse">
              仓库：
              <text v-if="current === 0">{{
                scanList.length != 0 ? scanList[0].cWhName : ''
              }}</text>
              <text v-else>{{ ListData.length != 0 ? ListData[0].cWhName : '' }}</text>
            </view>
            <view
              v-if="current === 0"
              class="unit"
              >总数：{{ Ytotal }}</view
            >
            <view
              v-if="current === 1"
              class="unit"
              >已入：{{ palnList }}/{{ Ktotal }}</view
            >
          </view>
          <view class="wastation">
            库位：
            <text v-if="current === 0">{{ scanList.length != 0 ? scanList[0].cPosCode : '' }}</text>
            <text v-else>{{ ListData.length != 0 ? ListData[0].cPosCode : '' }}</text>
            <text v-if="current == 1">
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
            </text>
          </view>

          <!-- 分割线 -->
          <view class="color"> </view>
        </view>
        <view class="content">
          <view
            v-if="current === 0"
            class="listCon"
          >
            <scroll-view
              scroll-y="true"
              lower-threshold="50"
              show-scrollbar="true"
              @scrolltolower="scrolltolower"
              :style="'height:' + (h - 400) + 'px'"
            >
              <view
                class="scan-list"
                v-for="(item, index) in scanList"
                :key="index"
              >
                <uni-swipe-action>
                  <uni-swipe-action-item
                    :right-options="options"
                    @click="onClick(item.Pbarcode)"
                    @change="change"
                  >
                    <view class="index-demo">
                      <view class="total">{{ index + 1 }}</view>
                    </view>

                    <view class="project">
                      <uni-row class="demo-uni-row">
                        <uni-col :span="12">
                          <view class="demo-uni-col dark"
                            >单号：<text>{{ item.cCode }}</text>
                          </view>
                        </uni-col>
                        <uni-col :span="12">
                          <view class="demo-uni-col light"
                            >时间：<text>{{ item.ScanTime }}</text>
                          </view>
                        </uni-col>
                      </uni-row>
                      <uni-row class="demo-uni-row">
                        <uni-col :span="12">
                          <view class="demo-uni-col dark"
                            >单内序号：<text>{{ item.ProductIndex }}</text>
                          </view>
                        </uni-col>
                        <uni-col :span="12">
                          <view class="demo-uni-col light"
                            >包号：<text>{{ item.Pbarcode }}</text>
                          </view>
                        </uni-col>
                      </uni-row>
                      <uni-row class="demo-uni-row">
                        <uni-col :span="12">
                          <view class="demo-uni-col dark"
                            >发货批号：<text>{{ item.SendBatch }}</text>
                          </view>
                        </uni-col>
                        <uni-col :span="12">
                          <view class="demo-uni-col light"
                            >仓位：<text>{{ item.cPosCode }}</text>
                          </view>
                        </uni-col>
                      </uni-row>
                    </view>
                  </uni-swipe-action-item>
                </uni-swipe-action>
              </view>
              <uni-load-more
                :status="moreList"
                v-if="scanList.length"
              ></uni-load-more>
            </scroll-view>
          </view>
          <view
            v-if="current === 1"
            class="listCon"
          >
            <scroll-view
              scroll-y="true"
              lower-threshold="50"
              show-scrollbar="true"
              @scrolltolower="scrolltolower"
              :style="'height:' + (h - 250) + 'px'"
            >
              <view
                class="scan-list"
                v-for="(item, index) in ListData"
                :key="index"
              >
                <uni-swipe-action>
                  <uni-swipe-action-item>
                    <view class="index-demo">
                      <view class="total">{{ index + 1 }}</view>
                    </view>

                    <view class="project">
                      <uni-row class="demo-uni-row">
                        <uni-col :span="12">
                          <view class="demo-uni-col dark"
                            >单号：<text>{{ item.cCode }}</text>
                          </view>
                        </uni-col>
                        <!---------------------- 这里要做一个入库状态判断---------------- -->
                        <uni-col :span="12">
                          <view class="demo-uni-col light"
                            >状态：
                            <text
                              v-if="item.InType == '未入库'"
                              style="color: red"
                              >{{ item.InType }}</text
                            >
                            <text
                              v-if="item.InType == '已入库'"
                              style="color: green"
                              >{{ item.InType }}</text
                            >
                          </view>
                        </uni-col>
                      </uni-row>
                      <uni-row class="demo-uni-row">
                        <uni-col :span="12">
                          <view class="demo-uni-col dark"
                            >单内序号：<text>{{ item.ProductIndex }}</text>
                          </view>
                        </uni-col>
                        <uni-col :span="12">
                          <view class="demo-uni-col light"
                            >包号：<text>{{ item.Pbarcode }}</text>
                          </view>
                        </uni-col>
                      </uni-row>
                      <uni-row class="demo-uni-row">
                        <uni-col :span="12">
                          <view class="demo-uni-col dark"
                            >发货批号：<text>{{ item.SendBatch }}</text>
                          </view>
                        </uni-col>
                        <uni-col :span="12">
                          <view class="demo-uni-col light"
                            >仓位：<text>{{ item.cPosCode }}</text>
                          </view>
                        </uni-col>
                      </uni-row>
                    </view>
                  </uni-swipe-action-item>
                </uni-swipe-action>
              </view>
              <uni-load-more
                :status="more"
                v-if="ListData.length"
              ></uni-load-more>
            </scroll-view>
          </view>
        </view>
      </uni-section>
    </view>
    <view class="bot-btm">
      <view
        class="button-wl"
        v-if="current == 0"
      >
        <view v-if="scanList.length != 0">
          <button
            class="canel-btn"
            plain="true"
            @click="clearList"
          >
            清空
          </button>
          <button
            class="put-btn"
            type="primary"
            @click="putWare"
          >
            提交入库
          </button>
        </view>
        <view v-if="scanList.length == 0">
          <button
            class="put-btn"
            type="primary"
            @click="goScan"
          >
            扫描物料条码
          </button>
        </view>
      </view>
      <view
        class="button-rr"
        v-if="current == 1"
      >
        <!-- <button class="no-more">没有更多</button> -->
      </view>
    </view>
  </view>
</template>
<script setup>
import { TimeCha } from '@/utils/time.js'
import { reactive, ref } from 'vue'
import _ from 'lodash'
import {
  onLoad,
  onShow,
  onUnload,
  onHide,
  onBackPress,
  onPullDownRefresh,
  onReachBottom
} from '@dcloudio/uni-app'
import {
  getScanInfo,
  getInfoList,
  deleteScanInfo,
  getStationInfo,
  putRuKU,
  CleartAll,
  errLog
} from '../../../../../api/inStorage.js'
const title = ref('库位列表')
const moreList = ref('no-more')
const more = ref('more')
const Ypage = ref(1)
const YpageSize = ref(5)
const YpageTotal = ref(0)
const Ytotal = ref(0)
const Kpage = ref(1)
const KpageSize = ref(5)
const KpageTotal = ref(0)
const Ktotal = ref(0)
//计划入库列表数据
let ListData = ref([])
//已扫描列表数据
let scanList = ref([])
const kuCodeValue = ref('')
//页面高度
const h = ref('100')
const kuCode = ref('')
let list = []
const timeVal = ref('')
//加载页面传过来的数据（计划入库数据）
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  kuCode.value = option.code
  getInfoListAxios()
})

//时间
const TimeData = () => {
  var date, year
  var d = new Date()
  year = d.getYear() < 1900 ? 1900 + d.getYear() : d.getYear()
  date =
    '【--当前时间】：' +
    (d.getMonth() + 1) +
    '月' +
    d.getDate() +
    '日 ' +
    d.getHours() +
    '时' +
    d.getMinutes() +
    '分' +
    d.getSeconds() +
    '秒'
  return date
}
const getInfoListAxios = _.debounce(() => {
  timeVal.value = new Date()

  // uni.showLoading({
  // 	title: '加载中'
  // });
  scanList.value = uni.getStorageSync('wuList') ? JSON.parse(uni.getStorageSync('wuList')) : []
  Ytotal.value = scanList.value.length

  // uni.stopPullDownRefresh()
  // uni.hideLoading()
}, 0)
//计划入库
const AjaxRuKU = _.debounce(() => {
  timeVal.value = new Date()

  uni.showLoading({
    title: '加载中'
  })
  getStationInfo({
    PageIndex: Kpage.value,
    PageSize: KpageSize.value,
    OrderByFileds: 'InType,KFInScanTime desc',
    Conditions: 'cPosCode = ' + kuCode.value
  })
    .then((res) => {
      if (res.status == '200') {
        if (TimeCha(timeVal.value).m >= 5) {
          errLog({
            Messege: '【入库-库位-计划入库-加载成功】' + TimeData() + TimeCha(timeVal.value).data
          })
        }
        uni.hideLoading()
        uni.stopPullDownRefresh()
        ListData.value = [...ListData.value, ...res.data.data]
        Ktotal.value = res.data.dataCount
        KpageTotal.value = res.data.pageCount
        palnList.value = res.data.InCount //已入
        if (TimeCha(timeVal.value).m >= 5) {
          errLog({
            Messege: '【入库-库位-计划入库-渲染成功】' + TimeData() + TimeCha(timeVal.value).data
          })
        }
        //已入库数据
        // palnList = ListData.value.filter(item => {
        // 	return item.InType === '已入库'
        // })
      } else {
        if (TimeCha(timeVal.value).m >= 5) {
          errLog({
            Messege: '【入库-库位-计划入库-加载失败】' + TimeData() + TimeCha(timeVal.value).data
          })
        }
        uni.hideLoading()
        uni.showModal({
          showCancel: false,
          // title: '提示',
          content: res.RspMsg,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    .finally(() => uni.hideLoading())
}, 0)

// 下拉
onPullDownRefresh(() => {
  if (current.value == 0) {
    Ypage.value = 1
    scanList.value = []
    getInfoListAxios()
  }
  if (current.value == 1) {
    Kpage.value = 1
    ListData.value = []
    AjaxRuKU()
  }
})
//上拉
const scrolltolower = () => {
  console.log('上拉')
  if (current.value == 0) {
    moreList.value = 'loading'
    Ypage.value++
    if (Ypage.value > YpageTotal.value) {
      moreList.value = 'no-more'
    } else {
      getInfoListAxios()
    }
  }
  if (current.value == 1) {
    more.value = 'loading'
    Kpage.value++
    if (Kpage.value > KpageTotal.value) {
      more.value = 'no-more'
    } else {
      AjaxRuKU()
    }
  }
}

const clickHome = () => {
  if (scanList.value.length) {
    uni.showModal({
      content: '已扫描条码未入库，确认退出？',
      success: function (res) {
        if (res.confirm) {
          uni.switchTab({
            url: '/pages/tabbar/workHome/index'
          })
          uni.removeStorageSync('wuList')
        } else if (res.cancel) {
        }
      }
    })
  } else {
    uni.switchTab({
      url: '/pages/tabbar/workHome/index'
    })
    uni.removeStorageSync('wuList')
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
//滑动删除
const options = [
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  }
]
const onClick = _.debounce((val) => {
  uni.showModal({
    // title: '提示',
    content: '确认删除？',
    success: function (res) {
      if (res.confirm) {
        deleteScanInfo([val], 1).then((res) => {
          if (res.success) {
            uni.showToast({ title: '删除成功' })
            //再次获取已扫描列表，刷新 数据页面
            Ypage.value = 1
            scanList.value = []
            getInfoListAxios()
          } else {
            uni.showToast({ title: '删除失败' })
          }
        })
      }
    }
  })
}, 500)
const change = (e) => {
  console.log(e)
}
//切换按钮设置
const items = reactive(['已扫描', '计划入库'])
const styles = reactive([
  {
    value: 'button',
    text: '按钮',
    checked: true
  },
  {
    value: 'text',
    text: '文字'
  }
])
const colors = ref('#000000')
const current = ref(0)
const colorIndex = ref(0)
const activeColor = ref('red')
const styleType = ref('button')
//已入库
let palnList = ref(0)
//点击按钮切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 1) {
    Kpage.value = 1
    ListData.value = []
    AjaxRuKU()
  } else {
    Ypage.value = 1
    scanList.value = []
    getInfoListAxios()
  }
}

const styleChange = (e) => {
  if (styleType.value !== e.detail.value) {
    styleType.value = e.detail.value
  }
}
const colorChange = () => {
  if (styleType.value !== e.detail.value) {
    activeColor.value = e.detail.value
  }
}

//提交入库（已扫描数据）
const putWare = _.debounce(() => {
  timeVal.value = new Date()
  uni.showModal({
    // title: '提示',
    content: '确认提交入库',
    success: function (res) {
      if (res.confirm) {
        const data = {
          cPosCode: kuCode.value,
          mScans: scanList.value
        }
        putRuKU(data).then((res) => {
          if (res.success) {
            uni.showModal({
              showCancel: false,
              // title: '提示',
              content: res.data[0]
            })
            Ypage.value = 1
            scanList.value = []
            uni.removeStorageSync('wuList')
            // getInfoListAxios()
          } else {
            uni.showModal({
              showCancel: false,
              // title: '提示',
              content: res.msg || '入库失败'
            })
          }
        })
      } else if (res.cancel) {
        uni.showModal({
          showCancel: false,
          // title: '提示',
          content: '取消提交'
        })
      }
    }
  })
}, 500)
//清空
const clearList = _.debounce(() => {
  timeVal.value = new Date()

  //拿取编码，提交清空
  uni.showModal({
    // title: '提示',
    content: '确认全部清空？',
    success: function (res) {
      if (res.confirm) {
        scanList.value = []
        uni.removeStorageSync('wuList')
        uni.showToast({
          title: '确认清空'
        })
      } else if (res.cancel) {
        uni.showToast({
          title: '取消清空'
        })
      }
    }
  })
}, 500)
//清空物料列表后，返回输入/扫描页面
const goScan = () => {
  uni.navigateTo({
    url: '/pages/inStorage/pages/inStorage/inStorage'
  })
}
</script>

<style lang="scss" scoped>
.bgc {
  .newsBox {
    padding: 20rpx;

    .head-text {
      font-size: 40rpx;
      margin: 20rpx;
      border-bottom: 1px solid #bbb;

      .st-two {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .wahouse {
          padding: 20rpx;
        }

        .unit {
        }
      }

      .wastation {
        padding: 20rpx;
      }
    }

    .content {
      .listCon {
        overflow-y: auto;

        .scan-list {
          border: 1px solid #bbb;
          border-radius: 4px;
          margin-bottom: 20rpx;

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
        }

        .project {
          font-size: 12px;
          padding: 0 10rpx 10rpx 10rpx;

          // padding: 20rpx;
          .demo-uni-row {
            display: flex;
            justify-content: space-between;
            padding: 10rpx 20rpx;
          }
        }
      }
    }
  }

  .bot-btm {
    width: 100%;
    // position: relative;
    // bottom: 0;

    //底部按钮
    .button-wl {
      .canel-btn {
        border-radius: 60rpx;
        margin-bottom: 10rpx;
        margin: 20rpx;
      }

      .put-btn {
        border-radius: 60rpx;
        margin: 20rpx;
        background: red;
      }

      .no-more {
        height: 200rpx;
        line-height: 200rpx;
        font-size: 36rpx;
        text-align: center;
      }
    }
  }
}
</style>
