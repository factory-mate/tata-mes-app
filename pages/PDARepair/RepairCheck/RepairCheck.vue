<template>
  <!-- 设备维修页面 -->
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
    />
    <view
      v-if="current == 0"
      style="display: flex; justify-content: space-between; align-self: center"
    >
      <view style="margin: 10px 5px">图片</view>
      <view>
        <button
          style="margin: 10px 5px"
          class="mini-btn"
          type="warn"
          size="mini"
          @click="goFile()"
        >
          文档
        </button>
      </view>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="onClickItem"
        @click="ChangTab"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
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
              v-for="(item, index) in DevList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">项目编码：{{ item.cProgramCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">方案名称：{{ item.cProjectName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">故障原因：{{ item.cFaultName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="preview(1, item.FileName1)"
                      >图片：{{ item.FileName1?.split('&')[0] }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">描述：{{ item.cMemo }}</view>
                  </uni-col>
                </uni-row>
                <view style="display: flex; justify-content: flex-end">
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="goStart(index, item)"
                  >
                    文档
                  </button>
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="goReapir(index, item)"
                  >
                    备件
                  </button>
                </view>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </view>
      </view>
      <view v-if="current === 1">
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
              v-for="(item, index) in RepairList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备名称：{{ item.cDeviceName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previews(1, item.FileName1)"
                    >
                      图片：{{ item.FileName1?.split('&')[0] }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previews(2, item.FileName2)"
                    >
                      图片：{{ item.FileName2?.split('&')[0] }}</view
                    >
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previews(3, item.FileName3)"
                    >
                      图片：{{ item.FileName3?.split('&')[0] }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备位置：{{ item.cUsedAddress }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">故障名称：{{ item.cFaultName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修描述：{{ item.cMemo }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">设备编号：{{ item.cDeviceCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修人：{{ item.cCreateUserName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修时间：{{ item.dCreateTime }}</view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="RepairList.length"
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
import { PDAGetItemCheck, PDAGetBodys } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const XMfocusType = ref(false)
const title = ref('设备维修')
//输入框值
const xmdis = ref(true)
const disabled = ref(false)
const searchValue = ref() //待点检输入框
const HWsearchValue = ref('') //货位输入框
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['维修项目', '报修详情'])
const value = ref() //下拉故障
const range = ref([]) //下拉故障数组
const Textvalue = ref() //描述
//日期范围
const Timerange = ref()
//设备列表数据
const DevList = ref([])
const ReadDevList = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const itemInfo = ref({})
const uid = ref('')
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
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
  h.value = uni.getSystemInfoSync().windowHeight
  if (option.item) {
    itemInfo.value = JSON.parse(option.item)
    console.log(itemInfo.value, 'itemInfo.value')
  }
  GetList()
})

const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
  }
}
const ChangTab = () => {
  if (current.value == 0) {
    GetList()
  } else {
    GETREpairView()
  }
}

const preview = (index, i, isOrigin) => {
  console.log(i, '图片----')
  let arr = []
  let url = isOrigin ? i : i.split('&')[1]
  arr.push(url)
  uni.previewImage({
    current: index,
    urls: arr
  })
}

//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 0) {
    GetList()
  } else {
    GETREpairView()
  }
}
//获取列表数据
const GetList = () => {
  uni.showLoading({
    title: '加载中...'
  })
  PDAGetItemCheck({
    val: itemInfo.value.UID
  }).then((res) => {
    if (res.status == 200) {
      DevList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}

const RepairList = ref([])
const GETREpairView = () => {
  uni.showLoading({
    title: '加载中...'
  })
  PDAGetBodys({
    OrderByFileds: '',
    Conditions: `cCode=${itemInfo.value.cSouceCode}`
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      RepairList.value = res.data
    } else {
      uni.hideLoading()
    }
  })
}
//图片预览
const previews = (index, i) => {
  console.log(i, '图片----')
  let arr = []
  let url = i.split('&')[1]
  arr.push(url)
  uni.previewImage({
    current: index,
    urls: arr
  })
}
// 文档
const goFile = () => {
  uni.navigateTo({
    url: `/pages/PDARepair/PDAFile/PDAFile?Devcode=` + itemInfo.value.cDeviceCode
  })
}
const goStart = (index, i) => {
  uni.navigateTo({
    url: `/pages/PDARepair/PDAFile/PDAFile?code=` + i.cProgramCode
  })
}
//备件
const goReapir = (index, i) => {
  uni.navigateTo({
    url: `/pages/PDARepair/CheckPart/CheckPart?uid=${itemInfo.value.cDeviceCode}&code=${i.cProgramCode}`
  })
}
//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  // currentPage.value = 1
  // total.value = 0
  // PDAawaitList.value = []
  // WaitList()
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
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
    font-size: 12px;

    .RUDetail {
      padding: 20rpx;

      .demo-uni-col {
        margin: 10rpx;
      }
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .RUlist {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;
        }
      }
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

      .projects {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 10rpx;
        }
      }
    }

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;

      .mini-btn {
        // position: fixed;
        // bottom: 30rpx;
        // left: 39%;
      }
    }
  }
}

.search-wl {
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
</style>
