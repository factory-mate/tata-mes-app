<template>
  <!-- 物料盘点页面 -->
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
            style="display: flex; align-items: center"
          >
            <p class="searchTExt">盘点单号：</p>
            <p class="inputText">{{ Info.cCode }}</p>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center"
          >
            <p class="searchTExt">物料编码：</p>
            <p class="inputText">{{ Info.cInvCode }}</p>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center"
          >
            <p class="searchTExt">物料名称：</p>
            <p class="inputText">{{ Info.cInvName }}</p>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center; margin: 10px"
          >
            <p class="searchTExt">箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</p>
            <uni-section
              v-if="branch != 'alps'"
              title=""
              type="line"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
                :focus="XMfocusType"
                @blur="xmsetfocus"
                @confirm="getXMCode"
                v-model="XMsearchValue"
                placeholder="请输入箱码"
              >
              </uni-search-bar>
            </uni-section>
            <input
              v-else
              class="inputSty"
              :disabled="xmdis"
              v-model="XMsearchValue"
              @input="getXMCode"
              :focus="focusType"
              @blur="xmsetfocus"
              placeholder="请扫描箱码"
              placeholder-style="font-size:12px"
            />
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center"
          >
            <p class="searchTExt">货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</p>
            <uni-section
              v-if="branch != 'alps'"
              title=""
              type="line"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
                :focus="focusType"
                @blur="setfocus"
                @confirm="getWares"
                v-model="WsearchValue"
                placeholder="请输入货位"
              >
              </uni-search-bar>
            </uni-section>
            <input
              v-else
              class="inputSty"
              :disabled="disabled"
              v-model="WsearchValue"
              @input="getWares"
              :focus="focusType"
              @blur="setfocus"
              placeholder="请扫描货位"
              placeholder-style="font-size:12px"
            />
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center"
          >
            <p class="searchTExt">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</p>
            <input
              class="inputSty"
              v-model="NUmValue"
              placeholder="请输入"
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
              @click="confirmData"
            >
              确定
            </button>
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
              @click="Check"
            >
              查看
            </button>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 370) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in DevList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="6">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">箱码：{{ item.cBarcode }}</view>
                  </uni-col>
                  <uni-col :span="6">
                    <view class="demo-uni-col dark">数量：{{ item.nAccQuantity }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationCode }}</view>
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
import { STOCKTAKESave, SCAN } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const XMfocusType = ref(false)
const title = ref('物料盘点')
//输入框值
const xmdis = ref(false)
const disabled = ref(true)
const WsearchValue = ref() //待点检输入框
const XMsearchValue = ref('') //箱码输入框
const NUmValue = ref()
//设备列表数据
const DevList = ref([])
const ReadDevList = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const Info = ref({})
const MID = ref('')
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  xmsetfocus()
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
  Info.value = JSON.parse(option.itemInfo)
  console.log(Info.value, 'ooooooooo')
  MID.value = option.mid
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const xmsetfocus = () => {
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
  }
}
const Barcode = ref('')
//箱码验证
const getXMCode = () => {
  console.log(XMsearchValue.value, '9999-----------')
  let arr = XMsearchValue.value.split('|')
  Barcode.value = arr[0]
  let code = arr[1]
  let num = arr[2]
  if (code == Info.value.cInvCode) {
    // 箱码验重
    if (DevList.value.length) {
      let exist = false //判断存在
      DevList.value.map((item) => {
        if (item.cBarcode == Barcode.value) {
          exist = true
          uni.showToast({
            icon: 'none',
            title: '该箱码已扫描，请重新扫描箱码'
          })
        }
        XMsearchValue.value = ''
      })
      if (!exist) {
        uni.showToast({
          icon: 'none',
          title: '扫描成功！'
        })
        xmdis.value = true
        disabled.value = false
        setfocus()
      }
    } else {
      uni.showToast({
        icon: 'none',
        title: '扫描成功！'
      })
      xmdis.value = true
      disabled.value = false
      setfocus()
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '该箱码物料错误，请重新扫描!'
    })
    XMsearchValue.value = ''
  }
}
const ReturnData = ref({})
//货位验证
const getWares = () => {
  SCAN({
    cBarCode: Barcode.value,
    cWareHouseLocationCode: WsearchValue.value
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '货位正确！'
      })
      ReturnData.value = res.data
      disabled.value = true
    } else {
      uni.showToast({
        icon: 'none',
        title: '该货位错误，请重新扫描!'
      })
      WsearchValue.value = ''
    }
  })
}

//确定
const confirmData = () => {
  let obj = {
    MID: MID.value,
    MIDs: Info.value.UID,
    // INVUID:产品库存表UID
    // cInvBarCode:盘库产品条码
    cWareHouseLocationCode: WsearchValue.value,
    // "cWareHouseLocationName":'',//货位名称
    cInvCode: Info.value.cInvCode,
    cInvName: Info.value.cInvName,
    cInvStd: Info.value.cInvStd,
    cBatch: ReturnData.value.cDefindParm01,
    cUnitCode: ReturnData.value.cDefindParm05,
    // cUnitName:计量单位名称
    nQuantity: ReturnData.value.cDefindParm05,
    // cAccUnitCode:计量单位
    // cAccUnitName：计量单位名称
    nAccQuantity: NUmValue.value,
    cBarcode: ReturnData.value.cBarCode
  }
  DevList.value.unshift(obj)
  XMsearchValue.value = ''
  NUmValue.value = ''
  WsearchValue.value = ''
  xmdis.value = false
  disabled.value = true
  xmsetfocus()
}
//保存
const Save = () => {
  STOCKTAKESave({
    items: DevList.value
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '保存成功！'
      })
      DevList.value = []
    } else {
      uni.showToast({
        icon: 'none',
        title: '错误'
      })
    }
  })
}
// 删除
const Del = (item, index) => {
  DevList.value.splice(index, 1)
}
//查看
const Check = () => {
  uni.navigateTo({
    url: `/pages/checkBills/CheckList/CheckList?id=${MID.value}&name=${Info.value.cInvName}&code=${Info.value.cInvCode}`
  })
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
