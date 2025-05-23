<script setup>
import { ref } from 'vue'
import { AuthHelperAPI } from '@/services'
import { onShow } from '@dcloudio/uni-app'
import { moduleMap } from '@/features/modules'
import {
  ErrorList,
  getRepairListByUser,
  DeviceList,
  MantainList,
  getRepairList,
  PDARepairVouch
} from '@/api/PDA.js'

const groups = ref([])
const current = ref(0)
const taskNumData = ref([
  { name: '内返PDA', num: 0 },
  { name: '设备报修', num: 0 },
  { name: '自主点检', num: 0 },
  { name: '自主保养', num: 0 },
  { name: '专业点检', num: 0 },
  { name: '专业保养', num: 0 },
  { name: '维修指派', num: 0 },
  { name: '设备维修', num: 0 }
])
const onClickTabItem = ({ currentIndex }) => {
  current.value = currentIndex
  getTaskNum()
}

const onClickModuleItem = (url) => uni.navigateTo({ url })

const getTaskNum = () => {
  // 内返PDA
  ErrorList({
    PageIndex: 1,
    PageSize: 5
  }).then((res) => {
    if (res.success) {
      taskNumData.value[0].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[0].num = 0
    }
  })
  // 设备报修
  getRepairListByUser({
    PageIndex: 1,
    PageSize: 5,
    Conditions: 'iStatus!=4'
  }).then((res) => {
    if (res.success) {
      taskNumData.value[1].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[1].num = 0
    }
  })
  // 自主点检
  DeviceList({
    PageIndex: 1,
    PageSize: 5,
    cVouchTypeCode: '1',
    bEnd: false
  }).then((res) => {
    if (res.success) {
      taskNumData.value[2].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[2].num = 0
    }
  })
  // 专业点检
  DeviceList({
    PageIndex: 1,
    PageSize: 5,
    cVouchTypeCode: '2',
    bEnd: false
  }).then((res) => {
    if (res.success) {
      taskNumData.value[4].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[4].num = 0
    }
  })
  // 自主保养
  MantainList({
    PageIndex: 1,
    PageSize: 5,
    cVouchTypeCode: '1',
    bEnd: false
  }).then((res) => {
    if (res.success) {
      taskNumData.value[3].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[3].num = 0
    }
  })
  // 专业保养
  MantainList({
    PageIndex: 1,
    PageSize: 5,
    cVouchTypeCode: '2',
    bEnd: false
  }).then((res) => {
    if (res.success) {
      taskNumData.value[5].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[5].num = 0
    }
  })
  // 维修指派
  getRepairList({
    PageIndex: 1,
    PageSize: 5,
    Conditions: 'cPARM04=0'
  }).then((res) => {
    if (res.success) {
      taskNumData.value[6].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[6].num = 0
    }
  })
  // 设备维修
  PDARepairVouch({
    PageIndex: 1,
    PageSize: 5,
    Conditions: 'iStatus in (0,1,2)'
  }).then((res) => {
    if (res.success) {
      taskNumData.value[7].num = res.data.dataCount ?? 0
    } else {
      taskNumData.value[7].num = 0
    }
  })
}

onShow(() => {
  if (groups.value.length === 0) {
    uni.showLoading({ title: '加载中' })
  }
  AuthHelperAPI.getMenuAuth()
    .then((res) => {
      groups.value = res.data
    })
    .finally(() => uni.hideLoading())
  getTaskNum()
})
</script>

<template>
  <view>
    <uni-segmented-control
      :values="groups.map((i) => i.cMenuName)"
      styleType="text"
      activeColor="#ff0000"
      @clickItem="onClickTabItem"
    />

    <view
      v-for="(item, index) in groups"
      :key="item.cModelCode"
      v-show="current === index"
      class="group-item"
    >
      <view
        v-for="(child, i) in item.Child.filter((i) => !i.IsHidden).filter((i) =>
          moduleMap.has(i.cModelCode)
        )"
        :key="i"
        class="child-item-wrapper"
      >
        <view
          v-if="moduleMap.has(child.cModelCode)"
          class="child-item"
          @click="onClickModuleItem(moduleMap.get(child.cModelCode).url)"
        >
          <view class="img-wrapper">
            <image
              :src="moduleMap.get(child.cModelCode).src"
              mode="aspectFit"
              fade-show
            />
            <view
              v-if="taskNumData.find((i) => i.name === child.cMenuName)?.num > 0"
              style="
                background-color: red;
                width: 40rpx;
                height: 40rpx;
                position: absolute;
                right: 0;
                bottom: 0;
                text-align: center;
                border-radius: 10rpx;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <view style="font-size: 20rpx; color: white">
                {{
                  taskNumData.find((i) => i.name === child.cMenuName).num > 99
                    ? '99+'
                    : taskNumData.find((i) => i.name === child.cMenuName).num
                }}
              </view>
            </view>
          </view>
          <view class="title">{{ child.cMenuName }}</view>
        </view>
      </view>
      <!-- <view class="child-item-wrapper">
        <view
          v-if="index === 0"
          class="child-item"
          @click="onClickModuleItem('/pages/wms/stock-count/index')"
        >
          <view class="img-wrapper">
            <image
              src="../../../static/img/workIcon/Allchuku.png"
              mode="aspectFit"
              fade-show
            />
          </view>
          <view class="title"> 仓库盘点 </view>
        </view>
        -->
    </view>
  </view>
</template>

<style scoped lang="scss">
.group-item {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
}

.child-item-wrapper {
  width: 33%;
  margin-bottom: 16px;

  .child-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .img-wrapper {
    background-color: white;
    border-radius: 100%;
    box-shadow: 0 2px 5px #d1d1d1;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    image {
      width: 32px;
      height: 32px;
    }
  }

  .title {
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
