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
        <view style="width: 60px">线边库:</view>
        <view>
          <up-input
            :disabled="disabled"
            v-model="WsearchValue"
            @confirm="getWares"
            :focus="focusType"
            @blur="setfocus"
            placeholder="请扫描线边仓"
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
        <!-- 搜索框 -->
        <view class="search-wl">
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
                <view style="width: 50px">箱码：</view>
                <view class="search-inpt">
                  <up-input
                    v-model="WLsearchValue"
                    @confirm="getWL"
                    :focus="WLfocusType"
                    @blur="WLsetfocus"
                    :disabled="wldisabled"
                    placeholder="请扫描箱码"
                  />
                </view>
              </view>
            </uni-col>
            <uni-col :span="6">
              <view class="demo-uni-col light"> </view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">物料编码：{{ XMinfo.cInvCode }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">数量：{{ XMinfo.nQuantity }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">物料名称：{{ XMinfo.cInvName }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark"></view>
            </uni-col>
          </uni-row>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 420) + 'px'"
        >
          <view
            class="project"
            v-for="(item, index) in XMlIST"
            :key="index"
          >
            <view class="wLIst">
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">序号：{{ XMlIST.length - index }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
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
                  <view class="demo-uni-col light">数量：{{ item.nQuantity }}</view>
                </uni-col>
                <uni-col :span="10">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="DELXM(item, index)"
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
            style="color: black; backgroundcolor: #1aad19; bordercolor: #1aad19"
            type="warn"
            size="mini"
            @click="SaveBarcode"
          >
            保存
          </button>
        </view>
      </view>
      <view v-if="current === 1">
        <view
          v-if="!WList.length"
          class="ONE-DJ"
        >
          <view class="search-wl">
            <!-- 搜索框 -->
            <input
              class="inputSty"
              v-model="HDsearchValue"
              placeholder="请输入通知单号"
              placeholder-style="font-size:12px"
            />
            <button
              class="mini-btn"
              style="color: black; backgroundcolor: #e8e873; bordercolor: #e8e873"
              type="warn"
              size="mini"
              @click="Search"
            >
              搜索
            </button>
          </view>
          <view class="listMain">
            <scroll-view
              :style="'height:' + (h - 300) + 'px'"
              scroll-y="true"
              lower-threshold="50"
              show-scrollbar="true"
              @scrolltolower="scrolltolower"
            >
              <view
                class="project"
                v-for="(item, index) in DJliST"
                :key="index"
              >
                <view class="wLIst">
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col dark">通知单号：{{ item.applyForCode }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">线边仓：{{ item.cInWareHouseName }}</view>
                    </uni-col>
                    <uni-col :span="16">
                      <view class="demo-uni-col dark">出库单号：{{ item.rDRecordCode }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="16">
                      <view class="demo-uni-col dark">制单日期：{{ item.dDate }}</view>
                    </uni-col>
                    <uni-col :span="8">
                      <view class="demo-uni-col dark">状态：{{ item.iStatusName }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="16">
                      <view class="demo-uni-col dark"></view>
                    </uni-col>
                    <uni-col :span="14">
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #e8e873; bordercolor: #e8e873"
                        type="warn"
                        size="mini"
                        @click="WLdetail(item)"
                      >
                        物料详情
                      </button>
                    </uni-col>
                  </uni-row>
                </view>
              </view>
              <uni-load-more
                :status="more"
                v-if="DJliST.length"
              ></uni-load-more>
            </scroll-view>
          </view>
        </view>
        <view
          v-else-if="!XMlist.length"
          class="TWO-wlInfo"
        >
          <view style="text-align: center; margin: 20px; font-size: 16px">物料信息</view>
          <view
            class="TWO-wlInfo-list"
            :style="'height:' + (h - 260) + 'px'"
          >
            <view
              class="project"
              v-for="(item, index) in WList"
              :key="item.UID"
            >
              <view class="list">
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">出库单号：{{ item.cCode }}</view>
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
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">出库数量：{{ item.nAccQuantity }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">状态：{{ item.iStatusName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <button
                      class="mini-btn"
                      type="warn"
                      style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                      size="mini"
                      @click="XMdETAIL(item)"
                    >
                      箱码详情
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
          </view>
        </view>
        <view
          v-else
          class="Three-List"
        >
          <view style="text-align: center; margin: 20px; font-size: 16px">箱码信息</view>
          <view>
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view class="demo-uni-col dark">物料编码：{{ XMlastInfo.cInvCode }}</view>
              </uni-col>
              <uni-col :span="10">
                <view class="demo-uni-col dark">数量：{{ XMlastInfo.nQuantity }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view class="demo-uni-col dark">物料名称：{{ XMlastInfo.cInvName }}</view>
              </uni-col>
              <uni-col :span="10">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
          </view>
          <view
            class="Three-wlInfo-list"
            :style="'height:' + (h - 360) + 'px'"
          >
            <view
              class="project"
              v-for="(item, index) in XMlist"
              :key="index"
            >
              <view class="list">
                <uni-row class="demo-uni-row">
                  <uni-col :span="8">
                    <view class="demo-uni-col dark">序号：{{ XMlist.length - index }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="8">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">批次号：{{ item.cBatch }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">状态：{{ item.iStatusName }}</view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
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
import {
  GetWare,
  RDRecord,
  LineWareHouseCommit,
  PDAGetRDRecordList,
  PDARecordDetailList,
  PDAXMList
} from '@/api/PDA.js'
import _ from 'lodash'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const WLfocusType = ref(false)
const disabled = ref(false)
const wldisabled = ref(true)
const title = ref('线边仓收料')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['收料操作', '单据'])
const WLsearchValue = ref('') // 箱码输入框绑定值
const WList = ref([])
const XMlist = ref([])
const WsearchValue = ref('') //线边仓输入框
const XMinfo = ref({})
const XMlIST = ref([])
const DJliST = ref([]) //单据列表
const HDsearchValue = ref('') //货单绑定值
const BarCode = ref([]) //保存的箱码数组
const XMlastInfo = ref({}) //箱码列表的物料信息
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
//输入框聚焦
const WLsetfocus = () => {
  WLfocusType.value = false
  setTimeout(() => {
    WLfocusType.value = true
  }, 200)
}

const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 1) {
    //调取单据列表
    DJliST.value = []
    GetPageList()
  }
}
//点击Tab返回
const ChangTab = () => {
  if (current.value == 1 && WList.value.length != 0 && !XMlist.value.length) {
    WList.value = []
  } else {
    XMlist.value = []
  }
}
//仓库
//获取线边仓
const getWares = _.debounce(async () => {
  const res = await GetWare({
    Conditions: `cWareHouseCode=${WsearchValue.value} && cWareHouseTypeCode=2`
  })
  if (res.status == 200) {
    if (res.data.length) {
      disabled.value = true
      wldisabled.value = false
      WLsetfocus()
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
}, 500)
//箱码扫描
const getWL = async () => {
  const res = await RDRecord({
    cBarCode: WLsearchValue.value,
    cWareHouseCode: WsearchValue.value
  })
  if (!res.success) {
    WLsearchValue.value = ''
    uni.showToast({
      icon: 'none',
      title: '箱码错误'
    })
    return
  }
  if (XMlIST.value.some((item) => item.cBarCode == res.data.cBarCode)) {
    uni.showToast({
      icon: 'none',
      title: '箱码已扫描'
    })
    WLsearchValue.value = ''
    return
  }
  XMinfo.value = res.data
  WLsearchValue.value = ''
  XMlIST.value.unshift(res.data)
}
//删除
const DELXM = (i, index) => {
  XMlIST.value.splice(index, 1)
}
//保存
const SaveBarcode = () => {
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
        XMlIST.value.forEach((item) => {
          BarCode.value.push(item.cBarCode)
        })
        if (!WsearchValue.value || !BarCode.value.length) {
          uni.showToast({
            icon: 'none',
            title: '请先扫描信息'
          })
          return
        }
        const res = await LineWareHouseCommit({
          cWareHouseCode: WsearchValue.value,
          cBarCodes: BarCode.value
        })
        if (res.status == 200) {
          uni.showToast({
            icon: 'none',
            title: '保存成功'
          })
          XMlIST.value = []
          XMinfo.value = {}
        } else {
          uni.showToast({
            icon: 'none',
            title: res.msg || res.errmsg[0].Value
          })
          XMlIST.value = []
          XMinfo.value = {}
        }
      }
    }
  })
}
//单据列表
const GetPageList = async () => {
  currentPage.value = 1
  uni.showLoading({
    title: '加载中'
  })
  const res = await PDAGetRDRecordList({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: HDsearchValue.value ? `applyForCode=${HDsearchValue.value}` : ''
  })
  if (res.status == 200) {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    // if (res.data.data.length == 0) {
    //   uni.showModal({
    //     showCancel: false,
    //     content: '无数据，请重新输入',
    //     success: function (res) {
    //       if (res.confirm) {
    //         HDsearchValue.value = ''
    //         console.log('用户点击 确定')
    //         GetPageList()
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    DJliST.value = [...DJliST.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}
//通知单搜索
const Search = () => {
  DJliST.value = []
  GetPageList()
}
//物料详情
const WLdetail = async (i) => {
  const res = await PDARecordDetailList({
    OrderByFileds: '',
    Conditions: `mid=${i.UID}`
  })
  if (res.status == 200) {
    WList.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}
//箱码详情
const XMdETAIL = async (i) => {
  XMlastInfo.value = i
  const res = await PDAXMList({
    OrderByFileds: '',
    Conditions: `pid=${i.UID}`
  })
  if (res.status == 200) {
    XMlist.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}
//重置
const ClearInput = () => {
  WsearchValue.value = ''
  disabled.value = false
  setfocus()
  wldisabled.value = true
  XMinfo.value = {}
  XMlIST.value = []
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 1) {
    currentPage.value = 1
    total.value = 0
    DJliST.value = []
    GetPageList()
  }
})
//上拉
const scrolltolower = () => {
  if (current.value == 1) {
    more.value = 'loading'
    console.log('上拉')
    currentPage.value++
    if (currentPage.value > pageTotal.value) {
      more.value = 'no-more'
    } else {
      GetPageList()
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

    .Three-List {
      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 10rpx 40rpx;
      }

      .Three-wlInfo-list {
        margin-top: 2px;
        width: 100%;
        height: calc(100% - 240rpx);
        overflow-y: auto;
        font-size: 14px;

        .list {
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
    }

    .TWO-wlInfo {
      .TWO-wlInfo-list {
        margin-top: 2px;
        width: 100%;
        height: calc(100% - 240rpx);
        overflow-y: auto;
        font-size: 14px;

        .list {
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
    }

    .ONE-DJ {
      .search-wl {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .mini-btn {
          flex: 30%;
          margin-right: 10rpx;
        }
      }
    }

    .search-wl {
      background: #fff;
      font-size: 12px;
      margin: 20rpx 0;

      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;

        .search-inpt {
          margin: -15px 0;

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

    .BTN-Two {
      display: flex;
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

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;
    }
  }
}
</style>
