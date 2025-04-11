<template>
  <view class="changeList">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
    />
    <view>
      <up-tabs
        :list="[{ name: '待处理' }, { name: '待审核' }, { name: '已处理' }]"
        :scrollable="false"
        :current="currentTabIndex"
        @click="onClickTabItem"
      ></up-tabs>

      <up-list
        class="listMain"
        :style="'height:' + (h - 140) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in listData"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view
                v-if="currentTabIndex == 0"
                class="demo-uni-col dark"
                style="font-size: 16px; color: blue"
              >
                申报工位：{{ item.EndOperator }}
              </view>
              <view v-else>
                <view
                  class="demo-uni-col dark"
                  style="font-size: 16px; color: blue"
                >
                  处理人：{{ item.cCreateUserName }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="24">
              <!-- <view
                class="demo-uni-col dark"
                style="font-size: 16px; color: blue"
                >申报日期：{{ item.max_Error_dReportDate }}</view
              > -->
              <view
                v-if="currentTabIndex == 0"
                class="demo-uni-col dark"
                style="font-size: 16px; color: blue"
              >
                生产时间：{{ item.dProductDate }}
              </view>
              <view
                v-if="currentTabIndex == 1"
                class="demo-uni-col dark"
                style="font-size: 16px; color: blue"
              >
                处理时间：{{ item.dCreateTime }}
              </view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">单号：{{ item.cCode }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">单序号：{{ item.iOrderIndex }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">尺寸：{{ item.X }}*{{ item.Y }}*{{ item.Z }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">材质：{{ item.cDynamicsParm06 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">面板分号：{{ item.cBOMDefindParm13 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">包装产线：{{ item.PackageUnitName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">总序号：{{ item.S_S_S_iIndex }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">申报时间：{{ item.EndTime }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">加工码：{{ item.cBarCode }}</view>
            </uni-col>
          </uni-row>
          <view class="Two-btn">
            <button
              v-if="currentTabIndex == 0"
              class="mini-btn"
              style="background-color: blue"
              type="warn"
              size="mini"
              @click="goReapirReturn(item)"
            >
              返修
            </button>
            <button
              v-if="currentTabIndex == 0"
              class="mini-btn"
              style="background-color: green"
              type="warn"
              size="mini"
              @click="Close(item)"
            >
              关闭
            </button>
            <button
              v-if="currentTabIndex === 1"
              class="mini-btn"
              style="background-color: blue"
              type="warn"
              size="mini"
              @click="handleAudit(item)"
            >
              审核
            </button>
            <button
              v-if="currentTabIndex === 1"
              class="mini-btn"
              style="background-color: blue"
              type="warn"
              size="mini"
              @click="handleRevoke(item)"
            >
              驳回
            </button>
            <button
              v-if="currentTabIndex !== 0"
              class="mini-btn"
              style="background-color: green"
              type="warn"
              size="mini"
              @click="goToDetail(item)"
            >
              详情
            </button>
          </view>
        </view>
      </up-list>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { usePageParams } from '@/hooks'
import { ErrorList, ErrorListClose, RepairVouchList, RepairVouchVerify } from '@/api/PDA.js'
const h = ref('100')
const title = ref('内返PDA')
const currentTabIndex = ref(0)

const { pageParams, pageInfo, handleScrollToLower, setPageInfo, clearPageParams, clearPageInfo } =
  usePageParams()

function resetPageParams() {
  clearPageParams()
  clearPageInfo()
  listData.value = []
}

const listData = ref([])

//异常列表
const fetchList = async () => {
  uni.showLoading({ title: '加载中' })
  try {
    const cLoginName = uni.getStorageSync('account').cLoginName ?? null
    let resData = []
    let pc = 0
    let dc = 0
    if (currentTabIndex.value == 0) {
      const {
        data: { data },
        dataCount,
        pageCount
      } = await ErrorList({
        PageIndex: pageParams.value.pageIndex,
        PageSize: pageParams.value.pageSize
      })
      resData = data ?? []
      pc = pageCount
      dc = dataCount
    } else if (currentTabIndex.value == 1) {
      const {
        data: { data },
        dataCount,
        pageCount
      } = await RepairVouchList({
        bVerify: false,
        PageIndex: pageParams.value.pageIndex,
        PageSize: pageParams.value.pageSize,
        Conditions: 'cVerifyUserCode like ' + cLoginName
      })
      resData = data ?? []
      pc = pageCount
      dc = dataCount
    } else if (currentTabIndex.value == 2) {
      const {
        data: { data },
        dataCount,
        pageCount
      } = await RepairVouchList({
        bVerify: true,
        PageIndex: pageParams.value.pageIndex,
        PageSize: pageParams.value.pageSize,
        Conditions: 'cVerifyUserCode like ' + cLoginName
      })
      resData = data ?? []
      pc = pageCount
      dc = dataCount
    }
    listData.value = [...listData.value, ...resData]
    setPageInfo({ dataCount: dc, pageCount: pc })
    uni.hideLoading()
    uni.stopPullDownRefresh()
  } catch (e) {
    console.log(e)
    uni.hideLoading()
  }
}

//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
//列表跳转返修页
const goReapirReturn = (i) => {
  uni.navigateTo({
    url: '/pages/InSendPDA/ReturnReapir?itemInfo=' + JSON.stringify(i)
  })
}

//关闭
const Close = async (i) => {
  const res = await ErrorListClose({
    UID: i.UID
  })
  if (res.status == 200) {
    uni.showToast({
      icon: 'none',
      title: res.msg
    })
    listData.value = []
    fetchList()
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg
    })
  }
}

const onClickTabItem = (item) => {
  currentTabIndex.value = item.index
  resetPageParams()
  fetchList()
}

const handleAudit = async (item) => {
  uni.showLoading({ title: '处理中' })
  const res = await RepairVouchVerify({
    bOK: true,
    UID: item.UID
  })
  if (res.success) {
    uni.showToast({
      title: '操作成功',
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '操作失败',
      icon: 'none'
    })
  }
  uni.hideLoading()
  listData.value = []
  fetchList()
}

const handleRevoke = async (item) => {
  uni.showLoading({ title: '处理中' })
  const res = await RepairVouchVerify({
    bOK: false,
    UID: item.UID
  })
  if (res.success) {
    uni.showToast({
      title: '操作成功',
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '操作失败',
      icon: 'none'
    })
  }
  uni.hideLoading()
  listData.value = []
  fetchList()
}

const goToDetail = (i) => {
  uni.navigateTo({
    url: '/pages/InSendPDA/detail?itemInfo=' + JSON.stringify(i)
  })
}

//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
})
onShow(() => {
  listData.value = []
  fetchList()
})

onPullDownRefresh(async () => {
  resetPageParams()
  await fetchList()
  uni.stopPullDownRefresh()
})
</script>

<style scoped lang="scss">
.changeList {
  padding-bottom: 10rpx;
  width: 100%;
  height: 100%;

  .top-search {
    padding: 0 20rpx;
    border-bottom: 1px solid #eee;
  }

  .listMain {
    margin-top: 2px;
    width: 100%;
    height: calc(100% - 240rpx);
    font-size: 14px;

    .project {
      background: #fff;
      padding: 20rpx;
      margin: 30rpx 20rpx;
      border-radius: 4px;
      box-shadow: 0 0 10px #d6d6d6;
      .demo-uni-row {
        padding: 5px 0;
      }
      .Two-btn {
        display: flex;
        justify-content: flex-end;
        .mini-btn {
          margin: 10px 5px;
        }
      }
    }
  }
}
</style>
