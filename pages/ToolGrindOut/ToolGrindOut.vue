<template>
  <!-- 刀具研磨出库页面 -->
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
      <view>
        <view class="searchMain">
          <view
            class="search-wl"
            style="display: flex; align-items: center"
          >
            <p
              class="searchTExt"
              style="width: 25%; margin-left: 10px"
            >
              研磨单：
            </p>
            <input
              class="inputSty"
              v-model="InfosearchValue"
              placeholder="请输入"
              placeholder-style="font-size:12px"
            />
            <button
              class="mini-btn"
              style="
                color: black;
                backgroundcolor: #e8e873;
                bordercolor: #e8e873;
                width: 25%;
                height: 30px;
              "
              type="warn"
              size="mini"
              @click="getSearch"
            >
              搜索
            </button>
          </view>
        </view>
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
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">研磨单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">供应商：{{ item.cVendorName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">制单时间：{{ item.dCreateTime }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">刀具编码：{{ item.cInvCode }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">刀具名称：{{ item.cInvName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">规格型号：{{ item.cInvStd }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">数量：{{ item.Rest_OutQuantity }}</view>
                  </uni-col>
                </uni-row>
                <view style="display: flex; justify-content: flex-end">
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="goInWare(item)"
                  >
                    出库
                  </button>
                </view>
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
import { GetToolList } from '@/api/PDA.js'
import { GetPDAInOrOutListData } from '@/api/yanmo.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const title = ref('研磨出库')
const InfosearchValue = ref('') //调拨单单输入框
//列表数据
const DevList = ref([])
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
  currentPage.value = 1
  total.value = 0
  DevList.value = []
  GetList()
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
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
  }
}
//获取列表数据
const GetList = async () => {
  uni.showLoading({
    title: '加载中'
  })
  const Conditions = ['Rest_OutQuantity > 0']
  if (InfosearchValue.value) {
    Conditions.push(`cCode like ${InfosearchValue.value}`)
  }
  const res = await GetPDAInOrOutListData({
    PageIndex: currentPage.value,
    pageSize: pageSize.value,
    OrderByFileds: '',
    Conditions: Conditions.join(' && ')
  })
  if (res.status == 200) {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    DevList.value = [...DevList.value, ...res.data.data]
    total.value = res.data.dataCount
    pageTotal.value = res.data.pageCount
    InfosearchValue.value = ''
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg[0].Value
    })
  }
}
//搜索
const getSearch = () => {
  currentPage.value = 1
  total.value = 0
  DevList.value = []
  GetList()
}
//出库
const goInWare = (i) => {
  uni.navigateTo({
    // url:'/pages/warehouseBills/wareCheckPage/wareCheckPage?infoItem='+JSON.stringify(item)
    url: '/pages/ToolGrindOut/GrindOpear/GrindOpear?ItemInfo=' + JSON.stringify(i)
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
  // console.log('上拉');
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
