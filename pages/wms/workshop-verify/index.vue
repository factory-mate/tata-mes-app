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
      ]),
      OrderByFileds: 'dDate desc'
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

const openRejectModal = (data) => {
  memo.value = ''
  showRejectModal.value = true
  currentRejectId.value = data.UID
}

const handleAudit = async (data) => {
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
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
    }
  })
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
      title="车间审批"
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
            <up-col span="3">线边仓：</up-col>
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

          <up-row justify="space-between">
            <up-col span="3">领料通知单：</up-col>
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
              <up-col span="6"> 通知单号：{{ item.cCode }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 申请人：{{ item.cCreateUserName }} </up-col>
              <up-col span="6"> 制单时间：{{ formatTime(item.dDate, 'YYYY-MM-DD') }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  text="审核"
                  type="error"
                  size="small"
                  @click="handleAudit(item)"
                  style="margin-right: 4px"
                />
                <up-button
                  text="驳回"
                  type="error"
                  size="small"
                  @click="openRejectModal(item)"
                  style="margin-right: 4px"
                />
                <up-button
                  text="详情"
                  type="error"
                  size="small"
                  @click="handleNavToDetail(item)"
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

    <up-modal
      :show="showRejectModal"
      :title="title"
      confirmText="驳回"
      cancelText="取消"
      showCancelButton
      @confirm="handleReject"
      @cancel="
        () => {
          showRejectModal = false
        }
      "
    >
      <up-row justify="space-between">
        <up-col span="3">说明：</up-col>
        <up-col span="10">
          <up-input
            v-model="memo"
            placeholder=""
            border="surround"
            clearable
            maxlength="30"
          />
        </up-col>
      </up-row>
    </up-modal>
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
