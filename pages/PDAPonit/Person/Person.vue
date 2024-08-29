<template>
  <!-- 设备保养主页面 -->
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
    <view
      class="search-wl"
      style="display: flex; align-items: center"
    >
      <!-- 搜索框 -->
      <input
        class="inputSty"
        v-model="searchValue"
        placeholder="请输入人员"
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
        @click="getSearch"
      >
        搜索
      </button>
    </view>
    <view class="content">
      <view class="listMain">
        <scroll-view
          :style="'height:' + (h - 200) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view
            class="project"
            v-for="(item, index) in DevList"
            :key="index"
          >
            <view class="wLIst">
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">工号：{{ item.cEmployeeCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">姓名：{{ item.cEmployeeName }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">
                    <button
                      style="margin: 10px 5px"
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="goCheck(item)"
                    >
                      选择
                    </button>
                  </view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <uni-load-more
            :status="more"
            v-if="DevList.length"
          ></uni-load-more>
        </scroll-view>
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
import { GetEmployee, Assign } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(true)
const XMfocusType = ref(false)
const title = ref('设备维修')
//输入框值
const xmdis = ref(true)
const disabled = ref(false)
const searchValue = ref() //待点检输入框
const HWsearchValue = ref('') //货位输入框
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['报修单', '已指派'])
//日期范围
const Timerange = ref()
//人员列表数据
const DevList = ref([])
const ReadDevList = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const ID = ref('')
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
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
  GetList()
  h.value = uni.getSystemInfoSync().windowHeight
  ID.value = option.uid
})

const keypress = (e) => {
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
  }
}

//获取列表数据
const GetList = () => {
  uni.showLoading({
    title: '加载中'
  })

  GetEmployee({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: searchValue.value ? `cEmployeeName like ${searchValue.value}` : ''
  }).then((res) => {
    if (res.status == 200) {
      DevList.value = [...DevList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
//搜索
const getSearch = () => {
  currentPage.value = 1
  total.value = 0
  DevList.value = []
  GetList()
}
//选折
const goCheck = (i) => {
  Assign({
    UID: ID.value,
    cPersonCode: i.cEmployeeCode,
    cPersonName: i.cEmployeeName
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '指派成功',
        duration: 2000
      })
      uni.navigateTo({
        url: `/pages/PDAPonit/PDAPonit`
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '指派失败'
      })
    }
  })
}
//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  currentPage.value = 1
  total.value = 0
  DevList.value = []
  GetList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    GetList()
  }
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
</style>
