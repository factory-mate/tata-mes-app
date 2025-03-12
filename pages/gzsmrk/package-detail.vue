<script setup>
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { API } from './api'
import { generatePrintData } from './utils'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { queryBuilder } from '@/features/query'
import { sendPrintCommand } from '@/utils'

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const height = ref(getDeviceHeight().totalHeight)
const detailData = ref({})
const listData = ref([])

async function getList() {
  try {
    const { data } = await API.packageItemDetail({
      OrderByFileds: 'cPackageCode',
      Conditions: `cPackageCode=${detailData.value.cPackageCode}`
    })
    const { list_PackageDetail, ...resData } = data
    detailData.value = resData
    listData.value = data.list_PackageDetail
  } catch (e) {
    console.log(e)
  }
  uni.hideLoading()
  uni.stopPullDownRefresh()
}

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

async function handlePrint() {
  let printData
  printData = generatePrintData({ ...detailData.value, packages: listData.value })
  // try {
  //   const { data } = await API.mockPrintTemplate({
  //     ...detailData.value,
  //     packages: listData.value
  //   })
  //   printData = data
  // } catch {
  //   //
  // }
  sendPrintCommand({ data: printData })
}

onLoad((options) => {
  detailData.value.cPackageCode = options.code
  getList()
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
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="柜子扫码入库-包内详情"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <up-list
        :height="`calc(100vh - ${height + 20}px)`"
        @scrolltolower="handleScrollToLower(getList)"
      >
        <view class="fix-area">
          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="12"> P单号：{{ detailData.cCode }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="12"> D单号：{{ detailData.PRODUCT_VOUCH_cDefindParm05 }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="12"> 生产日期：{{ detailData.dPlanDateStartStr }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="12"> 打包状态：{{ detailData.dataCount }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="12"> 包装码：{{ detailData.cBarCode }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="12"> 仓位：{{ detailData.PRODUCT_VOUCH_cDefindParm53 }} </up-col>
          </up-row>

          <up-divider></up-divider>

          <view>
            <up-row>
              <up-col span="7"> 加工码 </up-col>
              <up-col span="3"> 板件名称 </up-col>
              <up-col span="2"> 数量 </up-col>
            </up-row>
          </view>
          <view
            v-for="(i, idx) in listData"
            :key="idx"
          >
            <up-row>
              <up-col span="7"> {{ i.cDefindParm05 }} </up-col>
              <up-col span="3"> {{ i.cInvName }} </up-col>
              <up-col span="2"> {{ i.nQuantity }} </up-col>
            </up-row>
          </view>
        </view>
      </up-list>

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
