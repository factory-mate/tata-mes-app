<template>
  <!-- 定期抽检-->
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
      <view style="margin: 0 10rpx; padding: 10px">
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">检验单号：{{ Info?.cCode }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">产品名称：{{ Info?.cInvName }}</view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">指标编码：{{ Info?.cStandardCode }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">指标名称：{{ Info?.cStandardName }}</view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">检验数量：{{ Info?.nCheckQuantity }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">附件： </view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">分析方法：{{ Info?.cAnalysisTypeName }}</view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">检验标准：{{ Info?.cGuideMemo }} </view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">上限值：{{ Info?.nMaxValue }}</view>
          </uni-col>
          <uni-col :span="12">
            <view
              class="demo-uni-col dark"
              @click="preview(1, PicArr[0])"
              >图片1：{{ PicArr[0] }}
            </view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">下限值：{{ Info?.nMinValue }}</view>
          </uni-col>
          <uni-col :span="12">
            <view
              class="demo-uni-col dark"
              @click="preview(2, PicArr[1])"
              >图片2：{{ PicArr[1] }}
            </view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">单位：{{}}</view>
          </uni-col>
          <uni-col :span="12">
            <view
              class="demo-uni-col dark"
              @click="preview(3, PicArr[2])"
              >图片3：{{ PicArr[2] }}
            </view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view style="display: flex; align-items: center; margin: -10px 0">
              <view style="width: 60px">不良数量:</view>
              <input
                class="inputSty"
                v-model="Badnum"
                placeholder="请输入数量"
                placeholder-style="font-size:12px"
                style="line-height: 30px; height: 30px; width: 120px"
              />
            </view>
          </uni-col>
          <uni-col :span="12">
            <view style="display: flex; align-items: center; margin: -10px 0">
              <view style="width: 60px">检测值:</view>
              <input
                class="inputSty"
                v-model="Checknum"
                placeholder="请输入"
                placeholder-style="font-size:12px"
                style="line-height: 30px; height: 30px; width: 130px"
              />
            </view>
          </uni-col>
        </uni-row>
        <uni-row
          class="demo-uni-row"
          style="padding: 10rpx"
        >
          <uni-col :span="12">
            <view class="demo-uni-col dark">
              <button
                class="mini-btn"
                style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                type="warn"
                size="mini"
                @click="TackPic"
              >
                拍照
              </button>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="demo-uni-col dark">
              <button
                class="mini-btn"
                style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                type="warn"
                size="mini"
                @click="AddList"
              >
                添加
              </button>
            </view>
          </uni-col>
        </uni-row>
      </view>
      <view class="listMain">
        <scroll-view
          :style="'height:' + (h - 430) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view
            class="project"
            v-for="(item, index) in ListArr"
            :key="index"
          >
            <view>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">长度：{{ item.nCheckValue }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">
                    <button
                      class="mini-btn"
                      style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                      type="warn"
                      size="mini"
                      @click="DELITEM(item, index)"
                    >
                      删除
                    </button>
                  </view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <uni-load-more :status="more"></uni-load-more>
        </scroll-view>
      </view>
      <view style="display: flex; margin-bottom: 10px">
        <button
          class="mini-btn"
          style="color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
          type="warn"
          size="mini"
          @click="PUTARR"
        >
          提交
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
import { Commit } from '@/api/Quanilty.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../../api/login'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('定期检验-定量指标')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const disabled = ref(true)
const searchValue = ref()
const code = ref()
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const PageList = ref([])
//总页数
const pageTotal = ref(0)
const single = ref()
//抽检类型
const checkClassify = ref()
const CheckfocusType = ref(false)
const Checkorange = ref([])
//产品类型
const Product = ref()
const Productrange = ref([])
const PeofocusType = ref(false)
const Checknum = ref()
const Badnum = ref()
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
const Info = ref({})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  console.log(JSON.parse(option.ItemInfo))
  Info.value = JSON.parse(option.ItemInfo)
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
const inputChange = () => {}
const ProductinputChange = () => {}
const CheckFoucs = () => {}
//抽检类型下拉变化
const Checkchange = () => {}
const Time = () => {}
//产品类型变化
const PROchange = () => {}
const PeoFoucs = () => {}
//检验
const Check = () => {
  uni.navigateTo({
    url: '/pages/PeriodicSampling/CheckPage/CheckPage'
  })
}
//拍照
const TackPic = () => {
  openSelectImage()
}
const PicArr = ref([])
//调取拍照
const openSelectImage = () => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      if (res.tempFilePaths?.length > 0) {
        PicArr.value = [...PicArr.value, ...res.tempFilePaths]
        PicSave()
        console.log(PicArr.value, 'PicArr.value===========')
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
  console.log(PicArr.value, 'PicArr.value======')
  uni.previewImage({
    current: index,
    urls: PicArr.value
  })
}
//图片保存
const PicSave = () => {
  if (!PicArr.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请拍照！'
    })
    return
  }
  PicArr.value.forEach((item) => {
    uni.uploadFile({
      url: URLIP.BASE_URL_Quantity + '/api/Vouch_File/Add',
      filePath: item,
      name: 'file',
      formData: {
        MID: Info.value.UID,
        cModeCode: 'QC.CheckVouch.R'
      },
      header: {
        //请求头配置
        Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
      },
      success: (uploadFileRes) => {
        uni.showToast({
          icon: 'none',
          title: '图片保存成功'
        })
        // PicArr.value = []
      }
    })
  })
}
const ListArr = ref([])
//添加
const AddList = () => {
  if (!Checknum.value) {
    uni.showToast({
      icon: 'none',
      title: '请添加检测值！'
    })
    return
  }
  let obj = {
    nCheckValue: +Checknum.value,
    cParmValueCode: '',
    cParmValueName: ''
  }
  ListArr.value.push(obj)
}
//Commit
//提交
const PUTARR = () => {
  // #2406 无需列表数据
  // if (ListArr.value.length == 0) {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '请添加数据！'
  //   })
  //   return
  // }
  if (!Badnum.value?.toString()) {
    uni.showToast({
      icon: 'none',
      title: '请填写不良数量！'
    })
    return
  }
  Commit({
    MID: Info.value.UID,
    list_m: ListArr.value,
    nQuantity: Badnum.value
  }).then((res) => {
    if (res.status == 200) {
      ListArr.value = []
      uni.showToast({
        icon: 'none',
        title: '提交成功！'
      })
    } else {
    }
  })
}
//删除
const DELITEM = (i, index) => {
  ListArr.value.splice(index, 1)
}

//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  // currentPage.value = 1
  // total.value = 0
  // ForList.value = []
  // GetSearch()
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (currentPage.value > pageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	GetSearch()
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
        margin: 10rpx 10rpx;
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
