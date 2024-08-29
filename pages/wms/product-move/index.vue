<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { handleScan, handleRemoveScan } from '@/features/scan'
import { ProductMoveAPI } from '@/api'

const height = ref(getDeviceHeight().totalHeight)

const currentFocus = ref(null)
const packageCodeInputRef = ref(null)
const scanPackageCode = ref('')
const scanLocationCode = ref('')

const packageInfo = ref({})

async function scanPackage(code) {
  if (!code) {
    uni.showToast({ title: '请扫描包号', icon: 'none' })
    return
  }
  const { data, success } = await ProductMoveAPI.GetPBarcodeInfo({ pbarcode: code })
  if (!success) {
    uni.showToast({ title: '查询失败', icon: 'none' })
    return
  }
  if (!data) {
    uni.showToast({ title: '包号不存在', icon: 'none' })
    scanPackageCode.value = ''
    packageCodeInputRef.value.focus()
    return
  }
  packageInfo.value = data
}

function resetPackage() {
  scanPackageCode.value = ''
  packageInfo.value = {}
  uni.showToast({ title: '包号已重置', icon: 'none' })
}

async function processScan() {
  // #ifdef APP-PLUS
  if (!currentFocus.value) {
    return
  }
  // #endif
  if (scanPackageCode.value === packageInfo.value?.Pbarcode) {
    return
  }

  await scanPackage(scanPackageCode.value)
}

async function handleSubmit() {
  if (!packageInfo.value?.Pbarcode) {
    uni.showToast({ title: '请扫描包号', icon: 'none' })
    return
  }
  const { success } = await ProductMoveAPI.Pos_Adjust({
    cPosCode: scanLocationCode.value,
    list_cPackageCode: [packageInfo.value?.Pbarcode]
  })
  if (!success) {
    uni.showToast({ title: '操作失败', icon: 'none' })
    return
  }
  uni.showToast({ title: '操作成功', icon: 'none' })
  scanPackageCode.value = ''
  packageInfo.value = {}
}

onLoad(() => {})
onShow(() => handleScan(processScan))
onHide(() => handleRemoveScan(processScan))
onUnload(() => handleRemoveScan(processScan))
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="成品移库"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <up-row justify="space-between">
        <up-col span="2">包号：</up-col>
        <up-col span="10">
          <up-input
            ref="packageCodeInputRef"
            v-model="scanPackageCode"
            placeholder="请扫描包号"
            border="surround"
            suffixIcon="scan"
            clearable
            maxlength="30"
            @focus="
              () => {
                scanPackageCode = ''
                currentFocus = '包号'
              }
            "
            @blur="currentFocus = null"
          />
        </up-col>
      </up-row>

      <up-gap height="12" />

      <view v-if="packageInfo.Pbarcode">
        <up-row justify="space-between">
          <up-col span="6">包信息</up-col>
          <up-col span="0.5">
            <up-button
              text="重置"
              type="error"
              size="mini"
              @click="resetPackage"
            />
          </up-col>
        </up-row>
        <up-row> 包号：{{ packageInfo.Pbarcode }} </up-row>
        <up-gap height="4" />
        <up-row> 单号：{{ packageInfo.cCode }} </up-row>
        <up-gap height="4" />
        <up-row> 物流商：{{ packageInfo.cLogisticsName }} </up-row>
        <up-gap height="4" />
        <up-row> 当前货位：{{ packageInfo.cPosName }} </up-row>
      </view>
      <view v-else>
        <up-empty
          mode="data"
          icon="../../../static/data.png"
        >
        </up-empty>
      </view>

      <up-gap height="12" />

      <up-row justify="space-between">
        <up-col span="2">新货位：</up-col>
        <up-col span="10">
          <up-input
            v-model="scanLocationCode"
            placeholder="请扫描货位"
            border="surround"
            suffixIcon="scan"
            clearable
            maxlength="30"
          />
        </up-col>
      </up-row>

      <up-gap height="30" />

      <up-button
        text="移库"
        type="error"
        size="small"
        @click="handleSubmit"
      />
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
