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

const showCalendar = ref(false)
const searchParams = ref({
  cCode: '',
  cTakeTypeCode: '',
  dDate: new Date()
})
const typeCandidates = ref([])

const scanCode = ref('')
const currentFocus = ref(false)
const keyword = ref('')
const storageData = ref(null)
const listData = ref([])

async function getList() {
  if (!storageData.value) {
    uni.showToast({
      title: '请扫描仓库',
      icon: 'none'
    })
    return
  }
  try {
    const {
      data: { data, dataCount, pageCount }
    } = await OtherStorageInAPI.GetForPage_OtherIn_PDA({
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      OrderByFileds: '',
      Conditions: queryBuilder([
        { type: 'like', key: 'cCode', val: keyword.value },
        { type: 'eq', key: 'cInWareHouseCode', val: storageData.value?.cWareHouseCode0 }
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

function search() {
  resetPageParams()
  getList()
}

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

async function processScan() {
  // #ifdef APP-PLUS
  if (!currentFocus.value) {
    return
  }
  // #endif
  if (scanCode.value === scanStorage.value?.cWareHouseCode) {
    return
  }

  await scanStorage(scanCode.value)
}

const navToMaterial = (item) => {
  if (!storageData.value.cWareHouseCode) {
    uni.showToast({
      title: '缺少 cWareHouseCode',
      icon: 'none'
    })
    return
  }
  if (!item.UID) {
    uni.showToast({
      title: '缺少 UID',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: `/pages/wms/other-storage-in/material?id=${item.UID}&code=${storageData.value.cWareHouseCode}`
  })
}

const handleStart = () => {}

const handleFinish = () => {}

const handleCount = () => {}

const getType = async (type) => {
  try {
    const { success, data } = await API.fetchType(type)
    if (success) {
      typeCandidates.value = data
    }
  } catch {
    //
  }
}

onLoad(() => {})
onShow(() => getType())
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
      title="库存盘点"
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
          <up-row justify="space-between">
            <up-col span="3">盘点单号：</up-col>
            <up-col span="9">
              <up-input
                v-model="searchParams.cCode"
                placeholder=""
                border="surround"
                clearable
                maxlength="30"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="3">盘点类型：</up-col>
            <up-col span="9">
              <uni-data-select
                v-model="searchParams.cTakeTypeCode"
                :localdata="typeCandidates"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="3">盘点日期：</up-col>
            <up-col span="9">
              <up-datetime-picker
                v-model="searchParams.dDate"
                mode="date"
                hasInput
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
              />
            </up-col>
          </up-row>

          <up-gap height="8" />
        </view>

        <view style="padding-top: 120px">
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 序号：{{ index + 1 }} </up-col>
              <up-col span="6"> 盘点单号：{{ item.cCode }} </up-col>
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 盘点日期：{{ formatTime(item.dDate, 'YYYY-MM-DD') }} </up-col>
              <up-col span="6"> 盘点类型：{{ item }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 状态：{{ formatTime(item.dDate, 'YYYY-MM-DD') }} </up-col>
              <up-col span="6"> 库区名称：{{ item }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 物料编码：{{ item.cInvCode }} </up-col>
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  text="开始"
                  type="error"
                  size="small"
                  @click="handleStart(item)"
                />
                <up-button
                  text="完成"
                  type="error"
                  size="small"
                  @click="handleFinish(item)"
                />
                <up-button
                  text="盘点"
                  type="error"
                  size="small"
                  @click="handleCount(item)"
                />
              </view>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>

        <up-loadmore
          v-if="storageData"
          :status="pageInfo.status"
        />
      </up-list>
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
