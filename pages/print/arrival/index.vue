<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { handleScan, handleRemoveScan } from '@/features/scan'
import { OtherStorageInAPI, WareHouseAPI } from '@/api'
import { formatTime, formatString } from '@/features/formatter'
import { queryBuilder } from '@/features/query'
import { API } from './api'
import { usePageParams } from '@/hooks'

// #ifdef APP-PLUS
const printer = uni.requireNativePlugin('LcPrinter')
// #endif

const height = ref(getDeviceHeight().totalHeight)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const searchParams = ref({
  code: '',
  cInvCode: ''
})
const listData = ref([])

async function getList() {
  try {
    const {
      data: { data, dataCount, pageCount }
    } = await API.getList({
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      conditions: queryBuilder([
        { type: 'gt', key: 'Rest_nQuantity', val: 0 }
        // {
        //   type: '',
        //   key: ''
        // }
      ])
    })
    listData.value = [...listData, ...data]
    setPageInfo({ dataCount, pageCount })
    uni.hideLoading()
    uni.stopPullDownRefresh()
  } catch (e) {
    console.log(e)
    listData.value = []
  }
}

function print(data) {
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

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

onLoad(() => {
  initPrinter()
})
onShow(() => {
  listData.value = []
  getList()
})
onHide(() => {})
onUnload(() => {})

onPullDownRefresh(async () => {
  resetPageParams()
  await getList()
  uni.stopPullDownRefresh()
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="到货标签补打"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />
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
