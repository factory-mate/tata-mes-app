<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { RepairVouchGetDetail } from '@/api/PDA.js'

const height = ref(getDeviceHeight().totalHeight)
const UID = ref('')
const detail = ref({})
const currentTabIndex = ref(0)

const getDetail = async () => {
  uni.showLoading({ title: '加载中' })
  const { data, success } = await RepairVouchGetDetail({
    UID: detail.value.UID
  })
  console.log(data, success)
  uni.hideLoading()
}

const onClickTabItem = (item) => {
  currentTabIndex.value = item.index
}

onLoad((option) => {
  if (option.itemInfo) {
    detail.value = JSON.parse(option.itemInfo)
    console.log(detail.value)
  }
})

onShow(() => getDetail())
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="返修任务详情"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />
    <up-tabs
      :list="[{ name: '返修详情' }, { name: '返修工艺' }]"
      :scrollable="false"
      :current="currentTabIndex"
      @click="onClickTabItem"
    ></up-tabs>
    <view
      class="baseInfo"
      v-if="currentTabIndex === 0"
    >
      <text style="color: blue; font-size: 18px">基本信息</text>
      <view class="info">
        <uni-row class="demo-uni-row">
          <uni-col :span="10">
            <view class="demo-uni-col dark">申报人：{{ detail.max_Error_dReportPerson }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">生产编号：{{ detail.cCode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">产品名称：{{ detail.cInvName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">生产日期：{{ detail.dProductDate }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark"
              >产品类型：{{ detail.PACKAGEVOUCH_S_cDefindParm01 }}
            </view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="10">
            <view class="demo-uni-col dark">线内序号：{{ detail.iIndxs }}</view>
          </uni-col>
          <uni-col :span="10">
            <view class="demo-uni-col dark">序号：{{ detail.iOrderIndex }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="10">
            <view class="demo-uni-col dark">材质：{{ detail.cDefindParm01 }}</view>
          </uni-col>
          <uni-col :span="10">
            <view class="demo-uni-col dark">AB面：{{ detail.cDefindParm05 }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark"
              >尺寸：{{ detail.X }} *{{ detail.Y }}*{{ detail.Z }}
            </view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">描述：{{ detail.cMemo }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">返修原因：{{ detail.cMemo }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">返修类型：{{ detail.cMemo }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">返修备注：{{ detail.cMemo }}</view>
          </uni-col>
        </uni-row>
      </view>
    </view>

    <view v-else> </view>
  </view>
</template>
