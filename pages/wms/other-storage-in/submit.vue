<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { OtherStorageInAPI, WareHouseLocationAPI } from '@/api'
import { urlQueryBuilder } from '@/features/query'

const height = ref(getDeviceHeight().totalHeight)

const isFocus = ref('HW')
const xm = ref('')
const hw = ref('')
const showDeleteModal = ref(false)
const pageQuery = ref({})
const listData = ref([])
const currentItem = ref(null)
const currentScanXMData = ref({})
const currentScanHWData = ref({})

const setFocus = (type) => {
  isFocus.value = type
  setTimeout(() => {
    isFocus.value = type
  }, 200)
}

async function scanBox() {
  if (!xm.value) {
    uni.showToast({
      title: '请扫描箱码',
      icon: 'none'
    })
    resetXM()
    return
  }
  try {
    const { data, success, errmsg } = await OtherStorageInAPI.ScanningBarCode({
      MATERIALAPPLYFOR_S_UID: pageQuery.value.UID,
      BarCode: xm.value,
      cWareHouseCode: pageQuery.value.cWareHouseCode
    })
    if (!success) {
      const errmsgTitle = errmsg?.[0]?.msg || '未找到该箱码'
      uni.showToast({
        title: errmsgTitle,
        icon: 'none'
      })
      resetXM()
      return
    }
    if (!data) {
      uni.showToast({
        title: '未找到该箱码',
        icon: 'none'
      })
      resetXM()
      return
    }
    const { cInvCode, nQuantity } = data
    if (cInvCode !== pageQuery.value.cInvCode) {
      uni.showToast({
        title: '箱码物料与单据物料不匹配',
        icon: 'none'
      })
      resetXM()
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
              currentScanXMData.value = { ...data, cBarCode: xm.value }
            } else {
              resetXM()
            }
          }
        })
      }
      return
    }
    currentScanXMData.value = { ...data, cBarCode: xm.value }
  } catch {
    //
  }
  xm.value = ''
}

async function scanHW() {
  if (!hw.value) {
    uni.showToast({
      title: '请扫描货位',
      icon: 'none'
    })
    return
  }
  try {
    const { data, success } = await WareHouseLocationAPI.GetForPage({
      PageIndex: 1,
      PageSize: 10,
      OrderByFileds: '',
      Conditions: `cWareHouseLocationCode = ${hw.value}`
    })
    if (data.data.length === 0) {
      uni.showToast({
        title: '货位不存在',
        icon: 'none'
      })
      resetHW()
      return
    }
    currentScanHWData.value = data.data[0]
    setFocus('XM')
  } catch {
    resetHW()
  }
}

function removeBox() {
  const { UID } = currentItem.value
  const index = listData.value.findIndex((item) => item.UID === UID)
  listData.value.splice(index, 1)
  showDeleteModal.value = false
}

async function onClickSave() {
  if (!listData.value.length) {
    uni.showToast({
      title: '请扫描箱码',
      icon: 'none'
    })
    return
  }
  if (!hw.value) {
    uni.showToast({
      title: '请扫描货位',
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
        WareHouse_LocationCode: i.cWareHouseLocationCode,
        WareHouse_LocationName: i.cWareHouseLocationName,
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

function resetXM() {
  xm.value = ''
  currentScanXMData.value = {}
  setFocus('XM')
}

function resetHW() {
  hw.value = ''
  currentScanHWData.value = {}
  setFocus('HW')
}

function confirmData() {
  if (!currentScanXMData.value.cBarCode) {
    uni.showToast({
      title: '请扫描箱码',
      icon: 'none'
    })
    setFocus('XM')
    return
  }
  if (!currentScanHWData.value.cWareHouseLocationCode) {
    uni.showToast({
      title: '请扫描货位',
      icon: 'none'
    })
    setFocus('HW')
    return
  }
  listData.value.unshift({
    ...currentScanXMData.value,
    cWareHouseLocationCode: currentScanHWData.value.cWareHouseLocationCode,
    cWareHouseLocationName: currentScanHWData.value.cWareHouseLocationName,
    cWareHouseAreaCode: currentScanHWData.value.cWareHouseAreaCode
  })
  xm.value = ''
  currentScanXMData.value = {}
  setFocus('XM')
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
onPullDownRefresh(() => {})
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
      <up-list :height="`calc(100vh - ${height + 20}px)`">
        <view class="fix-area">
          <up-row justify="space-between">
            <up-col span="6"> 物料编码：{{ pageQuery?.cInvCode }} </up-col>
            <up-col span="6"> 物料名称：{{ pageQuery?.cInvName }} </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="12">
              <up-input
                v-model="hw"
                placeholder="请扫描货位"
                border="surround"
                suffixIcon="scan"
                clearable
                maxlength="30"
                @confirm="scanHW"
                :focus="isFocus === 'HW'"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="12">
              <up-input
                v-model="xm"
                placeholder="请扫描箱码"
                border="surround"
                suffixIcon="scan"
                clearable
                maxlength="30"
                @confirm="scanBox"
                :focus="isFocus === 'XM'"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="6"> 箱码：{{ currentScanXMData?.cBarCode }} </up-col>
            <up-col span="6"> 货位：{{ currentScanHWData?.cWareHouseLocationName }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="6"> 数量：{{ currentScanXMData?.nQuantity }} </up-col>
            <up-col span="6">
              <view style="display: flex; justify-content: flex-end">
                <view>
                  <up-button
                    type="error"
                    size="small"
                    text="重扫货位"
                    @click="resetHW"
                  />
                </view>
                <view style="margin-left: 10rpx">
                  <up-button
                    type="error"
                    size="small"
                    text="添加"
                    @click="confirmData"
                  />
                </view>
              </view>
            </up-col>
          </up-row>

          <up-gap height="8" />
        </view>

        <view style="padding-top: 220px">
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
              <up-col span="6"> 货位：{{ item.cWareHouseLocationName }} </up-col>
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
            text="查看入库"
            @click="navToDetail"
          />
        </up-col>
        <up-col span="6">
          <up-button
            type="primary"
            size="small"
            text="保存"
            @click="onClickSave"
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
