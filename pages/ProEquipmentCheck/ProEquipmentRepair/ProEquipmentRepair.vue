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
      <view class="demo-uni-col dark">设备报修</view>
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
              <view class="demo-uni-col dark">设备名称：{{ Devicename }}</view>
            </uni-col>
            <uni-col :span="18">
              <view class="demo-uni-col dark">项目名称：{{ programName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">设备位置：{{ Deviceaddress }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark"></view>
            </uni-col>
          </uni-row>
          <view style="font-size: 14px; margin: 10px">
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="TackPic"
            >
              拍照
            </button>
            <view
              v-if="PicArr.length"
              style="display: flex; justify-content: space-around"
            >
              <view
                style="margin: 10px"
                v-for="(i, index) in PicArr"
                :key="index"
                @click="preview(index)"
                >图片{{ index + 1 }}</view
              >
              <view>
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="DELPicList"
                >
                  删除
                </button>
              </view>
            </view>
          </view>
          <view
            class="ChangTarg"
            style="display: flex; align-items: center"
          >
            <view style="width: 15%; margin: 0 10px">故障名称:</view>
            <view style="width: 60%">
              <view>
                <uni-section type="line">
                  <uni-data-select
                    v-model="value"
                    :localdata="range"
                    @change="change"
                  ></uni-data-select>
                </uni-section>
              </view>
            </view>
          </view>
          <view
            class="ChangTarg"
            style="display: flex; align-items: center"
          >
            <view style="width: 8%; margin: 0 10px">描述:</view>
            <view style="width: 70%">
              <view>
                <uni-section
                  title="多行文本"
                  subTitle="指定属性 type=textarea 使用多行文本框"
                  type="line"
                  padding
                >
                  <uni-easyinput
                    type="textarea"
                    v-model="Textvalue"
                    placeholder="请输入内容"
                  ></uni-easyinput>
                </uni-section>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view style="display: flex">
      <button
        class="mini-btn"
        style="color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
        type="warn"
        size="mini"
        @click="Save"
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
import { GetFaultLists } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('设备点检')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const value = ref() //下拉故障
const range = ref([]) //下拉故障数组
const Textvalue = ref() //描述
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const PicArr = ref([])
//总页数
const pageTotal = ref(0)
const Devicename = ref('')
const Devicecode = ref('')
const Deviceaddress = ref('')
const programName = ref('')
const programCode = ref('')
const Parm01 = ref()
const Parm03 = ref()

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
  Devicename.value = option.name
  Devicecode.value = option.code
  Deviceaddress.value = option.addres
  programName.value = option.program
  programCode.value = option.progeamCode
  Parm01.value = option.cPar01
  Parm03.value = option.cParm03
  GetSelect()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
const FaultCode = ref('')
const change = (i) => {
  FaultCode.value = i
}
//获取下拉数据
const GetSelect = () => {
  GetFaultLists({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${Devicecode.value}`
  }).then((res) => {
    if (res.status == 200) {
      range.value = res.data.map((i) => {
        return {
          value: i.cFaultCode,
          text: i.cFaultName
        }
      })
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
    sourceType: ['camera'],
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
const preview = (index) => {
  uni.previewImage({
    current: index,
    urls: PicArr.value
  })
}
//删除照片
const DELPicList = (item, index) => {
  PicArr.value.splice(index, 1)
}
//保存
const Save = () => {
  if (!PicArr.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请拍照！',
      duration: 1000
    })
    return
  }
  PicArr.value.forEach((item) => {
    uni.uploadFile({
      url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/Add',
      filePath: item,
      name: 'list_file',
      formData: {
        cDeviceCode: Devicecode.value,
        cFaultCode: FaultCode.value,
        IsStop: true,
        cPARM01: Parm01.value,
        cPARM02: '2',
        cPARM03: Parm03.value,
        cMemo: Textvalue.value
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
