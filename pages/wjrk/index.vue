<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { handleScan, handleRemoveScan } from '@/features/scan'
import { OtherStorageInAPI, WareHouseAPI } from '@/api'
import { formatTime, formatString } from '@/features/formatter'
import { queryBuilder } from '@/features/query'
import { API } from './api'
import { generatePrintData } from './utils'
import { sendPrintCommand } from '@/utils'

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
      if (!data || data.length === 0) {
        uni.showToast({
          title: '未找到数据',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      detailData.value = data[0]
      packages.value = data
    }
  } catch (e) {
    console.log(e)
  }
  scanInput.value = ''
  setFocus()
}

async function handlePrint() {
  if (packages.value.length === 0) {
    uni.showToast({
      title: '请扫描',
      icon: 'none'
    })
    return
  }
  const printData = generatePrintData({ ...detailData.value, packages: packages.value })
  sendPrintCommand({
    data: printData
    // callback: () => uni.navigateBack({ delta: 1 })
  })
}

async function handlePackage() {
  if (packages.value.length === 0) {
    uni.showToast({
      title: '请扫描',
      icon: 'none'
    })
    return
  }
  try {
    const { data, success } = await API.package(detailData.value.WJPBarcode)
    if (success) {
      uni.showToast({
        title: '打包成功',
        icon: 'success'
      })
      const printData = generatePrintData({
        ...detailData.value,
        packages: packages.value,
        cPackageCode: data.cPackageCode ?? detailData.value.cPackageCode,
        PACKAGEVOUCH_S_iDefindParm14:
          data.PACKAGEVOUCH_S_iDefindParm14 ?? detailData.value.PACKAGEVOUCH_S_iDefindParm14,
        cDynamicsParm10: data.cDynamicsParm10 ?? detailData.value.cDynamicsParm10
      })
      sendPrintCommand({
        data: printData,
        callback: () => handleClear()
      })
    }
  } catch (e) {
    console.log(e)
  }
}

function handleClear() {
  scanInput.value = ''
  setFocus()
  detailData.value = {}
  packages.value = []
}

onLoad(() => {})
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
      title="五金入库"
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
          <up-col span="12"> 包装任务单号：{{ detailData.WJPBarcode }} </up-col>
        </up-row>
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
        <up-row justify="space-between">
          <up-col span="12"> 产品名称：{{ detailData.cDefindParm08 }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 工厂名称：二十五场 </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 生产批次： {{ detailData.cBatch }}</up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 仓库名称： {{ detailData.cDefindParm30 }}</up-col>
        </up-row>

        <up-list :height="`calc(100vh - ${height + 300}px)`">
          <view
            v-for="(i, idx) in packages"
            :key="idx"
          >
            <up-divider></up-divider>
            <up-row>
              <up-col span="12"> 名称：{{ i.cInvName }} </up-col>
            </up-row>
            <up-row>
              <up-col span="8"> 规格：{{ i.cInvStd }} </up-col>
              <up-col span="4"> 数量：{{ i.nQuantity }} </up-col>
            </up-row>
          </view>
        </up-list>

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
