<script setup>
import { ref } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { OtherStorageOutAPI } from '@/api'

const height = ref(getDeviceHeight().totalHeight)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const pageQuery = ref({})
const listData = ref([])

async function getList() {
  try {
    const {
      // data: { data, dataCount, pageCount }
    } = await OtherStorageOutAPI.GetRDRECORD_SBySource({
      MATERIAL_APPLYFOR_UID: pageQuery.value.UID,
      cInvCode: pageQuery.value.cInvCode
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

onLoad((options) => {
  pageQuery.value = options
  console.log(options)
  getList()
})

onPullDownRefresh(() => {
  resetPageParams()
  getList().then(() => uni.stopPullDownRefresh())
})
</script>

<template>
  <view :style="{ paddingTop: `${height}px` }">
    <up-navbar
      title="其他入库 - 已入库"
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
        <view>
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 序号：{{ index + 1 }} </up-col>
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 箱码：{{ item.cBarCode }} </up-col>
              <up-col span="6"> 数量：{{ item.nQuantity }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="space-between">
              <up-col span="6"> 批次号：{{ item.cBatch }} </up-col>
              <up-col span="6"> 货位：{{ item.cWareHouseLocationName }} </up-col>
            </up-row>
            <up-gap height="12" />
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
</style>
