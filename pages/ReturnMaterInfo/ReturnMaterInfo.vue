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
    <uni-row class="head_row">
      <uni-col :span="16">
        <view
          style="
            display: flex;
            text-align: center;
            justify-content: start;
            align-items: center;
            margin-top: 4px;
          "
        >
          <view style="min-width: 60px">线边仓：</view>
          <view
            class=""
            style="height: 40px"
          >
            <up-input
              v-model="CKval"
              @confirm="getCangku"
              :focus="focusType"
              placeholder="请扫描线边仓"
            />
          </view>
        </view>
      </uni-col>
      <uni-col :span="8">
        <view
          class=""
          style="margin-left: 4px"
          >线边仓：{{ changkuData.cWareHouseName }}</view
        >
      </uni-col>
    </uni-row>
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
      <!-- 申请操作 -->
      <view v-if="current === 0">
        <!-- 搜索框 -->
        <view class="search-wl">
          <uni-row class="demo-uni-row">
            <!-- <uni-col :span="14">
							<view class="demo-uni-col dark">线边仓：{{}}</view>
						</uni-col> -->
            <uni-col :span="24">
              <view class="demo-uni-col dark">申请单号：{{ cCode }}</view>
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
                <up-input
                  v-model="xmVal"
                  @confirm="getXiangMa"
                  :focus="focusXM"
                  placeholder="请扫描箱码"
                />
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
                <up-input
                  v-model="slVal"
                  placeholder="请输入数量"
                />
              </view>
            </uni-col>
            <uni-col :span="6">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="clickNum"
                style="margin-left: 10rpx"
              >
                确定
              </button>
            </uni-col>
          </uni-row>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 330) + 'px'"
        >
          <view class="project">
            <view
              class="wLIst"
              v-for="(item, i) in xiangMList"
              :key="i"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">序号：{{ xiangMList.length - i }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">箱码：{{ item.cKeyCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col light">数量：{{ item.nQuinity }}</view>
                </uni-col>
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

        <view class="btn-area">
          <up-button
            size="small"
            text="保存"
            @click="clickAdd"
            style="margin-right: 8px"
          />
          <up-button
            type="error"
            size="small"
            text="提交"
            @click="clickTJ"
            style="margin-right: 8px"
          />
        </view>
      </view>
      <!-- 单据 -->
      <view v-if="current === 1">
        <view
          v-if="DJType"
          class="ONE-DJ"
        >
          <view class="search-wl">
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
                  <view style="width: 80px">申请单号：</view>
                  <!-- 搜索框 -->
                  <input
                    class="inputSty"
                    v-model="dhVal"
                    :focus="dhfocusType"
                    placeholder="请输入申请单号"
                    placeholder-style="font-size:12px"
                    style="line-height: 30px; height: 30px"
                  />
                </view>
              </uni-col>
              <uni-col :span="6">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="clickDan"
                  style="margin-left: 10rpx"
                >
                  搜索
                </button>
              </uni-col>
            </uni-row>
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
                <view
                  class="wLIst"
                  v-for="(item, i) in danjuList"
                  :key="item.UID"
                >
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col dark">申请单号：{{ item.cCode }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">线边仓：{{ item.cOutWareHouseName }}</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
                    </uni-col>
                  </uni-row>
                  <view class="four-btn">
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #1fcc1c; border-color: #1aad19"
                      type="warn"
                      size="mini"
                      @click="clickDjtijiao(item)"
                    >
                      提交
                    </button>
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #aa0000; border-color: #aa0000"
                      type="warn"
                      size="mini"
                      @click="clickClear(item.UID)"
                    >
                      删除
                    </button>
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #00aa7f; border-color: #00aa7f"
                      type="warn"
                      size="mini"
                      @click="clickShaom(item)"
                    >
                      继续扫描
                    </button>
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #e8e873; border-color: #e8e873"
                      type="warn"
                      size="mini"
                      @click="WLdetailData(item)"
                    >
                      物料详情
                    </button>
                  </view>
                </view>
              </view>
              <uni-load-more :status="more"></uni-load-more>
            </scroll-view>
          </view>
        </view>

        <view
          v-show="WLType"
          class="TWO-wlInfo"
        >
          <view style="text-align: center; margin: 20px; font-size: 16px">物料信息</view>
          <scroll-view
            :style="'height:' + (h - 200) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="WLscrolltolower"
          >
            <view
              class="TWO-wlInfo-list"
              v-for="(item, i) in WLdetailList"
              :key="item.MID"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">申请单号：{{ item.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">批次号：{{ item.cDefindParm03 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">数量：{{ item.SumnQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <button
                    class="mini-btn"
                    type="warn"
                    style="color: black; background-color: #ffff7f; border-color: #ffff7f"
                    size="mini"
                    @click="XMDetail(item)"
                  >
                    箱码详情
                  </button>
                </uni-col>
                <uni-col :span="16">
                  <button
                    class="mini-btn"
                    type="warn"
                    style="color: black; background-color: #ff0000; border-color: #ff0000"
                    size="mini"
                    @click="clickWlDel(item)"
                  >
                    删除
                  </button>
                </uni-col>
              </uni-row>
            </view>
            <uni-load-more :status="wlmore"></uni-load-more>
          </scroll-view>
        </view>
        <view
          v-if="XMType"
          class="Three-List"
        >
          <view style="text-align: center; margin: 20px; font-size: 16px">箱码信息</view>
          <scroll-view
            :style="'height:' + (h - 220) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="xmscrolltolower"
          >
            <view
              class="Three-wlInfo-list"
              v-for="(item, i) in XMliST"
              :key="item.MID"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="8">
                  <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">箱码：{{ item.cDefindParm02 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <!-- <uni-col :span="8">
									<view class="demo-uni-col dark"></view>
								</uni-col> -->
                <uni-col :span="8">
                  <view class="demo-uni-col dark">批次号：{{ item.cDefindParm03 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <button
                    class="mini-btn"
                    type="warn"
                    style="color: black; background-color: #ff0000; border-color: #ff0000"
                    size="mini"
                    @click="clickXMdel(item)"
                  >
                    删除
                  </button>
                </uni-col>
              </uni-row>
            </view>
            <uni-load-more :status="xmmore"></uni-load-more>
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

import _ from 'lodash'
import {
  PDAGetStockByBarCode,
  changKuGetForList,
  CheckApplyForAdd,
  CheckApplyForGetForPage,
  CheckApplyForClear,
  CheckApplyForCommit,
  GetMS_StatisticsForPage,
  ClearMSBycInvCode,
  GetMSForPage,
  ClearMSByUID
} from '@/api/PDA_3.js'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const wlmore = ref('more')
const xmmore = ref('more')
const focusType = ref(true)
const dhfocusType = ref(false)
const focusXM = ref(true)
const title = ref('线边仓退料通知')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['申请操作', '单据'])
const searchValue = ref('') // 箱码输入框绑定值ist
const WList = ref([])
const XMliST = ref([])
const changkuData = ref('')
const danjuList = ref([])
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
  setfocus()
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
// 仓库数据
const getCangku = () => {
  let obj = {
    OrderByFileds: '',
    Conditions: 'cWareHouseCode = ' + CKval.value
  }
  changKuGetForList(obj).then((res) => {
    changkuData.value = ''
    if (res.data.length) {
      changkuData.value = res.data[0]
    }
    setXMfocus()
  })
}
// 箱码
const getXiangMa = () => {
  if (!CKval.value) {
    uni.showToast({
      icon: 'none',
      title: '请先输入线边仓'
    })
    return
  }
  if (!xmVal.value) {
    uni.showToast({
      icon: 'none',
      title: '请先输入箱码'
    })
    return
  }
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    cWareHouseCode: CKval.value,
    cBarCode: xmVal.value
  }
  PDAGetStockByBarCode(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.status == 200) {
      xiangMObj.value = res.data
      xiangMObj.value.cDefindParm02 = xmVal.value //箱码
      xiangMObj.value.cDefindParm03 = res.data.cBatch //批次号

      if (xiangMList.value.some((item) => item.cKeyCode == xiangMObj.value.cKeyCode)) {
        uni.showToast({
          icon: 'none',
          title: '该箱码已扫描，请重新扫描',
          duration: 2000
        })
        xmVal.value = ''
        slVal.value = ''
        xiangMObj.value = {}
      } else {
        slVal.value = res.data.nQuinity
      }
      // xiangMList.value.unshift(xiangMObj.value);
      // xmVal.value = ''

      // xiangMList.value.push(xiangMObj.value)
    } else {
      xmVal.value = ''
      uni.showToast({
        icon: 'none',
        title: '出错了！'
      })
    }

    // xmVal.value=''
  })
}
const clickDel = (i) => {
  xiangMList.value.splice(i, 1)
}
// 确定 线边仓 004  箱码 BOX202404090135 BOX202404090135
const clickNum = () => {
  // xiangMList.value.forEach((item) => {
  // 	if (item.cBarCode == xmVal.value) {
  // 		item.nQuinity = slVal.value
  // 	}
  // })
  if (!slVal.value || slVal.value <= 0) {
    uni.showToast({
      icon: 'none',
      title: '数量必须大于0'
    })
    return
  }
  if (slVal.value > xiangMObj.value.nQuinity) {
    uni.showToast({
      icon: 'none',
      title: '数量不能大于箱码数量'
    })
    return
  }
  xiangMObj.value.nQuinity = slVal.value
  xiangMList.value.unshift(xiangMObj.value)
  xmVal.value = ''
  slVal.value = ''
  setXMfocus()
}
//Tab切换
const onClickItem = (e) => {
  tabVal.value = e.currentIndex
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (e.currentIndex == 1) {
    DJType.value = true
    WLType.value = false
    XMType.value = false
    danjuList.value = []
    getDanList()
  } else {
    cCode.value = ''
    UID.value = ''
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
  danjuList.value = []
  getDanList()
}
const getDanList = () => {
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: dhVal.value
      ? 'cVouchTypeCode=02 && iStatus=0 && cCode like ' + dhVal.value
      : 'cVouchTypeCode=02 && iStatus=0'
  }
  uni.showLoading({
    title: '加载中'
  })
  CheckApplyForGetForPage(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.success) {
      danjuList.value = [...danjuList.value, ...res.data.data]
      pageTotal.value = res.data.pageCount
    }
  })
}
const clickDjtijiao = (v) => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    UIDs: [v.UID],
    iStatus: 1,
    IsContinue: true
  }
  CheckApplyForCommit(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: res.msg || ''
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: res.errmsg[0].Value
      })
    }
  })
}
const clickClear = (v) => {
  console.log(v, '--vv')
  uni.showLoading({
    title: '加载中'
  })
  CheckApplyForClear([v]).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    danjuList.value = []
    currentPage.value = 1
    getDanList()
  })
}

const clickShaom = (v) => {
  current.value = 0
  cCode.value = v.cCode
  UID.value = v.UID
}
const clickAdd = () => {
  if (xiangMList.value.length === 0) {
    uni.showToast({
      icon: 'none',
      title: '请先扫描箱码'
    })
    return
  }
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: function (r) {
      if (r.confirm) {
        uni.showLoading({
          title: '加载中'
        })
        xiangMList.value.forEach((item) => {
          item.nAccQuantity = '1'
          item.SumnQuantity = item.nQuinity
          item.nQuantity = item.nQuinity
        })
        let obj = {
          IsCommit: false, //是否提交
          cCode: cCode.value,
          UID: UID.value,
          Items: xiangMList.value,
          cDefindParm02: changkuData.value.cWareHouseCode, //编码
          cDefindParm03: changkuData.value.cWareHouseName, //名称
          cVouchSourceTypeCode: '002',
          cVouchTypeCode: '02'
        }
        CheckApplyForAdd(obj).then((res) => {
          uni.hideLoading()
          uni.stopPullDownRefresh()
          uni.showToast({
            icon: 'none',
            title: res.msg || ''
          })
          xiangMList.value = []
        })
      }
    }
  })
}

const clickTJ = () => {
  if (xiangMList.value.length === 0) {
    uni.showToast({
      icon: 'none',
      title: '请先扫描箱码'
    })
    return
  }
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: function (r) {
      if (r.confirm) {
        uni.showLoading({
          title: '加载中'
        })
        xiangMList.value.forEach((item) => {
          item.nAccQuantity = '1'
          item.SumnQuantity = item.nQuinity
          item.nQuantity = item.nQuinity
        })
        let obj = {
          IsCommit: true, //是否提交
          cCode: cCode.value,
          UID: UID.value,
          Items: xiangMList.value,
          cDefindParm02: xiangMObj.value.cWareHouseCode, //编码
          cDefindParm03: xiangMObj.value.cWareHouseName, //名称
          cVouchSourceTypeCode: '002',
          cVouchTypeCode: '02'
        }
        CheckApplyForAdd(obj).then((res) => {
          uni.hideLoading()
          uni.stopPullDownRefresh()
          uni.showToast({
            icon: 'none',
            title: res.msg
          })
          xiangMList.value = []
        })
      }
    }
  })
}
//继续扫描
const ScanXM = () => {
  current.value = 0
}
//物料详情数据
const WLdetailData = (v) => {
  wlObjVal.value = v
  DJType.value = false
  WLType.value = true
  XMType.value = false
  WLdetailList.value = []
  getWLdetailData()
}
const getWLdetailData = () => {
  let obj = {
    PageIndex: wlcurrentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: wlObjVal.value.UID ? 'MID = ' + wlObjVal.value.UID : ''
  }
  GetMS_StatisticsForPage(obj).then((res) => {
    WLdetailList.value = [...WLdetailList.value, ...res.data.data]
    wlpageTotal.value = res.data.pageCount
  })
}
const clickWlDel = (v) => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    // "Mid":'',
    Mid: v.MID,
    cInvCode: v.cInvCode,
    cBatch: v.cBatch
  }
  ClearMSBycInvCode(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    uni.showToast({
      icon: 'none',
      title: res.msg || ''
    })
    WLdetailList.value = []
    getWLdetailData()
  })
}
//箱码详情
const XMDetail = (v) => {
  XMDetailObj.value = v
  XMliST.value = []
  DJType.value = false
  WLType.value = false
  XMType.value = true
  getXMDetail()
}
const getXMDetail = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    PageIndex: xmcurrentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions:
      'mid=' +
      XMDetailObj.value.MID +
      ' && cInvCode= ' +
      XMDetailObj.value.cInvCode +
      ' && cDefindParm03=' +
      XMDetailObj.value.cDefindParm03
  }
  GetMSForPage(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    XMliST.value = [...XMliST.value, ...res.data.data]
    xmpageTotal.value = res.data.pageCount
  })
}
const clickXMdel = (v) => {
  uni.showLoading({
    title: '加载中'
  })
  ClearMSByUID([v.UID]).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    uni.showToast({
      icon: 'none',
      title: res.msg || ''
    })
    XMliST.value = []
    getXMDetail()
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  danjuList.value = []
  WLdetailList.value = []
  getDanList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    getDanList()
  }
}
//物料上拉
const WLscrolltolower = () => {
  wlmore.value = 'loading'
  wlcurrentPage.value++
  if (wlcurrentPage.value > wlpageTotal.value) {
    wlmore.value = 'no-more'
  } else {
    WLdetailData()
  }
}
//箱码上拉
const xmscrolltolower = () => {
  xmmore.value = 'loading'
  xmcurrentPage.value++
  if (xmcurrentPage.value > xmpageTotal.value) {
    xmmore.value = 'no-more'
  } else {
    getXMDetail()
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

.btn-area {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
