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

const isFocus = ref(true)
const listData = ref([])
const formData = ref({
  UID: '',
  cInvCode: '',
  cInvName: '',
  cWareHouseName: ''
})
const inputData = ref({
  code: '',
  num: ''
})
const materialData = ref({})

const setFocus = () => {
  isFocus.value = false
  setTimeout(() => {
    isFocus.value = true
  }, 200)
}

const resetInputData = () => {
  inputData.value.code = ''
  inputData.value.num = ''
}

const resetMaterialData = () => {
  materialData.value = {}
}

const scanCode = async () => {
  try {
    const { data, success } = await API.getByBarcode({ val: inputData.value.code })
    if (success) {
      // 校验物料编码是否一致
      if (data.cInvCode !== formData.value.cInvCode) {
        uni.showToast({
          title: '物料编码不一致',
          icon: 'none'
        })
        resetMaterialData()
        resetInputData()
        setFocus()
        return
      }
      materialData.value = data
    } else {
      resetMaterialData()
      resetInputData()
      setFocus()
    }
  } catch {
    resetMaterialData()
    resetInputData()
    setFocus()
  }
}

const handleConfirm = () => {
  if (!inputData.value.code) {
    uni.showToast({
      title: '请填写物料编码',
      icon: 'none'
    })
    setFocus()
    return
  }
  if (!inputData.value.num) {
    uni.showToast({
      title: '请填写数量',
      icon: 'none'
    })
    setFocus()
    return
  }
  listData.value.push({
    ...materialData.value,
    nQuantity: inputData.value.num,
    cInvCode: materialData.value.cInvCode,
    cInvName: materialData.value.cInvName
  })
  resetInputData()
  setFocus()
}

const handleDelete = (index) => {
  listData.value.splice(index, 1)
}

const handleSave = async (data) => {
  if (!listData.value.length) {
    uni.showToast({
      title: '请添加盘点数据',
      icon: 'none'
    })
    return
  }
  uni.showLoading({ title: '处理中' })
  try {
    await API.save({
      list_InvInfo: listData.value
    })
    uni.hideLoading()
    uni.showToast({
      title: '操作成功',
      icon: 'success'
    })
    uni.navigateBack({
      delta: 1
    })
  } catch {
    //
  }
  uni.hideLoading()
}

onLoad((options) => {
  formData.value.UID = options.UID
  formData.value.cInvCode = options.cInvCode
  formData.value.cInvName = options.cInvName
  formData.value.cWareHouseName = options.cWareHouseName
})
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
      title="盘点操作"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <up-list :height="`calc(100vh - ${height + 20}px)`">
        <view class="fix-area">
          <up-row justify="space-between">
            <up-col span="6">库区：{{ formData.cWareHouseName }}</up-col>
            <up-col span="6">物料编码： {{ formData.cInvCode }}</up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="3">箱码</up-col>
            <up-col span="9">
              <up-input
                v-model="inputData.code"
                @confirm="scanCode"
                :focus="isFocus"
                placeholder=""
                border="surround"
                clearable
                maxlength="30"
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="3">数量：</up-col>
            <up-col span="9">
              <up-input
                v-model="inputData.num"
                type="number"
                placeholder=""
                border="surround"
                clearable
              />
            </up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="6">物料编码： {{ materialData.cInvCode }}</up-col>
          </up-row>

          <up-gap height="8" />

          <up-row justify="end">
            <up-col span="2">
              <up-button
                type="error"
                size="small"
                text="确定"
                @click="handleConfirm"
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
              <up-col span="6"> 物料编码：{{ item.cInvCode }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
              <up-col span="6"> 数量：{{ item.nQuantity }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end; gap: 8px">
                <up-button
                  text="删除"
                  type="error"
                  size="small"
                  @click="handleDelete(index)"
                />
              </view>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>
        <view style="position: fixed; bottom: 10px; left: 10px; right: 10px">
          <up-button
            text="保存"
            type="error"
            @click="handleSave"
          />
        </view>
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
