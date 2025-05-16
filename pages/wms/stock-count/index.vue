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
  cCode: '',
  cTakeTypeCode: '',
  dDate: new Date()
})
const typeCandidates = ref([])
const listData = ref([])

async function getList() {
  try {
    const {
      data: { data, dataCount, pageCount }
    } = await API.getList({
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      Conditions: queryBuilder([
        { type: 'like', key: 'cCode', val: searchParams.value.cCode },
        { type: 'eq', key: 'cTakeTypeCode', val: searchParams.value.cTakeTypeCode },
        { type: 'date', key: 'dDate', val: searchParams.value.dDate },
        { type: 'eq', key: 'cVouchTypeCode', val: '1' } // 库房 = 1
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

const handleStart = (data) => {
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
        uni.showLoading({ title: '处理中' })
        try {
          await API.begin({
            UID: data.UID,
            RowUID: data.RowUID
          })
          uni.showToast({
            title: '操作成功',
            icon: 'success'
          })
          resetPageParams()
          getList()
        } catch {
          //
        }
        uni.hideLoading()
      }
    }
  })
}

const handleFinish = (data) => {
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
        uni.showLoading({ title: '处理中' })
        try {
          await API.finish({
            UID: data.UID,
            RowUID: data.RowUID
          })
          uni.showToast({
            title: '操作成功',
            icon: 'success'
          })
          listData.value = []
          resetPageParams()
          getList()
        } catch {
          //
        }
        uni.hideLoading()
      }
    }
  })
}

const handleCount = (data) =>
  uni.navigateTo({
    url: `/pages/wms/stock-count/count?UID=${data.UID}&cInvCode=${data.cInvCode}&cInvName=${data.cInvName}&cWareHouseName=${data.cWareHouseName}&cTakeTypeCode=${data.cTakeTypeCode}`
  })

const getType = async () => {
  try {
    const { success, data } = await API.fetchType()
    if (success) {
      typeCandidates.value = data.map((item) => ({
        text: item.cDictonaryName,
        value: item.cDictonaryCode
      }))
    }
  } catch {
    //
  }
}

onLoad(() => {})
onShow(() => {
  listData.value = []
  getList()
  getType()
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
      title="仓库盘点"
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
                @click="search"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />
        </view>

        <view style="padding-top: 180px">
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 序号：{{ index + 1 }} </up-col>
              <up-col span="6"> 盘点单号：{{ item.cCode }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 盘点日期：{{ formatTime(item.dDate, 'YYYY-MM-DD') }} </up-col>
              <up-col span="6"> 盘点类型：{{ item.cTakeTypeName }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 状态：{{ item.iStatusName }} </up-col>
              <up-col span="6"> 库区名称：{{ item.cDefindParm02 }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 物料编码：{{ item.cInvCode }} </up-col>
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  style="margin-right: 4px"
                  text="开始"
                  type="error"
                  size="small"
                  @click="handleStart(item)"
                />
                <up-button
                  style="margin-right: 4px"
                  text="盘点"
                  type="error"
                  size="small"
                  @click="handleCount(item)"
                />
                <up-button
                  text="完成"
                  type="error"
                  size="small"
                  @click="handleFinish(item)"
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
