<template>
  <!-- 成品入库通知页面 -->
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
    <view style="display: flex; align-items: center; margin-left: 10px">
      <view style="display: flex; align-items: center; justify-content: flex-start">
        <view style="width: 40px">仓库:</view>
        <view style="width: 160px">
          <!-- 搜索框 -->
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
              placeholder="请输入仓库编码"
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
            placeholder="请扫描仓库"
            placeholder-style="font-size:12px"
          />
        </view>
        <!-- 	<view style="width: 80px;">
					<button class="mini-btn" type="warn" size="mini" @click="ClearInput">重置</button>
				</view> -->
      </view>
      <view class="demo-uni-col dark">{{ WareName }}</view>
    </view>
    <view class="headSty">
      <view class="RUtext">入库操作</view>
      <view class="line"></view>
    </view>
    <!-- 箱码 -->
    <view style="display: flex; align-items: center; justify-content: flex-start">
      <view style="width: 60px; margin-left: 20px">箱码:</view>
      <view>
        <!-- 搜索框 -->
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
    <view class="content">
      <view
        class="listMain"
        :style="'height:' + (h - 300) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in ProductList"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">工单号：{{ item.cDefindParm02 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="14">
              <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">数量：{{ item.iDefindParm13 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">产品编码：{{ item.cInvCode }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="14">
              <view class="demo-uni-col dark">批次号：{{ item.cDefindParm01 }}</view>
            </uni-col>
            <uni-col :span="8">
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
        style="color: black; backgroundcolor: #ffaa00; bordercolor: #1aad19; margin-bottom: 20px"
        type="warn"
        size="mini"
        @click="Save"
      >
        保存并提交
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
import { GetWare, PostSave, ProductBarCode } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import loginVue from '../login/login.vue'
let branch = ref()
const title = ref('成品入库通知')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const XMfocusType = ref(false) //箱码输入框聚焦
const focusType = ref(true) //仓库输入框聚焦
const disabled = ref(false) //仓库
const XMdisabled = ref(true) //箱码
const WsearchValue = ref('') //仓库
const WareName = ref('') //仓库名称
const XMsearchValue = ref('') //箱子=码
const ProductList = ref([])
const PutList = ref([])
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
  console.log(e, '按键码')
}
//获取仓库
const getWares = _.debounce(async () => {
  const res = await GetWare({
    Conditions: `cWareHouseCode=${WsearchValue.value}`,
    OrderByFileds: 'utfs'
  })
  if (res.status == 200) {
    if (res.data.length) {
      WareName.value = res.data[0].cWareHouseName
      disabled.value = true
      XMdisabled.value = false
      XMsetfocus()
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
      XMsearchValue.value = ''
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value || '该箱码错误'
      })
    }
  })
}
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
//保存提交
const Save = () => {
  if (!ProductList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请先扫描仓库/箱码'
    })
    return
  }
  PutList.value = ProductList.value.map((item) => {
    return {
      cInvCode: item.cInvCode,
      cInvName: item.cInvName,
      cInvStd: item.cDefindParm03,
      nQuantity: item.iDefindParm13,
      cSourceAppType: '002',
      cDefindParm01: item.cDefindParm02,
      cDefindParm02: item.cBarCode,
      cDefindParm03: item.cDefindParm01
    }
  })
  const cDepCode = uni.getStorageSync('User').token_user.Parm01
  uni.showLoading({
    title: '保存中'
  })
  PostSave({
    cDepCode: cDepCode,
    cInWareHouseCode: WsearchValue.value,
    cSourceAppType: '002',
    cCode: '',
    cVouchSourceTypeCode: '02',
    Items: PutList.value
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: '保存提交成功'
      })
      WsearchValue.value = ''
      WareName.value = ''
      ProductList.value = []
      disabled.value = false
      XMdisabled.value = true
      setfocus()
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value
      })
    }
  })
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

  .headSty {
    width: 100%;
    height: 100%;

    // display: flex;
    .RUtext {
      margin: 0 auto;
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
    margin: 10px 0;
  }
}
</style>
