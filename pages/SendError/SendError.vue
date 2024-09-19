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
    <view style="padding: 5px 20px">
      <view style="display: flex; align-items: center; justify-content: flex-start">
        <view style="width: 60px">工位:</view>
        <view>
          <!-- 搜索框 -->
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
              @confirm="getStation"
              v-model="Station"
              placeholder="请输入工位"
            >
            </uni-search-bar>
          </uni-section>
          <input
            v-else
            class="inputSty"
            :disabled="disabled"
            v-model="Station"
            @input="getStation"
            :focus="focusType"
            @blur="setfocus"
            placeholder="请扫描工位"
            placeholder-style="font-size:12px"
          />
        </view>
      </view>
      <view style="display: flex; align-items: center; justify-content: flex-start">
        <view style="width: 60px">加工码:</view>
        <view>
          <!-- 搜索框 -->
          <uni-section
            v-if="branch != 'alps'"
            title=""
            type="line"
          >
            <uni-search-bar
              radius="100"
              cancelButton="none"
              :focus="workfocusType"
              @blur="worksetfocus"
              @confirm="getWorkCode"
              v-model="WorkCode"
              placeholder="请输入加工码"
            >
            </uni-search-bar>
          </uni-section>
          <input
            v-else
            class="inputSty"
            :disabled="workdisabled"
            v-model="WorkCode"
            @input="getWorkCode"
            :focus="workfocusType"
            @blur="worksetfocus"
            placeholder="请扫描加工码"
            placeholder-style="font-size:12px"
          />
        </view>
      </view>
      <view class="info">
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">工位名称：{{ gwData.cFactoryUnitName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">产品名称：{{ ProductInfo.cInvName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="14">
            <view class="demo-uni-col dark">生产编号：{{ ProductInfo.cCode }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">生产日期：{{ ProductInfo.dProductDate }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark"
              >产品类型：{{ ProductInfo.PACKAGEVOUCH_S_cDefindParm01 }}</view
            >
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="10">
            <view class="demo-uni-col dark">线内序号：{{ ProductInfo.iIndxs }}</view>
          </uni-col>
          <uni-col :span="10">
            <view class="demo-uni-col dark">序号：{{ ProductInfo.iOrderIndex }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="10">
            <view class="demo-uni-col dark">材质：{{ ProductInfo.cDefindParm01 }}</view>
          </uni-col>
          <uni-col :span="10">
            <view class="demo-uni-col dark">AB面：{{ ProductInfo.cDefindParm05 }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark"
              >尺寸：{{ ProductInfo.X }} *{{ ProductInfo.Y }}*{{ ProductInfo.Z }}</view
            >
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="8">
            <view class="demo-uni-col dark">描述：{{ ProductInfo.cMemo }}</view>
          </uni-col>
        </uni-row>
      </view>
      <view class="picBtn">
        <text style="margin-right: -s20px">照片列表</text>
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          @click="TackPic"
        >
          拍照
        </button>
      </view>
      <view class="pictureList">
        <view class="line"></view>
        <view
          v-for="(item, index) in PicArr"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="6">
              <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
            </uni-col>
            <uni-col :span="12">
              <view
                class="demo-uni-col dark"
                @click="preview(index)"
                >照片：{{ item.name }}</view
              >
            </uni-col>
            <uni-col :span="6">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="DELPicList(item, index)"
                >
                  删除
                </button>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
      <view class="saveBtn">
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
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { GetTaskList, SaveReportError } from '@/api/PDA.js'
import loginVue from '../login/login.vue'
let branch = ref()
const h = ref('100') //页面高度
const title = ref('发起异常')
//产品信息
const ProductInfo = ref({})
//工位
const focusType = ref(true)
const disabled = ref(false)
const Station = ref('')
//加工码
const workfocusType = ref(false)
const workdisabled = ref(true)
const WorkCode = ref('') //加工码
const PicArr = ref([]) //照片数组
const gwData = ref({})
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  // PicArr.value=[]
  setfocus()
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
//工位输入框聚焦
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
//加工码输入框聚焦
const worksetfocus = () => {
  workfocusType.value = false
  setTimeout(() => {
    workfocusType.value = true
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
  // }
}
//扫描工位
const getStation = () => {
  if (!Station.value) {
    uni.showToast({
      icon: 'none',
      title: '请扫描工位'
    })
    return
  }
  GetTaskList({
    OrderByFileds: '',
    Conditions: `cFactoryUnitCode = ${Station.value}`
  }).then((res) => {
    if (res.success) {
      gwData.value = res.data[0]
      disabled.value = true
      //解开加工码
      workdisabled.value = false
      worksetfocus()
    }
  })
}
//扫描加工码
const getWorkCode = async () => {
  if (!WorkCode.value) {
    uni.showToast({
      icon: 'none',
      title: '请扫描加工码'
    })
    return
  }
  const res = await GetTaskList({
    OrderByFileds: '',
    Conditions: `cFactoryUnitCode = ${Station.value} && cBarCode = ${WorkCode.value}`
  })
  if (res.status == 200) {
    ProductInfo.value = res.data[0]
  }
}

//调取拍照
const openSelectImage = () => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log(res)
      if (res.tempFilePaths?.length > 0) {
        PicArr.value = [...PicArr.value, ...res.tempFiles]
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
//拍照
const TackPic = () => {
  openSelectImage()
}
//图片预览
const preview = (index) => {
  uni.previewImage({
    current: index,
    urls: PicArr.value.map((item) => item.path)
  })
}
//删除照片
const DELPicList = (item, index) => {
  PicArr.value.splice(index, 1)
}
//保存
const AllSave = () => {
  PicArr.value.forEach((item) => {
    uni.uploadFile({
      url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/ReportError',
      filePath: item.path,
      name: 'list_file',
      formData: {
        cBarCode: WorkCode.value,
        cStationCode: Station.value
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
        ProductInfo.value = []
        WorkCode.value = ''
        Station.value = ''
        setfocus()
        disabled.value = false
        workdisabled.value = true
      }
    })
  })
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
  font-size: 14px;

  .info {
    font-size: 14px;
  }

  .picBtn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
  }

  .pictureList {
    width: 100%;
    margin: 10px 0;

    .line {
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background: gainsboro;
      margin-bottom: 10px;
    }
  }

  .saveBtn {
    position: fixed;
    left: 40%;
    bottom: 40px;
  }
}

// .search-wl {
// 	.uni-section {
// 		background-color: none;
// 		margin-top: 0;
// 		.uni-searchbar {
// 			padding: 0;
// 			::v-deep .uni-searchbar__box {
// 				height: 30px !important;
// 			}
// 		}
// 	}
// }
</style>
