<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { DBOutAPI, WareHouseLocationAPI } from '@/api'
import { urlQueryBuilder } from '@/features/query'

const height = ref(getDeviceHeight().totalHeight)

const isFocus = ref('HW')
const xm = ref('')
const hw = ref('')
const ckhw = ref('')
const showDeleteModal = ref(false)
const listData = ref([])
const currentItem = ref(null)
const currentScanXMData = ref({})
const currentScanHWData = ref({})
const currentScanCKHWData = ref({})

const setFocus = (type) => {
  isFocus.value = ''
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
    const { data, success, errmsg } = await DBOutAPI.scanBarCode({
      OrderByFileds: '',
      conditions: 'cKeyCode = ' + xm.value
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
    const { cInvCode, nSumQuinity } = data
    currentScanXMData.value = { ...data, cKeyCode: xm.value }
  } catch {
    //
  }
  xm.value = ''
}

async function scanHW() {
  if (!hw.value) {
    uni.showToast({
      title: '请扫描入库货位',
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
    setFocus('CKHW')
  } catch {
    resetHW()
  }
}

async function scanCKHW() {
  if (!hw.value) {
    uni.showToast({
      title: '请扫描出库货位',
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
    currentScanCKHWData.value = data.data[0]
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
      title: '请扫描入库货位',
      icon: 'none'
    })
    return
  }
  if (!ckhw.value) {
    uni.showToast({
      title: '请扫描出库货位',
      icon: 'none'
    })
    return
  }
  handleSubmitData()
}

async function handleSubmitData() {
  uni.showLoading({ title: '保存中' })
  try {
    const firstData = listData.value.at(0)
    await DBOutAPI.save({
      cOutWareHouseCode: firstData.cOutWareHouseCode,
      cOutWareHouseName: firstData.cOutWareHouseName,
      cInWareHouseCode: firstData.cInWareHouseCode,
      cInWareHouseName: firstData.cInWareHouseName,
      list_body: listData.value.map((i) => ({
        cBarCode: i.cKeyCode
      }))
    })
    listData.value = []
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    xm.value = ''
    hw.value = ''
    ckhw.value = ''
    currentScanXMData.value = {}
    currentScanHWData.value = {}
    currentScanCKHWData.value = {}
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

function resetCKHW() {
  hw.value = ''
  currentScanCKHWData.value = {}
  setFocus('CKHW')
}

function confirmData() {
  if (!currentScanXMData.value.cKeyCode) {
    uni.showToast({
      title: '请扫描箱码',
      icon: 'none'
    })
    setFocus('XM')
    return
  }
  if (!currentScanHWData.value.cWareHouseLocationCode) {
    uni.showToast({
      title: '请扫描入库货位',
      icon: 'none'
    })
    setFocus('HW')
    return
  }
  if (!currentScanCKHWData.value.cWareHouseLocationCode) {
    uni.showToast({
      title: '请扫描出库货位',
      icon: 'none'
    })
    setFocus('CKHW')
    return
  }
  listData.value.unshift({
    ...currentScanXMData.value,
    cInWareHouseLocationCode: currentScanHWData.value.cWareHouseLocationCode,
    cInWareHouseLocationName: currentScanHWData.value.cWareHouseLocationName,
    cInWareHouseAreaCode: currentScanHWData.value.cWareHouseAreaCode,
    cInWareHouseAreaName: currentScanHWData.value.cWareHouseAreaName,
    cOutWareHouseLocationCode: currentScanCKHWData.value.cWareHouseLocationCode,
    cOutWareHouseLocationName: currentScanCKHWData.value.cWareHouseLocationName,
    cOutWareHouseAreaCode: currentScanCKHWData.value.cWareHouseAreaCode,
    cOutWareHouseAreaName: currentScanCKHWData.value.cWareHouseAreaName
  })
  xm.value = ''
  currentScanXMData.value = {}
  setFocus('XM')
}

onLoad(() => {})
onShow(() => {})
onHide(() => {})
onUnload(() => {})
onPullDownRefresh(() => {})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="调拨出库"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <up-list :height="`calc(100vh - ${height + 20}px)`">
        <view class="fix-area">
          <up-row justify="space-between">
            <up-col span="12">
              <up-input
                v-model="hw"
                placeholder="请扫描入库货位"
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
                v-model="ckhw"
                placeholder="请扫描出库货位"
                border="surround"
                suffixIcon="scan"
                clearable
                maxlength="30"
                @confirm="scanCKHW"
                :focus="isFocus === 'CKHW'"
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
            <up-col span="6"> 箱码：{{ currentScanXMData?.cKeyCode }} </up-col>
            <up-col span="6"> 数量：{{ currentScanXMData?.nSumQuinity }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="6"> 入库货位：{{ currentScanHWData?.cWareHouseLocationName }} </up-col>
            <up-col span="6"> 出库货位：{{ currentScanCKHWData?.cWareHouseLocationName }} </up-col>
          </up-row>
          <up-gap height="8" />
          <up-row justify="space-between">
            <up-col span="12">
              <view style="display: flex; justify-content: flex-end">
                <view>
                  <up-button
                    type="error"
                    size="small"
                    text="重扫入库货位"
                    @click="resetHW"
                  />
                </view>
                <view style="margin-left: 10rpx">
                  <up-button
                    type="error"
                    size="small"
                    text="重扫出库库货位"
                    @click="resetCKHW"
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
              <up-col span="6"> 箱码：{{ item.cKeyCode }} </up-col>
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 货位：{{ item.cWareHouseLocationName }} </up-col>
              <up-col span="6"> 数量：{{ item.nSumQuinity }} </up-col>
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
                      currentItem = item
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
        <up-col span="12">
          <up-button
            type="error"
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
