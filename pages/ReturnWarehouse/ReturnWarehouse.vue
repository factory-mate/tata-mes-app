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
        <view style="display: flex; justify-content: start; align-items: center; margin-top: 4px">
          <view style="min-width: 60px">线边仓：</view>
          <up-input
            v-model="XMsearchValue"
            :focus="focusType"
            @confirm="getXM"
            @blur="setfocus"
            placeholder="请扫描线边仓"
          />
        </view>
      </uni-col>
      <uni-col :span="8">
        <view style="margin-left: 4px">线边仓：{{ changkuData.cWareHouseName }}</view>
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
        <!-- 搜索框 -->
        <view class="search-wl">
          <uni-row class="demo-uni-row">
            <uni-col :span="18">
              <view
                style="
                  display: flex;
                  text-align: center;
                  justify-content: start;
                  align-items: center;
                "
              >
                <view style="width: 60px">通知单：</view>
                <!-- 搜索框 -->
                <input
                  class="inputSty"
                  v-model="codeVal"
                  @input=""
                  focus=""
                  @blur=""
                  placeholder="请输入通知单"
                  placeholder-style="font-size:12px"
                  style="line-height: 30px; height: 30px"
                />
              </view>
            </uni-col>
            <uni-col :span="6">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="cliclCode"
                style="margin-left: 10rpx"
              >
                确定
              </button>
            </uni-col>
          </uni-row>
        </view>

        <scroll-view
          class="listMain"
          :style="'height:' + (h - 220) + 'px'"
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
                  <view class="demo-uni-col dark">线边仓：{{ item.cDefindParm02 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="9">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="clickView(item)"
                  >
                    详情
                  </button>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <uni-load-more :status="more"></uni-load-more>
        </scroll-view>
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
import {
  PDAGetStockByBarCode,
  changKuGetForList,
  CheckApplyForGetForPage,
  Return_Add
} from '@/api/PDA_3.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const title = ref('退料入库')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待入库'])
const searchValue = ref('') // 箱码输入框绑定值ist
const danjuList = ref([])
const WList = ref([])
const XMliST = ref([])
const XMsearchValue = ref('')
const codeVal = ref('')
const UID = ref('')
const dhVal = ref('')
const changkuData = ref('')
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
  h.value = uni.getSystemInfoSync().windowHeight
  danjuList.value = []
  getlist()
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
    url: '/pages/ReturnWarehouse/ReturnWarehouseView?UID=' + v.UID
  })
}

//Tab切换
const onClickItem = (e) => {
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
const getXM = async () => {
  await getCangku()
  danjuList.value = []
  await getlist()
}
// 仓库数据
const getCangku = async () => {
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
const getlist = async () => {
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: codeVal.value
      ? 'cVouchTypeCode=02 && iStatus=1 && cCode like ' + codeVal.value
      : 'cVouchTypeCode=02 && iStatus=1'
  }
  uni.showLoading({
    title: '加载中'
  })
  CheckApplyForGetForPage(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.status == 200) {
      danjuList.value = [...danjuList.value, ...res.data.data]
      pageTotal.value = res.data.pageCount
    }
  })
}
const cliclCode = () => {
  currentPage.value = 1
  total.value = 0
  danjuList.value = []
  getlist()
}
const clickAdd = () => {
  if (danjuList.value.length) {
    uni.showLoading({
      title: '加载中'
    })
    danjuList.value.forEach((item) => {
      item.cBarCode = item.x
      item.cWareHouseLocationCode = item.x
      item.cWareHouseLocationName = item.x
    })
    let obj = {
      Head: {
        PID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        cSourceCode: codeVal.value,
        cWareHouseCode: changkuData.value.cWareHouseCode,
        cWareHouseName: changkuData.value.cWareHouseName,
        cMemo: 'string'
      },
      Bodys: danjuList.value
    }
    Return_Add(obj).then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: res.msg || ''
      })
      // danjuList.value=[]
      getlist()
    })
  }
}
const clickTJ = () => {
  if (danjuList.value.length) {
    uni.showLoading({
      title: '加载中'
    })
    let obj = {
      IsCommit: true, //是否提交
      // cCode:cCode.value,
      UID: UID.value || '00000000-0000-0000-0000-000000000000',
      Items: danjuList.value,
      cDefindParm02: xiangMObj.value.cWareHouseCode, //编码
      cDefindParm03: xiangMObj.value.cWareHouseName, //名称
      cVouchSourceTypeCode: '002',
      cVouchTypeCode: '02'
    }
    Return_Add(obj).then((res) => {
      console.log(res, '---3333')

      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: res.msg || '1111222'
      })
      // danjuList.value=[]
      getlist()
    })
  }
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
  getlist()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    getlist()
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
