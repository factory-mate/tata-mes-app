<script setup>
import { onLoad, onShow, onHide, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { API } from './api'
import { getDeviceHeight } from '@/features/device'
import { usePageParams } from '@/hooks'
import { queryBuilder } from '@/features/query'

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

const height = ref(getDeviceHeight().totalHeight)
const detailData = ref({})
const listData = ref([])

async function getList() {
  try {
    const { data } = await API.packageDetail({
      PageIndex: pageParams.value.pageIndex,
      PageSize: pageParams.value.pageSize,
      OrderByFileds: '',
      Conditions: `cCode=${detailData.value.code}`
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

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

function handleDetail(item) {
  uni.navigateTo({ url: `/pages/gzsmrk/package-detail?code=${item.Pbarcode}` })
}

onLoad((options) => {
  detailData.value.code = options.code
})
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
      title="柜子扫码入库-详情"
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
          <up-gap height="8" />

          <up-row justify="space-between">
            <up-col span="12"> P单号：{{ detailData.code }} </up-col>
          </up-row>
          <up-row justify="space-between">
            <up-col span="12"> 包数：{{ pageInfo.dataCount }} </up-col>
          </up-row>

          <up-gap height="8" />
        </view>

        <view style="padding-top: 80px">
          <up-list-item
            v-for="(item, index) in listData"
            :key="index"
          >
            <up-row justify="space-between">
              <up-col span="6"> 包装码：{{ item.Pbarcode }} </up-col>
              <up-col span="6"> 包内数量：{{ item.iDefindParm14 }} </up-col>
            </up-row>
            <up-row justify="space-between">
              <up-col span="6"> 第几包：{{ item.PackageIndex }} </up-col>
            </up-row>
            <up-row justify="flex-end">
              <view style="display: flex; align-items: flex-end">
                <up-button
                  text="详情"
                  type="error"
                  size="small"
                  @click="handleDetail(item)"
                />
              </view>
            </up-row>
            <up-divider />
          </up-list-item>
        </view>
        <up-loadmore :status="pageInfo.status" />
      </up-list>
    </view>
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

.btn-area {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
