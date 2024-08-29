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
          <!-- 单个包信息 -->
          <view class="">
            <uni-row class="demo-uni-row itemTxt">
              <uni-col :span="14">
                <view
                  class="demo-uni-col"
                  style="display: flex; align-items: center"
                  >样品名称：
                  <uni-easyinput
                    v-model="xiangMObj.cInvName"
                    placeholder="请输入"
                  />
                </view>
              </uni-col>
              <uni-col :span="14">
                <view
                  class="demo-uni-col"
                  style="display: flex; align-items: center"
                  >批次号：
                  <uni-easyinput
                    v-model="xiangMObj.cInvBatch"
                    placeholder="请输入"
                  />
                </view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row itemTxt">
              <uni-col :span="14">
                <view
                  class="demo-uni-col"
                  style="display: flex; align-items: center"
                  >供应商：
                  <uni-easyinput
                    v-model="xiangMObj.cVendorName"
                    placeholder="请输入"
                  />
                </view>
              </uni-col>
              <uni-col :span="14">
                <view
                  class="demo-uni-col"
                  style="display: flex; align-items: center"
                  >样品规格：
                  <uni-easyinput
                    v-model="xiangMObj.cInvStd"
                    placeholder="请输入"
                  />
                </view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row itemTxt">
              <uni-col
                :span="14"
                style="display: flex; align-items: center"
              >
                <view class="demo-uni-col">方案选择：</view>
                <view style="width: 60%">
                  <uni-section
                    title="可搜索"
                    type="line"
                  >
                    <zxz-uni-data-select
                      v-model="Product"
                      filterable
                      :localdata="xiangMList"
                      dataKey="cProjectName"
                      dataValue="cProjectCode"
                      @inputChange="inputChange"
                      @change="PROchange"
                      :focus="PeofocusType"
                      @input="PeoFoucs"
                      placeholder="选择"
                    ></zxz-uni-data-select>
                  </uni-section>
                </view>
              </uni-col>
              <uni-col :span="14">
                <view
                  class="demo-uni-col dark"
                  style="margin-top: 30rpx"
                  >检验类型：人工送样</view
                >
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row itemTxt">
              <uni-col :span="14">
                <view
                  class="demo-uni-col"
                  style="display: flex; align-items: center"
                  >样品数量：
                  <uni-easyinput
                    v-model="xiangMObj.nTotalQuantity"
                    placeholder="请输入样品数量"
                  />
                </view>
              </uni-col>
              <uni-col :span="14">
                <view
                  class="demo-uni-col"
                  style="display: flex; align-items: center"
                  >备注：
                  <uni-easyinput
                    v-model="xiangMObj.cMemo"
                    placeholder="请输入备注"
                  />
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 320) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view class="project">
              <view
                class="wLIst"
                v-for="(item, index) in XLData"
                :key="index"
              >
                <uni-row class="demo-uni-row">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">指标编码：{{ item.cStandardCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">指标名称：{{ item.cStandardName }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col light">检验标准：{{ item.cGuideMemo }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col light">检验方式：{{ item.cCheckTypeName }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="del(index)"
                      style=""
                    >
                      删除
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <!-- <uni-load-more :status="more"></uni-load-more> -->
          </scroll-view>
        </view>
        <view class="">
          <button @click="clickTJ">提交</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { toScanCode } from '../../components/photoCode/scan'
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
import { GetForList_UnBind, GetBody, Add_Laboratory } from '@/api/yang.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const focusXM = ref(true)
const title = ref('人工送样')
const current = ref(0)
const WList = ref([])
const XLData = ref([])
const xiangMObj = ref({
  cInvName: '',
  cInvBatch: '',
  cVendorName: '',
  cInvStd: '',
  nTotalQuantity: '',
  cMemo: ''
})
const Product = ref('')
const xiangMList = ref([])
const codeVal = ref('')
const xmVal = ref('')
const slVal = ref('')
const memo = ref('')

const nDestoryQuantity = ref('')
const Productrange = ref([])
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const routeVal = ref('')
const getIdVal = ref({})
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
  // routeVal.value=JSON.parse(option.obj)
  // console.log(routeVal.value,"ii");
  h.value = uni.getSystemInfoSync().windowHeight
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
//产品类型变化
const inputChange = () => {}
const PROchange = (value) => {
  console.log(value, '===')
  FAList(value)
}
const PeoFoucs = () => {}
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
const del = (i) => {
  XLData.value.splice(i, 1)
}
const handleScan = () => {
  toScanCode({
    onlyFromCamera: true // 只允许通过相机扫码
  }).then((res) => {
    xmVal.value = res
    getXiangMa()
    console.log(res)
  })
}

const FAList = (v) => {
  let obj = {
    UID: v.UID
  }
  GetBody(obj).then((res) => {
    uni.showToast({
      icon: '',
      title: res.msg || '已响应'
    })
    if (res.status == '200') {
      XLData.value = res.data
    }
  })
}
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  // let obj={
  // 	 "PageIndex": currentPage.value,
  // 	  "PageSize": 5,
  // 	  "OrderByFileds": "",
  // 	  "Conditions": ""
  // }
  GetForList_UnBind().then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    xiangMList.value = res.data
    // pageTotal.value=res.data.pageCount
  })
}
const clickTJ = () => {
  if (!XLData.value.length) {
    uni.showToast({
      icon: 'error',
      title: '选择指标数据'
    })
    return false
  }
  uni.showLoading({
    title: '加载中'
  })

  let obj = {
    cPARM04: 2,
    list_body: XLData.value
  }
  Add_Laboratory({ ...obj, ...xiangMObj.value }).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    XLData.value = []
    xiangMObj.value = {
      cInvName: '',
      cInvBatch: '',
      cVendorName: '',
      cInvStd: '',
      nTotalQuantity: '',
      cMemo: ''
    }
    Product.value = ''
    uni.showToast({
      icon: '',
      title: res.msg || '已响应'
    })
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
.formSty {
  width: 100%;
  align-items: center;
  display: flex;
  font-size: 12px;
  .uni-searchbar {
    padding: 0;
  }
}
</style>
