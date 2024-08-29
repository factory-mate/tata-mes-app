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
    />
    <view class="headSty">
      <view class="RUtext">出库操作</view>
      <view class="line"></view>
    </view>
    <view class="HeadTop">
      <!-- 			<view class="text">
				通知单号：{{OutDetail.cCode}}
			</view> -->
      <view class="text"> 产品编码：{{ OutDetail.cInvCode }} </view>
      <view class="text"> 产品名称：{{ OutDetail.cInvName }} </view>
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
          v-for="(item, index) in ProductOutList"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">箱码：{{ item.cBarCode }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">数量：{{ item.iDefindParm13 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark"></view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">货位：{{ item.cWareHouseLocationCode }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                  size="mini"
                  @click="DelWL(item, index)"
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
        @click="CheckOut"
      >
        查看已出库
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
import { ProductBarCode, ProudcOutSave } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('销售出库')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const XMfocusType = ref(true) //箱码输入框聚焦
const XMdisabled = ref(false) //箱码
const XMsearchValue = ref('') //箱码
const OutDetail = ref({})
const ProductOutList = ref([])
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
  XMsetfocus()
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
  OutDetail.value = JSON.parse(option.OutItem) // 详情参数字符串转对象
})
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
}
//箱码扫描验证
const getXM = () => {
  uni.showLoading({
    title: '加载中'
  })
  ProductBarCode({
    cBarCode: XMsearchValue.value,
    cActiveTypeCode: '20'
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      XMsearchValue.value = ''
      if (res.data) {
        if (ProductOutList.value.length) {
          let exist = false //判断存在
          ProductOutList.value.map((item) => {
            if (item.cBarCode == res.data.cBarCode) {
              exist = true
              uni.showToast({
                icon: 'none',
                title: '该箱码已扫描，请重新扫描箱码'
              })
            }
          })
          if (!exist) {
            ProductOutList.value.unshift(res.data)
          }
        } else {
          ProductOutList.value.unshift(res.data)
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
const DelWL = (i, index) => {
  uni.showModal({
    showCancel: true,
    content: '确定删除数据?',
    success: function (res) {
      if (res.confirm) {
        //确定删除
        ProductOutList.value.splice(index, 1)
        console.log('用户点击 确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
//保存
const Save = () => {
  if (!ProductOutList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据'
    })
    return
  }
  let XMlist = []
  ProductOutList.value.forEach((item) => {
    XMlist.push(item.cBarCode)
  })
  ProudcOutSave({
    MID: OutDetail.value.MID,
    UID: OutDetail.value.UID,
    cInvCode: OutDetail.value.cInvCode,
    cBarCodes: XMlist,
    cWareHouseCode: ProductOutList.value[0].cWareHouseCode,
    cVouchSourceTypeCode: '03'
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      uni.showToast({
        icon: 'none',
        title: '保存成功'
      })
      SavtTitle.value = true
    } else {
      uni.showToast({
        icon: 'none',
        title: res.msg || res.errmsg[0].Value
      })
      // ProductOutList.value=[]
    }
  })
}
//查看已出库
const CheckOut = () => {
  if (SavtTitle.value) {
    let OutWareProdcut = JSON.stringify(OutDetail.value) // 这里转换成 字符串
    uni.navigateTo({
      url: '/pages/ProductInwareOut/OutWareList/OutWareList?OutWareProdcut=' + OutWareProdcut
    })
  } else {
    uni.showModal({
      showCancel: true,
      content: '数据还未保存，确定不保存数据？',
      success: function (res) {
        if (res.confirm) {
          ProductOutList.value = []
          let OutWareProdcut = JSON.stringify(OutDetail.value) // 这里转换成 字符串
          uni.navigateTo({
            url: '/pages/ProductInwareOut/OutWareList/OutWareList?OutWareProdcut=' + OutWareProdcut
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  // let mynavData = JSON.stringify(item); // 这里转换成 字符串
  // uni.navigateTo({
  //     // url:'./nav?index='+mynavData
  // 	url:'/pages/ProductInwareOut/OutWareList/OutWareList'
  // })
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
