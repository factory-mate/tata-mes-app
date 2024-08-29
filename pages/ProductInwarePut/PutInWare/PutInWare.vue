<template>
  <!-- 成品入库保存页面 -->
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
    <view class="headSty">
      <view class="RUtext">入库操作</view>
      <view class="line"></view>
    </view>
    <view class="HeadTop">
      <view class="text"> 通知单号：{{ PUTDetail.cCode }} </view>
      <view class="text"> 产品编码：{{ PUTDetail.cInvCode }} </view>
      <view class="text"> 产品名称：{{ PUTDetail.cInvName }} </view>
      <view class="text"> 推荐货位：{{ PUTDetail.cCode }} </view>
      <view style="display: flex; align-items: center; margin-top: -10px">
        <!-- 货位 -->
        <view style="display: flex; align-items: center; justify-content: flex-start">
          <view style="width: 40px">货位:</view>
          <view>
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
                placeholder="请输入货位编码"
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
      <!-- 箱码 -->
      <view
        style="display: flex; align-items: center; justify-content: flex-start; margin-top: -15px"
      >
        <view style="width: 40px">箱码:</view>
        <view>
          <uni-section
            v-if="branch != 'alps'"
            title=""
            type="line"
          >
            <uni-search-bar
              radius="100"
              cancelButton="none"
              :focus="focusType"
              @blur="XMsetfocus"
              @confirm="getXM"
              v-model="XMsearchValue"
              placeholder="请输入箱码编码"
            >
            </uni-search-bar>
          </uni-section>
          <input
            v-else
            class="inputSty"
            :disabled="XMdisabled"
            v-model="XMsearchValue"
            @input="getXM"
            :focus="XMfocusType"
            @blur="XMsetfocus"
            placeholder="请扫描箱码"
            placeholder-style="font-size:12px"
          />
        </view>
      </view>
    </view>
    <view class="content">
      <view class="listMain">
        <view
          class="project"
          v-for="(item, index) in ProductList"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
            </uni-col>
            <uni-col :span="10">
              <view class="demo-uni-col dark">数量：{{ item.iDefindParm13 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark"></view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">批次号：{{ item.cDefindParm01 }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                  size="mini"
                  @click="DelID(item, index)"
                >
                  删除
                </button>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
    <view class="BTN">
      <button
        class="mini-btn"
        style="color: black; backgroundcolor: #ffaa00; bordercolor: #1aad19"
        type="warn"
        size="mini"
        @click="Save"
      >
        保存
      </button>
      <button
        class="mini-btn"
        style="color: black; backgroundcolor: #aaffff; bordercolor: #aaffff"
        type="warn"
        size="mini"
        @click="Check"
      >
        查看已入库
      </button>
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
import { PutProductInware, ProductBarCode, ProudcPutSave } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('成品入库')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const XMfocusType = ref(false) //箱码输入框聚焦
const focusType = ref(true) //仓库输入框聚焦
const disabled = ref(false) //仓库
const XMdisabled = ref(true) //箱码
const WsearchValue = ref('') //仓库
const XMsearchValue = ref('') //箱码
const PUTDetail = ref({}) //上架产品item
const itemUID = ref('')
const ProductList = ref([])
const PutList = ref([])
const SavtTitle = ref(false)
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
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  PUTDetail.value = JSON.parse(option.PutItem) // 详情参数字符串转对象
  itemUID.value = JSON.parse(option.PutItem).UID
})
//箱码输入框聚焦
const XMsetfocus = () => {
  XMfocusType.value = false
  setTimeout(() => {
    XMfocusType.value = true
  }, 200)
}
//仓库聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//获取货位
const getWares = _.debounce(async () => {
  const res = await PutProductInware({
    code: WsearchValue.value
  })
  if (res.status == 200) {
    if (res.data) {
      uni.showToast({
        icon: 'none',
        title: '货位正确'
      })
      disabled.value = true
      XMdisabled.value = false
      XMsetfocus()
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
//重置
const ClearInput = () => {
  WsearchValue.value = ''
  ProductList.value = []
  disabled.value = false
  XMdisabled.value = true
  setfocus()
}
//箱码扫描验证
const getXM = () => {
  ProductBarCode({
    cBarCode: XMsearchValue.value,
    cActiveTypeCode: '10'
  }).then((res) => {
    if (res.status == 200) {
      XMsearchValue.value = ''
      if (res.data) {
        if (ProductList.value.length) {
          let exist = false //判断存在
          ProductList.value.map((item) => {
            if (item.cBarCode == res.data.cBarCode) {
              exist = true
              uni.showToast({
                icon: 'none',
                title: '该箱码已扫描，请重新扫描箱码'
              })
            }
          })
          if (!exist) {
            ProductList.value.unshift(res.data)
          }
        } else {
          ProductList.value.unshift(res.data)
        }
      } else {
        uni.showToast({
          icon: 'none',
          title: '该箱码错误'
        })
      }
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value || '该箱码错误'
      })
      XMsearchValue.value = ''
    }
  })
}
//删除按钮
//删除按钮
const DelID = (i, index) => {
  uni.showModal({
    showCancel: true,
    content: '确定删除数据',
    success: function (res) {
      if (res.confirm) {
        ProductList.value.splice(index, 1)
        console.log('用户点击 确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
//保存
const Save = () => {
  if (!ProductList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据'
    })
    return
  }
  let XMlist = []
  ProductList.value.forEach((item) => {
    XMlist.push(item.cBarCode)
  })
  uni.showLoading({
    title: '保存中'
  })
  ProudcPutSave({
    UID: PUTDetail.value.MID,
    cInvCode: PUTDetail.value.cInvCode,
    cWareHouseLocationCode: WsearchValue.value,
    cBarCodes: XMlist,
    cVouchSourceTypeCode: '02'
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: '保存成功'
      })
      disabled.value = false
      XMdisabled.value = true
      setfocus()
      SavtTitle.value = true
      WsearchValue.value = ''
      ProductList.value = []
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value
      })
      ProductList.value = []
    }
  })
}
//查看已入库
const Check = () => {
  if (SavtTitle.value) {
    let inWareProdcut = JSON.stringify(PUTDetail.value) // 这里转换成 字符串
    uni.navigateTo({
      url: '/pages/ProductInwarePut/inWareList/inWareList?inWareProdcut=' + inWareProdcut
    })
  } else {
    uni.showModal({
      showCancel: true,
      content: '数据还未保存，确定不保存数据？',
      success: function (res) {
        if (res.confirm) {
          ProductList.value = []
          let inWareProdcut = JSON.stringify(PUTDetail.value) // 这里转换成 字符串
          uni.navigateTo({
            url: '/pages/ProductInwarePut/inWareList/inWareList?inWareProdcut=' + inWareProdcut
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // if (current.value == 1) {
  // 	currentPage.value = 1
  // 	total.value = 0
  // 	DJliST.value = []
  // 	GetPageList()
  // }
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // // console.log('上拉');
  // if (current.value == 1) {
  // 	currentPage.value++
  // 	if (currentPage.value > pageTotal.value) {
  // 		more.value = 'no-more'
  // 	} else {
  // 		GetPageList()
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

  .HeadTop {
    font-size: 14px;
    margin: 5px 10px;

    .text {
      padding: 5px 0;
    }
  }

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .headSty {
    width: 100%;
    height: 100%;

    // display: flex;
    .RUtext {
      margin-top: 10px;
      width: 100px;
      padding: 3px;
      text-align: center;
      border: 1px solid gray;
      // border-radius: 10px;
    }

    .line {
      // height: 1px;
      width: 100%;
      border: 1px solid gray;
      // margin-top: 10px;
    }
  }

  .content {
    width: 100%;
    font-size: 12px;

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
  }

  .BTN {
    text-align: center;
    justify-content: space-between;
    margin: 10px 0;

    .mini-btn {
      margin: 0 10px;
    }
  }
}
</style>
