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
      right-icon="home"
      @clickRight="clickRight"
    />
    <view style="box-sizing: border-box; padding: 0 10rpx; border: 1px solid #eee">
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="10">
          <view class="demo-uni-col">包号：{{ routeVal.cPackageCode }}</view>
        </uni-col>
        <uni-col :span="14">
          <view style="display: flex; align-items: center">
            <view style="width: 60px">不良数量：</view>
            <view
              class="search-inpt"
              style="width: 60%"
            >
              <uni-section
                title=""
                type="line"
              >
                <up-input
                  @confirm="getXiangMa"
                  v-model="slVal"
                  placeholder="数量"
                >
                </up-input>
              </uni-section>
            </view>
          </view>
        </uni-col>
      </uni-row>
      <view
        style="
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 20rpx;
          padding-bottom: 20rpx;
        "
      >
        <uv-radio-group
          v-model="hege"
          placement="row"
          @change="radioGroup"
        >
          <uv-radio
            name="true"
            label="合格"
          ></uv-radio>
          <uv-radio
            name="false"
            label="不合格"
          ></uv-radio>
        </uv-radio-group>
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          @click="clickSave"
          style="margin-left: 40%"
        >
          保存
        </button>
      </view>
    </view>

    <view class="content">
      <view v-if="current === 0">
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 280) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view class="project">
              <view
                class="wLIst"
                v-for="(item, index) in xiangMList"
                :key="index"
              >
                <uni-row class="demo-uni-row">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">项目名称：{{ item.cProjectName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">指标编码：{{ item.cStandardCode }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col light">包检验数：{{ item.nCheckQuantity }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">指标名称：{{ item.cStandardName }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col light">不良数：{{ item.nNoPassQuantity }}</view>
                  </uni-col> </uni-row
                ><uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">分析方法：{{ item.cAnalysisTypeName }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col light">包号：{{ item.cPackageCode }}</view>
                  </uni-col> </uni-row
                ><uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">检验方法：{{ item.cCheckTypeName }}</view>
                  </uni-col>
                  <uni-col :span="14">
                    <view class="demo-uni-col light">检验时间：{{ item.dDate }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="24">
                    <view class="demo-uni-col dark">检验标准：{{ item.cGuideMemo }}</view>
                  </uni-col> </uni-row
                ><uni-row class="demo-uni-row itemTxt">
                  <uni-col :span="14">
                    <view class="demo-uni-col dark">判断结果：{{ item.IsOKName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <!-- 定量/定性 -->
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="clckType(item)"
                      style=""
                    >
                      录入结果
                    </button>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <!-- <uni-load-more :status="more"></uni-load-more> -->
          </scroll-view>
        </view>
      </view>
    </view>

    <!-- 审核 -->
    <uni-popup
      ref="inputDialog"
      type="dialog"
      background-color="#fff"
    >
      <uni-popup-dialog
        mode="input"
        title="原因"
        placeholder="请输入原因"
        @confirm="shenpi"
        confirmText="审批"
        cancelText="取消"
      />
    </uni-popup>
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
import { SetPackageIsOk, GetForList_S, SHAdd } from '@/api/lailiao.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
const inputDialog = ref()
const inputClose = ref()
const slVal = ref('')
const hege = ref('')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)

const title = ref('来料质检单详情-检验指标')
const current = ref(0)
const WList = ref([])
const xiangMList = ref([])
//页面条数
const pageSize = ref(5)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const routeVal = ref({})
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  // setfocus()
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  getList()
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
  routeVal.value = JSON.parse(option.obj)
  slVal.value = routeVal.value.nNoPassQuantity
  hege.value =
    routeVal.value.IsOk === null
      ? ''
      : ['1', true, 'true'].includes(routeVal.value.IsOk)
        ? 'true'
        : 'false'
  h.value = uni.getSystemInfoSync().windowHeight
})
//货位输入框聚焦
const setfocus = () => {
  // console.log(111,"--33");
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const setXMfocus = () => {
  focusXM.value = false
  setTimeout(() => {
    focusXM.value = true
  }, 200)
}
const keypress = (e) => {
  // codeType.value = ''
  // console.log(e, "按键码");
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
    // getcCode()
  }
}
const inputChange = () => {
  console.log(11111)
}
// 是否合格
const radioGroup = (v) => {
  console.log(hege.value, '--')
  // hege.value=v.detail.value
}
const clickSave = () => {
  if (!slVal.value) {
    uni.showToast({
      icon: 'error',
      title: '请输入数量'
    })
    return false
  }
  if (!hege.value) {
    uni.showToast({
      icon: 'error',
      title: '请选择是否合格'
    })
    return false
  }
  let obj = {
    UID: routeVal.value.UID,
    nNoPassQuantity: slVal.value,
    IsOk: hege.value,
    cMemo: ''
  }
  SetPackageIsOk(obj).then((res) => {
    if (res.success === false) {
      let msgval = res.errmsg ? JSON.parse(res.errmsg[0].Value) : []
      if (msgval.length > 0 && msgval[0].isFlow) {
        uni.showToast({
          icon: 'none',
          title: null,
          duration: 0
        })
        inputDialog.value.open()
      } else {
        uni.showToast({
          icon: 'none',
          title: msgval?.[0].msg
        })
      }
      return false
    }
    if (res.success === true) {
      uni.showToast({
        icon: 'none',
        title: res.msg || '成功'
      })
    }
  })
}
const shenpi = (e) => {
  if (!e) {
    uni.showToast({
      icon: 'none',
      title: '请输入原因'
    })
    return false
  }
  let obj = {
    MID: routeVal.value.UID,
    cVouchTypeCode: 4,
    cPARM01: e
  }
  SHAdd(obj).then((res) => {
    if (res.status == '200') {
      uni.showToast({
        icon: 'none',
        title: res.msg || '开始审批'
      })
      inputDialog.value.close()
      hege.value = ''
      slVal.value = ''
    }
  })
}
const clckType = (v) => {
  if (v.cAnalysisTypeName == '定量') {
    uni.navigateTo({
      url: '/pages/incomingInspection/InspectingPackingViewDL?obj=' + JSON.stringify(v)
    })
  } else {
    uni.navigateTo({
      url: '/pages/incomingInspection/InspectingPackingViewDX?obj=' + JSON.stringify(v)
    })
  }
}
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    cPackageCode: routeVal.value.cPackageCode,
    MID: routeVal.value.MID
  }
  GetForList_S(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    // xiangMList.value=[...xiangMList.value,...res.data.data]
    xiangMList.value = res.data
    // pageTotal.value=res.data.pageCount
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  currentPage.value = 1
  total.value = 0
  xiangMList.value = []
  getList()
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  currentPage.value++
  if (currentPage.value > pageTotal.value) {
    more.value = 'no-more'
  } else {
    getList()
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
const clickRight = () =>
  uni.switchTab({
    url: '/pages/tabbar/workHome/index'
  })
</script>

<style scoped lang="scss">
.wLIst {
  // border: 1px solid red;
  margin-bottom: 20rpx;
  margin: 20rpx 10rpx;
  border-radius: 4px;
  box-shadow: 0 0 10px #ddd;
  padding-bottom: 10px;
}
.head_row {
  box-sizing: border-box;
  padding: 0 10rpx;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .content {
    width: 100%;
    font-size: 12px;
    .Three-List {
      .Three-wlInfo-list {
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
      }
    }
    .TWO-wlInfo {
      .TWO-wlInfo-list {
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
      }
    }

    .search-wl {
      background: #fff;
      font-size: 12px;
      margin: 20rpx 10rpx;
      border-bottom: 1px solid #eee;

      .demo-uni-row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        .search-inpt {
          margin: -20px 0;
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
      }
    }

    // .listMain {
    // 	margin-top: 2px;
    // 	width: 100%;
    // 	height: calc(100% - 240rpx);
    // 	overflow-y: auto;
    // 	font-size: 14px;
    // }

    .BTN-Two {
      display: flex;
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;
      // border: 1px solid red;
      box-sizing: border-box;

      .project {
        // border: 1px solid red;
        background: #fff;
        font-size: 12px;

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

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;
    }
  }
}
.inputSty {
  margin: 0;
}
.uni-searchbar__box {
  height: 30px !important;
  padding: 0;
}
.itemTxt {
}
.inStorage .content .search-wl .demo-uni-row {
  padding: 10rpx;
}
.formSty {
  width: 100%;
  align-items: center;
  display: flex;
  font-size: 12px;
  .uni-searchbar {
    padding: 0;
  }
}
.viewCon {
  width: 200px;
  padding: 10px 20px;
  .tit {
    text-align: center;
    line-height: 80rpx;
    font-size: 16px;
  }
  .inp {
    margin-bottom: 20px;
  }
}
</style>
