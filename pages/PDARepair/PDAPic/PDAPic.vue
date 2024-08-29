<template>
  <!-- 已检点 --指标-->
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
    <!-- 		<view class="HeadTop">
			<view class="demo-uni-col dark">增加图片</view>
		</view> -->
    <!-- 		<view style="width: 100px;height: 100px; background-color: azure;">
			<view style="text-align: center;">
				+
			</view>
		</view> -->
    <view style="margin: 0 10%">
      <button
        class="mini-btn"
        type="warn"
        size="mini"
        @click="TackPic"
      >
        拍照
      </button>

      <!-- <uni-section title="只选择图片" type="line">
				<view class="example-body">
					<uni-file-picker limit="3" title="最多选择3张图片"  @click="TackPic"></uni-file-picker>
				</view>
			</uni-section> -->
    </view>

    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
      <view
        class="listMain"
        :style="'height:' + (h - 240) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in PicArrList"
          :key="index"
        >
          <view @click="preview(index)">
            <!-- 图片{{index+1}} -->
            {{ item.name }}
          </view>
          <view>
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="DELPicList(index)"
            >
              删除
            </button>
          </view>
        </view>
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
import { PostPic } from '@/api/PDA.js'
import URLIP from '@/utils/serviceIP.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('图片拍照')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const PicArr = ref([]) //照片数组
const PicArrList = ref([]) //照片数组
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const uid = ref()
const Devuid = ref()
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
  if (option.uid) {
    uid.value = option.uid
  }
  if (option.Devuid) {
    Devuid.value = option.Devuid
  }
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
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
        PicArrList.value = [...PicArrList.value, ...res.tempFiles]
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
const preview = (index) => {
  uni.previewImage({
    current: index,
    urls: PicArr.value
  })
}
//删除照片
const DELPicList = (index) => {
  PicArr.value.splice(index, 1)
  PicArrList.value.splice(index, 1)
}
const msg = ref({})
let arr = ref([])
//保存
const AllSave = () => {
  if (Devuid.value) {
    //设备图片
    PicArr.value.forEach((item) => {
      uni.uploadFile({
        url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/Vouch_FileAdd',
        filePath: item,
        name: 'file',
        formData: {
          uid: Devuid.value
        },
        header: {
          //请求头配置
          Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
        },
        success: (uploadFileRes) => {
          uni.showToast({
            icon: 'none',
            title: '保存成功'
          })
          PicArr.value = []
        }
      })
    })
  } else {
    //单据图片
    PicArr.value.forEach((item) => {
      uni.uploadFile({
        url: URLIP.BASE_URL_PDEVICE + '/api/device_vouch_file/Add',
        filePath: item,
        name: 'file',
        formData: {
          // 'uid': uid.value,
        },
        header: {
          //请求头配置
          Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
        },
        success: (uploadFileRes) => {
          uni.showToast({
            icon: 'none',
            title: '保存成功'
          })
          msg.value = JSON.parse(uploadFileRes.data)
          console.log(msg.value.data.UID, 'uploadFileRes----------')
          PicArr.value = []
          arr.value.unshift(msg.value.data.UID)
          // if (arr.length) {
          // 	arr.some((item) => item == msg.value.data.UID) ?
          // 		uni.showToast({
          // 			icon: "none",
          // 			title: "重复图片",
          // 		}) :
          // 		arr.unshift(msg.value.data.UID);
          // } else {
          // 	arr.unshift(msg.value.data.UID);
          // }
          uni.navigateTo({
            url: '/pages/PDARepair/RepairPage/RepairPage?picArr=' + arr.value
          })
        }
      })
    })
  }
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
        font-size: 14px;
        margin: 20rpx 10rpx;
        padding: 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;

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
