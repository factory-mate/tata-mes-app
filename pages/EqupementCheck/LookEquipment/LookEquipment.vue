<template>
  <!-- 已检点 --查看-->
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
      <view
        class="demo-uni-col dark"
        @click="previewMainImage"
      >
        图片：{{ imgInfo.name }}
      </view>
      <view class="demo-uni-col dark">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          @click="GoFile"
        >
          文档
        </button>
      </view>
    </view>
    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
      <view
        class="listMain"
        :style="'height:' + (h - 95) + 'px'"
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
              <view class="demo-uni-col dark">项目编码：{{ item.cProgramCode }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">点检时间：{{ item.dModifyTime }}</view>
            </uni-col>
          </uni-row>
          <view style="font-size: 14px; margin: 10px">
            <view
              style="font-size: 14px; margin: 10px"
              @click="preview(1, item.FileName1)"
              >{{ item.FileName1?.split('&')[0] }}</view
            >
            <view
              style="font-size: 14px; margin: 10px"
              @click="preview(2, item.FileName2)"
              >{{ item.FileName2?.split('&')[0] }}</view
            >
            <view
              style="font-size: 14px; margin: 10px"
              @click="preview(3, item.FileName3)"
              >{{ item.FileName3?.split('&')[0] }}</view
            >
          </view>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="ToGtagrt(item)"
                >
                  指标
                </button>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="GoFile(item)"
                >
                  文档
                </button>
              </view>
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
import { DeviceListInfoItem, DeviceTourvouchGetById } from '@/api/PDA.js'
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
const code = ref('')
const uid = ref()
const dataList = ref([])
const imgInfo = ref({})

onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  getList()
  if (uid.value) {
    getMainImage(uid.value)
  }
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
  uid.value = option.id
  code.value = option.code
  getList()
  getMainImage(option.id)
})
const getMainImage = (val) => {
  DeviceTourvouchGetById({ val }).then((res) => {
    if (res.status == 200) {
      const [name, url] = res.data.VouchFileName?.split('&') ?? []
      imgInfo.value = {
        name,
        url
      }
    }
  })
}
const previewMainImage = () => {
  uni.previewImage({
    current: 0,
    urls: [imgInfo.value.url]
  })
}

const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//指标
const ToGtagrt = (i) => {
  uni.navigateTo({
    url: `/pages/EqupementCheck/LookTarget/LookTarget?uid=${i.UID}`
  })
}
//文档
const GoFile = (i) => {
  console.log(i, '文档----')
  if (i.cProgramName) {
    uni.navigateTo({
      url: `/pages/EqupementCheck/EquipFile/EquipFile?code=${i.cProgramCode}`
    })
  } else {
    uni.navigateTo({
      url: `/pages/EqupementCheck/EquipFile/EquipFile?Devcode=${code.value}`
    })
  }
}
//获取数据
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  DeviceListInfoItem({
    val: uid.value
  }).then((res) => {
    if (res.status == 200) {
      dataList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
//图片预览
const preview = (index, i) => {
  let arr = []
  let url = i?.split('&')[1]
  arr.push(url)
  uni.previewImage({
    current: index,
    urls: arr
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
      height: 100%;
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
