<template>
  <!---备件-->
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
      <view class="demo-uni-col dark">更换备件</view>
    </view>
    <view class="ChangTarg">
      <view style="display: flex; align-items: center">
        <view style="width: 20%; margin: 0 10px">备件名称：</view>
        <view style="width: 60%">
          <uni-section type="line">
            <uni-data-select
              v-model="value"
              :localdata="range"
              @change="change"
            ></uni-data-select>
          </uni-section>
        </view>
      </view>
      <view style="display: flex; align-items: center">
        <view style="width: 20%; margin: 0 10px">备件数量：</view>
        <view>
          <input
            class="inputSty"
            v-model="num"
            placeholder="请输入"
            placeholder-style="font-size:12px"
          />
        </view>
        <vie>
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="AddList"
          >
            添加
          </button>
        </vie>
      </view>
    </view>
    <text style="color: red; margin: 5px 10px">警示：库存备件不足！</text>
    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
      <view
        class="listMain"
        :style="'height:' + (h - 260) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in dataList"
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
            <uni-col :span="12">
              <view class="demo-uni-col dark">备件编码：{{ item.cInvCode }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">备件名称：{{ item.cInvName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <view class="demo-uni-col dark">备件规格：{{ item.cStd }}</view>
            </uni-col>
            <uni-col :span="24">
              <view class="demo-uni-col dark">数量：{{ item.iActQuantity }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="24">
              <!-- <view class="demo-uni-col dark">图片：{{}}</view> -->
            </uni-col>
            <uni-col :span="24">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="DELPicList(item, index)"
              >
                删除
              </button>
            </uni-col>
          </uni-row>
        </view>
      </view>
      <view style="display: flex">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          @click="AllSave"
        >
          保存
        </button>
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
import { PDAPART } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('设备保养')
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
//下拉数据
const num = ref() //数量
const range = ref([])
const value = ref()
const SelectName = ref()
const uid = ref('')
const code = ref('')
const dataList = ref([])
const SelectArr = ref([])

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
  code.value = option.code
  getList()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
const Choose = ref()
//获取下拉数据
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  PDAPART({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${uid.value} && cProgramCode=${code.value}`
  }).then((res) => {
    if (res.status == 200) {
      SelectArr.value = res.data
      range.value = res.data.map((j) => {
        return {
          value: j.cInvCode,
          text: j.cInvName
        }
      })
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
//下拉选中
const sendItem = ref({})
const change = (i) => {
  SelectName.value = i
  SelectArr.value.forEach((item) => {
    if (item.cInvCode == i) {
      sendItem.value = item
    }
  })
}
//添加
const AddList = () => {
  let obj = {
    cInvCode: sendItem.value.cInvCode,
    cInvName: sendItem.value.cInvName,
    iActQuantity: num.value,
    cStd: sendItem.value.cStd
  }
  dataList.value.push(obj)
  obj = {}
  num.value = ''
  value.value = ''
}
//删除
const DELPicList = (item, index) => {
  dataList.value.splice(index, 1)
}
//保存
const AllSave = (i) => {
  if (!dataList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据！'
    })
    return
  }
  uni.navigateTo({
    url: '/pages/PDARepair/RepairPage/RepairPage?list=' + JSON.stringify(dataList.value)
  })
  // SavePart({
  // 	'list_data':dataList.value
  // }).then(res => {
  // 	if (res.status == 200) {
  // 		uni.showToast({
  // 			icon: "none",
  // 			title: res.msg
  // 		})
  // 		dataList.value=[]
  // 	} else {
  // 		uni.showToast({
  // 			icon: "none",
  // 			title: '失败'
  // 		})
  // 	}
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
