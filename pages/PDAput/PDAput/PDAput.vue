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
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="onClickItem"
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
            v-model="HDsearchValue"
            placeholder="请输入到货单"
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
            @click="getcCode"
          >
            搜索
          </button>
        </view>
        <view class="listMain">
          <up-list
            v-if="!Vtype"
            :height="h - 200 + 'px'"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in PDAawaitList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">到货单号：{{ item.cCode }}</view>
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
                      @click="RKDetail(item)"
                    >
                      详情
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="PDAawaitList.length"
            ></uni-load-more>
          </up-list>
          <view
            v-else
            :style="'height:' + (h - 200) + 'px'"
          >
            <view
              class="project"
              v-for="(item, index) in waitRKList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">到货单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">供应商：{{ item.cVendorName }}</view>
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
                    <view class="demo-uni-col dark">数量：{{ item.Rest_nQuantity }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light">箱数：{{ item.Rest_nAccQuantity }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="PutStack(item)"
                    >
                      上架
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="current === 1">
        <view class="listMain">
          <view class="projects">
            <uni-row class="demo-uni-row">
              <uni-col :span="24">
                <view class="demo-uni-col dark">物料名称：{{ PUTiNFO.cInvName }}</view>
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
                    <up-input
                      v-model="HWsearchValue"
                      :disabled="disabled"
                      :focus="focusType"
                      @confirm="getHW"
                      @blur="setfocus"
                      placeholder="请扫描到货位"
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
                  <up-input
                    v-model="XMsearchValue"
                    :focus="XMfocusType"
                    :disabled="xmdis"
                    @confirm="getXM"
                    @blur="XMsetfocus"
                    clearable
                    placeholder="请扫描箱码"
                  />
                </view>
              </uni-col>
              <uni-col :span="6">
                <view class="demo-uni-col light"> </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <up-list
          class="listMain"
          :height="h - 350 + 'px'"
        >
          <view
            class="project"
            v-for="(item, index) in arrList"
            :key="index"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="6">
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
              <uni-col :span="6">
                <view class="demo-uni-col dark"></view>
              </uni-col>
              <uni-col :span="6">
                <view class="demo-uni-col light"></view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">货位：{{ item.hw }}</view>
              </uni-col>
              <uni-col :span="12">
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
        </up-list>
        <view class="two-button">
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="() => PUTXM(false)"
          >
            新增提交
          </button>
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="() => PUTXM(true)"
          >
            追加提交
          </button>
        </view>
      </view>

      <view v-if="current === 2">
        <view
          v-if="!RKlist.length"
          style="text-align: center; margin: 20px 0; font-size: 16px; color: #b5b5b5"
          >暂无数据,请先上架物料</view
        >
        <view v-if="RKlist.length">
          <view class="RUDetail">
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view class="demo-uni-col dark">物料编码：{{ RKlist[0].cInvCode }}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark">数量：{{ RKlist[0].nQuantity }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view class="demo-uni-col dark">物料名称：{{ RKlist[0].cInvName }}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark">箱数：{{ RKlist[0].nAccQuantity }}</view>
              </uni-col>
            </uni-row>
          </view>
          <up-list
            class="listMain"
            :style="'height:' + (h - 260) + 'px'"
          >
            <view
              class="RUlist"
              v-for="(item, index) in RKlist[0].items"
              :key="index"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="8">
                  <view class="demo-uni-col dark">序号：{{ RKlist[0].items.length - index }}</view>
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
                  <view class="demo-uni-col dark"
                    >货位：{{ RKlist[0].cWareHouseLocationCode }}</view
                  >
                </uni-col>
              </uni-row>
            </view>
          </up-list>
        </view>
      </view>
    </view>
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
import {
  PDAGetListToUpFrameDetail,
  PDAGetListToUpFrame,
  PDACommit,
  CheckWareHouseLocationCode,
  PDAGetListUpFrameByUser,
  CheckBarCodeToUpFrame,
  PDAGetConfirmList,
  GetUpFrameBarCodeInfo
} from '@/api/PDA.js'
import _ from 'lodash'

const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const XMfocusType = ref(false)
const title = ref('PDA上架')
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
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)

const isHWLoading = ref(false)
const isWLLoading = ref(false)

onShow(() => {
  setfocus()
  arrList.value = []
})
onLoad((option) => {
  WaitList()
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
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
    getcCode()
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
    PDAawaitList.value = []
    WaitList()
  }
  if (current.value == 1 && JSON.stringify(PUTiNFO.value) == '{}') {
    uni.showModal({
      // title: '提示',
      showCancel: false,
      content: '请先上架',
      success: function (res) {
        if (res.confirm) {
          current.value = 0
          console.log('用户点击 确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  if (current.value == 2) {
    //调取已入库列表
    RKList()
  }
}
//待上架列表
const WaitList = async () => {
  uni.showLoading({
    title: '加载中'
  })
  const res = await PDAGetListToUpFrame({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: ''
  })
  if (res.status == 200) {
    HDsearchValue.value = ''
    uni.hideLoading()
    uni.stopPullDownRefresh()
    PDAawaitList.value = [...PDAawaitList.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
  } else {
    uni.showToast({
      icon: 'none',
      title: '错误'
    })
  }
}
//搜索到货单号
const getcCode = async () => {
  PDAawaitList.value = []
  currentPage.value = 1
  const res = await PDAGetListToUpFrame({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: 'dCreateTime desc',
    Conditions: HDsearchValue.value ? `cCode like ${HDsearchValue.value}` : ''
  })
  if (res.status == 200) {
    HDsearchValue.value = ''
    uni.hideLoading()
    uni.stopPullDownRefresh()
    PDAawaitList.value = [...PDAawaitList.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
  } else {
    HDsearchValue.value = ''
    uni.showModal({
      showCancel: false,
      content: res.msg || '货单号错误，请重新输入！',
      success: function (res) {
        if (res.confirm) {
          PDAawaitList.value = []
          currentPage.value = 1
          WaitList()
          console.log('用户点击 确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
}
const DHCode = ref('')
//待入库详情
const RKDetail = async (v) => {
  DHCode.value = v.cCode
  const res = await PDAGetListToUpFrameDetail({
    guid: v.UID
  })
  if (res.status == 200) {
    Vtype.value = true
    waitRKList.value = res.data
  }
}
//验证箱码的UID
const Guid = ref()
//待入库上架按钮
const cInvCode = ref('')
const PutStack = (v) => {
  //已入库接口需要code数据
  cInvCode.value = v.cInvCode
  current.value = 1
  PUTiNFO.value = v
  Guid.value = v.UID
}

//验证货位
const getHW = async () => {
  if (isHWLoading.value) {
    return
  }
  if (!HWsearchValue.value) {
    uni.showToast({
      icon: 'none',
      title: '请先扫描货位'
    })
    return
  }
  isHWLoading.value = true
  try {
    const res = await CheckWareHouseLocationCode({
      code: HWsearchValue.value
    })
    if (!res.data) {
      uni.showModal({
        // title: '提示',
        showCancel: false,
        content: '货位不存在，请重新扫描！'
      })
    } else {
      //货位成功
      //货位输入框禁用
      disabled.value = true
      //箱码输入框光标选中
      xmdis.value = false
      XMsetfocus()
    }
  } catch {
    //
  }
  isHWLoading.value = false
}

const XMlist = ref([])
//箱码（验证）
const getXM = async (v) => {
  // 校验是否扫货位
  if (!HWsearchValue.value) {
    uni.showToast({
      icon: 'none',
      title: '请先扫描货位'
    })
    return
  }
  if (isWLLoading.value) {
    uni.showToast({
      icon: 'none',
      title: '正在加载数据'
    })
    return
  }
  let obj = {
    xm: '',
    bm: '',
    num: '',
    hw: HWsearchValue.value || ''
  }
  isWLLoading.value = true
  try {
    //验证箱码
    const res = await CheckBarCodeToUpFrame({
      cBarCode: XMsearchValue.value,
      guid: Guid.value
    })
    const xmDetailRes = await GetUpFrameBarCodeInfo({
      cBarCode: XMsearchValue.value,
      UID: Guid.value
    })
    if (!xmDetailRes.success || xmDetailRes.data.length === 0) {
      uni.showToast({
        icon: 'none',
        title: xmDetailRes.errmsg[0].Value || '获取箱码信息失败'
      })
      isWLLoading.value = false
      return
    }
    const { cBarCode: xm, cInvCode: bm, nQuantity: num } = xmDetailRes.data[0]
    obj.xm = xm
    obj.bm = bm
    obj.num = num
    // 检验物料是否一致
    if (cInvCode.value !== obj.bm) {
      uni.showToast({
        icon: 'none',
        title: '物料编码不一致'
      })
      isWLLoading.value = false
      return
    }
    if (!res.success) {
      uni.showModal({
        // title: '提示',
        showCancel: false,
        content: res.errmsg?.[0].Value,
        success: function (res) {
          if (res.confirm) {
            XMsearchValue.value = ''
            xmdis.value = false
            XMsetfocus()
          }
        }
      })
      isWLLoading.value = false
      return
    }
    if (arrList.value.some((item) => item.xm == obj.xm)) {
      uni.showToast({
        icon: 'none',
        title: '该箱码已扫描，请重新扫描箱码'
      })
      isWLLoading.value = false
      return
    }
    arrList.value.unshift(obj)
    XMsearchValue.value = ''
    xmdis.value = false
    XMsetfocus()
  } catch (e) {
    console.log(e)
  }
  isWLLoading.value = false
}
//删除箱码列表
const DELxm = (i, index) => {
  arrList.value.splice(index, 1)
}
//已入库列表
const RKList = () => {
  uni.showLoading({
    title: '加载中'
  })
  PDAGetListUpFrameByUser({
    OrderByFileds: 'dcreateTIme',
    Conditions: ''
    // #3146
    // Conditions: `cSourceCode=${DHCode.value} && cInvCode=${cInvCode.value} && cWareHouseLocationCode=${HWsearchValue.value}`
  }).then((res) => {
    if (res.status == 200) {
      RKlist.value = res.data
      uni.hideLoading()
    } else {
      uni.hideLoading()
    }
  })
}
//提交
const PUTXM = (addition) => {
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
        arrList.value.forEach((item) => {
          XMlist.value.push(item.xm)
        })
        const res = await PDACommit({
          bAddition: addition,
          UID: PUTiNFO.value.UID,
          cInvCode: PUTiNFO.value.cInvCode,
          cWareHouseLocationCode: HWsearchValue.value,
          cBarCodes: XMlist.value
        })
        if (res.status == 200) {
          uni.showToast({
            icon: 'none',
            title: '提交成功'
          })
          //提交成功到已入库列表
          current.value = 2
          RKList()
          arrList.value = []
          XMlist.value = []
        } else {
          uni.showModal({
            showCancel: false,
            content: res.errmsg[0].Value,
            success: function (res) {
              if (res.confirm) {
                //箱码不正确，清空列表
                arrList.value = []
                XMlist.value = []
              }
            }
          })
        }
      }
    }
  })
}
//重置货位
const ClearInput = () => {
  HWsearchValue.value = ''
  XMsearchValue.value = ''
  //解除禁用
  disabled.value = false
  //货位再聚焦
  setfocus()
  //箱码输入框失去焦点
  xmdis.value = true
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  PDAawaitList.value = []
  WaitList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    WaitList()
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
      // overflow-y: auto;
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
      margin-top: 40px;

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
