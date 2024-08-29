<template>
  <!-- 盘点页面 -->
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
            style="display: flex; align-items: center; margin: 10px"
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
            <p style="font-size: 14px">{{ WareName }}</p>
          </view>
          <view
            class="search-wl"
            style="display: flex; align-items: center"
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
                @confirm="getXM"
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
              @input="getXM"
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
              @click="GetConfirm"
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
              v-for="(item, index) in ProductList"
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
                    <view class="demo-uni-col dark">箱码：{{ item.cBarcode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">数量：{{ item.nAccQuantity }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">物料编码：{{ item.cInvCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">物料名称：{{ item.cInvName }}</view>
                  </uni-col>
                  <uni-col :span="10">
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
import { SCANBoth, STOCKTAKESave, WareHouseLocation } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const XMfocusType = ref(true)
const title = ref('库存盘点')
//输入框值
const xmdis = ref(true)
const disabled = ref(false)
const WsearchValue = ref() //待点检输入框
const XMsearchValue = ref('') //货位输入框
const HDsearchValue = ref('')
const XMinfo = ref({})
const NUmValue = ref()
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
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  setfocus()
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
const InfoItem = ref({})
//加载页面
onLoad((option) => {
  // GetList()
  h.value = uni.getSystemInfoSync().windowHeight
  InfoItem.value = JSON.parse(option.infoItem)
  console.log(JSON.parse(option.infoItem), 'option.infoItem---------')
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
const WareName = ref('')
//获取库位
const getWares = _.debounce(async () => {
  const res = await WareHouseLocation({
    // "PageIndex": 1,
    // "PageSize": 10,
    OrderByFileds: '',
    Conditions: `cWareHouseLocationCode like ${WsearchValue.value}`
  })
  if (res.status == 200) {
    if (res.data.length) {
      WareName.value = res.data[0].cWareHouseLocationName
      disabled.value = true
      xmdis.value = false
      xmsetfocus()
    } else {
      uni.showToast({
        icon: 'none',
        title: '货位错误，请重新扫描'
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
//箱码扫描验证
const getXM = () => {
  XMinfo.value = {}
  SCANBoth({
    cBarCode: XMsearchValue.value,
    AuthenticationType: 2
  }).then((res) => {
    if (res.status == 200) {
      if (res.data) {
        // XMinfo.value = res.data
        if (ProductList.value.length) {
          let exist = false //判断存在
          ProductList.value.map((item) => {
            if (item.cBarcode == res.data.cBarCode) {
              exist = true
              uni.showToast({
                icon: 'none',
                title: '该箱码已扫描，请重新扫描箱码'
              })
              XMsearchValue.value = ''
            }
          })
          if (!exist) {
            XMinfo.value = res.data
          }
        } else {
          XMinfo.value = res.data
        }
      } else {
        uni.showToast({
          icon: 'none',
          title: '该箱码错误,请重新扫描'
        })
        XMsearchValue.value = ''
      }
    } else {
      XMsearchValue.value = ''
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value || '该箱码错误'
      })
    }
  })
}
// 确定
const GetConfirm = () => {
  if (!XMinfo.value) {
    uni.showToast({
      icon: 'none',
      title: '请扫描箱码!'
    })
    return
  }
  let obj = {
    MID: InfoItem.value.UID,
    // "MIDs": Info.value.UID,
    // INVUID:产品库存表UID
    // cInvBarCode:盘库产品条码
    cWareHouseLocationCode: WsearchValue.value,
    // "cWareHouseLocationName":'',//货位名称
    cInvCode: XMinfo.value.cInvCode,
    cInvName: XMinfo.value.cInvName,
    cInvStd: XMinfo.value.cInvStd,
    cBatch: XMinfo.value.cDefindParm01,
    // "cUnitCode":XMinfo.value.cDefindParm05,
    // cUnitName:计量单位名称
    nQuantity: XMinfo.value.cDefindParm05,
    // cAccUnitCode:计量单位
    // cAccUnitName：计量单位名称
    nAccQuantity: NUmValue.value,
    cBarcode: XMinfo.value.cBarCode
  }
  ProductList.value.unshift(obj)
  XMsearchValue.value = ''
  NUmValue.value = ''
  xmsetfocus()
  // xmdis.value = false
  // disabled.value = true
}
//保存
const Save = () => {
  if (!ProductList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据!'
    })
    return
  }
  STOCKTAKESave({
    items: ProductList.value
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '保存成功！'
      })
      ProductList.value = []
    } else {
      uni.showToast({
        icon: 'none',
        title: '错误'
      })
    }
  })
}
//查看
const Check = () => {
  // console.log(i, 'i--------------');
  uni.navigateTo({
    url: `/pages/warehouseBills/wareList/wareList?id=${InfoItem.value.UID}`
  })
}
// 删除
const Del = (item, index) => {
  ProductList.value.splice(index, 1)
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
