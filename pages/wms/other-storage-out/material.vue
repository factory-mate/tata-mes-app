<script setup>
import { ref } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { OtherStorageOutAPI } from '@/api'
import { urlQueryBuilder } from '@/features/query'

const height = ref(getDeviceHeight().totalHeight)

const { pageInfo, handleScrollToLower, setPageInfo } = usePageParams()

const pageQuery = ref({})
const listData = ref([])

async function getList() {
  try {
    const {
      // data: { data, dataCount, pageCount }
      data
    } = await OtherStorageOutAPI.GetSByMID_UnAllOut({
      MID: pageQuery.value.id
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

const navToSubmit = (item) => {
  const { UID, MID, cInvCode, cInvName, ...rest } = item
  uni.navigateTo({
    url:
      `/pages/wms/other-storage-out/submit` +
      urlQueryBuilder({
        UID,
        MID,
        cInvCode,
        cInvName,
        cWareHouseCode: pageQuery.value.code
      })
  })
}

onLoad((options) => {
  pageQuery.value = options
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
      title="其他出库 - 待出库"
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
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 物料编码：{{ item.cInvCode }} </up-col>
              <up-col span="6"> 物料名称：{{ item.cInvName }} </up-col>
            </up-row>
            <up-gap height="8" />
            <up-row justify="space-between">
              <up-col span="6"> 规格型号：{{ item.cInvStd }} </up-col>
              <up-col span="6"> 数量：{{ item.nQuantity }} </up-col>
            </up-row>
            <up-gap height="12" />
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  text="下架"
                  type="error"
                  size="small"
                  @click="navToSubmit(item)"
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
</style>
