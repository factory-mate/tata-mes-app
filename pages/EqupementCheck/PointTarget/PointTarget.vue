<template>
  <!-- 待检点 --指标-->
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
    <view class="HeadTop">
      <view class="demo-uni-col dark">设备指标</view>
    </view>
    <view
      style="font-size: 14px; text-align: center"
      v-if="!TargetList.length"
    >
      暂无数据！
    </view>
    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> :style="{background:disInput == true ? '#b5b5b5' : ''}" -->
      <view
        class="listMain"
        :style="'height:' + (h - 240) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in TargetList"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
            <uni-col :span="18">
              <view class="demo-uni-col dark"></view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">部件名称：{{ item.cInvName }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">指标名称：{{ item.cDeviceStandardName }}</view>
            </uni-col>
          </uni-row>
          <uni-row
            class="demo-uni-row"
            v-if="item.cStandardTypeCode != 2"
          >
            <uni-col :span="24">
              <view class="demo-uni-col dark">标准范围值（大）：{{ item.cMaxValue }}</view>
            </uni-col>
            <uni-col :span="24">
              <view class="demo-uni-col dark">标准范围值（小）：{{ item.cMinValue }}</view>
            </uni-col>
          </uni-row>
          <view
            class="ChangTarg"
            style="display: flex; align-items: center"
          >
            <view style="width: 15%; margin: 0 10px">指标值:</view>
            <view style="width: 60%">
              <view v-if="item.cStandardTypeCode == 2">
                <uni-section type="line">
                  <uni-data-select
                    v-model="item.DataInput"
                    :localdata="item.rangeValue"
                    @change="change($event, item)"
                    :placeholder="item.cActValue ? item.cActValue : '请输入'"
                    :disabled="item.cPARM01 ? true : false"
                  ></uni-data-select>
                </uni-section>
              </view>
              <view v-else>
                <input
                  class="inputSty"
                  v-model="item.DataInput"
                  :disabled="item.cPARM01 ? true : false"
                  :placeholder="item.cActValue ? item.cActValue : '请输入'"
                  placeholder-style="font-size:12px"
                  type="number"
                />
              </view>
            </view>
          </view>
          <view>
            <uni-row
              class="demo-uni-row"
              v-if="item.cStandardTypeCode != 2"
            >
              <uni-col :span="24">
                <view class="demo-uni-col dark">
                  结果：{{
                    item.cPARM01
                      ? item.cPARM01
                      : item.DataInput >= item.cMinValue && item.DataInput <= item.cMaxValue
                        ? '正常'
                        : '不正常'
                  }}
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="SaveTarget(item)"
                    :disabled="item.cPARM01 ? true : false"
                  >
                    保存
                  </button>
                </view>
              </uni-col>
            </uni-row>
            <uni-row
              class="demo-uni-row"
              v-else
            >
              <uni-col :span="24">
                <view class="demo-uni-col dark"
                  >结果：{{ item.cPARM01 ? item.cPARM01 : item.statusResult }}</view
                >
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="SaveTarget(item)"
                    :disabled="item.cPARM01 ? true : false"
                  >
                    保存
                  </button>
                </view>
              </uni-col>
            </uni-row>
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
import { GetTarget, TargetSave } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('设备点检')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
//数组
const TargetList = ref([])
//指标值
const TargetData = ref({})
const value = ref() //指标选中数据
const uid = ref()
const disInput = ref(false)
const tagetVal = ref()
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
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
  uid.value = option.uid
  GetDataTarget()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//获取数据
const GetDataTarget = () => {
  uni.showLoading({
    title: '加载中'
  })
  GetTarget({
    val: uid.value
  }).then((res) => {
    if (res.status == 200) {
      TargetList.value = res.data
      TargetList.value.forEach((item) => {
        item.DataInput = item.cActValueName
        item.rangeValue = item.itemsss.map((j) => {
          return {
            value: j.cScoreProgramName,
            text: j.cScoreProgramName
          }
        })
      })
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const Choose = ref()
const change = (e, i) => {
  i.SelectName = e
  i.statusResult = ''
  i.itemsss.forEach((j) => {
    if (j.cScoreProgramName == e) {
      Choose.value = j
    }
  })
  if (Choose.value.nWeightValue === i.cStandardValue) {
    i.statusResult = '正常'
  } else {
    i.statusResult = '不正常'
  }
}
const DataInput = ref()
//保存
const SaveTarget = (i) => {
  TargetSave({
    MID: i.MID,
    MIDs: i.MIDs,
    uid: i.UID,
    cActValue: i.DataInput ? +i.DataInput : '',
    cScoreProgramName: i.SelectName,
    cResult: i.statusResult
      ? i.statusResult
      : i.DataInput >= i.cMinValue && i.DataInput <= i.cMaxValue
        ? '正常'
        : '不正常'
  }).then((res) => {
    if (res.status == 200) {
      DataInput.value = ''
      uni.showToast({
        icon: 'none',
        title: res.msg
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '失败'
      })
    }
  })
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
    font-size: 16px;
    margin: 5px 10px;
    display: flex;
    justify-content: space-between;

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
