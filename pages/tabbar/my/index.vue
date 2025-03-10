<template>
  <view class="content">
    <view class="bgc-img"> </view>
    <view class="logo">
      <image
        src="../../../static/logo.png"
        mode=""
        class="logo-img"
      ></image>
    </view>

    <view class="main">
      <text style="margin-top: 140rpx; color: white">{{ userName }}</text>
      <view v-if="URLIP.ENV === 'local'">
        <up-button
          style="width: 200px"
          @click="handleDev"
        >
          开发自用
        </up-button>
      </view>
      <button
        class="log-out"
        @click="logout"
      >
        注销
      </button>
    </view>

    <span
      style="color: white; position: absolute; bottom: 8px; left: 0; right: 0; font-size: smaller"
    >
      当前版本：{{ URLIP.VERSION_NAME }}v{{ version }}
    </span>

    <!-- <web-view
      style="width: 100vw"
      :full-screen="false"
      src="http://171.13.38.93:89/door-leaf/door-leaf-production-line"
    ></web-view> -->
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import URLIP from '@/utils/serviceIP.js'

const userName = ref('')
const h = ref(100)
const version = ref('')

const logout = () => {
  uni.removeStorageSync('token')
  uni.removeStorageSync('account')
  uni.reLaunch({ url: '/pages/login/login' })
}

function handleDev() {
  uni.navigateTo({
    url: '/pages/test/index'
  })
}

function handleUpgradeApp() {
  if (URLIP.ENV === 'local') {
    return
  }
  // #ifdef APP-PLUS
  plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
    uni.request({
      url: `${URLIP.APP_UPGRADE_URL}/${URLIP.ENV}/version.json`,
      success: (res) => {
        const { version, url } = res.data
        console.log(version, widgetInfo.version)
        if (widgetInfo.version != version) {
          console.log(`${URLIP.APP_UPGRADE_URL}/${URLIP.ENV}/${url}`)
          uni.showLoading({
            title: '正在下载更新包'
          })
          uni.downloadFile({
            url: `${URLIP.APP_UPGRADE_URL}/${URLIP.ENV}/${url}`,
            success: (downloadResult) => {
              console.log(downloadResult)
              if (downloadResult.statusCode === 200) {
                plus.runtime.install(
                  downloadResult.tempFilePath,
                  { force: true },
                  function () {
                    console.log('install success...')
                    plus.runtime.restart()
                  },
                  function (e) {
                    console.error('install fail...')
                    console.log(e)
                  }
                )
              }
            },
            fail: (downloadResult) => {
              console.log(downloadResult)
            },
            complete: (downloadResult) => {
              console.log(downloadResult)
              uni.hideLoading()
            }
          })
        }
      }
    })
  })
  // #endif
}

onShow(() => {
  userName.value = uni.getStorageSync('User')?.UserName ?? ''
  h.value = uni.getSystemInfoSync().windowHeight
  // uni.navigateTo({ url: '/pages/test/print/index' })

  const systemInfo = uni.getSystemInfoSync()
  // #ifdef APP
  version.value = systemInfo.appWgtVersion
  // #endif
  // #ifdef H5
  version.value = systemInfo.appVersion
  // #endif
  handleUpgradeApp()
  console.log(version.value)
})

onLoad(() => {})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  text-align: center;
  height: 100vh;
  background-color: #971e23;

  .bgc-img {
    width: 100%;
    height: 300rpx;
  }

  .logo {
    width: 220rpx;
    height: 220rpx;
    border-radius: 24px;
    position: absolute;
    top: 190rpx;
    left: 265rpx;
    background-color: white;
    padding: 2rpx;
    z-index: 999;
    .logo-img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
  }

  .main {
    box-sizing: border-box;
    height: 20em;
    border: 1px solid #000;
    width: 100%;
    background-color: #971e23;
    border: 1rpx solid #971e23;
    border-radius: 60rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .log-out {
      width: 660rpx;
      height: 90rpx;
      border-radius: 32rpx;
      background-color: #464c5b;
      margin-bottom: 60rpx;
      color: white;
    }
  }
}
</style>
