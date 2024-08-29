<template>
  <!-- 调拨入库操作页面 -->
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
      <view>
        <view class="searchMain">
          <view class="search-wl">
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">刀具料号：{{ Info?.cInvCode }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">刀具名称：{{ Info?.cInvName }}</view>
              </uni-col>
            </uni-row>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center; margin: 10px"
          >
            <p class="searchTExt">货位：</p>
            <up-input
              :disabled="disabled"
              v-model="WsearchValue"
              @confirm="getWares"
              :focus="focusType"
              placeholder="请扫描货位"
            />
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="Reset"
            >
              重置
            </button>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center; margin: 10px"
          >
            <p class="searchTExt">序列号：</p>

            <up-input
              :disabled="Indexdisabled"
              v-model="IndexValue"
              @confirm="getIndex"
              :focus="IndexfocusType"
              placeholder="请扫描序列号"
            />
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 305) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in ArrList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">
                      货位：{{ wareInfo?.cWareHouseLocationName }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序列号：{{ item.cKeyCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">研磨次数：{{ item.iRepairCountSum }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">寿命：{{ item.iValidCount }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="8">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                  <uni-col :span="8">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="Del(item, index)"
                    >
                      删除
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
          <view class="butSty">
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="Save"
            >
              保存
            </button>
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="CheckInStorage"
            >
              查看已入库
            </button>
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
import { BuyListScan, getScanIndex, BuyListSave } from '@/api/PDA_3.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const IndexfocusType = ref(true)
const title = ref('调拨入库')
//输入框值
const disabled = ref(false)
const Indexdisabled = ref(true)
const WsearchValue = ref()
const IndexValue = ref()
const HDsearchValue = ref('')
const XMinfo = ref({})
const NUmValue = ref()
const IndexInfo = ref({})
const wareInfo = ref({})
//设备列表数据
const DevList = ref([])
const ProductList = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const ArrList = ref([])
onShow(() => {
  setfocus()
})
const Info = ref({})
//加载页面
onLoad((option) => {
  // GetList()
  h.value = uni.getSystemInfoSync().windowHeight
  Info.value = JSON.parse(option.itemInfo)
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const Indexsetfocus = () => {
  IndexfocusType.value = false
  setTimeout(() => {
    IndexfocusType.value = true
  }, 200)
}
//获取货位
const getWares = async () => {
  const res = await BuyListScan({
    // "PageIndex": 1,
    // "PageSize": 10,
    OrderByFileds: '',
    Conditions: `cWareHouseLocationCode = ${WsearchValue.value}`
  })
  if (res.status == 200) {
    if (res.data.length) {
      wareInfo.value = res.data[0]
      disabled.value = true
      Indexdisabled.value = false
      Indexsetfocus()
    } else {
      uni.showToast({
        icon: 'none',
        title: '货位错误，请重新扫描'
      })
      // WsearchValue.value = ''
      setfocus()
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
    setfocus()
  }
}

//扫描序列号
const getIndex = async () => {
  const res = await getScanIndex({
    TRANSFER_VOUCH_UID: Info.value.UID,
    TRANSFER_VOUCH_S_UID: Info.value.RowUID,
    cInvCode: Info.value.cInvCode,
    newcWareHouseLocationCode: WsearchValue.value,
    cSerialNo: IndexValue.value
  })
  if (res.status == 200) {
    if (res.data) {
      IndexInfo.value = res.data
      let obj = {
        cKeyCode: IndexInfo.value.cSerialNo,
        ...res.data
      }
      if (ArrList.value.length > IndexInfo.value.Rest_InQuantity) {
        uni.showToast({
          icon: 'none',
          title: '刀具入库数量已超过刀具调拨单数量！'
        })
        Indexsetfocus()
        return
      }
      if (ArrList.value.length) {
        ArrList.value.some((item) => res.data.cSerialNo == item.cKeyCode)
          ? uni.showToast({
              icon: 'none',
              title: '该序列号已扫描，请重新扫描'
            })
          : ArrList.value.unshift(obj)
        IndexValue.value = ''
      } else {
        ArrList.value.unshift(obj)
        IndexValue.value = ''
      }
    } else {
      uni.showToast({
        icon: 'none',
        title: '序列号错误，请重新扫描'
      })
      IndexValue.value = ''
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].Value
    })
  }
  Indexsetfocus()
}
// 重置
const Reset = () => {
  WsearchValue.value = ''
  disabled.value = false
  Indexdisabled.value = true
  setfocus()
  wareInfo.value = {}
  ArrList.value = []
}
//保存
const Save = () => {
  if (!ArrList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据!'
    })
    return
  }

  let obj = {
    cVouchTypeCode: '1',
    SourceUID: Info.value.UID,
    cSourceCode: Info.value.cCode,
    cWareHouseCode: wareInfo.value.cWareHouseCode,
    cWareHouseName: wareInfo.value.cWareHouseName,
    cWareHouseLocationCode: wareInfo.value.cWareHouseLocationCode,
    cWareHouseLocationName: wareInfo.value.cWareHouseLocationName,
    SourceRowUID: Info.value.RowUID,
    cInvCode: Info.value.cInvCode,
    cInvName: Info.value.cInvName,
    cInvStd: Info.value.cInvStd,
    cUnitCode: Info.value.cUnitCode,
    cUnitName: Info.value.cUnitName,
    cAccUnitCode: Info.value.cAccUnitCode,
    cAccUnitName: Info.value.cAccUnitName,
    List_cSerialNo: ArrList.value.map((i) => ({
      ...i,
      nQuantity: 1,
      cWareHouseName: Info.value.cInWareHouseName,
      cWareHouseCode: Info.value.cInWareHouseCode,
      cWareHouseLocationCode: wareInfo.value.cWareHouseLocationCode,
      cWareHouseLocationName: wareInfo.value.cWareHouseLocationName
    }))
  }

  BuyListSave(obj).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '保存成功！'
      })
      ArrList.value = []
    } else {
      uni.showToast({
        icon: 'none',
        title: '错误'
      })
    }
  })
}
//查看
const CheckInStorage = () => {
  // console.log(i, 'i--------------');
  uni.navigateTo({
    url: `/pages/ToolAllotOutStorage/ToolList/ToolList?Info=` + JSON.stringify(Info.value)
    // url: `/pages/warehouseBills/wareList/wareList?id=${InfoItem.value.UID}`
  })
}
// 删除
const Del = (item, index) => {
  ArrList.value.splice(index, 1)
}
//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  // if (current.value == 0) {
  // 	currentPage.value = 1
  // 	total.value = 0
  // 	DevList.value = []
  // 	GetList()
  // }
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (current.value == 0) {
  // 	if (currentPage.value > pageTotal.value) {
  // 		more.value = 'no-more'
  // 	} else {
  // 		GetList()
  // 	}
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
  margin: 0 10px;

  .searchTExt {
    width: 60px;
  }

  .inputSty {
    flex: 1;
    margin-right: 10px;
  }

  .inputText {
    flex: 1;
  }

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

.headMain {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;

  .headMainItem {
    display: flex;
    align-items: center;

    .headTitle {
      width: 80px;
    }

    .headText {
      flex: 1;
    }
  }
}

.butSty {
  display: flex;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
