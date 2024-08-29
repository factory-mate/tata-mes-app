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
    <view style="box-sizing: border-box; padding: 10rpx; border: 1px solid #eee">
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">指标编号：{{ getByVal.cStandardCode }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">指标名称：{{ getByVal.cStandardName }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">包号：{{ getByVal.cPackageCode }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">检验标准：{{ getByVal.cGuideMemo }}</view>
        </uni-col> </uni-row
      ><uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">检验方法：{{ getByVal.cCheckTypeName }}</view>
        </uni-col>
        <uni-col :span="12">
          <view style="display: flex; align-items: center">
            <view style="width: 90px">不良数量：{{ getByVal.nNoPassQuantity }}</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">拒收比例：{{ getByVal.nNoQualificationRate }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">包检测数量：{{ getByVal.nCheckQuantity }}</view>
        </uni-col>
      </uni-row>
      <view class="picStyCon">
        <view
          class="picSty"
          @click="preview(i + 1, getByVal.ImageList)"
          v-for="(item, i) in getByVal.ImageList"
          :key="item"
          >图片：{{ item.cFileReName }}{{ item.cFileSuffix }}</view
        >
      </view>
    </view>

    <view class="content">
      <view class="listMain">
        <scroll-view
          :style="'height:' + (h - 190) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view class="project">
            <view
              class="wLIst"
              v-for="(item, index) in xiangMList"
              :key="index"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="8">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col dark">定性值：{{ item.cParmValueName }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <!-- <uni-load-more :status="more"></uni-load-more> -->
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

import permision from '@/common/permission.js'
import _ from 'lodash'
import { Get_S_ById, GetForList_S_S } from '@/api/lailiao.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const focusXM = ref(true)
const title = ref('来料已检单详情-定性')
const current = ref(0)
const WList = ref([])
const XMliST = ref([])
const xiangMObj = ref('')
const xiangMList = ref([])
const Product = ref('')
const Productrange = ref([{ name: '11', value: '11' }])
const PeofocusType = ref(false)
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const routeVal = ref('')
const getByVal = ref({})
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  // setfocus()
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
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
  routeVal.value = JSON.parse(option.obj)
  console.log(routeVal.value, 'ii')
  h.value = uni.getSystemInfoSync().windowHeight
  getby()
  getList()
})
//货位输入框聚焦
const setfocus = () => {
  // console.log(111,"--33");
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
const keypress = (e) => {
  // codeType.value = ''
  // console.log(e, "按键码");
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
    // getcCode()
  }
}
//产品类型变化
const PROchange = () => {}
const inputChange = () => {
  console.log(11111)
}
const zhibiao = () => {
  uni.navigateTo({
    url: '/pages/incomingInspection/InspectingPackingViewZB'
  })
}

const getby = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    val: routeVal.value.UID
  }
  Get_S_ById(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    getByVal.value = res.data
  })
}
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    MID: routeVal.value.UID
  }
  GetForList_S_S(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    xiangMList.value = res.data
  })
}
//图片预览
const preview = (index, arr) => {
  let list = []
  arr.forEach((item) => {
    list.push(item.cFilePath + item.cFileReName + item.cFileSuffix)
  })
  console.log(list)
  uni.previewImage({
    current: index,
    urls: list
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  xiangMList.value = []
  getList()
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (currentPage.value > pageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	getList()
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
  padding: 10rpx;
}
.formSty {
  width: 100%;
  align-items: center;
  display: flex;
  font-size: 12px;
  .uni-searchbar {
    padding: 0;
  }
}
:deep(.uni-searchbar__box-icon-search) {
  display: none;
}
.picStyCon {
  // border: 1px solid red;
  width: 100%;
  font-size: 12px;
  // display: flex;
}
</style>
