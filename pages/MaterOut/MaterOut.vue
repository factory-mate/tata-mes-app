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
    <view style="padding: 10px 20px">
      <view style="display: flex; align-items: center; justify-content: flex-start">
        <view style="width: 60px">仓库:</view>
        <view>
          <up-input
            v-model="WsearchValue"
            :disabled="disabled"
            :focus="focusType"
            @confirm="getWares"
            @blur="setfocus"
            placeholder="请扫描仓库"
          />
        </view>
        <view style="width: 80px">
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="ClearInput"
          >
            重置
          </button>
        </view>
      </view>
      <view class="demo-uni-col dark">名称：{{ XBWare.cWareHouseName }}</view>
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
        <view
          class="search-wl"
          style="display: flex; align-items: center"
        >
          <!-- 搜索框 -->
          <input
            class="inputSty"
            style="width: 70%"
            v-model="InfosearchValue"
            placeholder="请输入通知单"
            placeholder-style="font-size:12px"
          />
          <button
            class="mini-btn"
            style="
              color: black;
              backgroundcolor: #e8e873;
              bordercolor: #e8e873;
              width: 20%;
              height: 30px;
            "
            type="warn"
            size="mini"
            @click="Search"
          >
            搜索
          </button>
        </view>
        <view class="listMain">
          <scroll-view
            v-if="!Vtype"
            :style="'height:' + (h - 300) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in OutliST"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">通知单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">线边库：{{ item.cInWareHouseName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
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
                      @click="INFODetail(item)"
                    >
                      详情
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="OutliST.length"
            ></uni-load-more>
          </scroll-view>
          <view v-else>
            <scroll-view
              :style="'height:' + (h - 300) + 'px'"
              scroll-y="true"
              lower-threshold="50"
              show-scrollbar="true"
              @scrolltolower="scrolltolower"
            >
              <view
                class="project"
                v-for="(item, index) in DetailList"
                :key="index"
              >
                <view>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                    </uni-col>
                    <uni-col :span="14">
                      <view class="demo-uni-col dark">通知单号：{{ cCode }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">线边库：{{ WareNmae }}</view>
                    </uni-col>
                    <uni-col :span="14">
                      <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                    </uni-col>
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                    </uni-col>
                    <uni-col :span="12">
                      <view class="demo-uni-col dark"></view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">数量：{{ item.RestQuantity }}</view>
                    </uni-col>
                    <uni-col :span="12">
                      <button
                        class="mini-btn"
                        type="warn"
                        size="mini"
                        @click="OutWare(item)"
                      >
                        下架
                      </button>
                    </uni-col>
                  </uni-row>
                </view>
              </view>
              <uni-load-more
                :status="more"
                v-if="DetailList.length"
              ></uni-load-more>
            </scroll-view>
          </view>
        </view>
      </view>
      <view v-if="current === 1">
        <view class="listMain">
          <view class="projects">
            <uni-row class="demo-uni-row">
              <uni-col :span="20">
                <view class="demo-uni-col dark">通知单号：{{ OutInfo.cCode }}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="20">
                <view class="demo-uni-col dark">物料编码：{{ OutInfo.cInvCode }}</view>
              </uni-col>
              <uni-col :span="6">
                <view class="demo-uni-col dark">数量：{{ OutInfo.RestQuantity }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="20">
                <view class="demo-uni-col dark">物料名称：{{ OutInfo.cInvName }}</view>
              </uni-col>
              <uni-col :span="6">
                <view class="demo-uni-col dark"></view>
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
                  <view style="width: 40px">箱码：</view>
                  <view class="search-wl">
                    <up-input
                      v-model="XMsearchValue"
                      :focus="XMfocusType"
                      :disabled="xmdisabled"
                      @confirm="getXM"
                      @blur="XMsetfocus"
                      clearable
                      placeholder="请扫描箱码"
                    />
                  </view>
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 450) + 'px'"
        >
          <view
            class="project"
            v-for="(item, index) in arrList"
            :key="index"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="8">
                <view class="demo-uni-col dark">序号：{{ arrList.length - index }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">箱码：{{ item.xm }}</view>
              </uni-col>
              <uni-col :span="10">
                <view class="demo-uni-col dark">数量：{{ item.num }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="8">
                <view class="demo-uni-col dark"></view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">货位：{{ item.hw }}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col light">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="DELxm(item, index)"
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
            @click="SaveLIst"
          >
            保存
          </button>
        </view>
      </view>
      <view v-if="current === 2">
        <view
          v-if="!OUTLIST.length"
          style="text-align: center; margin: 20px 0; font-size: 16px; color: #b5b5b5"
        >
          暂无数据,请先下架物料
        </view>
        <view v-if="OUTLIST.length">
          <!-- <view class="RUDetail">
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
          </view> -->
          <view
            class="listMain"
            :style="'height:' + (h - 260) + 'px'"
          >
            <view
              class="RUlist"
              v-for="(item, index) in OUTLIST[0].items"
              :key="index"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="8">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="18">
                  <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark"></view>
                </uni-col>
                <uni-col :span="22">
                  <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
                </uni-col>
                <uni-col :span="15">
                  <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationCode }}</view>
                </uni-col>
              </uni-row>
            </view>
          </view>
        </view>
      </view>
    </view>
    <up-modal
      :show="showModal"
      title="操作确认"
      content="数量已超是否继续"
      cancelText="取消"
      showCancelButton
      @confirm="onConfirmModal"
      @cancel="onCancelModal"
      @close="onCloseModal"
    ></up-modal>
  </view>
</template>

<script setup>
import { ref } from 'vue'
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
  MaterialOutList,
  MaterialDetail,
  MaterialPut,
  GetWare,
  PDACommitOut,
  MaterialPutDown,
  OutList
} from '@/api/PDA.js'
const showModal = ref(false)
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const WsearchValue = ref('') //仓库输入框
const focusType = ref(true)
const XMfocusType = ref(false) //箱码输入框
const disabled = ref(false)
const xmdisabled = ref(true)
const title = ref('领料出库')
const Vtype = ref(false)
//输入框值
const InfosearchValue = ref('') //通知单单输入框
const XMsearchValue = ref('') //箱码输入框
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待出库', '出库操作', '已出库'])
const InfoList = ref([])
const OutliST = ref([]) //待出库列表
const DetailList = ref([]) // 详情列表
const XBWare = ref('') //仓库
const arrList = ref([]) //箱码列表（入库操作）
const OUTLIST = ref([])
//下架
const OutInfo = ref({})
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
onShow(() => {
  setfocus()
})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
})

//仓库输入框聚焦
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
const ChangTab = () => {
  if (current.value == 0) {
    Vtype.value = false
  }
}
//Tab切换
const onClickItem = (e) => {
  Vtype.value = false
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 0) {
    currentPage.value = 1
    total.value = 0
    OutliST.value = []
    getWaresList()
  }
  if (current.value == 1 && JSON.stringify(OutInfo.value) == '{}') {
    // uni.showModal({
    //   showCancel: false,
    //   content: '请先下架',
    //   success: function (res) {
    //     if (res.confirm) {
    //       current.value = 0
    //       console.log('用户点击 确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  }
  if (current.value == 2) {
    handelOutList()
  }
}
//库位验证
const getWares = async () => {
  const res = await GetWare({
    Conditions: `cWareHouseCode=${WsearchValue.value}`
  })
  if (res.status == 200) {
    if (res.data.length) {
      XBWare.value = res.data[0]
      disabled.value = true
      //仓位存在，调取列表
      getWaresList()
    } else {
      uni.showToast({
        icon: 'none',
        title: '仓库错误，请重新扫描'
      })
      WsearchValue.value = ''
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}

//待出库列表
const getWaresList = async () => {
  uni.showLoading({
    title: '加载中'
  })
  const list = []
  let Conditions = ''
  if (WsearchValue.value) {
    list.push(`cInWareHouseCode=${WsearchValue.value}`)
  }
  if (InfosearchValue.value) {
    list.push(`cCode like ${InfosearchValue.value}`)
  }
  Conditions = list.join(' && ')
  const res = await MaterialOutList({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: '',
    Conditions
  })
  if (res.status == 200) {
    disabled.value = true
    uni.hideLoading()
    uni.stopPullDownRefresh()
    OutliST.value = [...OutliST.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
    InfosearchValue.value = ''
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg[0].Value
    })
  }
}
//仓库重置按钮
const ClearInput = () => {
  WsearchValue.value = ''
  XBWare.value = ''
  disabled.value = false
  setfocus()
}
//搜索按钮
const Search = () => {
  OutliST.value = []
  getWaresList()
}
const cCode = ref('')
const WareNmae = ref('')
//详情（待出库）
const INFODetail = async (i) => {
  cCode.value = i.cCode
  WareNmae.value = i.cInWareHouseName
  //详情数据请求成功--->下架页面
  const res = await MaterialDetail({
    val: i.UID
  })
  if (res.status == 200) {
    if (res.data.length) {
      Vtype.value = true
      DetailList.value = res.data
    } else {
      uni.showToast({
        icon: 'none',
        title: '该条数据，没有详情数据'
      })
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}
const ID = ref({})
//下架按钮
let cInvCode = ref('')
const OutWare = (i) => {
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: function (r) {
      if (r.confirm) {
        // 已下架列表接口需要code参数
        cInvCode.value = i.cInvCode
        //保存时需要MID/UID
        ID.value = i
        let obj = {
          cCode: cCode.value,
          cInvCode: i.cInvCode,
          cInvName: i.cInvName,
          RestQuantity: i.RestQuantity
        }
        OutInfo.value = obj
        current.value = 1
        //箱码输入框解除禁用
        xmdisabled.value = false
        XMsetfocus()
      }
    }
  })
}
//箱码输入框验证箱码
const PUTinfo = ref({})

const onConfirmModal = async () => {
  const res = await MaterialPutDown(XMsearchValue.value)
  if (res.status == 200 && res.data.length > 0) {
    PUTinfo.value = res.data[0]
    let hw = res.data[0].cWareHouseLocationCode
    // let num = res.data.nQuantity
    let num = res.data[0].nSumQuinity

    // let xm = res.data.cBarCode
    let xm = res.data[0].cKeyCode
    let cBatch = res.data[0].cBatch
    let obj = {}
    obj.hw = hw
    obj.num = num
    obj.xm = xm
    if (arrList.value.length) {
      arrList.value.some((item) => item.xm == obj.xm)
        ? uni.showToast({
            icon: 'none',
            title: '该箱码已扫描，请重新扫描箱码'
          })
        : arrList.value.unshift(obj)
    } else {
      arrList.value.unshift(obj)
    }
    // arrList.value.unshift(obj)
    // uni.showToast({
    //   icon: 'none',
    //   title: res.msg
    // })
    XMsearchValue.value = ''
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg[0].Value || '没有库存'
    })
    XMsearchValue.value = ''
  }
  showModal.value = false
}

const onCancelModal = () => {
  showModal.value = false
}

const onCloseModal = () => {
  showModal.value = false
}

const getXM = async () => {
  const res = await MaterialPutDown(XMsearchValue.value)

  if (res.success && res.data.length > 0) {
    let sum = 0
    arrList.value.forEach((item) => {
      sum += item.num
    })
    sum += res.data[0].nSumQuinity
    if (sum > OutInfo.value.RestQuantity) {
      showModal.value = true
      return
    }

    PUTinfo.value = res.data[0]
    let hw = res.data[0].cWareHouseLocationCode
    // let num = res.data.nQuantity
    let num = res.data[0].nSumQuinity

    // let xm = res.data.cBarCode
    let xm = res.data[0].cKeyCode
    let cBatch = res.data[0].cBatch
    let obj = {}
    obj.hw = hw
    obj.num = num
    obj.xm = xm
    if (arrList.value.length) {
      arrList.value.some((item) => item.xm == obj.xm)
        ? uni.showToast({
            icon: 'none',
            title: '该箱码已扫描，请重新扫描箱码'
          })
        : arrList.value.unshift(obj)
    } else {
      arrList.value.unshift(obj)
    }
    // arrList.value.unshift(obj)
    // uni.showToast({
    //   icon: 'none',
    //   title: res.msg
    // })
    XMsearchValue.value = ''
  } else {
    uni.showToast({
      icon: 'none',
      title: '该箱码不正确'
    })
    XMsearchValue.value = ''
  }
}
//出库操作删除
const DELxm = (i, index) => {
  arrList.value.splice(index, 1)
}
//保存
const BarCodeList = ref([])
const SaveLIst = async () => {
  BarCodeList.value = []
  arrList.value.forEach((item) => {
    BarCodeList.value.push(item.xm)
  })
  if (BarCodeList.value.length == 0) {
    uni.showToast({
      icon: 'none',
      title: '请先添加数据'
    })
    return
  }
  const res = await PDACommitOut({
    MID: ID.value.MID,
    UID: ID.value.UID,
    cInvCode: ID.value.cInvCode,
    cBarCodes: BarCodeList.value,
    cWareHouseCode: PUTinfo.value.cWareHouseCode
  })
  if (res.status == 200) {
    uni.showToast({
      icon: 'none',
      title: res.msg
    })
    arrList.value = []
    BarCodeList.value = []
    //跳转到已出库列表
    current.value = 2
    handelOutList()
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg[0].Value
    })
  }
}
//已出库列表
const handelOutList = async () => {
  const res = await OutList({
    OrderByFileds: '',
    Conditions: ''
    // #3136
    // Conditions: `cInvCode=${cInvCode.value}`
    // "OrderByFileds": "",
    // "Conditions": "cInvCode=''"
  })
  if (res.success) {
    OUTLIST.value = res.data
  } else {
    // uni.showToast({
    // 	icon: "none",
    // 	title: res.errmsg[0].Value
    // })
  }
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 0) {
    currentPage.value = 1
    total.value = 0
    OutliST.value = []
    getWaresList()
  }
})
//上拉
const scrolltolower = () => {
  if (current.value == 0) {
    more.value = 'loading'
    console.log('上拉')
    currentPage.value++
    if (currentPage.value > pageTotal.value) {
      more.value = 'no-more'
    } else {
      getWaresList()
    }
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
