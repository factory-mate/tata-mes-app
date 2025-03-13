<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { handleScan, handleRemoveScan } from '@/features/scan'
import { OtherStorageInAPI, WareHouseAPI } from '@/api'
import { formatTime, formatString } from '@/features/formatter'
import { queryBuilder } from '@/features/query'
import { API } from './api'

// #ifdef APP-PLUS
const printer = uni.requireNativePlugin('LcPrinter')
// #endif

const height = ref(getDeviceHeight().totalHeight)

const searchParams = ref({
  cKeyCode: ''
})
const detailData = ref({})

async function getList() {
  console.log(searchParams.value.cKeyCode)
  try {
    const { data } = await API.getList(searchParams.value.cKeyCode)
    detailData.value = data[0]
  } catch (e) {
    console.log(e)
    detailData.value = {}
  }
  searchParams.value.cKeyCode = ''
}

function print() {
  // #ifdef APP-PLUS
  printer.printQR2({
    text: data?.cKeyCode,
    height: 150,
    offset: 2
  })
  printer.printText({ content: '箱码：' + (data?.cKeyCode ?? '') + '\r\n' })
  printer.printText({ content: '物料编码：' + (data?.cInvCode ?? '') + '\r\n' })
  printer.printText({ content: '物料名称：' + (data?.cInvName ?? '') + '\r\n' })
  printer.printText({ content: '数量：' + (data?.nSumQuinity ?? '') + '\r\n' })
  printer.printText({ content: '物料规格：' + (data?.cInvStd ?? '') + '\r\n' })
  printer.printText({ content: '批次号：' + (data?.cBatch ?? '') + '\r\n' })
  printer.printText({ content: '生产日期：' + (data?.dProductDay ?? '') + '\r\n' })
  printer.printText({ content: '采购订单号：' + (data?.cSourceCode ?? '') + '\r\n' })
  printer.printText({ content: '供应商：' + (data?.cVendorName ?? '') + '\r\n' })
  printer.printText({ content: '供应商批号：' + (data?.cVendorBatch ?? '') })
  printer.printGoToNextMark()
  // #endif
}

const initPrinter = () => {
  // #ifdef APP-PLUS
  printer.initPrinter({})
  printer.printEnableMark({ enable: true })
  printer.setConcentration({ level: 39 })
  printer.setLineSpacing({ spacing: 1 })
  printer.setFontSize({ fontSize: 8 })
  printer.getsupportprint()
  // #endif
}

onLoad(() => {
  initPrinter()
})
onShow(() => {})
onHide(() => {})
onUnload(() => {})

onPullDownRefresh(async () => {
  uni.stopPullDownRefresh()
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="箱码补打"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <view class="fix-area">
        <up-row justify="space-between">
          <up-col span="3">箱码：</up-col>
          <up-col span="9">
            <up-input
              v-model="searchParams.cKeyCode"
              placeholder=""
              border="surround"
              clearable
              maxlength="30"
              @confirm="getList"
            />
          </up-col>
        </up-row>

        <up-gap height="8" />

        <up-row justify="end">
          <up-col span="2">
            <up-button
              type="error"
              size="small"
              text="打印"
              @click="print"
            />
          </up-col>
        </up-row>

        <up-gap height="8" />

        <up-row justify="space-between">
          <up-col span="12"> 物料编码：{{ detailData.cInvCode }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 物料名称：{{ detailData.cInvName }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 数量：{{ detailData.nSumQuinity }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 批次号：{{ detailData.cBatch }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12">
            生产日期：{{ formatTime(detailData.dProductDayStr, 'YYYY-MM-DD') }}
          </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 供应商：{{ detailData.cVendorName }} </up-col>
        </up-row>
      </view>
    </view>

    <my-btn />
  </view>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  font-size: 14px;
  overflow-y: hidden;
}

.fix-area {
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  left: 10px;
  right: 10px;
  z-index: 99;
  border-bottom: 1px solid #f0f0f0;
}
</style>
