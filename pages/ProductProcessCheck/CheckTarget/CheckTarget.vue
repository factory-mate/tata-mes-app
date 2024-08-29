<template>
  <!-- 指标-->
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
      right-icon="home"
      @clickRight="clickRight"
    />
    <view class="content">
      <!-- <text v-if="!FileDataList.length" style="font-size: 16px;margin: 20px 30%;">暂无数据</text> -->
      <view
        class="listMain"
        :style="'height:' + (h - 240) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in DataList"
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
              <view class="demo-uni-col dark">检验指标：{{ item.cStandardName }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">分析方法：{{ item.cAnalysisTypeName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">检验标准：{{ item.cGuideMemo }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">结果：{{ item.IsOkName }}</view>
            </uni-col>
          </uni-row>
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
import { getTarget } from '@/api/Quanilty.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('生产过程-检验指标')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const uid = ref('')
const code = ref('')
const Devcode = ref()
const DataList = ref([])
//总页数
const pageTotal = ref(0)
const fileUrl = ref('')
const fileType = ref('')
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
const ItemInfo = ref({})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  ItemInfo.value = JSON.parse(option.Info)
  GetList()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}

const GetList = () => {
  getTarget({
    val: ItemInfo.value.UID
  }).then((res) => {
    if (res.status == 200) {
      DataList.value = res.data
    } else {
    }
  })
}
//设备文档
const GetDevFileData = () => {
  // uni.showLoading({
  // 	title: '加载中'
  // });
  // PDAPART({
  // 	"OrderByFileds": '',
  // 	"Conditions": `cDeviceCode=${uid.value} && cProgramCode=${code.value}`
  // }).then(res => {
  // 	if (res.status == 200) {
  // 		uni.hideLoading()
  // 		uni.stopPullDownRefresh()
  // 		FileDataList.value = res.data
  // 	} else {
  // 		uni.hideLoading()
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
const clickRight = () =>
  uni.switchTab({
    url: '/pages/tabbar/workHome/index'
  })
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .HeadTop {
    font-size: 14px;
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
