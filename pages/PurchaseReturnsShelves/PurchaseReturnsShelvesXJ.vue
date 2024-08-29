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
        @clickItem="onClickItem"
        @click="clickTab"
      />
    </view>
    <view class="content">
      <uni-row
        class="demo-uni-row"
        style="margin-left: 20rpx"
      >
        <uni-col :span="24">
          <view class="demo-uni-col dark">通知单号：{{ objVal.cCode }}</view>
        </uni-col>
      </uni-row>
      <uni-row
        class="demo-uni-row"
        style="margin-left: 20rpx"
      >
        <uni-col :span="24">
          <view class="demo-uni-col dark">物料名称：{{ objVal.cInvName }}</view>
        </uni-col>
      </uni-row>
      <uni-row
        class="demo-uni-row"
        style="margin-left: 20rpx"
      >
        <uni-col :span="24">
          <view class="demo-uni-col dark">物料编码：{{ objVal.cInvCode }}</view>
        </uni-col>
      </uni-row>

      <view class="search-wl">
        <uni-row class="demo-uni-row">
          <uni-col :span="18">
            <view
              style="display: flex; text-align: center; justify-content: start; align-items: center"
            >
              <view style="width: 60px">箱&nbsp;&nbsp;&nbsp;&nbsp;码：</view>
              <!-- 搜索框 -->
              <up-input
                v-model="xmVal"
                :focus="focusXM"
                @confirm="clickXM"
                placeholder="请输入箱码"
                clearable
              />
            </view>
          </uni-col>
          <uni-col :span="6">
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="clickRest"
              style="margin-left: 10rpx"
            >
              重置
            </button>
          </uni-col>
        </uni-row>
      </view>
      <view v-if="current === 0">
        <view
          class="listMain"
          :style="'height:' + (h - 300) + 'px'"
        >
          <view
            class="project"
            v-for="(item, i) in xmList"
            :key="i"
          >
            <view class="wLIst">
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">序号：{{ xmList.length - i }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">箱码：{{ item.cKeyCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="clickDel(i)"
                  >
                    删除
                  </button>
                </uni-col>
              </uni-row>
            </view>
          </view>
        </view>
        <view class="BTN-Two">
          <button
            class="mini-btn"
            style="color: black; backgroundcolor: #1aad19; bordercolor: #1aad19"
            type="warn"
            size="mini"
            @click="clickAdd"
          >
            保存
          </button>
          <button
            class="mini-btn"
            type="warn"
            style="color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
            size="mini"
            @click="clickView"
          >
            查看
          </button>
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

import { GetSingleBar, SetOut } from '@/api/tuihuoXJ.js'
import _ from 'lodash'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const title = ref('退货出库')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['出库操作'])
const searchValue = ref('') // 箱码输入框绑定值ist
const WList = ref([])
const XMliST = ref([])
const XMsearchValue = ref('')
const xmVal = ref('')
const cwVal = ref('')
const hwVal = ref('')
const objVal = ref({})
const hwData = ref({})
const xmList = ref([])
const DJType = ref(true)
const WLType = ref(false)
const XMType = ref(false)
const tabVal = ref(0)
const focusXM = ref(false)
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)

const setFocusXM = () => {
  focusXM.value = false
  setTimeout(() => {
    focusXM.value = true
  }, 200)
}
onShow(() => {
  setFocusXM()
})
//加载页面
onLoad((option) => {
  console.log(JSON.parse(option.obj))
  objVal.value = JSON.parse(option.obj)
  // cwVal.value=option.cw
  h.value = uni.getSystemInfoSync().windowHeight
})
//货位输入框聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const clickAdd = () => {
  let obj = {
    UID: objVal.value.MID,
    s_List: xmList.value
  }
  uni.showLoading({
    title: '加载中'
  })
  SetOut(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.status == 200) {
      xmList.value = []
    } else {
      uni.showToast({
        icon: 'error',
        title: res.msg || ''
      })
    }
  })
}
const clickDel = (v) => {
  xmList.value.splice(v, 1)
}
const clickView = () => {
  uni.navigateTo({
    url:
      '/pages/PurchaseReturnsShelves/PurchaseReturnsShelvesCK?obj=' + JSON.stringify(objVal.value)
  })
}
const clickHW = () => {
  // hwVal.value
  if (!hwVal.value) return false
  let obj = {
    OrderByFileds: '',
    Conditions: 'cWareHouseCode=' + cwVal.value + ' && cWareHouseLocationCode=' + hwVal.value
  }
  uni.showLoading({
    title: '加载中'
  })
  K_GetForList(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    hwData.value = res.data[0]
  })
}
const clickXM = () => {
  if (!xmVal.value) return
  let obj = {
    // OrderByFileds:'',
    // Conditions:'mid='+objVal.value.MID+' && cDefindParm02='+xmVal.value
    uid: objVal.value.MID,
    cInvCode: objVal.value.cInvCode,
    cBatch: objVal.value.cBatch,
    cKeyCode: xmVal.value
  }
  uni.showLoading({
    title: '加载中'
  })
  GetSingleBar(obj)
    .then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()

      if (res.success) {
        let type = false
        if (xmList.value.length) {
          type = xmList.value.some((item) => {
            return item.cKeyCode == res.data.cKeyCode
          })
        }
        if (type) {
          uni.showToast({
            icon: 'error',
            title: '箱码已经存在！'
          })
          xmVal.value = ''
        } else {
          xmList.value = [...xmList.value, ...[res.data]]
          xmVal.value = ''
        }
      }
    })
    .finally(() => {
      setFocusXM()
    })
}
const clickRest = () => {
  xmVal.value = ''
  hwVal.value = ''
  setFocusXM()
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
  // currentPage.value = 1
  // total.value = 0
  // PDAawaitList.value = []
  // WaitList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (currentPage.value > pageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	WaitList()
  // }
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
