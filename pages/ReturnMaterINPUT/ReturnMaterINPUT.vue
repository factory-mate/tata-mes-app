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
      @clickRight="clickRight"
    />
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
        <view class="search-wl">
          <!-- 搜索框 -->
          <input
            class="inputSty"
            v-model="HDsearchValue"
            :focus="focusType"
            @blur="setfocus"
            @input="getcCode"
            placeholder="请输入到货单"
            placeholder-style="font-size:12px"
          />
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 200) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view class="project">
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{}}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">到货单号：{{}}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">供应商：{{}}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">制单时间：{{}}</view>
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
                      @click="Detail()"
                    >
                      详情
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
          <view class="project">
            <view>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">序号：{{}}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">到货单号：{{}}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">供应商：{{}}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">制单时间：{{}}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">物料编码：{{}}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">物料名称：{{}}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">规格型号：{{}}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark"></view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">数量：{{}}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col light">箱数：{{}}</view>
                </uni-col>
                <uni-col :span="12">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="PutStack()"
                  >
                    上架
                  </button>
                </uni-col>
              </uni-row>
            </view>
          </view>
        </view>
      </view>
      <view v-if="current === 1">
        <view class="listMain">
          <view class="projects">
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view class="demo-uni-col dark">到货单号：{{}}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">物料编码：{{}}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">物料名称：{{}}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view class="demo-uni-col dark">推荐货位：{{}}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="20">
                <view
                  style="
                    display: flex;
                    text-align: center;
                    justify-content: start;
                    align-items: center;
                  "
                >
                  <view style="width: 40px">货位：</view>
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
                        @confirm="getHW"
                        v-model="HWsearchValue"
                        placeholder="请输入货位"
                      >
                      </uni-search-bar>
                    </uni-section>
                    <input
                      v-else
                      class="inputSty"
                      :disabled="disabled"
                      v-model="HWsearchValue"
                      @input="getHW"
                      :focus="focusType"
                      @blur="setfocus"
                      placeholder="请扫描到货位"
                      placeholder-style="font-size:12px"
                    />
                  </view>
                </view>
              </uni-col>
              <uni-col :span="6">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="ClearInput"
                >
                  重置
                </button>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="20">
                <view
                  style="
                    display: flex;
                    text-align: center;
                    justify-content: start;
                    align-items: center;
                  "
                >
                  <view style="width: 40px">箱码：</view>
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
                        :focus="XMfocusType"
                        @blur="XMsetfocus"
                        @confirm="getXM"
                        v-model="XMsearchValue"
                        placeholder="请输入箱码"
                      >
                      </uni-search-bar>
                    </uni-section>
                    <input
                      v-else
                      class="inputSty"
                      v-model="XMsearchValue"
                      @input="getXM"
                      :focus="XMfocusType"
                      @blur="XMsetfocus"
                      :disabled="xmdis"
                      placeholder="请扫描箱码"
                      placeholder-style="font-size:12px"
                    />
                  </view>
                </view>
              </uni-col>
              <uni-col :span="6">
                <view class="demo-uni-col light"> </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 430) + 'px'"
        >
          <view class="project">
            <uni-row class="demo-uni-row">
              <uni-col :span="6">
                <view class="demo-uni-col dark">序号：{{}}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">箱码：{{}}</view>
              </uni-col>
              <uni-col :span="10">
                <view class="demo-uni-col dark">数量：{{}}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="6">
                <view class="demo-uni-col dark"></view>
              </uni-col>
              <uni-col :span="6">
                <view class="demo-uni-col light"></view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">货位：{{}}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col light">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="DELxm()"
                  >
                    删除
                  </button>
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <view class="two-button">
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="PUTXM"
          >
            提交
          </button>
        </view>
      </view>

      <view v-if="current === 2">
        <view class="RUDetail">
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">物料编码：{{}}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">数量：{{}}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">物料名称：{{}}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">箱数：{{}}</view>
            </uni-col>
          </uni-row>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 260) + 'px'"
        >
          <view class="RUlist">
            <uni-row class="demo-uni-row">
              <uni-col :span="8">
                <view class="demo-uni-col dark">序号：{{}}</view>
              </uni-col>
              <uni-col :span="18">
                <view class="demo-uni-col dark">箱码：{{}}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">数量：{{}}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark"></view>
              </uni-col>
              <uni-col :span="22">
                <view class="demo-uni-col dark">批次号：{{}}</view>
              </uni-col>
              <uni-col :span="15">
                <view class="demo-uni-col dark">货位：{{}}</view>
              </uni-col>
            </uni-row>
          </view>
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
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const XMfocusType = ref(false)
const title = ref('退料入库')
const Vtype = ref(false)
//输入框值
const xmdis = ref(true)
const disabled = ref(false)
const HDsearchValue = ref('') //待入库货单输入框
const HWsearchValue = ref('') //货位输入框
const XMsearchValue = ref('') //箱码输入框
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待入库', '入库操作', '已入库'])
const waitRKList = ref([]) //待入库列表（上架）
const PDAawaitList = ref([]) //待入库列表（详情）
const PUTiNFO = ref({}) // 上架详情信息（入库操作内）
const arrList = ref([]) //箱码列表（入库操作）
const RKlist = ref([]) // 已入库列表
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
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
  arrList.value = []
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
//货位输入框聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
//箱码输入框聚焦
const XMsetfocus = () => {
  XMfocusType.value = false
  setTimeout(() => {
    XMfocusType.value = true
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
  // 	getcCode()
  // }
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
//详情
const Detail = () => {
  waitRKList.value = ['1']
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
