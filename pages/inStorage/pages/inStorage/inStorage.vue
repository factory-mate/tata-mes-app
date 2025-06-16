<template>
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      rightText="已扫描"
      title="物料信息"
      @clickLeft="clickLeft"
      @clickRight="clickRight"
    />
    <view class="search-wl">
      <up-input
        class="inputSty"
        prefixIcon="scan"
        v-model="searchValue"
        :focus="focusType"
        @confirm="scanWL"
        placeholder="请扫描物料条码"
        clearable
      />
    </view>
    <view class="wu-detail">
      <view class="wu-fir">
        <view class="wahouse">
          仓库：
          <text>{{ detailMsg.cWhName }}</text>
        </view>
        <view class="wastation">
          库位：
          <text>{{ detailMsg.cPosCode }}</text>
        </view>
      </view>
      <view class="project">
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">条码：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.Pbarcode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">单号：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.cCode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">物流商：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.cLogisticsName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">发货批号：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.SendBatch }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">订单号：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.Pbarcode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">扫描时间：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.ScanTime }}</view>
          </uni-col>
        </uni-row>
      </view>
    </view>
  </view>
</template>

<script setup>
import { time } from '@/utils/time.js'
import { ref } from 'vue'
import permision from '@/common/permission.js'
import _ from 'lodash'
import { onLoad, onShow, onUnload, onHide, onBackPress } from '@dcloudio/uni-app'
import { getWLInfo, getInfoList, errLog } from '@/api/inStorage.js'

const focusType = ref(true)
const searchValue = ref('')
const detailMsg = ref({})
const wuList = ref([])
const isScanning = ref(false)

const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}

// 返回
const clickLeft = () => {
  if (wuList.value.length) {
    uni.showModal({
      content: '已扫描条码未入库，确认退出？',
      success: function (res) {
        if (res.confirm) {
          uni.navigateBack({ delta: 1 })
          uni.removeStorageSync('wuList')
        }
      }
    })
  } else {
    uni.navigateBack({ delta: 1 })
    uni.removeStorageSync('wuList')
  }
}

//已扫描跳转
const clickRight = () =>
  uni.navigateTo({
    url: '/pages/inStorage/pages/components/scanWulIst/scanWulIst'
  })

const scanWL = async () => {
  if (!searchValue.value) {
    uni.showToast({
      icon: 'error',
      title: '请扫描物料条码'
    })
    setfocus()
    return
  }

  if (isScanning.value) {
    uni.showToast({
      icon: 'error',
      title: '服务器正在处理数据'
    })
    setfocus()
    return
  }

  if (wuList.value.length) {
    if (wuList.value.some((item) => item.Pbarcode == searchValue.value)) {
      uni.showModal({
        showCancel: false,
        content: searchValue.value + '已存在'
      })
      searchValue.value = ''
      setfocus()
      return
    }
  }

  uni.showLoading({
    title: '加载中'
  })

  isScanning.value = true

  try {
    const WLMsg = await getWLInfo({ pbarcode: searchValue.value })
    if (!WLMsg.data) {
      uni.showToast({
        icon: 'error',
        title: '条码数据不正确'
      })
      uni.hideLoading()
      isScanning.value = false
      setfocus()
      return
    }
    if (wuList.value.length > 0) {
      if (wuList.value[0].cPosCode !== WLMsg.data.cPosCode) {
        uni.showModal({
          showCancel: false,
          content: `当前条码库位号(${WLMsg.data.cPosCode})和之前的库位号(${wuList.value[0].cPosCode})不一致，无法录入`
        })
        uni.hideLoading()
        isScanning.value = false
        setfocus()
        return
      }
    }
    if (WLMsg.data.InType === '已入库') {
      uni.showToast({
        icon: 'none',
        title: '该条码已入库，不能重复入库'
      })
      uni.hideLoading()
      isScanning.value = false
      setfocus()
      return false
    }
    if (WLMsg.success) {
      WLMsg.data.ScanTime = time()
      detailMsg.value = WLMsg.data || {}
      uni.showToast({
        icon: 'none',
        title: `扫描成功：${detailMsg.value.Pbarcode}`
      })
      wuList.value.unshift(detailMsg.value)
      console.log(uni.getStorageSync('wuList'), 'wuList')
      console.log(wuList.value, 'wuList')
      uni.setStorageSync('wuList', JSON.stringify(wuList.value))
    } else {
      uni.showModal({
        showCancel: false,
        content: WLMsg.msg
      })
    }
  } catch {
    //
  }
  searchValue.value = ''
  uni.hideLoading()
  isScanning.value = false
  setfocus()
}

onShow(() => {
  setfocus()
  if (uni.getStorageSync('wuList')) {
    wuList.value = JSON.parse(uni.getStorageSync('wuList')) ?? []
  } else {
    wuList.value = []
  }
})

onLoad(() => {})
onUnload(() => {})
onHide(() => {})
onBackPress(() => {})
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .search-wl {
    text-align: center;
    margin: 30rpx 0;
    border-bottom: 1px solid #bbb;
  }

  .wu-detail {
    margin: 20rpx;

    .wu-fir {
      border-bottom: 1px solid #bbb;
      font-size: 40rpx;
      background: #fff;
      padding: 20rpx;

      .wahouse {
        margin: 20rpx 10rpx;
      }

      .wastation {
        margin: 20rpx 10rpx;
      }
    }

    .project {
      background: #fff;
      font-size: 12px;
      margin: 20rpx 0;

      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
      }
    }
  }
}
</style>
