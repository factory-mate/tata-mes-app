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
      <!-- <view style="display: flex; align-items: center; justify-content: flex-start">
        <view style="width: 60px">工位:</view>
        <view>
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
      </view> -->
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

      <view style="display: flex; align-items: center; justify-content: flex-start">
        产线工序：
        <uni-data-select
          v-model="selectedId"
          :localdata="ProductInfoList"
          @change="handleSelect"
          :clear="false"
        ></uni-data-select>
      </view>
      <view class="info">
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark"
              >产品名称：{{ ProductInfo.PRODUCT_VOUCH_S_S_S_cInvName }}</view
            >
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="16">
            <view class="demo-uni-col dark">单号：{{ ProductInfo.cCode }}</view>
          </uni-col>
          <uni-col :span="8">
            <view class="demo-uni-col dark">单序号：{{ ProductInfo.iOrderIndex }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark">
              尺寸：{{ ProductInfo.PRODUCT_VOUCH_S_S_S_X }}*{{
                ProductInfo.PRODUCT_VOUCH_S_S_S_Y
              }}*{{ ProductInfo.PRODUCT_VOUCH_S_S_S_Z }}
            </view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark">材质：{{ ProductInfo.cDynamicsParm06 }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="12">
            <view class="demo-uni-col dark">产线：{{ ProductInfo.cFactoryUnitName }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">产线序号：{{ ProductInfo.S_S_S_iIndex }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark">来源产线：{{ ProductInfo.SourceUnitName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark">来源产线序号：{{ ProductInfo.SourceIndex }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark">物料名称：{{ ProductInfo.cInvName }}</view>
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark"
              >物料尺寸：{{ ProductInfo.X }}*{{ ProductInfo.Y }}*{{ ProductInfo.Z }}</view
            >
          </uni-col>
        </uni-row>
        <uni-row class="demo-uni-row">
          <uni-col :span="24">
            <view class="demo-uni-col dark">加工码：{{ ProductInfo.cBarCode }}</view>
          </uni-col>
        </uni-row>
      </view>
      <view class="picBtn">
        <text style="margin-right: 20px">照片列表</text>
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
import { SaveReportError, GetTaskList } from '@/api/PDA.js'
import { GetGropList } from '@/api/Quanilty.js'
import loginVue from '../login/login.vue'
let branch = ref()
const h = ref('100') //页面高度
const title = ref('发起异常')
//产品信息
const ProductInfo = ref({})
const ProductInfoList = ref([])
//工位
const focusType = ref(true)
const disabled = ref(false)
const Station = ref('')
//加工码
const workfocusType = ref(false)
const workdisabled = ref(true)
const WorkCode = ref('') //加工码
const PicArr = ref([]) //照片数组
const cNodeResourceCode = ref('')
const gwData = ref({})
const selectedId = ref('')
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
const getStation = (e) => {
  GetGropList({
    Conditions: `cNodeResourceCode=${e.value}`
  }).then((res) => {
    if (res.success && res.data.length > 0) {
      cNodeResourceCode.value = res.data[0].cParentCode
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
  GetTaskLists()
}

const handleSelect = (v) => {
  selectedId.value = v
  ProductInfo.value = ProductInfoList.value.find((i) => i.UID === v) ?? {}
}
//获取信息
const GetTaskLists = async () => {
  // if (!cNodeResourceCode.value) {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '请先扫描工位'
  //   })
  //   return
  // }
  const res = await GetTaskList({
    OrderByFileds: '',
    Conditions: `cBarCode = ${WorkCode.value}`
  })
  if (res.success && res.data.length > 0) {
    ProductInfoList.value =
      res.data.map((i) => ({
        ...i,
        text: `${i.cFactoryUnitName} ${i.cProcessName}`,
        value: i.UID
      })) ?? []
  } else {
    uni.showToast({
      icon: 'none',
      title: '加工码不存在'
    })
    ProductInfoList.value = []
  }
  ProductInfo.value = {}
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
  // if (!Station.value) {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '请扫描工位'
  //   })
  //   return
  // }
  if (!WorkCode.value) {
    uni.showToast({
      icon: 'none',
      title: '请扫描加工码'
    })
    return
  }
  if (!ProductInfo.value.cFactoryUnitCode || !ProductInfo.value.cProcessCode) {
    uni.showToast({
      icon: 'none',
      title: '请选择产线、工序'
    })
    return
  }
  ;(PicArr.value.length > 0 ? PicArr.value : [{}]).forEach((item) => {
    uni.uploadFile({
      url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/ReportError',
      filePath: item.path,
      name: 'list_file',
      formData: {
        cBarCode: WorkCode.value,
        // cStationCode: Station.value,
        cFactoryUnitCode: ProductInfo.value.cFactoryUnitCode,
        cProcessCode: ProductInfo.value.cProcessCode
      },
      header: {
        //请求头配置
        Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)
        const jsonRes = JSON.parse(res.data)
        if (jsonRes.success) {
          uni.showToast({
            icon: 'none',
            title: '保存成功'
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: jsonRes.errmsg[0].Value || jsonRes.msg || '保存失败'
          })
        }

        PicArr.value = []
        ProductInfo.value = {}
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
