<template>
  <!-- 日常抽检-->
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
      <view style="margin-top: 10px">
        <view style="display: flex; align-items: center; padding: 0 10px">
          <view>生产日期：</view>
          <view style="width: 180px">
            <uni-datetime-picker
              v-model="single"
              type="day"
              @change="Time"
            />
          </view>
        </view>
        <view style="display: flex; align-items: center; padding: 0 10px">
          <view style="width: 70px">必选单：</view>
          <view style="width: 160px">
            <input
              class="inputSty"
              v-model="Ccode"
              placeholder="请输入必选单"
              placeholder-style="font-size:12px"
            />
          </view>
          <view style="width: 120px">
            <button
              class="mini-btn"
              style="color: black; backgroundcolor: #98b7ff; bordercolor: #98b7ff; margin-top: 10px"
              type="warn"
              size="mini"
              @click="GetAiCheckDAN"
            >
              自动选单
            </button>
          </view>
        </view>
        <view style="display: flex; justify-content: space-between">
          <view
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 10px;
              margin-top: -10px;
            "
          >
            <view style="width: 70px">产品类型：</view>
            <view style="width: 160px">
              <uni-section
                title="可搜索"
                type="line"
              >
                <view
                  class="uni-px-5 uni-pb-5"
                  style="width: 160px"
                >
                  <zxz-uni-data-select
                    v-model="checkPeo"
                    filterable
                    :localdata="Prorange"
                    @inputChange="inputChange"
                    @change="Fauchange"
                    :focus="PeofocusType"
                    @input="PeoFoucs"
                    placeholder="请选择产品类型"
                  ></zxz-uni-data-select>
                </view>
              </uni-section>
            </view>
            <view style="width: 120px; margin-left: 10rpx">
              <button
                class="mini-btn"
                style="
                  color: black;
                  backgroundcolor: #98b7ff;
                  bordercolor: #98b7ff;
                  margin-top: 10px;
                "
                type="warn"
                size="mini"
                @click="PeoCheck"
              >
                人工添加
              </button>
            </view>
          </view>
        </view>
        <!-- <view style="display: flex; align-items: center; padding: 0 10px">
          <view style="width: 50px">货位号：</view>
          <view style="width: 80px">
            <input
              style="width: 170px"
              class="inputSty"
              v-model="Warecode"
              placeholder="请输入货位号"
              placeholder-style="font-size:12px"
            />
          </view>
        </view> -->
        <view style="width: 100%; height: 5rpx; background: gainsboro"></view>
        <view style="margin-top: 5rpx; margin-left: 10rpx">
          <view style="display: flex; align-items: center; padding: 0 10px">
            <view style="width: 50px">订单号：</view>
            <view style="width: 80px">
              <input
                style="width: 170px"
                class="inputSty"
                v-model="SCcode"
                placeholder="请输入订单号"
                placeholder-style="font-size:12px"
              />
            </view>
          </view>

          <view style="display: flex; align-items: center; padding: 0 10px; margin-top: -10px">
            <view style="width: 70px">产品类型：</view>
            <view style="width: 150px">
              <uni-section
                title="可搜索"
                type="line"
              >
                <view class="uni-px-5 uni-pb-5">
                  <zxz-uni-data-select
                    v-model="RcheckPeo"
                    filterable
                    :localdata="RProrange"
                    @inputChange="RinputChange"
                    @change="RFauchange"
                    :focus="RPeofocusType"
                    @input="RPeoFoucs"
                    placeholder="请选择产品类型"
                  ></zxz-uni-data-select>
                </view>
              </uni-section>
            </view>
            <view style="margin-left: 5%; width: 120px">
              <button
                class="mini-btn"
                style="
                  color: black;
                  backgroundcolor: #98b7ff;
                  bordercolor: #98b7ff;
                  margin-top: 10px;
                "
                type="warn"
                size="mini"
                @click="GetSearch"
              >
                搜索
              </button>
            </view>
          </view>
          <view style="margin: 10px">
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">单数：{{ ToalInfo?.VouchQty }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">包数：{{ ToalInfo?.PackageQty }}</view>
              </uni-col>
            </uni-row>
          </view>
        </view>
      </view>
      <view style="width: 100%; height: 5rpx; background: gainsboro"></view>

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
            v-for="(item, index) in ForList"
            :key="index"
          >
            <view>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark"
                    >包号：{{ item.Pbarcode || item.cPackageCode }}</view
                  >
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">订单号：{{ item.cCode }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">物流商：{{ item.cLogisticsName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">订单类型：{{ item.cVouchTypeCode }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">库区：{{}}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">库位：{{ item.cPosCode }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">
                    <button
                      class="mini-btn"
                      style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                      type="warn"
                      size="mini"
                      @click="Del(item)"
                    >
                      删除
                    </button>
                  </view>
                </uni-col>
              </uni-row>
              <view style="width: 100%; height: 5rpx; background: gainsboro"></view>
            </view>
          </view>
          <uni-load-more
            :status="more"
            v-if="ForList.length"
          ></uni-load-more>
        </scroll-view>
      </view>
      <view style="display: flex">
        <button
          class="mini-btn"
          style="color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
          type="warn"
          size="mini"
          @click="Save"
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
import {
  GetAICheckID,
  GetProudctClassify,
  DelDan,
  GetToal,
  GetSeachPage,
  CommitPost
} from '@/api/Quanilty.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../api/login'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('日常抽检')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const checkPeo = ref() //质检人员
const Prorange = ref([]) //下拉质检人员数组
const RcheckPeo = ref() //质检人员
const RProrange = ref([]) //下拉质检人员数组
const Grop = ref()
const Groprange = ref([]) //组别
const PerCode = ref() //故障编码
const focusType = ref(false)
const TextfocusType = ref(false)
const PeofocusType = ref(false)
const RPerCode = ref() //故障编码
const RfocusType = ref(false)
const RTextfocusType = ref(false)
const RPeofocusType = ref(false)
const disabled = ref(true)
const searchValue = ref()
const Station = ref()
const single = ref('') //生产日期
const singles = ref('') //生产日期
const Ccode = ref('')
const HouseCode = ref('')
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const PageList = ref([])
//总页数
const pageTotal = ref(0)
const ForList = ref([])
const SCcode = ref()
const UserCode = ref()
const Warecode = ref()
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
  GetSelect()
  UserCode.value = uni.getStorageSync('User').token_user.UserCode
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
const PeoFoucs = () => {}
const RinputChange = () => {}
const RPeoFoucs = () => {}
// 产品类型
const Fauchange = (i) => {
  PerCode.value = i
}
const SearType = ref()
const RFauchange = (i) => {
  SearType.value = i
}
//获取产品类型下拉数据
const GetSelect = () => {
  GetProudctClassify({
    cTableCode: 'FM_QC_PRE_CHECKVOUCH',
    cAttributeCode: 'cPARM01'
  }).then((res) => {
    if (res.status == 200) {
      Prorange.value = res.data.map((i) => {
        return {
          value: i.cDictonaryCode,
          text: i.cDictonaryName
        }
      })
      RProrange.value = res.data.map((i) => {
        return {
          value: i.cDictonaryCode,
          text: i.cDictonaryName
        }
      })
    }
  })
}
const GropName = ref()
const Gropchange = (i) => {
  GropName.value = i
  setfocus()
}
const ToalInfo = ref({})
const GetToals = () => {
  GetToal({
    cVouchTypeCode: '3'
  }).then((res) => {
    if (res.status == 200) {
      ToalInfo.value = res.data
    } else {
    }
  })
}
//自动选单
const GetAiCheckDAN = () => {
  ForList.value = []
  if (!single.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择日期！'
    })
    return
  }
  uni.showLoading({
    title: '获取单据中....'
  })
  GetAICheckID({
    cCodes: Ccode.value,
    dPlanDateStart: single.value,
    bAuto: true,
    cProductType: PerCode.value?.value
  }).then((res) => {
    if (res.status == 200) {
      ForList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
      GetToals()
    } else {
      uni.hideLoading()
    }
  })
}
//自动选单
const PeoCheck = () => {
  ForList.value = []
  if (!single.value || !Ccode.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择日期和输入单号！'
    })
    return
  }
  uni.showLoading({
    title: '获取单据中....'
  })
  GetAICheckID({
    cCodes: Ccode.value,
    dPlanDateStart: single.value,
    bAuto: false,
    cProductType: PerCode.value?.value
  }).then((res) => {
    if (res.status == 200) {
      ForList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
      GetToals()
    } else {
      uni.hideLoading()
    }
  })
}

//删除
const Del = (i) => {
  uni.showModal({
    content: '确认删除该数据？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        DelDan({
          UID: i.UID
        }).then((res) => {
          if (res.status == 200) {
            uni.showToast({
              icon: 'none',
              title: '删除成功！'
            })
            GetToals()
            // GetSearch()
          } else {
            uni.showToast({
              icon: 'none',
              title: '删除失败！'
            })
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
const Time = (e) => {
  console.log(single.value, 'e---------')
}
const GetSearch = () => {
  ForList.value = []
  uni.showLoading({
    title: '搜索中'
  })
  GetSeachPage({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: '',
    Conditions:
      SCcode.value || SearType.value?.value
        ? `cVouchTypeCode=3 && iStatus=0 && cCreateUserCode=${UserCode.value} and cSourceCode like ${SCcode.value} && cPARM01 = ${SearType.value?.value}`
        : `cVouchTypeCode=3 && iStatus=0 && cCreateUserCode=${UserCode.value}`
  }).then((res) => {
    if (res.status == 200) {
      ForList.value = [...ForList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
//保存
const Save = () => {
  if (!ForList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请添加数据！'
    })
    return
  }
  CommitPost({
    cPosCode: Warecode.value
  }).then((res) => {
    uni.showLoading({
      title: '提交中....'
    })
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '提交成功！'
      })
      ForList.value = []
      single.value = ''
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.stopPullDownRefresh()
    }
  })
}
//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  currentPage.value = 1
  total.value = 0
  ForList.value = []
  GetSearch()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    GetSearch()
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
