<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { DBInAPI, WareHouseAPI } from '@/api'
import { formatTime, formatString } from '@/features/formatter'
import { queryBuilder } from '@/features/query'

const height = ref(getDeviceHeight().totalHeight)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const scanCode = ref('')
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
    } = await DBInAPI.getList({
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      OrderByFileds: '',
      Conditions: queryBuilder([
        { type: 'like', key: 'cCode', val: keyword.value },
        { type: 'eq', key: 'cInWareHouseCode', val: storageData.value?.cWareHouseCode }
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

async function scanStorage() {
  if (!scanCode.value) {
    uni.showToast({
      title: '请扫描仓库',
      icon: 'none'
    })
    return
  }
  try {
    const { data } = await WareHouseAPI.GetByCode({ code: scanCode.value })
    if (!data) {
      uni.showToast({
        title: '未找到仓库',
        icon: 'none'
      })
      return
    }
    storageData.value = data
    resetPageParams()
    getList()
  } catch {
    //
  }
  scanCode.value = ''
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
    url: `/pages/wms/db-in/material?id=${item.UID}&code=${storageData.value.cWareHouseCode}`
  })
}

onLoad(() => {})
onShow(() => {})
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
      title="调拨入库"
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
            <up-col span="12">
              <up-input
                v-model="scanCode"
                placeholder="请扫描仓库"
                border="surround"
                suffixIcon="scan"
                clearable
                maxlength="30"
                @confirm="scanStorage"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />
          <up-row>
            <up-col span="6"> 当前仓库：{{ formatString(storageData?.cWareHouseCode) }} </up-col>
            <up-col span="6"> 仓库编码：{{ formatString(storageData?.cWareHouseName) }} </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="12">
              <up-search
                placeholder="请输入通知单"
                clearable
                v-model="keyword"
                @search="search"
                @custom="search"
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
              <up-col span="6"> 调拨单号：{{ item.cCode }} </up-col>
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 仓库：{{ item.cInWareHouseName }} </up-col>
              <up-col span="6"> 制单时间：{{ formatTime(item.dDate, 'YYYY-MM-DD') }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  text="详情"
                  type="error"
                  size="small"
                  @click="navToMaterial(item)"
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
