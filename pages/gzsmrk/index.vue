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
      if (!data) {
        uni.showToast({
          title: '未找到数据',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      if (detailData.value.cCode && data?.cCode !== detailData.value.cCode) {
        uni.showToast({
          title: '非同一单，不能合包',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      if (!detailData.value.cCode) {
        detailData.value = data
      }
      if (data.X > 0 && data.Y > 0) {
        if (data.X * data.Y > 80) {
          uni.showToast({
            title: '超重',
            icon: 'none'
          })
        }
      }
      packages.value.unshift({
        cBarCode: data.cBarCode,
        cInvName: data.cInvName,
        nQuantity: data.nQuantity
      })
    }
  } catch (e) {
    console.log(e)
  }
  scanInput.value = ''
  setFocus()
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
      handlePrint(data)
      handleClear()
    }
  } catch (e) {
    console.log(e)
  }
}

function handlePrint(data = {}) {
  // #ifdef APP-PLUS
  printer.printQR2({
    text: detailData?.cCode,
    height: 150,
    offset: 2
  })
  printer.printText({
    content: `${detailData?.PRODUCT_VOUCH_cDefindParm30 ?? ''}-${detailData?.cCode ?? ''}${detailData?.cProvinceCode ?? ''}${detailData?.cCityCode ?? ''}\r\n`
  })
  printer.printText({ content: `${detailData?.cCode ?? ''}\r\n` })
  printer.printText({
    content: `${detailData?.cProvinceCode ?? ''}${detailData?.cCityCode ?? ''}\r\n`
  })
  printer.printText({ content: `${data?.cPackageCode ?? ''}\r\n` })
  printer.printText({ content: `${detailData?.cDefindParm05 ?? ''}\r\n` })
  printer.printText({ content: `${detailData?.cCusName ?? ''}\r\n` })
  printer.printText({ content: `${detailData?.PRODUCT_VOUCH_cDefindParm10 ?? ''}\r\n` })
  printer.printText({ content: `${detailData?.cAddress ?? ''}\r\n` })
  printer.printText({ content: `河南兰考县产业聚集区\r\n` })
  printer.printText({ content: `兰考闼闼同创工贸有限公司(25厂)\r\n` })
  printer.printText({ content: `数量：${data?.iDefindParm14 ?? '0'}\r\n` })
  printer.printText({ content: `包号：第${data?.iDefindParm13 ?? '0'}包\r\n` })
  packages.value.forEach((i) => {
    printer.printText({ content: `${i.cInvName ?? ''}： ${i.nQuantity ?? ''}\r\n` })
  })
  printer.printGoToNextMark()
  // #endif
}

function handleClear() {
  scanInput.value = ''
  setFocus()
  detailData.value = {}
  packages.value = []
}

function handleLight() {}

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

onLoad(() => initPrinter())
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
          <up-col span="12"> 城市：{{ detailData.cCityCode }} </up-col>
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
        <up-row justify="space-between">
          <up-col span="12"> 生产批次：{{ detailData.S_S_S_cBatch }} </up-col>
        </up-row>
        <up-row
          justify="space-between"
          v-if="detailData.cCode"
        >
          <up-col span="12"> 打包状态：{{ detailData.cPackageCode ? '已打包' : '未打包' }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 仓位：{{ detailData.PRODUCT_VOUCH_cDefindParm53 }} </up-col>
        </up-row>

        <view
          v-for="(i, idx) in packages"
          :key="idx"
        >
          <up-divider></up-divider>
          <up-row>
            <up-col span="6"> 加工码：{{ i.cBarCode }} </up-col>
            <up-col span="6"> 板件名称：{{ i.cInvName }} </up-col>
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
          style="margin-right: 8px"
        />

        <up-button
          type="error"
          size="small"
          text="立即打包"
          @click="handlePackage"
          style="margin-right: 8px"
        />

        <up-button
          type="error"
          size="small"
          text="重新扫码"
          @click="handleClear"
        />
        <!-- <up-button
          type="error"
          size="small"
          text="亮灯"
          @click="handleLight"
        /> -->
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
}
</style>
