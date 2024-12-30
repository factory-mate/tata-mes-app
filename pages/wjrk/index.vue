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

const isFocus = ref(true)
const scanInput = ref('')
const detailData = ref({})
const packages = ref([])

const setFocus = () => {
  isFocus.value = false
  setTimeout(() => {
    isFocus.value = true
  }, 200)
}

async function scanCode() {
  try {
    const { data, success } = await API.scan(scanInput.value)
    if (success) {
      if (data.cCode !== detailData.value.cCode) {
        uni.showToast({
          title: '非同1单，不能合包',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      if (!detailData.value.cCode) {
        detailData.value = data
      }
      packages.value.push({ ...data })
    } else {
      scanInput.value = ''
      setFocus()
    }
  } catch {
    scanInput.value = ''
    setFocus()
  }
}

function handleDeleteItem(idx) {
  packages.value.splice(idx, 1)
}

async function handlePackage() {
  try {
    const { data, success } = await API.package(packages.value.map((i) => i.cBarCode))
    if (success) {
      uni.showToast({
        title: '打包成功',
        icon: 'success'
      })
      handleClear()
    }
  } catch (e) {
    console.log(e)
  }
}

function handlePrint() {
  print()
}

function handleClear() {
  scanInput.value = ''
  setFocus()
  detailData.value = {}
  packages.value = []
}

function handleLight() {}

function print() {
  // // #ifdef APP-PLUS
  // printer.printQR2({
  //   text: data?.cKeyCode,
  //   height: 150,
  //   offset: 2
  // })
  // printer.printText({ content: '箱码：' + (data?.cKeyCode ?? '') + '\r\n' })
  // printer.printText({ content: '物料编码：' + (data?.cInvCode ?? '') + '\r\n' })
  // printer.printText({ content: '物料名称：' + (data?.cInvName ?? '') + '\r\n' })
  // printer.printText({ content: '数量：' + (data?.nSumQuinity ?? '') + '\r\n' })
  // printer.printText({ content: '物料规格：' + (data?.cInvStd ?? '') + '\r\n' })
  // printer.printText({ content: '批次号：' + (data?.cBatch ?? '') + '\r\n' })
  // printer.printText({ content: '生产日期：' + (data?.dProductDay ?? '') + '\r\n' })
  // printer.printText({ content: '采购订单号：' + (data?.cSourceCode ?? '') + '\r\n' })
  // printer.printText({ content: '供应商：' + (data?.cVendorName ?? '') + '\r\n' })
  // printer.printText({ content: '供应商批号：' + (data?.cVendorBatch ?? '') })
  // printer.printGoToNextMark()
  // // #endif
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
      title="柜子扫码入库"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <view class="fix-area">
        <up-gap height="8" />

        <up-row justify="space-between">
          <up-col span="12">
            <up-input
              v-model="scanInput"
              @confirm="scanCode"
              :focus="isFocus"
              placeholder="请扫描"
              border="surround"
              clearable
              maxlength="30"
            />
          </up-col>
        </up-row>

        <up-gap height="8" />
        <up-row justify="space-between">
          <up-col span="12"> P单号：{{ detailData.cCode }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12">
            城市：{{ `${detailData.cProvinceCode ?? ''}${detailData.cCityCode ?? ''}` }}
          </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 客户名称：{{ detailData.cCusName }} </up-col>
        </up-row>
        <up-row
          justify="space-between"
          v-if="detailData.cCode"
        >
          <up-col span="12"> 工厂名称：二十五场 </up-col>
        </up-row>

        <view
          v-for="(i, idx) in packages"
          :key="idx"
        >
          <up-divider></up-divider>
          <up-row>
            <up-col span="6"> 名称：{{ i.cInvName }} </up-col>
            <up-col span="6"> 规格：{{ i.cInvStd }} </up-col>
          </up-row>
          <up-row>
            <up-col span="6"> 数量：{{ i.nQuantity }} </up-col>
            <up-col span="6">
              <view style="width: 100px">
                <up-button
                  type="error"
                  size="small"
                  text="删除"
                  @click="handleDeleteItem(idx)"
                />
              </view>
            </up-col>
          </up-row>
        </view>

        <up-gap height="8" />
      </view>

      <view class="btn-area">
        <up-button
          type="error"
          size="small"
          text="打印标签"
          @click="handlePrint"
        />

        <up-button
          type="error"
          size="small"
          text="立即打包"
          @click="handlePackage"
        />

        <up-button
          type="error"
          size="small"
          text="重新扫码"
          @click="handleClear"
        />
        <up-button
          type="error"
          size="small"
          text="亮灯"
          @click="handleLight"
        />
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

.btn-area {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
</style>
