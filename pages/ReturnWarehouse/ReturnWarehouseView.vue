<template>
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
      right-icon="home"
      @clickRight="clickRight"
    />
    <uni-row class="head_row">
      <uni-col :span="16">
        <view style="display: flex; margin-top: 4px; justify-content: start; align-items: center">
          <view style="min-width: 60px">线边仓：</view>
          <view
            class=""
            style="height: 40px"
          >
            <up-input
              v-model="XMsearchValue"
              @confirm="getXM"
              :focus="focusType"
              @blur="setfocus"
              placeholder="请扫描线边仓"
            />
          </view>
        </view>
      </uni-col>
      <uni-col :span="8">
        <view style="margin-left: 4px"> 线边仓：{{ changkuData.cWareHouseName }}</view>
      </uni-col>
    </uni-row>
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="onClickItem"
        @click="clickTab"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
        <scroll-view
          class="listMain"
          :style="'height:' + (h - 260) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view
            class="project"
            v-for="(item, i) in danjuList"
            :key="i"
          >
            <view class="wLIst">
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">通知单号：{{ item.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">线边仓：{{ item.cOutWareHouseName }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">制单时间：{{ item.dDate }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">数量：{{ item.sumInQuantity }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">箱数：{{ item.sumInNum }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                </uni-col>
                <uni-col :span="16">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="clickView(item)"
                    style="background-color: darkgoldenrod"
                  >
                    上架
                  </button>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <uni-load-more :status="more"></uni-load-more>
        </scroll-view>
        <!-- <view class="BTN-Two">
					<button class="mini-btn" style="color:black;backgroundColor:#1AAD19;borderColor:#1AAD19" type="warn"
						size="mini">保存</button>
					<button class="mini-btn" type="warn" style="color:black;backgroundColor:#ffff7f;borderColor:#ffff7f"
						size="mini">提交</button>
				</view> -->
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, toRefs, reactive, nextTick, watch } from 'vue'
import {
  onLoad,
  onShow,
  onUnload,
  onHide,
  onBackPress,
  onReachBottom,
  onPullDownRefresh
} from '@dcloudio/uni-app'
import { changKuGetForList, Return_Add, THStatisticsForPage } from '@/api/PDA_3.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const title = ref('退料入库-物料')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待入库-物料'])
const searchValue = ref('') // 箱码输入框绑定值ist
const danjuList = ref([])
const XMliST = ref([])
const XMsearchValue = ref('')
const UID = ref('')
const changkuData = ref('')
const dhVal = ref('')
const DJType = ref(true)
const WLType = ref(false)
const XMType = ref(false)
const tabVal = ref(0)
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
onShow(() => {})

//加载页面
onLoad((option) => {
  UID.value = option.UID
  h.value = uni.getSystemInfoSync().windowHeight
  getList()
})
//货位输入框聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}

const clickView = (v) => {
  uni.navigateTo({
    url:
      '/pages/ReturnWarehouse/ReturnWarehouseViewRK?cw=' +
      XMsearchValue.value +
      '&obj=' +
      JSON.stringify(v)
  })
}
// 仓库数据
const getXM = () => {
  let obj = {
    OrderByFileds: '',
    Conditions: 'cWareHouseCode = ' + XMsearchValue.value
  }
  changKuGetForList(obj).then((res) => {
    changkuData.value = ''
    if (res.data.length) {
      changkuData.value = res.data[0]
    }
  })
}
const getList = () => {
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: 'mid=' + UID.value + ' && SumRestQuantity > 0'
  }
  uni.showLoading({
    title: '加载中'
  })
  THStatisticsForPage(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.status == 200) {
      danjuList.value = [...danjuList.value, ...res.data.data]
      pageTotal.value = res.data.pageCount
    }
  })
}
//Tab切换
const onClickItem = (e) => {
  console.log(e, '---ee')
  tabVal.value = e.currentIndex
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (e.currentIndex == 1) {
    DJType.value = true
    WLType.value = false
    XMType.value = false
  }
}
const clickTab = (v) => {
  if (tabVal.value) {
    DJType.value = true
    WLType.value = false
    XMType.value = false
  }
}
const clickDan = () => {
  console.log('单据')
}
//继续扫描
const ScanXM = () => {
  current.value = 0
}
//物料详情
const WLdetail = () => {
  // WList.value = ['1']
  DJType.value = false
  WLType.value = true
  XMType.value = false
}
//箱码详情
const XMDetail = () => {
  // XMliST.value = ['2']
  DJType.value = false
  WLType.value = false
  XMType.value = true
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  danjuList.value = []
  getList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  // console.log('上拉');
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    getList()
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
const clickRight = () =>
  uni.switchTab({
    url: '/pages/tabbar/workHome/index'
  })
</script>

<style scoped lang="scss">
.head_row {
  box-sizing: border-box;
  padding: 0 10rpx;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .content {
    width: 100%;
    font-size: 12px;
    .Three-List {
      .Three-wlInfo-list {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;
        padding-bottom: 10px;
        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;

          .mini-btn {
            margin-left: 60rpx;
          }
        }
      }
    }
    .TWO-wlInfo {
      .TWO-wlInfo-list {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;
        padding-bottom: 10px;
        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;

          .mini-btn {
            margin-left: 60rpx;
          }
        }
      }
    }

    .search-wl {
      background: #fff;
      font-size: 12px;
      margin: 20rpx 10rpx;
      border-bottom: 1px solid #eee;

      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        .search-inpt {
          margin: -20px 0;
          .uni-section {
            background-color: none;
            margin-top: 0;
            .uni-searchbar {
              padding: 0;
              ::v-deep .uni-searchbar__box {
                height: 30px !important;
              }
            }
          }
        }
      }
    }

    // .listMain {
    // 	margin-top: 2px;
    // 	width: 100%;
    // 	height: calc(100% - 240rpx);
    // 	overflow-y: auto;
    // 	font-size: 14px;
    // }

    .BTN-Two {
      display: flex;
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;
      // border: 1px solid red;
      box-sizing: border-box;

      .project {
        // border: 1px solid red;
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #ddd;
        padding-bottom: 10px;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;

          .mini-btn {
            margin-left: 60rpx;
          }
        }

        .four-btn {
          display: flex;
          margin: 10px;
        }
      }
    }

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;
    }
  }
}
.inputSty {
  margin: 0;
}
.uni-searchbar__box {
  height: 30px !important;
  padding: 0;
}
</style>
