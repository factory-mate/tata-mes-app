<template>
  <!-- 发货抽检-->
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
            v-for="(item, index) in TargetDataList"
            :key="index"
          >
            <view>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">检验单号：{{ item.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">指标编码：{{ item.cStandardCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">指标名称：{{ item.cStandardName }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">分析方法：{{ item.cAnalysisTypeName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">检验数量：{{ item.nCheckQuantity }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">合格数量：{{ item.iPARM11 }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">检验标准：{{ item.cGuideMemo }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">结果：{{ item.cPARM01 }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark"></view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">
                    <button
                      class="mini-btn"
                      style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                      type="warn"
                      size="mini"
                      @click="GoDection(item)"
                    >
                      记录结果
                    </button>
                  </view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <uni-load-more :status="more"></uni-load-more>
        </scroll-view>
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
import { GetTarget } from '@/api/Quanilty.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../../api/login'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('发货检验-检验指标')
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
const ItemInfo = ref()
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  ItemInfo.value = JSON.parse(option.Info)
  console.log(ItemInfo.value, '检验指标==')
  GetData()
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
const TargetDataList = ref([])
const GetData = () => {
  GetTarget({
    val: ItemInfo.value.UID
  }).then((res) => {
    if (res.status == 200) {
      TargetDataList.value = res.data
    } else {
    }
  })
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
//检验结果
const GoDection = (i) => {
  if (i.cAnalysisTypeName == '定性') {
    uni.navigateTo({
      url: '/pages/SamplingCheck/QualityPonit/QualityPonit?ItemInfo=' + JSON.stringify(i)
    })
  } else {
    uni.navigateTo({
      url: '/pages/SamplingCheck/QuanilyNumPoint/QuanilyNumPoint?ItemInfo=' + JSON.stringify(i)
    })
  }
}
//删除
// const Del = (i) => {
// 	uni.showModal({
// 		content: '确认删除该数据？',
// 		success: function(res) {
// 			if (res.confirm) {
// 				console.log('用户点击确定');
// 				DelDan({
// 					"UID": i.UID
// 				}).then(res => {
// 					if (res.status == 200) {
// 						uni.showToast({
// 							icon: "none",
// 							title: "删除成功！",
// 						})
// 						GetToals()
// 						// GetSearch()
// 					} else {
// 						uni.showToast({
// 							icon: "none",
// 							title: "删除失败！",
// 						})
// 					}
// 				})
// 			} else if (res.cancel) {
// 				console.log('用户点击取消');
// 			}
// 		}
// 	});
// }

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
