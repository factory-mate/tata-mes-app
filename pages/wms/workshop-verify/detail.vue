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

const UID = ref('')
const cCode = ref('')
const listData = ref([])

async function getList() {
  try {
    const { data } = await API.getDetail({
      val: UID.value
    })
    listData.value = [...listData.value, ...data]
    uni.hideLoading()
    uni.stopPullDownRefresh()
  } catch (e) {
    console.log(e)
    uni.hideLoading()
  }
}

const handleEdit = async (data) => {
  uni.showLoading({ title: '处理中' })
  try {
    const { success } = await API.edit({
      UID: UID.value,
      cCode: cCode.value,
      list_body: listData.value
    })
    if (success) {
      uni.showToast({
        title: '操作成功',
        icon: 'success'
      })
      listData.value = []
      getList()
      uni.navigateTo({
        url: `/pages/wms/workshop-verify/index`
      })
    }
  } catch {
    //
  }
  uni.hideLoading()
}

onLoad((options) => {
  UID.value = options.UID
  cCode.value = options.cCode
})
onShow(() => getList())
onHide(() => {})
onUnload(() => {})

onPullDownRefresh(async () => {
  listData.value = []
  await getList()
  uni.stopPullDownRefresh()
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="物料详情"
      bgColor="red"
      leftIconColor="white"
      :titleStyle="{ color: 'white' }"
      autoBack
    />

    <view class="container">
      <up-list :height="`calc(100vh - ${height + 20}px)`">
        <view style="padding-bottom: 40px">
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 序号：{{ index + 1 }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 物料编码：{{ item.cInvCode }} </up-col>
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 规格型号：{{ item.cInvStd }} </up-col>
              <up-col span="6"> 领料原因：{{ item.cReasonName }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="3"> 数量： </up-col>
              <up-col span="9">
                <up-input
                  type="number"
                  v-model="item.nQuantity"
                  placeholder=""
                  border="surround"
                  clearable
                  maxlength="30"
                />
              </up-col>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>

        <view style="position: fixed; bottom: 10px; left: 10px; right: 10px">
          <up-button
            text="保存"
            type="error"
            @click="handleEdit"
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
