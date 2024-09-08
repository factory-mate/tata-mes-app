<template>
  <!-- 生产过程检验-->
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
      <view v-if="current === 0">
        <view
          class="ChangTarg"
          style="display: flex; align-items: center; justify-content: flex-start"
        >
          <view style="width: 15%; margin: 0 10px">工位:</view>
          <view style="width: 60%">
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
                @confirm="GetDataGW"
                v-model="gwVal"
                placeholder="请输入工位"
              >
              </uni-search-bar>
            </uni-section>
            <input
              v-else
              class="inputSty"
              :disabled="disabled"
              v-model="gwVal"
              @input="GetDataGW"
              :focus="focusType"
              @blur="setfocus"
              placeholder="工位"
              placeholder-style="font-size:12px"
            />
          </view>
        </view>
        <view
          class="ChangTarg"
          style="display: flex; align-items: center; justify-content: flex-start"
        >
          <view style="width: 15%; margin: 0 10px">产品序列号:</view>
          <view style="width: 60%">
            <!-- 搜索框 -->
            <uni-section
              v-if="branch != 'alps'"
              title=""
              type="line"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
                :focus="focusType2"
                @blur="setfocus2"
                @confirm="GetDataCP"
                v-model="cpVal"
                placeholder="请输入产品"
              >
              </uni-search-bar>
            </uni-section>
            <input
              v-else
              class="inputSty"
              :disabled="disabled"
              v-model="cpVal"
              @input="GetDataCP"
              :focus="focusType2"
              @blur="setfocus2"
              placeholder="产品"
              placeholder-style="font-size:12px"
            />
          </view>
        </view>
        <view style="margin-left: 10px; font-size: 14px">
          <uni-row
            class="demo-uni-row"
            style="display: flex"
          >
            <uni-col :span="14">
              <view class="demo-uni-col dark">工位名称：{{ gwObj?.cPositionName }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">工位编码：{{ gwObj?.cPositionCode }}</view>
            </uni-col>
          </uni-row>
          <uni-row
            class="demo-uni-row"
            style="display: flex"
          >
            <uni-col :span="14">
              <view class="demo-uni-col dark">设备编码：{{ gwObj?.cResourceCode }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">设备名称：{{ gwObj?.cResourceName }}</view>
            </uni-col>
          </uni-row>
          <uni-row
            class="demo-uni-row"
            style="display: flex"
          >
            <uni-col :span="14">
              <view class="demo-uni-col dark">
                产品编码：{{ cpObj?.PRODUCT_VOUCH_S_S_S_cInvCode }}</view
              >
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">
                产品名称：{{ cpObj?.PRODUCT_VOUCH_S_S_S_cInvName }}</view
              >
            </uni-col>
          </uni-row>
        </view>
        <view style="margin-left: 10px; font-size: 14px">
          <!-- <radio-group name="radio" v-model="GroupVal" @change="changeGroup">
						<label style="margin-left: 20%;">
							<radio value="1" :checked='checked1' /><text>首件</text>
						</label>
						<label style="margin-left: 20%;">
							<radio value="2"  :checked='checked2'/><text>末件</text>
						</label>
					</radio-group> -->
          <uni-data-checkbox
            v-model="GroupVal"
            :localdata="radioList"
            @change="changeGroup"
          />
        </view>
        <view style="display: flex; align-items: center; padding: 0 10px">
          <view style="width: 60px">报检原因：</view>
          <view style="width: 180px">
            <uni-section
              title="可搜索"
              type="line"
            >
              <view
                class="uni-px-5 uni-pb-5"
                style="width: 160px"
              >
                <zxz-uni-data-select
                  v-model="Line"
                  filterable
                  :localdata="Linerange"
                  @inputChange="LineinputChange"
                  @change="Linechange"
                  dataKey="cDictonaryName"
                  dataValue="cDictonaryCode"
                  @input="LineFoucs"
                  placeholder="请选择原因"
                ></zxz-uni-data-select>
              </view>
            </uni-section>
          </view>
        </view>
        <view
          class=""
          style="position: fixed; left: 40%; bottom: 0"
        >
          <button @click="clickAdd">提交</button>
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
import {
  GetSingle_Position,
  GetSingleByCode_V,
  GetDicType,
  Add_FirstAndLastPiece
} from '@/api/baojian.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../api/login'
import { GetTaskList } from '@/api/PDA.js'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('首末件报检')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const current = ref(0)
const radio1 = ref(0)
const radio2 = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const currents = ref(0)
const styleTypes = ref('button')
const activeColors = ref('#ff0000')
const itemss = ref(['合格', '不良'])
const radioList = [
  { text: '首件', value: '1' },
  { text: '末件', value: '2' }
]

const range = ref([]) //设备下拉
const Linerange = ref([])
const gwVal = ref()
const gwObj = ref({})
const cpObj = ref({})
const DevData = ref({})
const cpVal = ref()
const Line = ref()
const focusType = ref(false)
const focusType2 = ref(false)
const checked1 = ref(false)
const checked2 = ref(false)

//日期范围
const Timerange = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const DpageSize = ref(10)
//当前页
const DcurrentPage = ref(1)
//总条数
const Dtotal = ref(0)
const DpageTotal = ref(0)
const PageList = ref([])
//总页数
const pageTotal = ref(0)
const name = ref('')

//下拉
const Productrange = ref([])

onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  // setfocus()
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
  setfocus()
  selList()
})
const setfocus = () => {
  focusType.value = false
  // focusType2.value = false
  setTimeout(() => {
    focusType.value = true
    // focusType2.value = true
  }, 200)
}
const setfocus2 = () => {
  focusType.value = false
  // focusType2.value = false
  setTimeout(() => {
    focusType.value = true
    // focusType2.value = true
  }, 200)
}
const Productsetfocus = () => {
  ProductfocusType.value = false
  setTimeout(() => {
    ProductfocusType.value = true
  }, 200)
}

const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
const LineinputChange = () => {}
const inputChange = () => {}
const ResultinputChange = () => {}

const Linechange = (i) => {
  console.log(i, '产线-------')
}
const LineFoucs = () => {}
const PeoFoucs = () => {}
const ResultFoucs = () => {}
const selList = () => {
  GetDicType({ cTableCode: 'FM_QC_PRE_CHECKVOUCH', cAttributeCode: 'cPARM05' }).then((res) => {
    Linerange.value = res.data
  })
}
//扫描工位
const GetDataGW = () => {
  if (!gwVal.value) {
    uni.showToast({
      icon: 'error',
      title: '请扫描工位'
    })
    return false
  }
  uni.showLoading({
    title: '加载中......'
  })
  GetSingle_Position({
    cPositionCode: gwVal.value,
    cResourceTypeCode: '9'
  }).then((res) => {
    if (res.status == 200) {
      gwObj.value = res.data || {}

      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const GetDataCP = () => {
  uni.showLoading({
    title: '加载中......'
  })
  GetTaskList({
    conditions: `cBarCode=${cpVal.value}`
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.length == 0) {
        uni.showToast({
          icon: 'error',
          title: '未找到产品'
        })
        cpObj.value = {}
        uni.hideLoading()
        return
      }
      cpObj.value = res.data[0] || {}
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const GroupVal = ref('')
const changeGroup = (value) => {
  console.log(value, '--value')
  console.log(GroupVal.value, '--value')
  // GroupVal.value=value.detail.value
}
const clickAdd = () => {
  if (!gwObj.value.cPositionCode) {
    uni.showToast({
      icon: 'error',
      title: '请选择工位'
    })
    return false
  }
  if (!cpObj.value.PRODUCT_VOUCH_S_S_S_cInvCode) {
    uni.showToast({
      icon: 'error',
      title: '请选择产品'
    })
    return false
  }

  if (!GroupVal.value || !Line.value) {
    uni.showToast({
      icon: 'error',
      title: '请选择'
    })
    return false
  }
  uni.showLoading({
    title: '加载中......'
  })
  console.log(Line.value, '--Line.value')
  // if (!cpVal.value || !gwVal.value) {
  //   uni.showToast({
  //     icon: 'error',
  //     title: '请输入工位/产品'
  //   })
  //   return false
  // }
  let obj = {
    // ...gwObj.value,
    // ...cpObj.value,
    cInvCode: cpObj.value.PRODUCT_VOUCH_S_S_S_cInvCode,
    cInvName: cpObj.value.PRODUCT_VOUCH_S_S_S_cInvName,
    cPARM07: gwObj.value.cResourceName,
    cPARM06: GroupVal.value || '',
    cPARM05: Line.value || ''
  }
  Add_FirstAndLastPiece(obj).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: res.msg || '成功'
      })
      Line.value = ''
      GroupVal.value = ''
      cpVal.value = ''
      gwVal.value = ''
      cpObj.value = {}
      gwObj.value = {}
      checked1.value = false
      checked2.value = false
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.showToast({
        icon: 'error',
        title: res.msg || '失败'
      })
      uni.hideLoading()
    }
  })
}

//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 1) {
    currentPage.value = 1
    total.value = 0
    TwoPageList.value = []
    // GetPageTwoList()
  }
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  if (current.value == 0) {
    // DcurrentPage.value++
    // if (DcurrentPage.value > DpageTotal.value) {
    // 	more.value = 'no-more'
    // } else {
    // 	GetAllDevice()
    // }
  }
  if (current.value == 1) {
    currentPage.value++
    if (currentPage.value > pageTotal.value) {
      more.value = 'no-more'
    } else {
      // GetPageTwoList()
    }
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

    .row-p {
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
    }

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
