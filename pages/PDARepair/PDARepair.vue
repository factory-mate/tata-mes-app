<template>
  <!-- 设备维修页面 -->
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
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="onClickItem"
        @click="ChangTab"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
        <view
          class="search-wl"
          style="display: flex; align-items: center"
        >
          <up-input
            style="margin-left: 4px"
            v-model="searchValuess"
            placeholder="请输入设备"
          >
            <template #prefix>
              <up-icon
                name="scan"
                color="#dd524d"
                size="28"
                @click="handleCameraScan('1')"
              />
            </template>
          </up-input>

          <button
            class="mini-btn"
            style="
              color: black;
              backgroundcolor: #e8e873;
              bordercolor: #e8e873;
              width: 20%;
              height: 30px;
              margin-left: 4px;
            "
            type="warn"
            size="mini"
            @click="getSearch"
          >
            搜索
          </button>
        </view>
        <uni-icon
          type="scan"
          size="30"
        />
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 200) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in DevList"
              :key="index"
            >
              <view :class="item.iStatusName === '已完成' && 'list-item-success'">
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">任务单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备编码：{{ item.cDeviceCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备名称：{{ item.cDeviceName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">状态：{{ item.iStatusName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">报修人：{{ item.cPARM07 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">设备位置：{{ item.cUsedAddress }}</view>
                  </uni-col>
                </uni-row>
                <view style="display: flex; justify-content: flex-end">
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    :disabled="!(item.iStatus === 0)"
                    @click="goStart(item)"
                  >
                    开始
                  </button>
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    :disabled="!(item.iStatus === 1 || item.iStatus === 2)"
                    @click="goReapir(item)"
                  >
                    维修
                  </button>
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    :disabled="item.iStatus === 3"
                    @click="goClose(item)"
                  >
                    完成
                  </button>
                </view>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </view>
      </view>
      <view v-if="current === 1">
        <view
          class="example-body"
          style="margin: 0 10px"
        >
          <!-- 搜索框 -->
          <uni-datetime-picker
            v-model="Timerange"
            type="daterange"
            @maskClick="maskClick"
          />
        </view>
        <view
          class="search-wl"
          style="display: flex; align-items: center"
        >
          <up-input
            style="margin-left: 4px"
            v-model="searchValuess"
            placeholder="请输入设备"
          >
            <template #prefix>
              <up-icon
                name="scan"
                color="#dd524d"
                size="28"
                @click="handleCameraScan('2')"
              />
            </template>
          </up-input>

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
            @click="getSearchss"
          >
            搜索
          </button>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 220) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in DevList"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">任务单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备编码：{{ item.cDeviceCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备名称：{{ item.cDeviceName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">维修人员：{{ item.cPARM04 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">维修时间：{{ item.dEndTime }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">来源类型：{{ item.cSouceVouchTypeName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">设备位置：{{ item.cUsedAddress }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col light"> 状态：{{ item.iStatusName }} </view>
                  </uni-col>
                  <uni-col :span="12">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="goCheck(item)"
                    >
                      查看
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </view>
      </view>
    </view>

    <uni-popup
      ref="closePopup"
      type="dialog"
    >
      <uni-popup-dialog
        title="您确定要完成吗？"
        message="成功消息"
        :duration="2000"
        :before-close="true"
        @close="onClose"
        @confirm="confirmClose"
        confirmText="确定"
        cancelText="取消"
      ></uni-popup-dialog>
    </uni-popup>
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
import { PDARepairVouch, PDABegin, PDAClose } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const XMfocusType = ref(false)
const title = ref('设备维修')
//输入框值
const xmdis = ref(true)
const disabled = ref(false)
const searchValue = ref() //待点检输入框
const searchValuess = ref() //待点检输入框
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待维修', '已维修'])
const closePopup = ref(null)
const currentItem = ref({})
//日期范围
const Timerange = ref()
//设备列表数据
const DevList = ref([])
const ReadDevList = ref([])
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
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  DevList.value = []
  currentPage.value = 1
  searchValuess.value = ''
  total.value = 0
  if (current.value == 0) {
    GetList()
  } else {
    GetList()
  }
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

const keypress = (e) => {
  console.log(e, '按键码')
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
  }
}
const ChangTab = () => {
  DevList.value = []
  currentPage.value = 1
  searchValuess.value = ''
  total.value = 0
  if (current.value == 0) {
    GetList()
  } else {
    GetList()
  }
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
//日期选中
const maskClick = (e) => {
  console.log(e, '日期====')
}
const BeginTime = ref()
const EndTime = ref()
//获取列表数据
const GetList = () => {
  uni.showLoading({
    title: '加载中'
  })
  let Conditions = current.value == 0 ? 'iStatus in (0,1,2)' : 'iStatus in (3,4)'
  const otherConditions = []
  if (searchValuess.value) {
    otherConditions.push(`cDeviceName like ${searchValuess.value}`)
  }

  otherConditions.forEach((item) => {
    Conditions += ` && ${item}`
  })
  const orderbyfileds = current.value == 0 ? 'iStatus' : 'dEndTime desc'
  PDARepairVouch({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: orderbyfileds,
    Conditions
  }).then((res) => {
    if (res.status == 200) {
      DevList.value = [...DevList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
//搜索
const getSearch = () => {
  currentPage.value = 1
  DevList.value = []
  searchValuess.value = ''
  total.value = 0
  // if (Timerange.value) {
  // 	BeginTime.value = Timerange.value[0]
  // 	EndTime.value = Timerange.value[1]
  // }
  // // GetList()
  uni.showLoading({
    title: '搜索中'
  })

  let Conditions = 'iStatus in (0,1,2)'

  const otherConditions = []
  if (searchValuess.value) {
    otherConditions.push(`cDeviceName like ${searchValuess.value}`)
  }

  otherConditions.forEach((item) => {
    Conditions += ` && ${item}`
  })

  PDARepairVouch({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: 'iStatus',
    Conditions
  }).then((res) => {
    if (res.status == 200) {
      DevList.value = [...DevList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const getSearchss = () => {
  DevList.value = []
  if (Timerange.value) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  uni.showLoading({
    title: '搜索中'
  })
  let Conditions = 'iStatus in (3,4)'

  const otherConditions = []
  if (BeginTime.value) {
    otherConditions.push(`OperateDate>=${BeginTime.value}`)
  }
  if (EndTime.value) {
    otherConditions.push(`OperateDate<=${EndTime.value}`)
  }
  if (searchValuess.value) {
    otherConditions.push(`cDeviceName like ${searchValuess.value}`)
  }

  otherConditions.forEach((item) => {
    Conditions += ` && ${item}`
  })

  PDARepairVouch({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: 'dEndTime desc',
    Conditions
  }).then((res) => {
    if (res.status == 200) {
      DevList.value = [...DevList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}

// 开始
const goStart = (i) => {
  PDABegin({
    val: i.UID
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: res.msg
      })
      // goReapir(i)
      getSearch()
    } else {
      uni.showToast({
        icon: 'none',
        title: '失败'
      })
    }
  })
}
//维修
const goReapir = (i, index) => {
  uni.navigateTo({
    url: '/pages/PDARepair/RepairPage/RepairPage?item=' + encodeURIComponent(JSON.stringify(i))
  })
}
//关闭
const goClose = (i) => {
  closePopup.value.open()
  currentItem.value = i
}

const confirmClose = () => {
  PDAClose({
    cSouceCode: currentItem.value.cSouceCode,
    cSouceVouchTypeCode: currentItem.value.cSouceVouchTypeCode
  })
    .then((res) => {
      if (res.success) {
        uni.showToast({
          icon: 'none',
          title: res.msg,
          duration: 1000
        })
        getSearch()
      } else {
        uni.showToast({
          icon: 'none',
          title: '失败',
          duration: 1000
        })
      }
    })
    .finally(() => {
      closePopup.value.close()
    })
}

const onClose = () => closePopup.value.close()

//查看
const goCheck = (i) => {
  uni.navigateTo({
    url: `/pages/PDARepair/RepairCheck/RepairCheck?item=` + JSON.stringify(i)
  })
}
//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  currentPage.value = 1
  total.value = 0
  DevList.value = []
  GetList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
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

const handleCameraScan = (status) => {
  uni.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log(res)
      if (status === '1') {
        searchValuess.value = res.result
        getSearch()
      } else {
        searchValuess.value = res.result
        getSearchss()
      }
    }
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

  .content {
    width: 100%;
    font-size: 12px;

    .RUDetail {
      padding: 20rpx;

      .demo-uni-col {
        margin: 10rpx;
      }
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .RUlist {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;
        }
      }
    }

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

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;

          .mini-btn {
            margin-left: 60rpx;
          }
        }
      }

      .projects {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 10rpx;
        }
      }
    }

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;

      .mini-btn {
        // position: fixed;
        // bottom: 30rpx;
        // left: 39%;
      }
    }
  }
}

.search-wl {
  .uni-section {
    background-color: none;
    margin-top: 0;

    .uni-searchbar {
      padding: 0;

      ::v-deep .uni-searchbar__box {
        height: 30px !important;
      }
    }
  }
}

.list-item-success {
  background-color: #95ed6b;
}
</style>
