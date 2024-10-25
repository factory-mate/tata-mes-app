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
    <view class="content">
      <!-- 搜索框 -->
      <view class="search-wl">
        <view
          style="display: flex; text-align: center; justify-content: start; align-items: center"
        >
          <view style="width: 15%; margin: 0 10px">设备： </view>
          <!-- 搜索框 -->
          <view style="width: 60%">
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
                @confirm="getDH"
                v-model="searchValue"
                placeholder="请输入设备"
              >
              </uni-search-bar>
            </uni-section>
            <input
              v-else
              class="inputSty"
              v-model="searchValue"
              @input="getDH"
              :focus="focusType"
              @blur="setfocus"
              :disabled="disabled"
              placeholder="请扫描设备"
              placeholder-style="font-size:12px"
            />
          </view>
        </view>
      </view>
      <view
        class="listMain"
        :style="'height:' + (h - 260) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in DeviceInfo"
          :key="index"
        >
          <view class="wLIst">
            <uni-row class="demo-uni-row">
              <uni-col :span="11">
                <view class="demo-uni-col dark">设备编号：{{ item.cDeviceCode }}</view>
              </uni-col>
              <uni-col :span="11">
                <view class="demo-uni-col dark">设备名称：{{ item.cDeviceName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="11">
                <view class="demo-uni-col dark">刀具料号：{{ item.cInvCode }}</view>
              </uni-col>
              <uni-col :span="11">
                <view class="demo-uni-col dark">刀具名称：{{ item.cInvName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="11">
                <view class="demo-uni-col dark">寿命：{{ item.iValidCount }}</view>
              </uni-col>
              <uni-col :span="11">
                <view class="demo-uni-col dark">刀具序列号：{{ item.cSerialNo }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="8">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="GoDowmTool(item)"
                >
                  下刀
                </button>
              </uni-col>
            </uni-row>
          </view>
        </view>
        <uni-load-more :status="more"></uni-load-more>
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
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
import { getScanTool, DownTool } from '@/api/PDA_3.js'
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const searchValue = ref('')
const title = '设备下刀'
const disabled = ref(false)
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const DeviceInfo = ref([])
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  // setfocus()
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
//货位输入框聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  // if (e.keyCode == 66|| e.key=="Enter") {
  // 	codeType.value = 'enter'
  // 	getcCode()
  // }
}
//扫描设备
const getDH = () => {
  uni.showLoading({
    title: '加载中'
  })
  getScanTool({
    OrderByFileds: '',
    Conditions: searchValue.value ? `cDeviceCode=${searchValue.value}` : ''
  }).then((res) => {
    if (res.status == 200) {
      DeviceInfo.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.showToast({
        icon: 'none',
        title: '扫描设备失败'
      })
      searchValue.value = ''
      uni.hideLoading()
    }
  })
}
//下刀
const GoDowmTool = (i) => {
  DownTool({
    cDeviceCode: i.cDeviceCode,
    cDeviceName: i.cDeviceName,
    cSerialNo: i.cSerialNo,
    cInvCode: i.cInvCode,
    cInvName: i.cInvName
  })
    .then((res) => {
      if (res.success) {
        uni.showToast({
          icon: 'none',
          title: '刀具下架成功'
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '刀具下架失败'
        })
      }
    })
    .finally(() => {
      getDH()
    })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // currentPage.value = 1
  // total.value = 0
  // PDAawaitList.value = []
  // WaitList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (currentPage.value > pageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	WaitList()
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
.head_row {
  box-sizing: border-box;
  padding: 0 10rpx;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .content {
    width: 100%;
    font-size: 12px;

    .Three-List {
      .Three-wlInfo-list {
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
      }
    }

    .TWO-wlInfo {
      .TWO-wlInfo-list {
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
      }
    }

    .search-wl {
      background: #fff;
      font-size: 12px;
      margin: 20rpx 10rpx;
      border-bottom: 1px solid #eee;

      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;

        .search-inpt {
          margin: -20px 0;

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
      }
    }

    // .listMain {
    // 	margin-top: 2px;
    // 	width: 100%;
    // 	height: calc(100% - 240rpx);
    // 	overflow-y: auto;
    // 	font-size: 14px;
    // }

    .BTN-Two {
      display: flex;
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;
      // border: 1px solid red;
      box-sizing: border-box;

      .project {
        // border: 1px solid red;
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #ddd;
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

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;
    }
  }
}

.inputSty {
  margin: 0;
}

.uni-searchbar__box {
  height: 30px !important;
  padding: 0;
}
</style>
