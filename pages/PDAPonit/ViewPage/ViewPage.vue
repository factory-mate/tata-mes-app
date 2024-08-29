<template>
  <!-- 未检点 --报修-->
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
      <view class="demo-uni-col dark">报修详情</view>
    </view>
    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
      <view
        class="listMain"
        :style="'height:' + (h - 240) + 'px'"
      >
        <view class="project">
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">设备名称：{{ ItemData.cDeviceName }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">项目名称：{{ ItemData.cProgramName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view
                class="demo-uni-col dark"
                @click="preview(1, ItemData.FileName1)"
                >图片1：{{ ItemData.FileName1?.split('&')[0] }}</view
              >
            </uni-col>
            <uni-col :span="8">
              <!-- <view class="demo-uni-col dark">图片2：{{ItemData?.FileName1}}</view> -->
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view
                class="demo-uni-col dark"
                @click="preview(2, ItemData.FileName2)"
                >图片2：{{ ItemData.FileName2?.split('&')[0] }}</view
              >
            </uni-col>
            <uni-col :span="8">
              <!-- <view class="demo-uni-col dark">图片2：{{ItemData?.FileName1}}</view> -->
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view
                class="demo-uni-col dark"
                @click="preview(3, ItemData.FileName3)"
                >图片3：{{ ItemData.FileName3?.split('&')[0] }}</view
              >
            </uni-col>
            <uni-col :span="8">
              <!-- <view class="demo-uni-col dark">图片2：{{ItemData?.FileName1}}</view> -->
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">设备位置：{{ ItemData.cUsedAddress }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">是否停机：{{ ItemData.IsStop ? '是' : '否' }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">故障名称：{{ ItemData.cFaultName }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark"></view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">报修描述：{{ ItemData.cMemo }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark"></view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">报修人：{{ ItemData.cCreateUserName }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">报修时间：{{ ItemData.cReportDate }}</view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
    <!-- 		<view style="display: flex;">
			<button class="mini-btn" style="color:black;backgroundColor:#ffff7f;borderColor:#ffff7f" type="warn"
				size="mini" @click="Save">保存</button>
		</view> -->
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
import { GetById } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('维修指派')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const PicArr = ref([])
//总页数
const pageTotal = ref(0)
const uid = ref()
const ItemData = ref({})
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
  uid.value = option.id
  GetData()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
const GetData = () => {
  GetById({ val: uid.value }).then((res) => {
    if (res.status == 200) {
      ItemData.value = res.data
      console.log(res.data, '------------9999')
    } else {
    }
  })
}
//拍照
const TackPic = () => {
  openSelectImage()
}
//调取拍照
const openSelectImage = () => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      if (res.tempFilePaths?.length > 0) {
        PicArr.value = [...PicArr.value, ...res.tempFilePaths]
        // #ifdef MP
        this.recursionCompressMP(tempList, (e) => {
          console.log('压缩后结果-----', e)
        })
        // #endif
        // #ifdef H5
        this.recursionCompressH5(tempList, (e) => {
          console.log('压缩后结果-----', e)
        })
        // #endif
      }
    },
    fail: (err) => {
      console.log('err: ------', err)
    }
  })
}

//图片预览
const preview = (index, i) => {
  console.log(i, '图片----')
  let arr = []
  let url = i.split('&')[1]
  arr.push(url)
  uni.previewImage({
    current: index,
    urls: arr
  })
}
//删除照片
const DELPicList = (item, index) => {
  PicArr.value.splice(index, 1)
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
        // box-shadow: 0 0 10px #b5b5b5;
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
