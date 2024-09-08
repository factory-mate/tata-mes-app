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
      @clickRight=""
    />

    <view class="content">
      <view v-if="current === 0">
        <!-- 搜索框 -->
        <view class="search-wl">
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view
                style="
                  display: flex;
                  text-align: center;
                  justify-content: start;
                  align-items: center;
                "
              >
                <view style="width: 50px">新货位：</view>
                <view
                  class="search-inpt"
                  style="width: 60%"
                >
                  <up-input
                    v-model="hwVal"
                    placeholder="请扫描货位"
                    :focus="focusHW"
                    @confirm="getHW"
                  >
                  </up-input>
                </view>
              </view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view
                style="
                  display: flex;
                  text-align: center;
                  justify-content: start;
                  align-items: center;
                "
              >
                <view style="width: 50px">箱码：</view>
                <view
                  class="search-inpt"
                  style="width: 60%"
                >
                  <up-input
                    @confirm="getXiangMa"
                    v-model="xmVal"
                    :focus="focusXM"
                    placeholder="请扫描箱码"
                  >
                  </up-input>
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 180) + 'px'"
        >
          <view class="project">
            <view
              class="wLIst"
              v-for="(item, i) in xiangMList"
              :key="i"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="24">
                  <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row itemTxt">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料编码：{{ xiangMObj.cInvCode }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料名称：{{ xiangMObj.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row itemTxt">
                <uni-col :span="14">
                  <view class="demo-uni-col light">规格型号：{{ xiangMObj.cInvStd }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">箱码：{{ xiangMObj.cKeyCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row itemTxt">
                <uni-col :span="14">
                  <view class="demo-uni-col light"
                    >货位：{{ xiangMObj.cWareHouseLocationCode }}</view
                  >
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">数量：{{ xiangMObj.nQuinity }}</view>
                </uni-col>
              </uni-row>
            </view>
          </view>
        </view>
        <view class="BTN-Two">
          <button
            class="mini-btn"
            type="warn"
            style="color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
            size="mini"
            :disabled="!xiangMList.length"
            @click="clickTJ"
          >
            提交
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

import permision from '@/common/permission.js'
import _ from 'lodash'
import { CheckMoveBar, GetSingleBycBarCode, MoveBar } from '@/api/PDA_4.js'
import { WareHouseLocation } from '@/api/PDA.js'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const wlmore = ref('more')
const xmmore = ref('more')
const focusType = ref(false)
const dhfocusType = ref(false)
const focusXM = ref(false)
const focusHW = ref(false)
const title = ref('库位移动')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['申请操作', '单据'])
const searchValue = ref('') // 箱码输入框绑定值ist
const hwVal = ref('')
const WList = ref([])
const XMliST = ref([])
const changkuData = ref('')
const danjuList = ref([{}])
const WLdetailList = ref([])
const danhao = ref('')
const cCode = ref('')
const UID = ref('')
const CKval = ref('')
const xmVal = ref('')
const slVal = ref('')
const dhVal = ref('')
const XMDetailObj = ref('')
const DJType = ref(true)
const WLType = ref(false)
const XMType = ref(false)
const tabVal = ref(0)
const xiangMObj = ref('')
const xiangMList = ref([])
const wlObjVal = ref({})
//页面条数
const pageSize = ref(5)
const wlpageSize = ref(5)
const xmpageSize = ref(5)
//当前页
const currentPage = ref(1)
const wlcurrentPage = ref(1)
const xmcurrentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const wlpageTotal = ref(0)
const xmpageTotal = ref(0)
onShow(() => {
  setHWfocus()
})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
})
//货位输入框聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const setXMfocus = () => {
  focusXM.value = false
  setTimeout(() => {
    focusXM.value = true
  }, 200)
}
const setHWfocus = () => {
  focusHW.value = false
  setTimeout(() => {
    focusHW.value = true
  }, 200)
}
const inputChange = () => {}
const getHW = () => {
  WareHouseLocation({
    Conditions: `cWareHouseLocationCode=${hwVal.value}`
  }).then((res) => {
    console.log(res)
    if (res.success) {
      if (res.data.length > 0) {
        setXMfocus()
      } else {
        uni.showToast({
          icon: 'none',
          title: '货位不存在'
        })
        hwVal.value = ''
        setHWfocus()
      }
    }
  })
}
// 箱码
const getXiangMa = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    newcWareHouseLocationCode: hwVal.value,
    cKeyCode: xmVal.value
  }
  CheckMoveBar(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.success) {
      getXM()
    } else {
      uni.showToast({
        icon: 'error',
        title: res.errmsg[0].msg || res.msg || '箱码不对，不能移位'
      })
    }
  })
}
const getXM = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    cKeyCode: xmVal.value
  }
  GetSingleBycBarCode(obj)
    .then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      if (res.success === true) {
        xiangMObj.value = res.data
        xiangMObj.value.newcWareHouseLocationCode = hwVal.value
        xiangMList.value.push(xiangMObj.value)
        xmVal.value = ''
        setXMfocus()
      } else {
        uni.showToast({
          icon: 'error',
          title: res.msg || '没有数据'
        })
      }
    })
    .finally(() => {
      setXMfocus()
    })
}
const clickTJ = () => {
  uni.showLoading({
    title: '加载中'
  })

  MoveBar(xiangMList.value).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.success === true) {
      xmVal.value = ''
      hwVal.value = ''
      xiangMList.value = []
      uni.showToast({
        icon: 'success',
        title: '成功'
      })
    } else {
      uni.showToast({
        icon: 'error',
        title: res.errmsg[0].msg || '失败'
      })
    }
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  danjuList.value = []
  WLdetailList.value = []
  // getDanList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    // getDanList()
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style scoped lang="scss">
.wLIst {
  // border: 1px solid red;
  margin-bottom: 20rpx;
  margin: 20rpx 10rpx;
  border-radius: 4px;
  box-shadow: 0 0 10px #ddd;
  padding-bottom: 10px;
}
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
.itemTxt {
}
.inStorage .content .search-wl .demo-uni-row {
  padding: 20rpx;
}
</style>
