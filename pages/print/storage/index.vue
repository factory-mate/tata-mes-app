<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { handleScan, handleRemoveScan } from '@/features/scan'
import { OtherStorageInAPI, WareHouseAPI } from '@/api'
import { formatTime, formatString } from '@/features/formatter'
import { queryBuilder } from '@/features/query'
import { API } from './api'

const height = ref(getDeviceHeight().totalHeight)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const searchParams = ref({
  cInWareHouseName: '',
  cCode: ''
})
const listData = ref([])
const currentRejectId = ref('')
const memo = ref('')
const showRejectModal = ref(false)

async function getList() {
  try {
    const {
      data: { data, dataCount, pageCount }
    } = await API.getList({
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      Conditions: queryBuilder([
        { type: 'eq', key: 'cVouchTypeCode', val: '01' },
        { type: 'in', key: 'iStatus', val: ['1', '51'] },
        { type: 'like', key: 'cInWareHouseName', val: searchParams.value.cInWareHouseName },
        { type: 'like', key: 'cCode', val: searchParams.value.cCode }
      ])
    })
    listData.value = [...listData.value, ...data]
    setPageInfo({ dataCount, pageCount })
    uni.hideLoading()
    uni.stopPullDownRefresh()
  } catch (e) {
    console.log(e)
    uni.hideLoading()
  }
}

function print() {
  resetPageParams()
  getList()
}

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

const openRejectModal = (data) => {
  memo.value = ''
  showRejectModal.value = true
  currentRejectId.value = data.UID
}

const handleAudit = async (data) => {
  uni.showLoading({ title: '处理中' })
  try {
    const { success } = await API.audit({
      UIDs: [data.UID]
    })
    if (success) {
      uni.showToast({
        title: '操作成功',
        icon: 'success'
      })
      resetPageParams()
      getList()
    }
  } catch {
    //
  }
  uni.hideLoading()
}

const handleReject = async (data) => {
  uni.showLoading({ title: '处理中' })
  try {
    const { success } = await API.reject({
      UIDs: [currentRejectId.value],
      cMemo: memo.value
    })
    if (success) {
      uni.showToast({
        title: '操作成功',
        icon: 'success'
      })
      resetPageParams()
      getList()
      showRejectModal.value = false
    }
  } catch {
    //
  }
  uni.hideLoading()
}

const handleNavToDetail = (data) =>
  uni.navigateTo({
    url: `/pages/wms/workshop-verify/detail?UID=${data.UID}&cCode=${data.cCode}`
  })

const handlePopupClose = () => {
  showPopup.value = false
}

onLoad(() => {})
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
              v-model="searchParams.cInWareHouseName"
              placeholder=""
              border="surround"
              clearable
              maxlength="30"
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
          <up-col span="12"> 物料编码：{{}} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 物料名称：{{}} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 数量：{{}} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 批次号：{{}} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 生产日期：{{ formatTime('2022-03-22', 'YYYY-MM-DD') }} </up-col>
        </up-row>
        <up-row justify="space-between">
          <up-col span="12"> 供应商：{{}} </up-col>
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
