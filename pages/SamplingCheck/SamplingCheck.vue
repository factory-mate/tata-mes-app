<template>
  <!-- 发货抽检-->
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
    <view class="content">
      <view style="display: flex; align-items: center; padding: 0 10px">
        <view style="width: 60px">产品类型：</view>
        <view style="width: 100px">
          <uni-section
            title="可搜索"
            type="line"
          >
            <view
              class="uni-px-5 uni-pb-5"
              style="width: 160px"
            >
              <zxz-uni-data-select
                v-model="Product"
                filterable
                :localdata="Productrange"
                @inputChange="inputChange"
                @change="PROchange"
                :focus="PeofocusType"
                @input="PeoFoucs"
                placeholder="请选择产品类型"
              ></zxz-uni-data-select>
            </view>
          </uni-section>
        </view>
      </view>
      <view
        v-if="current == 2"
        style="display: flex; justify-content: space-between"
      >
        <view style="display: flex; justify-content: space-between">
          <view
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 10px;
            "
          >
            <view style="width: 60px">检验单号：</view>
            <view style="width: 190px">
              <input
                class="inputSty"
                v-model="searchCode"
                placeholder="请输入设备"
                placeholder-style="font-size:12px"
              />
            </view>
          </view>
        </view>
      </view>
      <view
        v-if="current == 2"
        style="display: flex; justify-content: space-between"
      >
        <view style="display: flex; justify-content: space-between">
          <view
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 10px;
            "
          >
            <view style="width: 60px">结果：</view>
            <view style="width: 90px">
              <uni-section
                title="可搜索"
                type="line"
              >
                <view
                  class="uni-px-5 uni-pb-5"
                  style="width: 160px"
                >
                  <zxz-uni-data-select
                    v-model="result"
                    filterable
                    :localdata="resultorange"
                    @inputChange="resultChange"
                    @change="Resultchange"
                    :focus="ResultfocusType"
                    @input="ResultFoucs"
                    placeholder="请选择"
                  ></zxz-uni-data-select>
                </view>
              </uni-section>
            </view>
          </view>
        </view>
      </view>
      <view style="display: flex; align-items: center; padding: 0 10px; margin-top: 10rpx">
        <view style="width: 60px">检验日期：</view>
        <view style="width: 260px">
          <!-- <uni-datetime-picker v-model="single" type="day" @change='Time' /> -->
          <uni-datetime-picker
            v-model="Timerange"
            type="daterange"
            @maskClick="maskClickss"
          />
        </view>
      </view>
      <view style="margin-left: 260px; margin-top: 5px">
        <button
          class="mini-btn"
          style="margin-right: 10rpx; color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
          type="warn"
          size="mini"
          @click="getSearch"
        >
          查询
        </button>
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
      <view v-if="current === 0">
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 430) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in PerForPageList"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">报检单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">订单号：{{ item.cSourceCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品编码：{{ item.cInvCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">物流商：{{ item.cLogisticsName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">订单类型：{{ item.cPARM03 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">包号：{{ item.cPackageCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">库区：{{}}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">库位：{{ item.cWareHouseLocationName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验日期：{{ item.dDate }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                        type="warn"
                        size="mini"
                        @click="CloseItem(item)"
                      >
                        关闭
                      </button>
                    </view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                        type="warn"
                        size="mini"
                        @click="Check(item)"
                      >
                        检验
                      </button>
                    </view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="PerForPageList.length"
            ></uni-load-more>
          </scroll-view>
        </view>
      </view>
      <view v-if="current === 1">
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 430) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in TWOlIST"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验单号：{{ item?.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">订单号：{{ item?.cSourceCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品编码：{{ item?.cInvCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品名称：{{ item?.cInvName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">物流商：{{ item?.cLogisticsName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">订单类型：{{ item?.cPARM03 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">包号：{{ item?.cPackageCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">库区：{{}}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">库位：{{ item?.cWareHouseLocationName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验日期：{{ item?.dDate }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                        type="warn"
                        size="mini"
                        @click="CheckPoint(item)"
                      >
                        检验指标
                      </button>
                    </view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="TWOlIST.length"
            ></uni-load-more>
          </scroll-view>
        </view>
      </view>
      <view v-if="current === 2">
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 430) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in THRElIST"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">订单号：{{ item.cSourceCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品编码：{{ item.cInvCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">物流商：{{ item.cLogisticsName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">订单类型：{{}}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">包号：{{ item.cPackageCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">库区：{{}}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">库位：{{ item.cWareHouseLocationName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验日期：{{ item.dDate }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">判定结果：{{ item.IsOKName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                        type="warn"
                        size="mini"
                        @click="CheckEND(item)"
                      >
                        查看指标
                      </button>
                    </view>
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
import {
  GetSeachPage,
  GetProudctClassify,
  Close,
  GetCheck,
  GetCheckedList
} from '@/api/Quanilty.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../api/login'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('发货检验')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const disabled = ref(true)
const searchValue = ref()
const code = ref()
//页面条数
const pageSize = ref(10)
const pageSizetwo = ref(10)
const pageSizethre = ref(10)
//当前页
const currentPage = ref(1)
const currentPagetwo = ref(1)
const currentPagethre = ref(1)
//总条数
const total = ref(0)
const totaltwo = ref(0)
const totalthre = ref(0)
const PageList = ref([])
//总页数
const pageTotal = ref(0)
const pageTotaltwo = ref(0)
const pageTotalthre = ref(0)
const single = ref()
//抽检类型
const checkClassify = ref()
const CheckfocusType = ref(false)
const Checkorange = ref([])
//产品类型
const Product = ref()
const Productrange = ref([])
const PeofocusType = ref(false)
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待检验', '检验中', '已检验'])
//日期范围
const PerForPageList = ref([])
const Timerange = ref([])
const BeginTime = ref()
const EndTime = ref()
const THRElIST = ref([])
const result = ref()
const resultorange = ref([])
const ResultfocusType = ref(false)
const searchCode = ref()
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
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
  ProductClaaify()
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
}
const Resultchange = (i) => {
  // CheckObj.value = i
}
const inputChange = () => {}
const ProductinputChange = () => {}
const CheckFoucs = () => {}
//抽检类型下拉变化
const Checkchange = () => {}
const Time = () => {}
//产品类型变化
const ProductInfo = ref()
const PROchange = (i) => {
  ProductInfo.value = i
}
const resultChange = () => {}
const ResultFoucs = () => {}
const PeoFoucs = () => {}
const ProductClaaify = () => {
  GetProudctClassify({
    cTableCode: 'FM_QC_PRE_CHECKVOUCH',
    cAttributeCode: 'cPARM01'
  }).then((res) => {
    if (res.status == 200) {
      Productrange.value = res.data.map((i) => {
        return {
          value: i.cDictonaryCode,
          text: i.cDictonaryName
        }
      })
    }
  })
}
const GetResult = () => {
  GetProudctClassify({
    cTableCode: 'FM_QC_CHECKVOUCH',
    cAttributeCode: 'IsOK'
  }).then((res) => {
    if (res.status == 200) {
      resultorange.value = res.data.map((i) => {
        return {
          value: i.cDictonaryCode,
          text: i.cDictonaryName
        }
      })
    }
  })
}
const getListPage = () => {
  if (Timerange.value.length) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  uni.showLoading({
    title: '搜索中...'
  })
  GetSeachPage({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: '',
    Conditions:
      Timerange.value.length > 0 && ProductInfo.value
        ? `iStatus=1 && cVouchTypeCode = 3 && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && cPARM01=${ProductInfo.value.value}`
        : Timerange.value.length > 0
          ? `iStatus=1 && cVouchTypeCode = 3 && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
          : ProductInfo.value
            ? `iStatus=1 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value}`
            : 'iStatus=1 && cVouchTypeCode = 3'
  }).then((res) => {
    if (res.status == 200) {
      PerForPageList.value = [...PerForPageList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const getSearch = () => {
  if (current.value == 0) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
    PerForPageList.value = []
    currentPage.value = 1
    total.value = 0
    getListPage()
  }
  if (current.value == 1) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
    TWOlIST.value = []
    currentPagetwo.value = 1
    totaltwo.value = 0
    GetCkeckedPage()
  }
  if (current.value == 2) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
    THRElIST.value = []
    currentPagethre.value = 1
    totalthre.value = 0
    GetCkeckThrePage()
  }
}
//关闭
const CloseItem = (i) => {
  uni.showLoading({
    title: '关闭中...'
  })
  Close({
    UID: i.UID
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '成功关闭！'
      })
      uni.hideLoading()
      uni.stopPullDownRefresh()
      PerForPageList.value = []
      currentPage.value = 1
      total.value = 0
      getListPage()
    } else {
      uni.showToast({
        icon: 'none',
        title: '关闭失败！'
      })
      uni.hideLoading()
    }
  })
}
// 检验中====
const CheckData = ref()
//检验
const Check = (i) => {
  GetCheck({
    MID: i.UID,
    cVouchTypeCode: i.cVouchTypeCode,
    cModeCode: 'QC.CheckVouch.R'
  }).then((res) => {
    if (res.status == 200) {
      current.value = 1
      CheckData.value = res.data
      GetCkeckedPage()
    } else {
      uni.showToast({
        icon: 'none',
        title: '无法检验！'
      })
    }
  })
}
const TWOlIST = ref([])
const GetCkeckedPage = () => {
  if (Timerange.value.length) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  uni.showLoading({
    title: '数据加载中...'
  })
  GetCheckedList({
    PageIndex: currentPagetwo.value,
    PageSize: pageSizetwo.value,
    OrderByFileds: '',
    Conditions:
      Timerange.value.length > 0 && ProductInfo.value
        ? `iStatus=1 && cVouchTypeCode = 3 && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && cPARM01=${ProductInfo.value.value}`
        : Timerange.value.length > 0
          ? `iStatus=1 && cVouchTypeCode = 3 && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
          : ProductInfo.value
            ? `iStatus=1 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value}`
            : 'iStatus=1 && cVouchTypeCode = 3'
  }).then((res) => {
    if (res.status == 200) {
      TWOlIST.value = [...TWOlIST.value, ...res.data.data]
      totaltwo.value = res.data.dataCount
      pageTotaltwo.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const ChangTab = () => {
  if (current.value == 0) {
    currentPage.value = 1
    total.value = 0
    PerForPageList.value = []
    getListPage()
  }
  if (current.value == 1) {
    currentPagetwo.value = 1
    totaltwo.value = 0
    TWOlIST.value = []
    GetCkeckedPage()
  }
  if (current.value == 2) {
    currentPagethre.value = 1
    totalthre.value = 0
    THRElIST.value = []
    GetCkeckThrePage()
    GetResult()
  }
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
const maskClickss = (e) => {
  BeginTime.value = Timerange.value[0]
  EndTime.value = Timerange.value[1]
}
//
//检验指标
const CheckPoint = (i) => {
  uni.navigateTo({
    url: '/pages/SamplingCheck/CheckPoint/CheckPoint?Info=' + JSON.stringify(i)
  })
}
// 已检验的查看指标
const CheckEND = (i) => {
  uni.navigateTo({
    url: '/pages/SamplingCheck/CheckEndPoint/CheckEndPoint?Info=' + JSON.stringify(i)
  })
}
//已检验
const GetCkeckThrePage = () => {
  uni.showLoading({
    title: '数据加载中...'
  })
  if (Timerange.value.length) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  // 'iStatus=2 && cVouchTypeCode = 3',
  GetCheckedList({
    PageIndex: currentPagethre.value,
    PageSize: pageSizethre.value,
    OrderByFileds: '',
    Conditions:
      searchCode.value && ProductInfo.value && Timerange.value.length > 0 && result.value
        ? `iStatus=2 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value}  && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && IsOK=${result.value} && cCode=${searchCode.value}`
        : Timerange.value.length > 0 && searchCode.value && result.value
          ? `iStatus=2 && cVouchTypeCode = 3 && cCode=${searchCode.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && IsOK=${result.value}`
          : Timerange.value.length > 0 && ProductInfo.value && searchCode.value
            ? `iStatus=2 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value}  && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && cCode=${searchCode.value}`
            : searchCode.value && result.value && ProductInfo.value
              ? `iStatus=2 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value} && IsOK=${result.value} && cCode=${searchCode.value}`
              : result.value && ProductInfo.value && Timerange.value.length > 0
                ? `iStatus=2 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value}  && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && IsOK=${result.value} `
                : Timerange.value.length > 0 && searchCode.value
                  ? `iStatus=2 && cVouchTypeCode = 3 && cCode=${searchCode.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
                  : Timerange.value.length > 0 && ProductInfo.value
                    ? `iStatus=2 && cVouchTypeCode = 3  && cPARM01=${ProductInfo.value.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
                    : searchCode.value && ProductInfo.value
                      ? `iStatus=2 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value} && cCode=${searchCode.value}`
                      : result.value && searchCode.value
                        ? `iStatus=2 && cVouchTypeCode = 3 && cCode=${searchCode.value} && IsOK=${result.value}`
                        : result.value && ProductInfo.value
                          ? `iStatus=2 && cVouchTypeCode = 3 && cPARM01=${ProductInfo.value.value} && IsOK=${result.value}`
                          : result.value && Timerange.value.length > 0
                            ? `iStatus=2 && cVouchTypeCode = 3 && dDate>=${BeginTime.value} && dDate<=${EndTime.value} && IsOK=${result.value}`
                            : Timerange.value.length > 0
                              ? `iStatus=2 && cVouchTypeCode = 3 && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
                              : ProductInfo.value
                                ? `iStatus=2 && cVouchTypeCode = 3  && cPARM01=${ProductInfo.value.value}`
                                : searchCode.value
                                  ? `iStatus=2 && cVouchTypeCode = 3 && cCode=${searchCode.value} `
                                  : result.value
                                    ? `iStatus=2 && cVouchTypeCode = 3 &&  IsOK=${result.value}`
                                    : 'iStatus=2 && cVouchTypeCode = 3'
  }).then((res) => {
    if (res.status == 200) {
      THRElIST.value = [...THRElIST.value, ...res.data.data]
      totalthre.value = res.data.dataCount
      pageTotalthre.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}

//下拉
onPullDownRefresh(() => {
  if (current.value == 0) {
    currentPage.value = 1
    total.value = 0
    PerForPageList.value = []
    getListPage()
  }
  if (current.value == 1) {
    currentPagetwo.value = 1
    totaltwo.value = 0
    TWOlIST.value = []
    GetCkeckedPage()
  }
})
//上拉
const scrolltolower = () => {
  if (current.value == 0) {
    more.value = 'loading'
    currentPage.value++
    if (currentPage.value > pageTotal.value) {
      more.value = 'no-more'
    } else {
      getListPage()
    }
  }
  if (current.value == 1) {
    more.value = 'loading'
    currentPagetwo.value++
    if (currentPagetwo.value > pageTotaltwo.value) {
      more.value = 'no-more'
    } else {
      GetCkeckedPage()
    }
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
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .HeadTop {
    font-size: 16px;
    margin: 5px 10px;
    display: flex;
    justify-content: space-between;

    .text {
      padding: 5px 0;
    }
  }

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .headSty {
    width: 100%;
    height: 100%;

    // display: flex;
    .RUtext {
      margin-top: 10px;
      width: 100px;
      padding: 3px;
      text-align: center;
      border: 1px solid gray;
      // border-radius: 10px;
    }

    .line {
      // height: 1px;
      width: 100%;
      border: 1px solid gray;
      // margin-top: 10px;
    }
  }

  .content {
    width: 100%;
    font-size: 12px;

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .project {
        background: #fff;
        font-size: 12px;
        margin: 10rpx 10rpx;
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

        .four-btn {
          display: flex;
          margin: 10px;
        }
      }
    }
  }

  .BTN {
    text-align: center;
    justify-content: space-between;
    margin: 10px 0;

    .mini-btn {
      margin: 0 10px;
    }
  }
}
</style>
