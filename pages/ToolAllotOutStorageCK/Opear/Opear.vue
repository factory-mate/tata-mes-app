<template>
  <!-- 报废出库操作页面 -->
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
          <view
            class="search-wl"
            style="margin-top: 20rpx"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">刀具料号：{{ objVal.cInvCode }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">刀具名称：{{ objVal.cInvName }}</view>
              </uni-col>
            </uni-row>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center; margin: 10px"
          >
            <p class="searchTExt">序列号：</p>
            <up-input
              :disabled="disabled"
              v-model="WsearchValue"
              @confirm="getWares"
              :focus="focusType"
              @blur="setfocus"
              placeholder="请扫描序列号"
            />
          </view>
          <view
            class="search-wl"
            style="margin-top: 20rpx"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">研磨次数：{{ objStr.iRepairCountSum }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">寿命：{{ objStr.iValidCount }}</view>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 220) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, i) in listVal"
              :key="i"
              style="margin-top: 10rpx"
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
                    <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationCode }}</view>
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
                      @click="Del(i)"
                    >
                      删除
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <!-- <uni-load-more :status="more"></uni-load-more> -->
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
              查看已出库
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
import { CheckInvStatus, PDA_DESTROY_OUT, GetOutInfo, PDA_Save } from '@/api/baofei.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const IndexfocusType = ref(true)
const title = ref('调拨出库')
//输入框值
const disabled = ref(false)
const WsearchValue = ref()
const HDsearchValue = ref('')
const XMinfo = ref({})
const NUmValue = ref()
const listVal = ref([])
const objStr = ref({})
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
onShow(() => {
  setfocus()
})
const InfoItem = ref({})
const objVal = ref({})
//加载页面
onLoad((option) => {
  listVal.value = []
  try {
    objVal.value = JSON.parse(option.obj) || {}
  } catch {
    //
  }
  console.log(objVal.value)
  // GetList()
  h.value = uni.getSystemInfoSync().windowHeight
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}

//获取
const getWares = async () => {
  const res = await GetOutInfo({
    cWareHouseCode: objVal.value.cOutWareHouseCode,
    cInvCode: objVal.value.cInvCode,
    cKeyCode: WsearchValue.value
  })
  let list = []
  if (res.success == true) {
    // listVal.value.push(res.data)
    if (listVal.value.length > 0) {
      list = listVal.value.filter((item) => {
        return item.cKeyCode == res.data.cKeyCode
      })
    }
    if (list.length) {
      uni.showToast({
        icon: 'none',
        title: WsearchValue.value + '已添加'
      })
      WsearchValue.value = ''
      return false
    } else {
      objStr.value = res.data
      listVal.value.push(res.data)
      WsearchValue.value = ''
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: res.msg || res.errmsg[0].msg
    })
  }
}
// 确定
const GetConfirm = () => {}
//保存
const Save = () => {
  if (!listVal.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据!'
    })
    return false
  }

  let obj = {
    cVouchTypeCode: '2',
    cSourceCode: objVal.value.cCode,
    SourceUID: objVal.value.UID,
    SourceRowUID: objVal.value.RowUID,
    cWareHouseCode: objVal.value.cOutWareHouseCode,
    cWareHouseName: objVal.value.cOutWareHouseName,
    cInvCode: objVal.value.cInvCode,
    cInvName: objVal.value.cInvName,
    cInvStd: objVal.value.cInvStd,
    cUnitCode: objVal.value.cUnitCode,
    cUnitName: objVal.value.cUnitName,
    cAccUnitCode: objVal.value.cAccUnitCode,
    cAccUnitName: objVal.value.cAccUnitName,
    List_cSerialNo: listVal.value
  }

  PDA_Save(obj).then((res) => {
    if (res.success == true) {
      uni.showToast({
        icon: 'none',
        title: '保存成功！'
      })
      listVal.value = []
      objStr.value = {}
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || '保存失败！'
      })
    }
  })
}
//查看
const Check = () => {
  // console.log(i, 'i--------------');
  uni.navigateTo({
    url: '/pages/ToolAllotOutStorageCK/List/List?obj=' + JSON.stringify(objVal.value)
  })
}
// 删除
const Del = (index) => {
  listVal.value.splice(index, 1)
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
