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
          style="display: flex; text-align: center; justify-content: start; align-items: center"
        >
          <view style="min-width: 60px; margin-top: 10px">库位：</view>
          <view
            class=""
            style="height: 40px"
          >
            <uni-section
              title=""
              type="line"
            >
              <up-input
                :focus="focusType"
                @blur="setfocus"
                @confirm="getChangk"
                v-model="CKval"
                placeholder="请输入库位"
              />
            </uni-section>
            <!-- <input v-else class="inputSty" v-model="CKval" @input="getChangk"
								:focus="focusType" @blur="setfocus"  placeholder="请扫描仓库"
								placeholder-style="font-size:12px" style="line-height: 30px;height: 30px;"/> -->
          </view>
        </view>
      </uni-col>
      <uni-col :span="8">
        <view
          class=""
          style="margin-top: 10px"
        >
          库位：{{ changkuData.cWareHouseName }}</view
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
            <!-- <uni-col :span="24">
							<view class="demo-uni-col dark">申请单号：{{cCode}}</view>
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
                <view style="width: 50px">箱码：</view>

                <up-input
                  @blur="setXMfocus"
                  @confirm="getXiangMa"
                  v-model="xmVal"
                  placeholder="请输入箱码"
                  clearable
                />

                <!-- <input v-else class="inputSty" v-model="xmVal" @input="getXiangMa"
										:focus="focusXM" @blur="setXMfocus"  placeholder="请扫描箱码"
										placeholder-style="font-size:12px" /> -->
              </view>
            </uni-col>
            <uni-col :span="6"> </uni-col>
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
                <up-input
                  @blur=""
                  @confirm=""
                  v-model="slVal"
                  placeholder="请输入数量"
                  disabled
                />
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
                @click="clickNum"
                style="margin-left: 10rpx"
              >
                确定
              </button>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row itemTxt">
            <uni-col :span="14">
              <view class="demo-uni-col dark">供应商：{{ xiangMObj.cVendorName }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">批次号：{{ xiangMObj.cBatch }}</view>
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
              <!-- <view class="demo-uni-col dark">批次号：{{xiangMObj.cBatch}}</view> -->
            </uni-col>
            <uni-col :span="14">
              <!-- <view class="demo-uni-col light">数量：{{xiangMObj.nQuinity}}</view> -->
            </uni-col>
          </uni-row>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 420) + 'px'"
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
        <view class="BTN-Two">
          <button
            class="mini-btn"
            style="color: black; background-color: #1aad19; border-color: #1aad19"
            type="warn"
            size="mini"
            :disabled="!xiangMList.length"
            @click="clickAdd"
          >
            保存
          </button>
          <button
            class="mini-btn"
            type="warn"
            style="color: black; background-color: #ffff7f; border-color: #ffff7f"
            size="mini"
            :disabled="!xiangMList.length"
            @click="clickTJ"
          >
            提交
          </button>
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
                    @blur="setfocus"
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
                      <view class="demo-uni-col dark">供应商：{{ item.cVendorName }}</view>
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
                      @click="onClickClear(item.UID)"
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
          <!-- <scroll-view :style="'height:'+ (h-200) + 'px'" scroll-y='true' lower-threshold="50"
						show-scrollbar="true" @scrolltolower="WLscrolltolower" > -->
          <view :style="'height:' + (h - 200) + 'px'">
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
                  <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">数量：{{ item.sumQuantity }}</view>
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
            <!-- <uni-load-more :status="wlmore"></uni-load-more> -->
          </view>
          <!-- </scroll-view> -->
        </view>
        <view
          v-if="XMType"
          class="Three-List"
        >
          <view style="text-align: center; margin: 20px; font-size: 16px">箱码信息</view>
          <!-- <scroll-view :style="'height:'+ (h-220) + 'px'" scroll-y='true' lower-threshold="50"
						show-scrollbar="true" @scrolltolower="xmscrolltolower" > -->
          <view :style="'height:' + (h - 220) + 'px'">
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
                  <view class="demo-uni-col dark">箱码：{{ item.cKeyCode }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <!-- <uni-col :span="8">
									<view class="demo-uni-col dark"></view>
								</uni-col> -->
                <uni-col :span="12">
                  <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
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
            <!-- <uni-load-more :status="xmmore"></uni-load-more> -->
          </view>
          <!-- </scroll-view> -->
        </view>
      </view>
    </view>
    <uni-popup
      ref="deletePopup"
      type="dialog"
    >
      <uni-popup-dialog
        title="您确定要删除吗？"
        message="成功消息"
        :duration="2000"
        :before-close="true"
        @close="() => deletePopup.close()"
        @confirm="handleDelete"
        confirmText="确定"
        cancelText="取消"
      ></uni-popup-dialog>
    </uni-popup>
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
  changKuWeiGetForList,
  CheckApplyForAdd,
  CheckApplyForGetForPage,
  CheckApplyForClear,
  CheckApplyForCommit,
  GetMS_StatisticsForPage,
  ClearMSBycInvCode,
  GetMSForPage,
  ClearMSByUID
} from '@/api/tuihuo.js'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const wlmore = ref('more')
const xmmore = ref('more')
const focusType = ref(false)
const dhfocusType = ref(false)
const focusXM = ref(true)
const title = ref('退货检验申请')
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

const deletePopup = ref(null)
const currentDeleteId = ref(null)
onShow(() => {})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
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
// 仓库
const getChangk = () => {
  getCangku()
}
// 仓库数据
const getCangku = () => {
  let obj = {
    OrderByFileds: '',
    Conditions: 'cWareHouseLocationCode = ' + CKval.value
  }
  changKuWeiGetForList(obj).then((res) => {
    changkuData.value = ''
    if (res.data.length) {
      changkuData.value = res.data[0]
    }
  })
}
// 箱码
const getXiangMa = () => {
  if (!CKval.value) {
    uni.showToast({
      icon: 'none',
      title: '请扫描仓库'
    })
    return
  }
  // 校验：扫描的箱码供应商必须要一致
  // if (xiangMList.value.length && xiangMList.value[0].cVendorName !== xiangMObj.value.cVendorName) {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '该箱码供应商不一致'
  //   })
  //   return
  // }
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    cWareHouseCode: CKval.value,
    cKeyCode: xmVal.value
  }
  PDAGetStockByBarCode(obj)
    .then((res) => {
      uni.stopPullDownRefresh()
      if (res.data) {
        // console.log(res,"-resxiangMObj.value");
        xiangMObj.value = res.data
        slVal.value = res.data.nQuinity
      }
      // xiangMObj.value.cDefindParm02=xmVal.value
      // xiangMList.value.push(xiangMObj.value)
      // xmVal.value=''
    })
    .finally(() => uni.hideLoading())
}
const clickDel = (i) => {
  xiangMList.value.splice(i, 1)
}
// 确定
const clickNum = () => {
  // 数量必填，且大于 0
  if (!slVal.value || slVal.value <= 0) {
    uni.showToast({
      icon: 'none',
      title: '数量必填且大于 0'
    })
    return
  }

  if (!xiangMObj.value.cInvCode) {
    uni.showToast({
      icon: 'none',
      title: '缺少物料'
    })
    return
  }

  if (!xiangMObj.value.cVendorName) {
    uni.showToast({
      icon: 'none',
      title: '缺少供应商'
    })
    return
  }

  xiangMObj.value.nQuinity = slVal.value ? slVal.value : xiangMObj.value.nQuinity

  // 箱码重复 BOX202407040161
  if (xiangMList.value.some((item) => item.cKeyCode === xiangMObj.value.cKeyCode)) {
    uni.showToast({
      icon: 'none',
      title: '箱码重复'
    })
    return
  }

  if (xiangMList.value.length === 0) {
    xiangMList.value.push(xiangMObj.value)
    slVal.value = ''
    xmVal.value = ''
    xiangMObj.value = {}
    return
  }

  if (xiangMObj.value.cVendorName == xiangMList.value[0].cVendorName) {
    xiangMList.value.push(xiangMObj.value)
  } else {
    uni.showToast({
      icon: 'none',
      title: '供应商不同'
    })
    return
  }

  slVal.value = ''
  xmVal.value = ''
  xiangMObj.value = {}
}

//Tab切换
const onClickItem = (e) => {
  console.log(e, '---ee')
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
  console.log('单据')
  danjuList.value = []
  getDanList()
}
const getDanList = () => {
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: dhVal.value ? 'iStatus=0 && cCode like ' + dhVal.value : 'iStatus=0'
  }
  uni.showLoading({
    title: '加载中'
  })
  CheckApplyForGetForPage(obj)
    .then((res) => {
      // console.log(res,"--34");
      uni.stopPullDownRefresh()
      if (res.status == 200) {
        danjuList.value = [...danjuList.value, ...res.data.data]
        pageTotal.value = res.data.pageCount
      }
    })
    .finally(() => uni.hideLoading())
}
// 提交
const clickDjtijiao = (v) => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    UID: v.UID,
    utfs: v.utfs,
    s_Model: []
  }
  CheckApplyForCommit(obj)
    .then((res) => {
      // CheckApplyForCommit([v.UID]).then(res=>{
      uni.hideLoading()
      uni.stopPullDownRefresh()
      if (res.status == 200) {
        uni.showToast({
          icon: 'none',
          title: res.msg || ''
        })
        danjuList.value = []
        getDanList()
      } else {
        uni.showToast({
          icon: 'none',
          title: res.errmsg[0].Value
        })
      }
    })
    .finally(() => uni.hideLoading())
}

const onClickClear = (v) => {
  currentDeleteId.value = v
  deletePopup.value.open()
}

// 删除1
const handleDelete = () => {
  if (!currentDeleteId.value) {
    deletePopup.value.close()
    return
  }
  uni.showLoading({
    title: '加载中'
  })
  CheckApplyForClear([currentDeleteId.value])
    .then((res) => {
      uni.stopPullDownRefresh()
      if (res.status == 200) {
        danjuList.value = []
        getDanList()
      }
    })
    .finally(() => {
      uni.hideLoading()
      deletePopup.value.close()
    })
}

const clickShaom = (v) => {
  current.value = 0
  cCode.value = v.cCode
  UID.value = v.UID
}
const clickAdd = () => {
  uni.showLoading({
    title: '加载中'
  })
  xiangMList.value.forEach((item) => {
    item.nAccQuantity = 1
    item.nQuantity = item.nQuinity
  })
  let obj = {
    iStatus: 0, //0保存 1提交
    s_Model: xiangMList.value,
    cVendorName: xiangMList.value[0].cVendorName,
    cVendorCode: xiangMList.value[0].cVendorCode,
    cDefindParm02: changkuData.value.cWareHouseLocationCode, //编码
    cDefindParm03: changkuData.value.cWareHouseLocationName //名称
  }
  CheckApplyForAdd(obj)
    .then((res) => {
      console.log(res, '---3333')
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: res.msg || ''
      })
      xiangMList.value = []
    })
    .finally(() => uni.hideLoading())
}
const clickTJ = () => {
  uni.showLoading({
    title: '加载中'
  })
  xiangMList.value.forEach((item) => {
    item.nAccQuantity = item.nQuinity
  })
  let obj = {
    iStatus: 1, //0保存 1提交
    s_Model: xiangMList.value,
    cVendorName: xiangMList.value[0].cVendorName,
    cVendorCode: xiangMList.value[0].cVendorCode,
    cWareHouseCode: changkuData.value.cWareHouseCode, //编码
    cWareHouseName: changkuData.value.cWareHouseName //名称
  }
  CheckApplyForAdd(obj)
    .then((res) => {
      console.log(res, '---3333')

      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: res.msg || '1111222'
      })
      xiangMList.value = []
    })
    .finally(() => uni.hideLoading())
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
    UID: wlObjVal.value.UID
    // "PageIndex": wlcurrentPage.value,
    // "PageSize": 5,
    // "OrderByFileds": "",
    // "Conditions":wlObjVal.value.UID? 'MID = '+wlObjVal.value.UID:''
  }
  GetMS_StatisticsForPage(obj).then((res) => {
    // WLdetailList.value=[...WLdetailList.value,...res.data.data]
    WLdetailList.value = res.data
    // wlpageTotal.value=res.data.pageCount
  })
}
const clickWlDel = (v) => {
  console.log(v, '000=--clickWlDel')
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    uid: v.MID,
    cInvCode: v.cInvCode,
    cBatch: v.cBatch
  }
  ClearMSBycInvCode(obj)
    .then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: res.msg || ''
      })
      WLdetailList.value = []
      getWLdetailData()
    })
    .finally(() => uni.hideLoading())
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
    uid: XMDetailObj.value.MID,
    cInvCode: XMDetailObj.value.cInvCode,
    cBatch: XMDetailObj.value.cBatch
  }
  GetMSForPage(obj)
    .then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      // XMliST.value=[...XMliST.value,...res.data.data]
      XMliST.value = res.data
      // xmpageTotal.value=res.data.pageCount
    })
    .finally(() => uni.hideLoading())
}
const clickXMdel = (v) => {
  uni.showLoading({
    title: '加载中'
  })
  ClearMSByUID({ uid: v.UID })
    .then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: res.msg || ''
      })
      XMliST.value = []
      getXMDetail()
    })
    .finally(() => uni.hideLoading())
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
.itemTxt {
}
.inStorage .content .search-wl .demo-uni-row {
  padding: 10rpx;
}
</style>
