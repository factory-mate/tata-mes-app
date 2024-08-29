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
      @clickRight="clickRight"
    />
    <view class="wu-detail">
      <view class="wahouse">
        仓库：
        <text>{{ wuVal.cWhName }}</text>
      </view>
      <view class="wastation">
        库位：
        <text>{{ wuVal.cPosCode }}</text>
      </view>
    </view>
    <view class="project">
      <uni-row class="demo-uni-row">
        <uni-col :span="12">
          <view class="demo-uni-col dark">条码：</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col light">{{ wuVal.Pbarcode }}</view>
        </uni-col>
      </uni-row>
      <!-- <uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view class="demo-uni-col dark">物料名称：</view>
				</uni-col>
				<uni-col :span="12">
					<view class="demo-uni-col light">{{wuVal.cposname}}</view>
				</uni-col>
			</uni-row> -->
      <uni-row class="demo-uni-row">
        <uni-col :span="12">
          <view class="demo-uni-col dark">物流商</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col light">{{ wuVal.cLogisticsName }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row">
        <uni-col :span="12">
          <view class="demo-uni-col dark">发货批号：</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col light">{{ wuVal.SendBatch }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row">
        <uni-col :span="12">
          <view class="demo-uni-col dark">订单号：</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col light">{{ wuVal.cCode }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row">
        <uni-col :span="12">
          <view class="demo-uni-col dark">扫描时间</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col light">{{ wuVal.KFInScanTime }}</view>
        </uni-col>
      </uni-row>
    </view>

    <view class="button-wl">
      <!-- <button
        class="canel-btn"
        plain="true"
        @click="DelWu"
      >
        删除
      </button> -->
      <button
        class="confirm-btn"
        type="primary"
        @click="goBack"
      >
        返回
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import _ from 'lodash'
import { getWLInfo, deleteScanInfo } from '../../../../api/inStorage.js'
const nvueWidth = ref('730')
import { onLoad } from '@dcloudio/uni-app'
const title = ref('物料详情')
const type = ref(null)
const branch = ref('')
const wuVal = ref({})

onLoad((option) => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  type.value = JSON.parse(option.data).type
  wuInfo(option.data)
})

// 物料信息
const wuInfo = (data) => {
  const val = {
    ctype: 4
  }
  // 接口数据
  getWLInfo({ ...val, ...JSON.parse(data) }).then((res) => {
    if (!res.success) {
      uni.showToast({
        title: res.msg
      })
    } else {
      wuVal.value = res.data
    }
  })
}

const DelWu = () => {
  uni.showModal({
    content: '确认删除?',
    success: function (res) {
      if (res.confirm) {
        deleteScanInfo([wuVal.value.Pbarcode], type.value).then((res1) => {
          if (res1.success) {
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
            // uni.navigateTo({
            // 	url: '/pages/StorageOut/pages/inWare/inWare?type='+type.value
            // })
            uni.navigateBack({
              delta: 1
            })
          } else {
            uni.showToast({
              title: res1.msg,
              icon: 'error'
            })
          }
        })
      }
    }
  })
}

//已扫描跳转至扫描列表（未入库）
const clickRight = () => {
  uni.navigateTo({
    url: '/pages/inStorage/pages/components/scanWulIst/scanWulIst'
  })
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
//确认后返回已扫描物料列表
const goBack = () => {
  // uni.navigateTo({
  // 	url: '/pages/StorageOut/pages/inWare/inWare?type='+type.value
  // })
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  background: #fff;
  padding-bottom: 10rpx;
  //物料详情
  .wu-detail {
    border-bottom: 1px solid #bbb;
    font-size: 40rpx;
    margin: 20rpx;
    background: #fff;
    .wahouse {
      padding: 20rpx;
    }
    .wastation {
      padding: 20rpx;
    }
  }

  .project {
    background: #fff;
    font-size: 12px;
    margin: 20rpx;
    .demo-uni-row {
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
    }
  }

  //底部按钮
  .button-wl {
    width: 100%;
    position: absolute;
    bottom: 70rpx;
    .canel-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
    }
    .confirm-btn {
      border-radius: 60rpx;
      margin: 20rpx;
      background: red;
    }
  }
}
</style>
