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
    <view style="box-sizing: border-box; padding: 0 10rpx; border: 1px solid #eee">
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="10">
          <view class="demo-uni-col">质检单号：{{ routeVal.cCode }}</view>
        </uni-col>
        <uni-col :span="14">
          <view style="display: flex; align-items: center">
            <view style="width: 90px">单破坏性数量：</view>
            <view
              class="search-inpt"
              style="width: 60%"
            >
              <!-- 搜索框 -->
              <uni-section
                title=""
                type="line"
              >
                <uni-search-bar
                  radius="100"
                  cancelButton="none"
                  @confirm="getXiangMa"
                  v-model="nDestoryQuantity"
                  placeholder="数量"
                >
                </uni-search-bar>
              </uni-section>
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row
        class="demo-uni-row formSty"
        style="margin: 20rpx 0"
      >
        <uni-col
          :span="19"
          style="display: flex; align-items: center"
        >
          <view class="demo-uni-col">判定选项：</view>
          <view style="width: 60%">
            <uni-section
              title="可搜索"
              type="line"
            >
              <zxz-uni-data-select
                v-model="Product"
                filterable
                :localdata="Productrange"
                dataKey="cDictonaryName"
                dataValue="cDictonaryCode"
                @inputChange="inputChange"
                @change="PROchange"
                :focus="PeofocusType"
                @input="PeoFoucs"
                placeholder="选择"
              ></zxz-uni-data-select>
            </uni-section>
          </view>
        </uni-col>
        <uni-col :span="4">
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="clickSave"
            style=""
          >
            保存
          </button>
        </uni-col>
      </uni-row>
      <!-- 	<view style="margin-left:80% ;margin-top: -30rpx;padding-bottom: 20rpx;">
				<button class="mini-btn" type="warn" size="mini" @click="clickSave" style="margin-top: 50rpx;">保存</button>
			</view> -->
    </view>

    <view class="content">
      <view v-if="current === 0">
        <!-- 搜索框 -->
        <view class="search-wl">
          <uni-row
            class="demo-uni-row"
            style="display: flex; align-items: center"
          >
            <uni-col :span="14">
              <view
                style="
                  display: flex;
                  text-align: center;
                  justify-content: start;
                  align-items: center;
                "
              >
                <view style="width: 50px">包号：</view>
                <view
                  class="search-inpt"
                  style="width: 80%"
                >
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
                      placeholder="请输入包号"
                    >
                    </uni-search-bar>
                  </uni-section>
                </view>
              </view>
            </uni-col>
            <uni-col :span="9">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="handleScan()"
                style="margin-right: 10rpx"
              >
                扫描
              </button>
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="clickbao"
                style=""
              >
                保存
              </button>
            </uni-col>
          </uni-row>
          <!-- 单个包信息 -->
          <view class="">
            <uni-row class="demo-uni-row itemTxt">
              <uni-col :span="14">
                <view class="demo-uni-col dark">包号：{{ xiangMObj.cPackageCode }}</view>
              </uni-col>
              <uni-col :span="14">
                <view class="demo-uni-col dark">物料名称：{{ xiangMObj.cInvName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row itemTxt">
              <uni-col :span="14">
                <view class="demo-uni-col light">数量：{{ xiangMObj.nQuantity }}</view>
              </uni-col>
              <uni-col :span="14">
                <view class="demo-uni-col dark">批次号：{{ xiangMObj.cInvBatch }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row itemTxt">
              <uni-col :span="14">
                <view class="demo-uni-col light">方案要求包数：{{ getIdVal.nTotalQuantity }}</view>
              </uni-col>
              <uni-col :span="14">
                <view class="demo-uni-col dark">已添加包数：{{ xiangMList.length }}</view>
              </uni-col>
            </uni-row>
          </view>
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
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">包号：{{ item.cPackageCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col light">数量：{{ item.nQuantity }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col light"
                      >不良数量：{{ item.nNoPassQuantity ?? '0' }}</view
                    >
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">批次号：{{ item.cInvBatch }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">包检验结果：{{ item.IsOKName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="zhibiao(item)"
                      style=""
                    >
                      检验指标
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <!-- <uni-load-more :status="more"></uni-load-more> -->
          </scroll-view>
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
import {
  SetnDestoryQuantity,
  ScanningcPackageCode,
  GetById,
  SaveScanningcPackageCode,
  GetForList_Package,
  GetDicType
} from '@/api/lailiao.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const focusXM = ref(true)
const title = ref('库存质检单详情')
const current = ref(0)
const WList = ref([])
const XMliST = ref([])
const xiangMObj = ref('')
const Product = ref('')
const xiangMList = ref([])
const codeVal = ref('')
const xmVal = ref('')
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
  GetType()
  getList()
  getId()
  baoList()
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
  h.value = uni.getSystemInfoSync().windowHeight
})
const GetType = () => {
  let obj = {
    cTableCode: 'FM_QC_CHECKVOUCH',
    cAttributeCode: 'cCheckResultTypeCode'
  }
  GetDicType(obj).then((res) => {
    Productrange.value = res.data
  })
}
const getId = () => {
  GetById({ val: routeVal.value.UID }).then((res) => {
    getIdVal.value = res.data
  })
}
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
const PROchange = () => {}
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
const clickSave = () => {
  if (!nDestoryQuantity.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入数量！'
    })
    return false
  }
  if (!Product.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择！'
    })
    return false
  }
  let obj = {
    UID: routeVal.value.UID,
    utfs: routeVal.value.utfs,
    nDestoryQuantity: nDestoryQuantity.value,
    cCheckResultTypeCode: Product.value,
    iStatus: '2'
  }
  SetnDestoryQuantity(obj).then((res) => {
    uni.showToast({
      icon: '',
      title: res.msg || '成功'
    })
    nDestoryQuantity.value = ''
    Product.value = ''
  })
}
const zhibiao = (obj) => {
  uni.navigateTo({
    url: '/pages/kuIncomingInspection/InspectingPackingViewZB?obj=' + JSON.stringify(obj)
  })
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
// 箱码
const getXiangMa = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    UID: routeVal.value.UID,
    cPackageCode: xmVal.value
  }
  ScanningcPackageCode(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.success) {
      // console.log(res,"-resxiangMObj.value");
      xiangMObj.value = res.data
      xmVal.value = ''
      // xiangMObj.value.cDefindParm02=xmVal.value
      // xiangMList.value.push(xiangMObj.value)
    }
  })
}
const clickbao = () => {
  if (!xiangMObj.value.cPackageCode) {
    uni.showToast({
      icon: 'error',
      title: '请扫描包号'
    })
    return
  }
  let obj = {
    UID: routeVal.value.UID,
    cPackageCode: xiangMObj.value.cPackageCode
  }
  SaveScanningcPackageCode(obj).then((res) => {
    if (res.success) {
      uni.showToast({
        icon: 'success',
        title: res.msg || '添加成功！'
      })
      xmVal.value = ''
      xiangMObj.value = {}
      baoList()
    } else {
      uni.showToast({
        icon: 'error',
        title: '添加失败！'
      })
    }
  })
}
const baoList = () => {
  let obj = {
    OrderByFileds: '',
    Conditions: 'isDelete = false && MID = ' + routeVal.value.UID
  }
  GetForList_Package(obj).then((res) => {
    if (res.status == '200') {
      xiangMList.value = res.data
    }
  })
}
const getList = () => {
  // uni.showLoading({
  // 	title: '加载中'
  // });
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: ''
  }
  // GetForPage(obj).then(res=>{
  // 	uni.hideLoading()
  // 	uni.stopPullDownRefresh()
  // 	xiangMList.value=[...xiangMList.value,...res.data.data]
  // 	pageTotal.value=res.data.pageCount
  // })
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
</style>
