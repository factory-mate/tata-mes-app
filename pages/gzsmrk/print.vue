<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { API } from './api'

const height = ref(getDeviceHeight().totalHeight)

const isFocus = ref(true)
const scanInput = ref('')
const detailData = ref({})

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
      detailData.value = data ?? {}
    }
  } catch (e) {
    console.log(e)
  }
  scanInput.value = ''
  setFocus()
}

function handlePrint() {
  if (!detailData.value.cCode) {
    uni.showToast({
      title: '请扫描',
      icon: 'none'
    })
    return
  }
  console.log(detailData.value)
  // sendCommand()
}

onLoad(() => {})
onShow(() => {})
onHide(() => {})
onUnload(() => {})

onPullDownRefresh(async () => {
  const command = [
    '^XA',
    '^FO50,50^A0N,30,30,^FD零售-P24000509214福建省宁化县①^FS',
    '^FO50,100^A0N,30,30,^FD2405544823④^FS',
    '^XZ'
  ]
  // sendCommand(command.join('\n'))
  uni.stopPullDownRefresh()
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="补打标签"
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
        <up-row justify="space-between">
          <up-col span="12"> 工厂名称：{{ detailData.cCode ? '二十五场' : '' }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 生产批次：{{ detailData.S_S_S_cBatch }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12">
            打包状态：{{ detailData.cCode ? (detailData.cPackageCode ? '已打包' : '未打包') : '' }}
          </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 仓位：{{ detailData.PRODUCT_VOUCH_cDefindParm53 }} </up-col>
        </up-row>

        <view
          v-for="(i, idx) in detailData.list_PackageDetail"
          :key="idx"
        >
          <up-divider></up-divider>
          <up-row>
            <up-col span="12"> 加工码：{{ i.cDefindParm05 }} </up-col>
          </up-row>
          <up-row>
            <up-col span="12"> 板件名称：{{ i.cInvName }} </up-col>
          </up-row>
          <up-row>
            <up-col span="12"> 数量：{{ i.nQuantity }} </up-col>
          </up-row>
        </view>

        <up-gap height="8" />
      </view>

      <view class="btn-area">
        <up-button
          type="error"
          size="small"
          text="补打标签"
          @click="handlePrint"
          style="margin-right: 8px"
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
}
</style>
