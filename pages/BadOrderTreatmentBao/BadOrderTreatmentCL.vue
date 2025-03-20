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
    <view style="box-sizing: border-box; padding: 0 10rpx; border: 1px solid #eee">
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">序号：{{ 1 }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">质检单号：{{ getByVal.cCode }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">物料编码：{{ getByVal.cInvCode }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">物料名称：{{ getByVal.cInvName }}</view>
        </uni-col> </uni-row
      ><uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">材料批次：{{ getByVal.cInvBatch }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">供应商名称：{{ getByVal.cVendorName }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">进料数：{{ getByVal.nQuantity }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">判断结果：{{ getByVal.cCheckResultTypeName }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">不良包号：{{ getByVal.cPackageCode }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">日期：{{ getByVal.dDate }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="24">
          <view class="demo-uni-col">送批备注：{{ getByVal.cPARM01 }}</view>
        </uni-col>
        <uni-col :span="12">
          <!-- <view class="demo-uni-col">日期：{{getByVal.nNoQualificationRate}}</view> -->
        </uni-col>
      </uni-row>

      <view style="margin-left: 70%; margin-top: -30rpx; padding-bottom: 20rpx">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          @click="clickCK"
          style="margin-top: 50rpx"
        >
          质检单
        </button>
      </view>

      <uni-row class="demo-uni-row formSty">
        <uni-col :span="24">
          <view
            style="display: flex; text-align: center; justify-content: start; align-items: center"
          >
            <view style="width: 60px">处理选项：</view>
            <view
              class="search-inpt"
              style="width: 80%"
            >
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product"
                  filterable
                  :localdata="xiaList"
                  dataKey="cNoPassClearName"
                  dataValue="cNoPassClearCode"
                  @inputChange="inputChange"
                  @change="PROchange"
                  :focus="PeofocusType"
                  placeholder="定性值"
                ></zxz-uni-data-select>
              </uni-section>
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
              margin: 20rpx 0;
            "
          >
            <view style="width: 60px; font-size: 12px">处理意见：</view>
            <view
              class="search-inpt"
              style="width: 80%"
            >
              <uni-easyinput
                type="textarea"
                v-model="memo"
                placeholder="请输入"
              >
              </uni-easyinput>
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row
        class="demo-uni-row"
        style="display: flex; align-items: center; justify-content: flex-end"
      >
        <uni-col :span="14">
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="clickTJ"
            style=""
          >
            提交
          </button>
        </uni-col>
      </uni-row>
    </view>

    <!-- @change="change($event,'showLeft')" -->
    <uni-drawer
      ref="showLeft"
      mode="bottom"
      width=""
    >
      <view class="close">
        <!-- <button @click="closeDrawer('showLeft')"><text class="word-btn-white">关闭Drawer</text></button> -->
        <web-view src="http://171.13.38.94:10900/期末真题B.pdf"></web-view>
      </view>
    </uni-drawer>
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
import URLIP from '@/utils/serviceIP.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import { GetById_CheckVouch_Package, GetForList, Submit } from '@/api/buliang.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
let showLeft = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const focusXM = ref(true)
const title = ref('不良包处理')
const current = ref(0)
const WList = ref([])
const XMliST = ref([])
const xiangMObj = ref('')
const memo = ref('')
const xiangMList = ref([])
const PicArr = ref([])
const Product = ref('')
const ProductName = ref('')
const slVal = ref('')
const Productrange = ref([{ name: '11', value: '11' }])
const buslVal = ref('')
const baoVal = ref('')
const xlList = ref([])
const getByVal = ref({})
const xiaList = ref([])

const PeofocusType = ref(false)
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const routeVal = ref({})
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
})
onUnload(() => {})
onHide(() => {})
onBackPress(() => {})
//加载页面
onLoad((option) => {
  routeVal.value = JSON.parse(option.obj)
  console.log(routeVal.value, 'ii--val')
  h.value = uni.getSystemInfoSync().windowHeight
  getby()
  xiala()
  // getGetBodyXL()
  // getList()
})
const xiala = () => {
  let obj = {
    Conditions: ''
  }
  GetForList(obj).then((res) => {
    xiaList.value = res.data
  })
}
const getGetBodyXL = () => {
  GetBodyXL({ cStandardCode: routeVal.value.cStandardCode }).then((res) => {
    xlList.value = res.data || []
  })
}
//产品类型变化
const PROchange = () => {
  console.log(Product.value, '1')
  xlList.value.forEach((item) => {
    if (item.cParmValueCode == Product.value) {
      ProductName.value = item.cParmValueName || ''
    }
  })
}
const inputChange = () => {
  console.log(Product.value, '2')
}
const clickTJ = () => {
  if (!Product.value) {
    uni.showToast({
      icon: 'error',
      title: '选项不能为空'
    })
    return false
  }
  if (!memo.value) {
    uni.showToast({
      icon: 'error',
      title: '意见不能为空'
    })
    return false
  }
  let obj = {
    UID: routeVal.value.UID,
    cCheckResultTypeCode: Product.value,
    cMemo: memo.value,
    iPARM11: 0
  }
  Submit(obj).then((res) => {
    uni.showToast({
      icon: '',
      title: res.msg || '成功'
    })
    Product.value = ''
    memo.value = ''
  })
}

const getby = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    uid: routeVal.value.UID
  }
  GetById_CheckVouch_Package(obj).then((res) => {
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
    // pageTotal.value=res.data.pageCount
  })
}

const clickCK = () => {
  console.log(getByVal.value, '--===')
  // 4 来料  /pages/incomingInspection/InspectingPackingYJView
  // 4 来料指标  /pages/incomingInspection/InspectingPackingYJViewZB
  // 5 库存  /pages/kuIncomingInspection/InspectingPackingYJView
  // 5 库存指标  /pages/kuIncomingInspection/InspectingPackingYJViewZB
  getByVal.value.UID = getByVal.value.MID
  if (getByVal.value.cVouchTypeCode == 4) {
    uni.navigateTo({
      url:
        '/pages/incomingInspection/InspectingPackingYJViewZB?obj=' + JSON.stringify(getByVal.value)
    })
  } else {
    uni.navigateTo({
      url:
        '/pages/kuIncomingInspection/InspectingPackingYJViewZB?obj=' +
        JSON.stringify(getByVal.value)
    })
  }
}

//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // currentPage.value = 1
  // total.value = 0
  // xiangMList.value = []
  // getList()
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
