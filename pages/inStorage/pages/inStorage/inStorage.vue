<template>
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      rightText="已扫描"
      :title="title"
      @clickLeft="clickLeft"
      @clickRight="clickRight"
    />
    <view class="search-wl">
      <!-- 搜索框 -->
      <uni-section
        v-if="branch != 'alps'"
        title=""
        type="line"
      >
        <uni-search-bar
          radius="100"
          cancelButton="none"
          @confirm="getWl"
          v-model="searchValue"
          placeholder="请输入物料条码"
        >
        </uni-search-bar>
      </uni-section>
      <input
        v-else
        class="inputSty"
        v-model="searchValue"
        :focus="focusType"
        @blur="setfocus"
        @input="getWl"
        placeholder="请输入物料条码"
        placeholder-style="font-size:12px"
      />
    </view>
    <view class="wu-detail">
      <view class="wu-fir">
        <view class="wahouse">
          仓库：
          <text>{{ detailMsg.cWhName }}</text>
        </view>
        <view class="wastation">
          库位：
          <text>{{ detailMsg.cPosCode }}</text>
        </view>
      </view>
      <view class="project">
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">条码：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.Pbarcode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">单号：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.cCode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">物流商：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.cLogisticsName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">发货批号：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.SendBatch }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">订单号：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.Pbarcode }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">扫描时间：</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col light">{{ detailMsg.ScanTime }}</view>
          </uni-col>
        </uni-row>
      </view>
    </view>
    <view class="button-wl">
      <!-- <button class="canel-btn" plain="true" @click="WLcancel">取消</button> -->
      <!-- <button class="confirm-btn" type="primary" @click="clickScanCode">扫描条码</button> -->
    </view>
  </view>
</template>

<script setup>
import { TimeCha, time } from '@/utils/time.js'
import { ref } from 'vue'
import permision from '@/common/permission.js'
import _ from 'lodash'
import { onLoad, onShow, onUnload, onHide, onBackPress } from '@dcloudio/uni-app'
import { getWLInfo, getInfoList, errLog } from '../../../../api/inStorage.js'
const focusType = ref(true)
const codeType = ref('')
//输入框值
const searchValue = ref('')
const title = ref('物料信息')
let detailMsg = ref({})
let branch = ref()
const wuList = ref([])
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

  if (uni.getStorageSync('wuList')) {
    wuList.value = JSON.parse(uni.getStorageSync('wuList')) ?? []
  } else {
    wuList.value = []
  }
})

onLoad((val) => {
  // console.log(uni.getSystemInfoSync().windowWidth,'wwwwws');
  // console.log(uni.getSystemInfoSync().windowHeight,"hhhh");
  // branch = uni.getStorageSync('unit')
  // console.log(branch.brand,'000000000000000');
  // console.log(uni.getDeviceInfo(),'机型uni.getDeviceInfo()');
  // // #ifdef APP-PLUS
  // plus.key.addEventListener("keyup", keypress);
  // // #endif
  // // #ifdef H5
  // document.addEventListener("keyup", keypress);
  // // #endif
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
//时间
const TimeData = () => {
  var date, year
  var d = new Date()
  year = d.getYear() < 1900 ? 1900 + d.getYear() : d.getYear()
  date =
    '【--当前时间】：' +
    (d.getMonth() + 1) +
    '月' +
    d.getDate() +
    '日 ' +
    d.getHours() +
    '时' +
    d.getMinutes() +
    '分' +
    d.getSeconds() +
    '秒'
  return date
}

const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const keypress = (e) => {
  codeType.value = ''
  console.log(e, '按键码')
  if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
    codeType.value = 'enter'
    getWl()
  }
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
    getWl()
  }
}

//已扫描跳转
const clickRight = () => {
  // uni.showModal({
  // 	// title: '提示',
  // 	showCancel: false,
  // 	content: '请扫描条码！',
  // 	success: function(res) {
  // 		if (res.confirm) {
  // 			console.log('用户点击确定');
  // 		} else if (res.cancel) {
  // 			console.log('用户点击取消');
  // 		}
  // 	}
  // })
  uni.navigateTo({
    url: '/pages/inStorage/pages/components/scanWulIst/scanWulIst'
  })
}
const clickHome = (v) => {
  if (v.type) {
    if (wuList.value.length) {
      uni.showModal({
        content: '已扫描条码未入库，确认退出？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            uni.switchTab({
              url: '/pages/tabbar/home/index'
            })
            uni.removeStorageSync('wuList')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      uni.switchTab({
        url: '/pages/tabbar/home/index'
      })
      uni.removeStorageSync('wuList')
    }
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  if (wuList.value.length) {
    uni.showModal({
      content: '已扫描条码未入库，确认退出？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          uni.navigateBack({
            delta: 1
          })
          uni.removeStorageSync('wuList')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  } else {
    uni.navigateBack({
      delta: 1
    })
  }
}
//输入框获取条码信息
const getWl = _.debounce(async () => {
  if (codeType.value !== 'enter') return false
  if (!searchValue.value) return false
  if (wuList.value.length) {
    if (wuList.value.some((item) => item.Pbarcode == searchValue.value)) {
      uni.showModal({
        showCancel: false,
        content: searchValue.value + '已存在'
      })
      searchValue.value = ''
      return false
    }
  }
  uni.showLoading({
    title: '加载中'
  })

  try {
    const WLMsg = await getWLInfo({
      pbarcode: searchValue.value
    })

    if (!WLMsg.data) {
      uni.showToast({
        icon: 'error',
        title: '条码数据不正确'
      })
      uni.hideLoading()
      return false
    }
    if (wuList.value.length > 0) {
      if (wuList.value[0].cPosCode !== WLMsg.data.cPosCode) {
        uni.showModal({
          showCancel: false,
          content: `当前条码库位号(${WLMsg.data.cPosCode})和之前的库位号(${wuList.value[0].cPosCode})不一致，无法录入`
        })
        uni.hideLoading()
        return false
      }
    }
    if (WLMsg.data.InType === '已入库') {
      uni.showToast({
        icon: 'error',
        title: '该条码已入库，不能重复入库'
      })
      uni.hideLoading()
      return false
    }
    if (WLMsg.status == '200') {
      codeType.value = ''
      WLMsg.data.ScanTime = time()
      detailMsg.value = WLMsg.data || {}
      searchValue.value = ''
      uni.showToast({ title: `扫描成功：${detailMsg.value.Pbarcode}` })
      wuList.value.unshift(detailMsg.value)
      uni.setStorageSync('wuList', JSON.stringify(wuList.value))
    } else {
      uni.showModal({
        // title: '提示',
        showCancel: false,
        content: WLMsg.msg
      })
      searchValue.value = ''
      codeType.value = ''
    }
    uni.hideLoading()
  } catch {
    uni.hideLoading()
  }
  uni.hideLoading()
}, 300)

//扫描条码
const clickScanCode = async () => {
  focusType.value = true
  return false
  // #ifdef APP-PLUS
  let status = await checkPermission()
  if (status !== 1) {
    return
  }
  // #endif
  uni.scanCode({
    success: (res) => {
      // console.log(res, "条码");
      if (res.result != '') {
        // 接口数据
        getWLInfo({
          pbarcode: res.result,
          cposcode: res.cposcode,
          ctype: 1
        }).then((res) => {
          if (res.RspCode === 'Successed') {
            detailMsg.value = res.RspData
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: res.msg
        })
      }
    },
    fail: (err) => {
      // 需要注意的是小程序扫码不需要申请相机权限
    }
  })
}
// #ifdef APP-PLUS

const checkPermission = async (code) => {
  let status = permision.isIOS
    ? await permision.requestIOS('camera')
    : await permision.requestAndroid('android.permission.CAMERA')

  if (status === null || status === 1) {
    status = 1
  } else {
    uni.showModal({
      content: '需要相机权限',
      confirmText: '设置',
      success: function (res) {
        if (res.confirm) {
          permision.gotoAppSetting()
        }
      }
    })
  }
  return status
}
// #endif

//取消返回
const WLcancel = () => {
  uni.navigateTo({
    url: '/pages/inStorage/pages/inStorage/inStorage'
  })
}
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  //输入框
  .search-wl {
    text-align: center;
    margin: 30rpx 0;
    border-bottom: 1px solid #bbb;

    .wu-text {
      font-size: 36rpx;
      margin: 0 10rpx;
      text-align: center;
      color: #fff;
    }

    .uni-input {
      border: 1px solid black;
      border-radius: 30rpx;
      height: 50rpx;
    }
  }

  //物料详情
  .wu-detail {
    margin: 20rpx;

    .wu-fir {
      border-bottom: 1px solid #bbb;
      font-size: 40rpx;
      background: #fff;
      padding: 20rpx;

      .wahouse {
        margin: 20rpx 10rpx;
      }

      .wastation {
        margin: 20rpx 10rpx;
      }
    }

    .project {
      background: #fff;
      font-size: 12px;
      margin: 20rpx 0;

      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
      }
    }
  }

  //底部按钮
  .button-wl {
    width: 100%;
    position: absolute;
    bottom: 70rpx;

    .canel-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
    }

    .confirm-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
      background: red;
    }
  }
}
</style>
