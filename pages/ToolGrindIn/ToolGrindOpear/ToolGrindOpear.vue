<template>
  <!-- 刀具研磨入库操作页面 -->
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
        <view
          class="searchMain"
          style="border-bottom: 1px solid #eee"
        >
          <view
            class="search-wl"
            style="margin: 10px"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">刀具料号：{{ objVal.cInvCode || '' }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">刀具名称：{{ objVal.cInvName || '' }}</view>
              </uni-col>
            </uni-row>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center"
          >
            <p class="searchTExt">货位：</p>
            <up-input
              :disabled="disabled"
              v-model="hwVal"
              @confirm="getWares"
              :focus="focusType"
              placeholder="请扫描货位号"
              style="width: 60%"
            />
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="rest"
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
              :disabled="disabled2"
              v-model="xlhVal"
              @confirm="getXlh"
              :focus="focusType2"
              placeholder="请扫描序列号"
              style="width: 60%"
            />
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center; margin: 10px"
          >
            <p class="searchTExt">研磨费：</p>
            <uni-section
              title=""
              type="line"
              style="width: 60%"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
                v-model="ymVal"
                placeholder="请输入研磨费"
              ></uni-search-bar>
            </uni-section>
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="clickEnd"
            >
              确认
            </button>
          </view>
          <view
            class=""
            style="margin: 0 10px"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark"
                  >研磨次数：{{ objData.iNextRepairCountSum || '' }}</view
                >
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">寿命：{{ objData.iNextValidCount || '' }}</view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 400) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              style="margin-top: 20rpx"
              v-for="(item, i) in listData"
              :key="i"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">货位：{{ item.cWareHouseCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序列号：{{ item.cSerialNo }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">研磨次数：{{ item.iNextRepairCountSum }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">寿命：{{ item.iNextValidCount }}</view>
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
                      @click="Del(i)"
                    >
                      删除
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <!-- <uni-load-more :status="more" v-if='listData.length'></uni-load-more> -->
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
              @click="Check"
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
import { GetSingleWithCheck, PDA_GrindingStorage } from '@/api/yanmo.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const IndexfocusType = ref(true)
const focusType2 = ref(false)
const IndexfocusType2 = ref(true)
const title = ref('研磨入库')
const hwVal = ref('')
const xlhVal = ref('')
const ymVal = ref('')
//输入框值
const disabled = ref(false)
const disabled2 = ref(false)
const WsearchValue = ref()
const HDsearchValue = ref('')
const XMinfo = ref({})
const NUmValue = ref()
const objData = ref({})
const codeType = ref('')
//设备列表数据
const listData = ref([])
const ProductList = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
onShow(() => {
  setfocus()
})
const objVal = ref({})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  objVal.value = JSON.parse(option.obj)
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const setfocus2 = () => {
  focusType2.value = false
  setTimeout(() => {
    focusType2.value = true
  }, 200)
}

const IndexInfo = ref({})
const arrList = ref([])
const rest = () => {
  hwVal.value = ''
  xlhVal.value = ''
  ymVal.value = ''
}
//获取序列号
const getWares = () => {
  getXlh()
}
const getXlh = () => {
  if (!hwVal.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入货位！'
    })
    setfocus()
    return false
  }
  if (!xlhVal.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入序列号！'
    })
    setfocus2()
    return false
  }
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    REPAIR_VOUCH_UID: objVal.value.UID,
    REPAIR_VOUCH_S_UID: objVal.value.RowUID,
    cInvCode: objVal.value.cInvCode,
    cWareHouseLocationCode: hwVal.value,
    cSerialNo: xlhVal.value
  }
  GetSingleWithCheck(obj)
    .then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      if (res.status == 200) {
        objData.value = res.data || {}
      } else {
        uni.showToast({
          icon: 'none',
          title: res.msg || res.errmsg[0].msg
        })
      }
    })
    .finally(() => {
      setfocus2()
    })
}
const clickEnd = () => {
  getXlh()
  if (JSON.stringify(objData.value) != '{}') {
    if (!ymVal.value) {
      uni.showToast({
        icon: 'none',
        title: '请输入费用'
      })
      return false
    }
    objData.value.nPrice = ymVal.value
    objData.value.newcWareHouseLocationCode = hwVal.value
    objData.value.cWareHouseCode = hwVal.value

    let list = []
    if (listData.value.length > 0) {
      list = listData.value.filter((item) => {
        return item.cSerialNo == objData.value.cSerialNo
      })
    }

    if (list.length) {
      uni.showToast({
        icon: 'none',
        title: objData.value.cSerialNo + '已添加'
      })
      return false
    } else {
      listData.value.push(objData.value)
      ymVal.value = ''
      xlhVal.value = ''
      objData.value = {}
    }
  }

  console.log(listData.value, '--listData.value')
}
//保存
const Save = () => {
  if (!listData.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请扫描序列号，添加数据!'
    })
    return
  }
  PDA_GrindingStorage({
    UID: objVal.value.UID,
    MID: objVal.value.RowUID,
    cVendorCode: objVal.value.cVendorCode,
    cVendorName: objVal.value.cVendorName,
    cInvCode: objVal.value.cInvCode,
    cInvName: objVal.value.cInvName,
    List_cSerialNo: listData.value
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '保存成功！'
      })
      listData.value = []
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].msg || '失败'
      })
    }
  })
}
//查看
const Check = () => {
  uni.navigateTo({
    url: '/pages/ToolGrindIn/ToolGrindList/ToolGrindList?obj=' + JSON.stringify(objVal.value)
  })
}
// 删除
const Del = (index) => {
  listData.value.splice(index, 1)
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
      width: 100%;
      overflow-y: auto;
      font-size: 14px;
      .project {
        background: #fff;
        font-size: 12px;
        margin: 0 10rpx;
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
