<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { queryBuilder } from '@/features/query'
import { API } from './api'

const height = ref(getDeviceHeight().totalHeight)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const tabItems = ref([{ name: '未完工' }, { name: '已完工' }])
const currentTabIndex = ref(0)
const scanInput = ref('')
const isFocus = ref(true)
const listData = ref([])

const setFocus = () => {
  isFocus.value = false
  setTimeout(() => {
    isFocus.value = true
  }, 200)
}

function handleClickTab(item) {
  currentTabIndex.value = item.index
  resetPageParams()
  getList()
}

function handleSearch() {
  resetPageParams()
  getList()
}

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
  setFocus()
}

async function getList() {
  try {
    const { data } = await API.list({
      cBarCode: scanInput.value,
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      OrderByFileds: 'dPlanDateStart,cCode',
      Conditions: queryBuilder([
        ...(currentTabIndex.value === 0
          ? [{ type: 'neq', key: 'cDefindParm02', val: 1 }]
          : [{ type: 'eq', key: 'cDefindParm02', val: 1 }])
      ])
    })
    const { dataCount, pageCount } = data
    listData.value = [...listData.value, ...data.data]
    setPageInfo({ dataCount, pageCount })
  } catch (e) {
    console.log(e)
  }
  uni.hideLoading()
  uni.stopPullDownRefresh()
}

function handleDetail(item) {
  uni.navigateTo({ url: `/pages/gzsmrk/detail?code=${item.cCode}` })
}

function handlePackage(item) {
  uni.navigateTo({ url: `/pages/gzsmrk/package?code=${item.cCode}` })
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
      <up-list
        :height="`calc(100vh - ${height + 20}px)`"
        @scrolltolower="handleScrollToLower(getList)"
      >
        <view class="fix-area">
          <up-tabs
            :list="tabItems"
            :scrollable="false"
            :current="currentTabIndex"
            lineColor="#ff0000"
            @click="handleClickTab"
          />

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="10">
              <up-input
                placeholder="请扫描"
                border="surround"
                v-model="scanInput"
                :focus="isFocus"
                @confirm="handleSearch"
                clearable
              />
            </up-col>
            <up-col span="2">
              <up-button
                style="margin-left: 4rpx"
                type="error"
                @click="handleSearch"
              >
                搜索
              </up-button>
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
              <up-col span="6"> P单号：{{ item.cCode }} </up-col>
              <up-col span="6"> 仓位：{{ item.cDefindParm53 }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 生产日期：{{ item.dPlanDateStartStr }} </up-col>
              <up-col span="6"> 打包状态：{{ item.cDefindParm02Name }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 已打包数：{{ item.iTotalQuantity }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  style="margin-right: 8px"
                  text="详情"
                  type="error"
                  size="small"
                  @click="handleDetail(item)"
                />
                <up-button
                  v-if="currentTabIndex === 0"
                  text="包装扫码"
                  type="error"
                  size="small"
                  @click="handlePackage(item)"
                />
              </view>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>
        <up-loadmore :status="pageInfo.status" />
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
