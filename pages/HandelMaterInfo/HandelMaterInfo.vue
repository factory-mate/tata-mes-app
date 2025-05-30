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
        <view style="width: 60px; font-size: smaller">线边库:</view>
        <up-input
          :disabled="disabled"
          v-model="WsearchValue"
          @confirm="getWares"
          :focus="focusType"
          @focus="onFocus"
          placeholder="请扫描线边仓编码"
        />
        <view style="width: 80px">
          <button
            style="margin-left: 4px; margin-top: 3px"
            class="mini-btn"
            type="warn"
            size="mini"
            @click="ClearInput"
          >
            重置
          </button>
        </view>
      </view>

      <view
        class="demo-uni-col dark"
        style="font-size: smaller"
        >名称：{{ XBWare.cWareHouseName }}</view
      >
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
                <view style="width: 100px">物料编码：</view>
                <view class="search-inpt">
                  <up-input
                    :disabled="wldisabled"
                    v-model="WLsearchValue"
                    @confirm="getWL"
                    :focus="WLfocusType"
                    @focus="onFocus"
                    @blur="WLsetfocus"
                    placeholder="请扫描物料编码"
                  />
                </view>
              </view>
            </uni-col>
            <uni-col :span="6">
              <view class="demo-uni-col light"> </view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col
              :span="20"
              style="margin-left: 10px"
            >
              <view class="emo-uni-col dark">物料名称：{{ WLInfo }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark"></view>
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
                <view style="width: 100px">原因：</view>
                <!-- 搜索框 -->
                <up-input
                  v-model="ReasonsearchValue"
                  placeholder="请输入原因"
                />
              </view>
            </uni-col>
            <uni-col :span="6"></uni-col>
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
                <view style="width: 100px">数量：</view>
                <!-- 搜索框 -->
                <up-input
                  type="number"
                  v-model="NUMsearchValue"
                  placeholder="请输入数量"
                />
              </view>
            </uni-col>
            <uni-col :span="6">
              <button
                style="margin-left: 4px; margin-top: 3px"
                class="mini-btn"
                type="warn"
                size="mini"
                @click="confirm"
              >
                确定
              </button>
            </uni-col>
          </uni-row>
        </view>
        <view
          class="listMain"
          :style="'height:' + (h - 480) + 'px'"
        >
          <view
            class="project"
            v-for="(item, index) in InfoList"
            :key="index"
          >
            <view class="wLIst">
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料名称：{{ item.name }}</view>
                </uni-col>
                <uni-col :span="14">
                  <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">原因：{{ item.cReasonName }}</view>
                </uni-col>
                <uni-col :span="10">
                  <view class="demo-uni-col light">数量：{{ item.nQuantity }}</view>
                </uni-col>
                <uni-col :span="10">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="DelID(item, index)"
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
            @click="Save"
            :disabled="isSaving"
            style="margin-right: 8px"
          />
          <up-button
            type="error"
            size="small"
            text="提交"
            @click="Commit"
            :disabled="isCommitting"
            style="margin-right: 8px"
          />
        </view>
      </view>
      <view v-if="current === 1">
        <view
          v-if="!WList.length"
          class="ONE-DJ"
        >
          <view class="search-wl">
            <!-- 搜索框 -->
            <view class="search-inpt">
              <input
                class="inputSty"
                v-model="DHsearchValue"
                placeholder="请输入单号"
                placeholder-style="font-size:12px"
              />
            </view>
            <button
              class="mini-btn"
              style="color: black; background-color: #e8e873; border-color: #e8e873"
              type="warn"
              size="mini"
              @click="Search"
            >
              搜索
            </button>
          </view>
          <view class="listMain">
            <view
              v-if="!DJliST.length"
              style="text-align: center; color: #b5b5b5; font-size: 14px"
              >暂无保存数据，请先添加数据！</view
            >
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
                      <view class="demo-uni-col dark">申请单号：{{ item.cCode }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="10">
                      <view class="demo-uni-col dark">线边仓：{{ item.cInWareHouseName }}</view>
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
                      @click="DJPUT(item)"
                    >
                      提交
                    </button>
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #aa0000; border-color: #aa0000"
                      type="warn"
                      size="mini"
                      @click="DelDJ(item)"
                    >
                      删除
                    </button>
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #00aa7f; border-color: #00aa7f"
                      type="warn"
                      size="mini"
                      @click="ScanXM(item)"
                    >
                      继续扫描
                    </button>
                    <button
                      class="mini-btn"
                      style="color: black; background-color: #e8e873; border-color: #e8e873"
                      type="warn"
                      size="mini"
                      @click="WLdetail(item)"
                    >
                      物料详情
                    </button>
                  </view>
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
          v-else
          class="TWO-wlInfo"
        >
          <view style="text-align: center; margin: 20px; font-size: 16px">物料信息</view>
          <view
            class="TWO-wlInfo-list"
            :style="'height:' + (h - 280) + 'px'"
          >
            <view
              class="list"
              v-for="(item, index) in WList"
              :key="index"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="16">
                  <!-- <view class="demo-uni-col dark">通知单号：{{ item.cAccUnitCode }}</view> -->
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="14">
                  <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                </uni-col>
                <uni-col :span="10">
                  <view class="demo-uni-col dark">数量：{{ item.nQuantity }}</view>
                </uni-col>
                <uni-col :span="10">
                  <button
                    class="mini-btn"
                    type="warn"
                    style="color: black; background-color: #ff0000; border-color: #ff0000"
                    size="mini"
                    @click="DelWL(item)"
                  >
                    删除
                  </button>
                </uni-col>
              </uni-row>
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
  GetCK,
  GetWL,
  MaterialApplyForSave,
  MaterialApplyForCommit,
  DELMaterial,
  MaterialApplyForList,
  MaterialApplyFor,
  DELWL
} from '@/api/PDA.js'
import _ from 'lodash'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const WLfocusType = ref(false)
const focusType = ref(true)
const title = ref('线边仓领料通知')
const current = ref(0)
const disabled = ref(false)
const wldisabled = ref(true)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['通知操作', '单据'])
const WsearchValue = ref('')
const CKiNFO = ref('') //线边仓
const WLInfo = ref('') //物料名称
const WLsearchValue = ref('') // 物料输入框绑定值
const ReasonsearchValue = ref('') //原因输入框绑定值
const NUMsearchValue = ref('') //数量输入框绑定值
const WList = ref([]) //物料详情
const DJliST = ref([]) //单据列表
const InfoList = ref([]) //通知操作列表
const UIDS = ref('') //保存UID
const XBWare = ref('') // 线边仓信息
const DHsearchValue = ref('') //申请单号输入框
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const isSaving = ref(false)
const isCommitting = ref(false)
onShow(() => {
  setfocus()
})
//加载页面
onLoad((option) => {
  // GETCK()
  h.value = uni.getSystemInfoSync().windowHeight
})
//物料输入框聚焦
const WLsetfocus = () => {
  WLfocusType.value = false
  setTimeout(() => {
    WLfocusType.value = true
  }, 100)
}

const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 100)
}

const onFocus = () => {
  // #ifdef APP-PLUS
  uni.hideKeyboard()
  // #endif
}

//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 1 && UIDS.value == '' && InfoList.value.length != 0) {
    uni.showModal({
      showCancel: true,
      content: '确定不保存数据？',
      success: function (res) {
        if (res.confirm) {
          GetPageList()
          InfoList.value = []
        } else if (res.cancel) {
          current.value = 0
        }
      }
    })
  } else {
    DJliST.value = []
    GetPageList()
  }
}
//点击Tab返回
const ChangTab = () => {
  if (current.value == 1 && WList.value.length != 0) {
    WList.value = []
  }
}
//获取线边仓
const getWares = _.debounce(async () => {
  const res = await GetWare({
    Conditions: `cWareHouseCode=${WsearchValue.value} && cWareHouseTypeCode=2`
  })
  if (res.status == 200) {
    if (res.data.length) {
      XBWare.value = res.data[0]
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
//重置
const ClearInput = () => {
  WsearchValue.value = ''
  XBWare.value = ''
  disabled.value = false
  setfocus()
  wldisabled.value = true
  //添加的数据列表置空
  InfoList.value = []
  WLsearchValue.value = ''
  ReasonsearchValue.value = ''
  NUMsearchValue.value = ''
  WLInfo.value = ''
}
const GETCK = async () => {
  const res = await GetCK({
    code: `005`
  })
  if (res.status == 200) {
    CKiNFO.value = res.data
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg
    })
  }
}
//物料编码扫描(输入框)
const getWL = async () => {
  try {
    const { success, data, msg, errmsg } = await GetWL({ code: WLsearchValue.value })
    if (success) {
      WLInfo.value = data
      wldisabled.value = true
    } else {
      uni.showToast({
        icon: 'none',
        title: msg || errmsg[0].Value || '物料错误，请重新扫描'
      })
      WLsearchValue.value = ''
      wldisabled.value = false
    }
  } catch (e) {
    uni.showToast({
      icon: 'none',
      title: '物料错误，请重新扫描'
    })
    WLsearchValue.value = ''
  }
}
//确定按钮
const confirm = () => {
  if (!WLsearchValue.value || !WLInfo.value) {
    uni.showToast({
      icon: 'none',
      title: '请先扫描物料'
    })
    return
  }
  let obj = {
    cInvCode: WLsearchValue.value,
    name: WLInfo.value,
    cInvStd: WLInfo.value.split(' ')[1] ?? '', //规格（扫描物料获取）
    cReasonName: ReasonsearchValue.value,
    nQuantity: NUMsearchValue.value,
    cUnitCode: 'string', //计量单位
    cAccUnitCode: 'ss', //辅计量单位
    nAccQuantity: 0, //辅计量数量
    cSourceAppType: '002' //设备（固定）
  }
  InfoList.value.unshift(obj)
  wldisabled.value = false
  WLsetfocus()
  WLsearchValue.value = ''
  WLInfo.value = ''
  ReasonsearchValue.value = ''
  NUMsearchValue.value = ''
}
//删除按钮
const DelID = (i, index) => {
  uni.showModal({
    showCancel: true,
    content: '确定删除数据',
    success: function (res) {
      if (res.confirm) {
        //确定删除
        InfoList.value.splice(index, 1)
        console.log('用户点击 确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
//保存按钮
const Save = () => {
  if (!InfoList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请先添加数据'
    })
    return
  }
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
        if (isSaving.value) {
          return
        }
        isSaving.value = true
        const cDepCode = uni.getStorageSync('User').Parm01
        try {
          const res = await MaterialApplyForSave({
            IsCommit: false,
            cDepCode: cDepCode, //部门（用户登录带出来）
            cInWareHouseCode: WsearchValue.value, //线边仓code
            // cReasonName: ReasonsearchValue.value, //原因
            cSourceAppType: '002', //设备（固定）
            cVouchTypeCode: '01',
            cCode: '', //订单号（可不传）
            Items: InfoList.value
          })
          if (res.status == 200) {
            //模拟
            UIDS.value = res.data.UID
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
            InfoList.value = []
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg || res.errmsg[0].Value
            })
          }
        } catch {
          //
        }
        isSaving.value = false
      }
    }
  })
}

//提交按钮
const Commit = () => {
  // #2172 可以直接提交
  // if (!UIDS.value) {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '请先保存数据'
  //   })
  //   return
  // }
  if (!InfoList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请先添加数据'
    })
    return
  }
  uni.showModal({
    showCancel: true,
    content: '确定执行该操作吗',
    confirmText: '确定',
    cancelText: '取消',
    success: async function (r) {
      if (r.confirm) {
        if (isCommitting.value) {
          return
        }
        isCommitting.value = true
        const cDepCode = uni.getStorageSync('User').Parm01
        try {
          const res = await MaterialApplyForSave({
            IsCommit: true,
            cDepCode: cDepCode, //部门（用户登录带出来）
            cInWareHouseCode: WsearchValue.value, //线边仓code
            // cReasonName: ReasonsearchValue.value, //原因
            cSourceAppType: '002', //设备（固定）
            cVouchTypeCode: '01',
            cCode: '', //订单号（可不传）
            Items: InfoList.value
          })
          if (res.status == 200) {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
            //再次获取单据列表
            DJliST.value = []
            currentPage.value = 1
            GetPageList()
            InfoList.value = []
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg || res.errmsg[0].Value
            })
          }
        } catch {
          //
        }
        isCommitting.value = false
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
  const res = await MaterialApplyForList({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: 'iStatus in (0,50) && cVouchTypeCode = 01'
  })
  if (res.status == 200) {
    uni.hideLoading()
    uni.stopPullDownRefresh()
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
//通知单/线边仓搜索
const Search = async () => {
  currentPage.valu = 1
  DJliST.value = []
  uni.showLoading({
    title: '加载中'
  })
  let Conditions = `iStatus in (0,50) && cVouchTypeCode = 01`
  if (DHsearchValue.value) {
    Conditions += ` && ccode like ${DHsearchValue.value}`
  }
  const res = await MaterialApplyForList({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: '',
    Conditions
  })
  if (res.status == 200) {
    uni.hideLoading()
    uni.stopPullDownRefresh()
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
//继续扫描
const ScanXM = (item) => {
  current.value = 0
  WsearchValue.value = item.cInWareHouseCode
  getWares()
  WLsetfocus()
}
//提交单据
const DJPUT = async (i) => {
  const res = await MaterialApplyForCommit({
    UIDs: [i.UID],
    iStatus: 1
  })
  if (res.status == 200) {
    uni.showToast({
      icon: 'none',
      title: '提交成功'
    })
    //再次获取单据列表
    DJliST.value = []
    currentPage.value = 1
    GetPageList()
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
}
//删除单据
const DelDJ = (i) => {
  uni.showModal({
    showCancel: true,
    content: '确定删除数据',
    success: function (res) {
      if (res.confirm) {
        //确定删除
        DELMaterial([i.UID]).then((res) => {
          if (res.status == 200) {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
            //再调取单据列表
            DJliST.value = []
            currentPage.value = 1
            GetPageList()
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg || res.errmsg[0].Value
            })
          }
        })
        console.log('用户点击 确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
//物料详情
const MID = ref('')
const WLdetail = async (i) => {
  uni.setStorageSync('MID', i)
  GetMid()
}
const GetMid = async () => {
  MID.value = uni.getStorageSync('MID')
  if (MID.value.Items.length == 0) {
    uni.showToast({
      icon: 'none',
      title: '该数据没有详情数据'
    })
    return
  }
  const res = await MaterialApplyFor({
    mid: MID.value.Items[0].MID
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
//删除物料
const DelWL = (i) => {
  uni.showModal({
    showCancel: true,
    content: '确定删除数据',
    success: function (res) {
      if (res.confirm) {
        //确定删除
        DELWL([i.UID]).then((res) => {
          if (res.status == 200) {
            GetMid()
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg || res.errmsg[0].Value
            })
          }
        })
        console.log('用户点击 确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
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
  more.value = 'loading'
  // console.log('上拉');
  if (current.value == 1) {
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

.btn-area {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
