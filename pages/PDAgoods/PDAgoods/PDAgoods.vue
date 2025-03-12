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
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="(e) => onClickItem(e)"
        @click="clickTab"
      />
    </view>
    <view class="content">
      <view v-if="current === 0 && !Vtype">
        <view
          class="search-wl"
          style="display: flex; align-items: center"
        >
          <view
            class=""
            style="flex: 1"
          >
            <!-- 搜索框 -->
            <uni-section
              v-if="branch != 'alps'"
              title=""
              type="line"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
                :focus="focusType"
                @blur="setfocus"
                @confirm="getDH"
                v-model="searchValue"
                placeholder="请输入到货单"
              >
              </uni-search-bar>
            </uni-section>
            <input
              v-else
              class="inputSty"
              v-model="searchValue"
              @input="getDH"
              :focus="focusType"
              @blur="setfocus"
              placeholder="请扫描到货单"
              placeholder-style="font-size:12px"
            />
          </view>
          <button
            style="width: 100px; height: 30px; margin-top: 6px; margin-right: 6px"
            class="mini-btn"
            type="warn"
            size="mini"
            @click="handleSearch"
          >
            搜索
          </button>
        </view>
        <view
          class="text"
          v-if="!ConfirmList.length"
          >无数据，请扫描</view
        >
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 200) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in ConfirmList"
              :key="item.UID"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">到货单号：{{ item.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">供应商：{{ item.cVendorName }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">制单人：{{ item.cCreateUserName }}</view>
                </uni-col>
                <!-- 								<uni-col :span="12">
									<view class="demo-uni-col dark">采购订单：{{item.avscCode}}</view>
								</uni-col> -->
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">到货日期：{{ item.dArriveDate }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark"></view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark"></view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col light"></view>
                </uni-col>
                <uni-col :span="12">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="DHDetail(item)"
                  >
                    详情
                  </button>
                </uni-col>
              </uni-row>
            </view>
            <uni-load-more
              :status="more"
              v-if="ConfirmList.length"
            ></uni-load-more>
          </scroll-view>
        </view>
      </view>

      <view v-if="Vtype">
        <view class="search-wl">
          <!-- 搜索框 -->
          <uni-section
            v-if="branch != 'alps'"
            title=""
            type="line"
          >
            <uni-search-bar
              radius="100"
              cancelButton="none"
              :focus="focusType"
              @blur="setfocus"
              @confirm="getWL"
              v-model="searchValue"
              placeholder="请输入物料"
            >
            </uni-search-bar>
          </uni-section>
          <input
            v-else
            class="inputSty"
            v-model="searchValue"
            @input="getWL"
            :focus="focusType"
            @blur="setfocus"
            placeholder="请扫描物料"
            placeholder-style="font-size:12px"
          />
        </view>
        <view
          class="text"
          v-if="!ConfirmDetailList.length"
          >无数据，请扫描</view
        >
        <scroll-view
          :style="'height:' + (h - 140) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view class="listMain">
            <view
              class="projects"
              v-for="(item, index) in ConfirmDetailList"
              :key="item.MID"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">到货单号：{{ item.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">供应商：{{ item.cVendorName }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">采购订单：{{ item.avscCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">数量：{{ item.nReceiveQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">每包数量：{{ item.nAccReceiveQuantity }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">箱数：{{ item.nAccQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="24">
                  <view style="float: right">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="ConfirmDH(item)"
                    >
                      确认到货
                    </button>
                  </view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <uni-load-more
            :status="more"
            v-if="ConfirmDetailList.length"
          ></uni-load-more>
        </scroll-view>
      </view>
      <view v-if="current === 1">
        <view
          class="text"
          v-if="!DayList.length"
          >无数据</view
        >
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 140) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in DayList"
              :key="item.UID"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">到货单号：{{ item.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">供应商：{{ item.cVendorName }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">采购订单：{{ item.avscCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">数量：{{ item.nReceiveQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">箱数：{{ item.nAccQuantity }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">实收数量：{{ item.nReceiveQuantity }}</view>
                </uni-col>
              </uni-row>
            </view>
            <uni-load-more
              :status="more"
              v-if="DayList.length"
            ></uni-load-more>
          </scroll-view>
        </view>
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
  awaitPDAList,
  confirmPDADetialList,
  confirmPDAList,
  confirmDayList,
  getWLInfo
} from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
let branch = ref()
const focusType = ref(true)
const Vtype = ref(false)
const h = ref('100') //页面高度
const title = ref('到货确认')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待确认', '已确认'])
const more = ref('more') //加载更多
const searchValue = ref('') //待确认输入框
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)

//页面条数
const DpageSize = ref(10)
//当前页
const DcurrentPage = ref(1)
//总条数
const Dtotal = ref(0)
//总页数
const DpageTotal = ref(0)
const ConfirmList = ref([])
const ConfirmDetailList = ref([])
const DayList = ref([])
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  setfocus()
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif

  if (current.value == 0) {
    ConfirmList.value = []
    getDH()
  }
  if (current.value == 1) {
    DayList.value = []
    Dtotal.value = 0
    DpageTotal.value = 0
    GetConfirm()
  }
})
onUnload(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
onHide(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
onBackPress(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  // if (e.keyCode == 66|| e.key=="Enter") {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
}
const clickTab = () => {
  if (current.value == 0) {
    Vtype.value = false
    getDH()
  }
}
const onClickItem = (e) => {
  Vtype.value = false
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 0) {
    getDH()
  }
  if (current.value == 1) {
    DayList.value = []
    Dtotal.value = 0
    DpageTotal.value = 0
    GetConfirm()
  }
}
//已确认列表
const GetConfirm = () => {
  uni.showLoading({
    title: '加载中'
  })
  confirmDayList({
    PageIndex: DcurrentPage.value,
    pageSize: DpageSize.value,
    OrderByFileds: '',
    Conditions: ''
  }).then((res) => {
    if (res.status == 200) {
      console.log(res.data.data)
      DayList.value = [...DayList.value, ...res.data.data]
      Dtotal.value = res.data.dataCount
      DpageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
//获取待确认列表
const getDH = _.debounce(async () => {
  uni.showLoading({
    title: '加载中'
  })
  const res = await awaitPDAList({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: searchValue.value ? `cCode like ${searchValue.value}` : ''
  })
  if (res.status == 200) {
    // searchValue.value = ''
    uni.hideLoading()
    uni.stopPullDownRefresh()
    console.log(res.data.data)
    ConfirmList.value = [...ConfirmList.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
    if (res.data.length == 0) {
      uni.showToast({
        icon: 'none',
        duration: 2000,
        title: '暂无数据，请重新扫描'
      })
      searchValue.value = ''
    }
  } else {
    uni.hideLoading()
  }
}, 300)
//待确认详情(详情到确认列表)
const UID = ref('')
const DHDetail = (v) => {
  UID.value = v.UID
  DHDetailList(v.UID)
}
const DHDetailList = async (v) => {
  ConfirmDetailList.value = []
  uni.showLoading({
    title: '加载中'
  })
  const res = await confirmPDADetialList({
    uid: v
  })
  if (res.status == 200) {
    uni.hideLoading()
    if (!res.data.length) {
      uni.showToast({
        icon: 'none',
        duration: 6000,
        title: '暂无数据需要确认'
      })
      Vtype.value = false
      getDH()
    } else {
      Vtype.value = true
      ConfirmDetailList.value = res.data
    }
  } else {
    uni.hideLoading()
  }
}
//搜索物料
const getWL = _.debounce(async () => {
  ConfirmDetailList.value = []
  const res = await getWLInfo({
    uid: UID.value,
    cInvCode: searchValue.value
  })
  if (res.status == 200) {
    ConfirmDetailList.value = res.data
    if (res.data.length == 0) {
      searchValue.value = ''
      uni.showToast({
        icon: 'none',
        title: '无数据，请重新获取'
      })
    }
  }
}, 300)
//确认到货
const ConfirmDH = async (v) => {
  const res = await confirmPDAList({
    MID: v.MID,
    Items: [v.UID]
  })
  if (res.status == 200) {
    uni.showToast({
      icon: 'none',
      title: res.msg
    })
    DHDetailList(UID.value)
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg
    })
  }
}

const handleSearch = () => {
  if (current.value == 1) {
    DcurrentPage.value = 1
    Dtotal.value = 0
    DayList.value = []
    GetConfirm()
  } else {
    currentPage.value = 1
    total.value = 0
    ConfirmList.value = []
    getDH()
  }
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 1) {
    DcurrentPage.value = 1
    Dtotal.value = 0
    DayList.value = []
    GetConfirm()
  } else {
    currentPage.value = 1
    total.value = 0
    ConfirmList.value = []
    getDH()
  }
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  if (current.value == 1) {
    DcurrentPage.value += 1
    if (DcurrentPage.value > DpageTotal.value) {
      more.value = 'no-more'
    } else {
      GetConfirm()
    }
  } else {
    currentPage.value += 1
    if (currentPage.value > pageTotal.value) {
      more.value = 'no-more'
    } else {
      getDH()
    }
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
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .content {
    width: 100%;

    .text {
      margin: 40rpx 0;
      text-align: center;
      font-size: 16px;
      color: #b5b5b5;
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .project {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;

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

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .projects {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;
        }
      }
    }

    .two-button {
      .mini-btn {
        position: fixed;
        bottom: 30rpx;
        left: 39%;
      }
    }
  }
}
</style>
