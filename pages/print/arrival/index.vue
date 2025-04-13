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
        { type: 'gt', key: 'Rest_nQuantity', val: 0 },
        {
          type: 'like',
          key: 'cCode',
          val: searchParams.value.code
        },
        {
          type: 'like',
          key: 'cInvCode',
          val: searchParams.value.cInvCode
        }
      ])
    })
    listData.value = [...listData.value, ...data]
    setPageInfo({ dataCount, pageCount })
    uni.hideLoading()
    uni.stopPullDownRefresh()
  } catch (e) {
    console.log(e)
    listData.value = []
  }
}

function print(data) {
  console.log(data)
  // #ifdef APP-PLUS
  printer.printQR2({ text: data?.cBarCode, height: 150, offset: 2 })
  printer.printText({ content: '箱码：' + (data?.cBarCode ?? '') + '\r\n' })
  printer.printText({ content: '物料编码：' + (data?.cInvCode ?? '') + '\r\n' })
  printer.printText({ content: '物料名称：' + (data?.cInvName ?? '') + '\r\n' })
  printer.printText({ content: '数量：' + (data?.Rest_nQuantity ?? '') + '\r\n' })
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

function handleSearch() {
  listData.value = []
  getList()
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
      title="到货补打"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <up-list :height="`calc(100vh - ${height + 20}px)`">
        <view class="fix-area">
          <up-row justify="space-between">
            <up-col span="3">到货单号：</up-col>
            <up-col span="9">
              <up-input
                v-model="searchParams.code"
                placeholder=""
                border="surround"
                clearable
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="3">物料编码：</up-col>
            <up-col span="9">
              <up-input
                v-model="searchParams.cInvCode"
                placeholder=""
                border="surround"
                clearable
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="end">
            <up-col span="2">
              <up-button
                type="error"
                size="small"
                text="搜索"
                @click="handleSearch"
              />
            </up-col>
          </up-row>
        </view>

        <view style="padding-top: 140px">
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 序号：{{ index + 1 }} </up-col>
              <up-col span="6"> 箱码：{{ item.cBarCode }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 物料编码：{{ item.cInvCode }} </up-col>
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 数量：{{ item.Rest_nQuantity }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end; gap: 8px">
                <up-button
                  text="打印"
                  type="error"
                  size="small"
                  @click="print(item)"
                />
              </view>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>
      </up-list>
    </view>
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
