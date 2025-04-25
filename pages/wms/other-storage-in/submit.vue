<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { OtherStorageInAPI } from '@/api'
import { urlQueryBuilder } from '@/features/query'

const height = ref(getDeviceHeight().totalHeight)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const scanCode = ref('')
const scanResult = ref({})
const showDeleteModal = ref(false)
const pageQuery = ref({})
const listData = ref([])
const currentItem = ref(null)

async function getList() {
  try {
    const { data, dataCount, pageCount } = await OtherStorageInAPI.list({
      ...pageParams.value
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

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

async function scanBox() {
  if (!scanCode.value) {
    uni.showToast({
      title: '请扫描箱码',
      icon: 'none'
    })
    return
  }
  try {
    const { data } = await OtherStorageInAPI.ScanningBarCode({
      MATERIALAPPLYFOR_S_UID: pageQuery.value.UID,
      BarCode: scanCode.value,
      cWareHouseCode: pageQuery.value.cWareHouseCode
    })
    console.log(data)
    if (!data) {
      uni.showToast({
        title: '未找到该箱码',
        icon: 'none'
      })
      return
    }
    const { cInvCode, nQuantity } = data
    if (cInvCode !== pageQuery.value.cInvCode) {
      uni.showToast({
        title: '箱码物料与单据物料不匹配',
        icon: 'none'
      })
      return
    }
    if (pageQuery.value.nQuantity && pageQuery.value.nAccQuantity) {
      if (nQuantity !== pageQuery.value.nQuantity / pageQuery.value.nAccQuantity) {
        uni.showModal({
          showCancel: true,
          content: '箱码中数量是否与每包数量不一致，确定执行该操作吗',
          confirmText: '确定',
          cancelText: '取消',
          success: function (r) {
            if (r.confirm) {
              listData.value.unshift(data)
              scanResult.value = data
              getList()
            }
          }
        })
      }
      return
    }
    listData.value.unshift(data)
    scanResult.value = data
    getList()
  } catch {
    //
  }
  scanCode.value = ''
}

function removeBox() {
  const { UID } = currentItem.value
  const index = listData.value.findIndex((item) => item.UID === UID)
  listData.value.splice(index, 1)
  showDeleteModal.value = false
}

async function handleSubmit() {
  if (!listData.value.length) {
    uni.showToast({
      title: '请扫描箱码',
      icon: 'none'
    })
    return
  }
  // 计算箱码总数量和总数量是否一致
  let allCount = 0
  listData.value.forEach((i) => {
    allCount += i.nQuantity ?? 0
  })
  if (pageQuery.value.nQuantity !== allCount) {
    uni.showModal({
      showCancel: true,
      content: '通知数量与所有箱码内数量总数不一致，确定执行该操作吗',
      confirmText: '确定',
      cancelText: '取消',
      success: function (r) {
        if (r.confirm) {
          handleSubmitData()
        }
      }
    })
    return
  }
  handleSubmitData()
}

async function handleSubmitData() {
  uni.showLoading({ title: '保存中' })
  try {
    await OtherStorageInAPI.PDA_Save_Other({
      UID: pageQuery.value.MID,
      MID: pageQuery.value.UID,
      list_body: listData.value.map((i) => ({
        WareHouse_LocationCode: i.cWareHouseCode,
        WareHouse_LocationName: i.cWareHouseName,
        cWareHouseAreaCode: i.cWareHouseAreaCode,
        cBarCode: i.cBarCode,
        cBatch: i.cBatch,
        nQuantity: i.nQuantity
      }))
    })
    listData.value = []
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
  } catch (e) {
    console.error(e)
  }
  uni.hideLoading()
}

const navToDetail = () =>
  uni.navigateTo({
    url:
      '/pages/wms/other-storage-in/detail' +
      urlQueryBuilder({
        UID: pageQuery.value.MID,
        cInvCode: pageQuery.value.cInvCode
      })
  })

onLoad((options) => {
  pageQuery.value = options
})
onShow(() => {})
onHide(() => {})
onUnload(() => {})

onPullDownRefresh(() => {
  resetPageParams()
  getList().then(() => uni.stopPullDownRefresh())
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="其他入库 - 入库操作"
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
                placeholder="请扫描箱码"
                border="surround"
                suffixIcon="scan"
                clearable
                maxlength="30"
                @confirm="scanBox"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="6"> 物料编码：{{ pageQuery?.cInvCode }} </up-col>
            <up-col span="6"> 物料名称：{{ pageQuery?.cInvName }} </up-col>
          </up-row>

          <up-gap height="8" />
        </view>

        <view style="padding-top: 100px">
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 序号：{{ index + 1 }} </up-col>
              <up-col span="6"> 箱码：{{ item.cBarCode }} </up-col>
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 货位：{{ item.cWareHouseAreaCode }} </up-col>
              <up-col span="6"> 数量：{{ item.nQuantity }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  text="删除"
                  type="error"
                  size="small"
                  @click="
                    () => {
                      currentItem.value = item
                      showDeleteModal = true
                    }
                  "
                />
              </view>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>

        <up-loadmore :status="pageInfo.status" />
      </up-list>

      <up-row
        justify="space-between"
        style="position: fixed; bottom: 10px; left: 10px; right: 10px"
        gutter="10"
      >
        <up-col span="6">
          <up-button
            type="error"
            size="small"
            text="查看已库"
            @click="navToDetail"
          />
        </up-col>
        <up-col span="6">
          <up-button
            type="primary"
            size="small"
            text="保存"
            @click="handleSubmit"
          />
        </up-col>
      </up-row>
    </view>

    <up-modal
      :show="showDeleteModal"
      title="提示"
      content="确定删除吗？"
      asyncClose
      showCancelButton
      closeOnClickOverlay
      @close="showDeleteModal = false"
      @cancel="showDeleteModal = false"
      @confirm="removeBox"
    />
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
