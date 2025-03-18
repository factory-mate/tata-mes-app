<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
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
      if (!data) {
        uni.showToast({
          title: '未找到数据',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      if (data?.cCode !== detailData.value.cCode) {
        uni.showToast({
          title: '非同一单，不能合包',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      if (data.list_PackageDetail && data.list_PackageDetail.length > 0) {
        uni.showToast({
          title: '已被包装',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      if (packages.value.some((i) => i.cBarCode === data.cBarCode)) {
        uni.showToast({
          title: '加工码重复',
          icon: 'none'
        })
        scanInput.value = ''
        setFocus()
        return
      }
      // if (data.X > 0 && data.Y > 0) {
      //   if (data.X * data.Y > 80) {
      //     uni.showToast({
      //       title: '超重',
      //       icon: 'none'
      //     })
      //     scanInput.value = ''
      //     setFocus()
      //     return
      //   }
      // }
      detailData.value = data
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
  let cPackageCode
  try {
    const { data, success } = await API.package(packages.value.map((i) => i.cBarCode))
    if (success) {
      uni.showToast({
        title: '打包成功',
        icon: 'success'
      })
      cPackageCode = data.cPackageCode
      detailData.value = {}
      packages.value = []
    }
  } catch (e) {
    console.log(e)
  }
  try {
    const { data } = await API.packageItemDetail({
      OrderByFileds: 'cPackageCode',
      Conditions: `cPackageCode=${cPackageCode}`
    })
    const { list_PackageDetail, ...resData } = data
    const printData = generatePrintData({ ...resData, packages: list_PackageDetail })
    sendPrintCommand({
      data: printData
      // callback: () => uni.navigateBack({ delta: 1 })
    })
  } catch (e) {
    console.log(e)
  }
}

onLoad((options) => {
  detailData.value = {
    cCode: options.code
  }
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
      title="柜子扫码入库-打包"
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
          v-for="(i, idx) in packages"
          :key="idx"
        >
          <up-divider></up-divider>
          <up-row>
            <up-col span="12"> 加工码：{{ i.cBarCode }} </up-col>
          </up-row>
          <up-row>
            <up-col span="12"> 板件名称：{{ i.cInvName }} </up-col>
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
          text="立即打包"
          @click="handlePackage"
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
