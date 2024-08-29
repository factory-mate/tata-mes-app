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
            <!-- <uni-col :span="24">
							<view class="demo-uni-col dark">申请单号：{{cCode}}</view>
						</uni-col> -->
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
                  <!-- 搜索框 -->
                  <!-- v-if="branch!='alps'" -->
                  <uni-section
                    title=""
                    type="line"
                  >
                    <uni-search-bar
                      radius="100"
                      cancelButton="none"
                      @blur="setXMfocus"
                      @confirm="getXiangMa"
                      v-model="xmVal"
                      placeholder="请输入箱码"
                    >
                    </uni-search-bar>
                  </uni-section>
                  <!-- <input v-else class="inputSty" v-model="xmVal" @input="getXiangMa"
										:focus="focusXM" @blur="setXMfocus"  placeholder="请扫描箱码"
										placeholder-style="font-size:12px" /> -->
                </view>
              </view>
            </uni-col>
            <!-- <uni-col :span="6">
							<view class="demo-uni-col light">
							</view>
						</uni-col> -->
          </uni-row>
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
                <view style="width: 50px">数量：</view>
                <!-- 搜索框 -->
                <uni-section
                  title=""
                  type="line"
                  style="width: 100%"
                >
                  <uni-search-bar
                    radius="100"
                    cancelButton="none"
                    @blur=""
                    @confirm=""
                    v-model="slVal"
                    placeholder="请输入数量"
                  >
                  </uni-search-bar>
                </uni-section>
                <!-- <input class="inputSty" v-model="slVal" @input=""
									focus="" @blur=""  placeholder="请输入数量"
									placeholder-style="font-size:12px" style="line-height: 30px;height: 30px;"/> -->
              </view>
            </uni-col>
            <uni-col :span="6">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="clickCai"
                style="margin-top: 50rpx"
              >
                拆分
              </button>
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
              <view class="demo-uni-col dark">批次号：{{ xiangMObj.cBatch }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row itemTxt">
            <uni-col :span="14">
              <view class="demo-uni-col light">箱码：{{ xiangMObj.cKeyCode }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">数量：{{ xiangMObj.nQuinity }}</view>
            </uni-col>
          </uni-row>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 280) + 'px'"
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
                  <uni-col :span="24">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col light">规格型号：{{ item.cInvStd }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col light">箱码：{{ item.cKeyCode }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">数量：{{ item.nQuinity }}</view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
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

import permision from '@/common/permission.js'
import _ from 'lodash'
import { GetForPage, GetSingleBycBarCode, UnpackingBar } from '@/api/PDA_4.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const dhfocusType = ref(false)
const focusXM = ref(true)
const title = ref('库位拆包')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['申请操作', '单据'])
const searchValue = ref('') // 箱码输入框绑定值ist
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
  h.value = uni.getSystemInfoSync().windowHeight
  //  getList()
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
const inputChange = () => {
  console.log(11111)
}

// 箱码
const getXiangMa = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    cKeyCode: xmVal.value
  }
  GetSingleBycBarCode(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    // console.log(res,"-resxiangMObj.value");
    xiangMObj.value = res.data
    // xiangMObj.value.cDefindParm02=xmVal.value
    // xiangMList.value.push(xiangMObj.value)
    // xmVal.value=''
  })
}
const clickCai = () => {
  console.log(slVal.value, '--slVal.value')
  if (slVal.value == '') {
    uni.showToast({
      icon: 'error',
      title: '请输入数量'
    })
    return false
  }
  if (slVal.value > xiangMObj.value.nQuinity) {
    uni.showToast({
      icon: 'error',
      title: '数量超了'
    })
    return false
  }
  if (slVal.value <= xiangMObj.value.nQuinity) {
    let obj = {
      UID: '',
      cKeyCode: xmVal.value,
      UnpackingQuinity: slVal.value
    }
    UnpackingBar(obj).then((res) => {
      if (res.status == 200) {
        uni.showToast({
          icon: 'success',
          title: '拆分成功！'
        })
        xmVal.value = ''
        slVal.value = ''
        xiangMObj.value = {}
        xiangMList.value = []
        pageTotal.value = 1
        getList()
      } else {
        uni.showToast({
          icon: 'error',
          title: '拆分失败！'
        })
      }
    })
  }
}
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: ''
  }
  GetForPage(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    xiangMList.value = [...xiangMList.value, ...res.data.data]
    pageTotal.value = res.data.pageCount
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
  more.value = 'loading'
  console.log('上拉')
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
</style>
