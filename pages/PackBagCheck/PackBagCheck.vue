<template>
  <!-- 按包抽检-->
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
      <view>
        <view
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 10px;
          "
        >
          <view style="display: flex; align-items: center; margin-left: 10rpx">
            <uni-section
              title="可搜索"
              type="line"
            >
              <view
                class="uni-px-5 uni-pb-5"
                style="width: 120px"
              >
                <zxz-uni-data-select
                  v-model="checkPeo"
                  filterable
                  :localdata="Prorange"
                  @inputChange="inputChange"
                  @change="Fauchange"
                  :focus="PeofocusType"
                  @input="PeoFoucs"
                  placeholder="请选择检验员"
                ></zxz-uni-data-select>
              </view>
            </uni-section>
          </view>
          <button
            class="mini-btn"
            style="color: black; backgroundcolor: #aed8ff; bordercolor: #aed8ff"
            type="warn"
            size="mini"
            @click="chuxi"
          >
            出席
          </button>
          <button
            class="mini-btn"
            style="color: black; backgroundcolor: #ffff7f; bordercolor: #ffff7f"
            type="warn"
            size="mini"
            @click="Quexi"
          >
            缺席
          </button>
          <button
            class="mini-btn"
            style="color: black; backgroundcolor: #ff6955; bordercolor: #ff6955"
            type="warn"
            size="mini"
            @click="Del"
          >
            删除
          </button>
        </view>
        <view style="padding: 10rpx 0rpx; display: flex; margin-left: 10rpx">
          <text>出席人员：</text>
          <view
            style="padding: 0 10rpx"
            v-for="(item, index) in CXlIST"
            :key="index"
            >{{ item.text }}</view
          >
        </view>
        <view style="padding-bottom: 10rpx; display: flex; margin-left: 10rpx">
          <text>缺席人员：</text>
          <view
            style="padding: 0 10rpx"
            v-for="(item, index) in QXlIST"
            :key="index"
            >{{ item.text }}</view
          >
        </view>
        <view style="width: 100%; height: 5rpx; background: gainsboro"></view>
        <view style="display: flex">
          <view
            style="width: 50%; display: flex; align-items: center; justify-content: space-around"
          >
            <view style="width: 30%; margin: 0 5rpx">组别:</view>
            <view style="width: 70%">
              <uni-section
                title="可搜索"
                type="line"
              >
                <view class="uni-px-5 uni-pb-5">
                  <zxz-uni-data-select
                    v-model="Grop"
                    filterable
                    :localdata="Groprange"
                    @inputChange="inputChange"
                    @change="Gropchange"
                    :focus="TextfocusType"
                    @input="Foucs"
                    placeholder="请选择组别"
                  ></zxz-uni-data-select>
                </view>
              </uni-section>
            </view>
          </view>
          <view style="display: flex; align-items: center">
            <view style="width: 30%; margin-left: 20rpx">扫描包号:</view>
            <view style="width: 70%">
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
                  @confirm="GetData"
                  v-model="Station"
                  placeholder="请输入包号"
                >
                </uni-search-bar>
              </uni-section>
              <input
                v-else
                class="inputSty"
                :disabled="disabled"
                v-model="Station"
                @input="GetData"
                :focus="focusType"
                @blur="setfocus"
                placeholder="请扫描包号"
                placeholder-style="font-size:12px"
              />
            </view>
          </view>
        </view>
        <view style="padding: 10rpx">
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">订单号：{{ ScanInfo?.cCode }}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">物流商：{{ ScanInfo?.cLogisticsName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view class="demo-uni-col dark">库区：{{}}</view>
            </uni-col>
            <uni-col :span="14">
              <view class="demo-uni-col dark">库位：{{ ScanInfo?.cPosCode }}</view>
            </uni-col>
          </uni-row>
          <view style="margin-left: 70%">
            <button
              class="mini-btn"
              style="color: black; backgroundcolor: #98b7ff; bordercolor: #98b7ff"
              type="warn"
              size="mini"
              @click="Add"
            >
              添加
            </button>
          </view>
        </view>
        <view style="width: 100%; height: 5rpx; background: gainsboro"></view>
      </view>

      <view
        class="listMain"
        :style="'height:' + (h - 360) + 'px'"
      >
        <view class="project">
          <view
            v-for="(item, index) in POstArr"
            :key="index"
          >
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark"></view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">订单号：{{ item.cSourceCode }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">物流商：{{ item.cLogisticsName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">组别：{{ Grop }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">包号：{{ item.cPackageCode }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">库区：{{}}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">库位：{{ item.cWareHouseLocationCode }}</view>
              </uni-col>
            </uni-row>
            <button
              class="mini-btn"
              style="margin-left: 70%; color: black; backgroundcolor: #ff0313; bordercolor: #ff0313"
              type="warn"
              size="mini"
              @click="ListDel(item, index)"
            >
              删除
            </button>
            <view style="width: 100%; height: 5rpx; background: gainsboro"></view>
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
import { GetCheckPeo, GetGropList, ScanPack, PackPut } from '@/api/Quanilty.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../api/login'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('按包抽检')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const checkPeo = ref() //质检人员
const Prorange = ref([]) //下拉质检人员数组
const Grop = ref()
const Groprange = ref([]) //组别
const PerCode = ref() //故障编码
const focusType = ref(false)
const TextfocusType = ref(false)
const PeofocusType = ref(false)
const disabled = ref(true)
const searchValue = ref()
const Station = ref()
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const PageList = ref([])
//总页数
const pageTotal = ref(0)
const CXlIST = ref([])
const QXlIST = ref([])
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
  GetAllDevice()
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
// 质检人员
const Fauchange = (i) => {
  PerCode.value = i
}
//获取质检人员下拉数据
const GetSelect = () => {
  GetCheckPeo({
    OrderByFileds: '',
    Conditions: ``
  }).then((res) => {
    if (res.status == 200) {
      Prorange.value = res.data.map((i) => {
        return {
          value: i.cEmployeeCode,
          text: i.cEmployeeName
        }
      })
    }
  })
}

//出席
const chuxi = () => {
  Prorange.value.forEach((item) => {
    if (item.value == PerCode.value.value && QXlIST.value.indexOf(PerCode.value) == -1) {
      if (CXlIST.value.length) {
        CXlIST.value.some((i) => i.value == PerCode.value.value)
          ? uni.showToast({
              icon: 'none',
              title: '该人员已存在'
            })
          : CXlIST.value.unshift(item)
      } else {
        if (QXlIST.value.indexOf(PerCode.value) == -1) {
          CXlIST.value.unshift(item)
        }
      }
    }
  })
}
//缺席
const Quexi = () => {
  Prorange.value.forEach((item) => {
    if (item.value == PerCode.value.value && CXlIST.value.indexOf(PerCode.value) == -1) {
      if (QXlIST.value.length) {
        QXlIST.value.some((i) => i.value == PerCode.value.value)
          ? uni.showToast({
              icon: 'none',
              title: '该人员存在'
            })
          : QXlIST.value.unshift(item)
      } else {
        if (CXlIST.value.indexOf(PerCode.value) == -1) {
          QXlIST.value.unshift(item)
        }
      }
    }
  })
}
//删除
const Del = () => {
  Prorange.value.forEach((item, index) => {
    if (item.value == PerCode.value.value) {
      if (QXlIST.value.length) {
        // QXlIST.value.some((i) => i.value !== PerCode.value.value) ? uni.showToast({
        // 		icon: 'none',
        // 		title: '该人员未缺席'
        // 	}) :
        QXlIST.value = QXlIST.value.filter((item) => {
          return item !== PerCode.value
        })
      }
      if (CXlIST.value.length) {
        // CXlIST.value.some((i) => i.value !== PerCode.value.value) ? uni.showToast({
        // 		icon: 'none',
        // 		title: '该人员未出席'
        // 	}) :
        // 	CXlIST.value.splice(index,1)
        CXlIST.value = CXlIST.value.filter((item) => {
          return item !== PerCode.value
        })
        console.log(CXlIST.value, 'CXlIST.value=====')
      }
    }
  })
}
//组别输入值
const name = ref()
//组别搜索
const inputChange = _.debounce((e) => {
  name.value = e
  GetAllDevice()
}, 500)
//加载组别数据
const GroptArr = ref([])
const GetAllDevice = () => {
  GetGropList({
    OrderByFileds: '',
    Conditions: name.value ? `cReName like ${name.value}` : ''
  }).then((res) => {
    if (res.status == 200) {
      GroptArr.value = res.data
      Groprange.value = res.data
        .filter((i) => i.cReName)
        .map((i) => {
          return {
            value: i.cReName,
            text: i.cReName
          }
        })
    }
  })
}
// 组别
const GroupChooseObj = ref({})
const GropName = ref()
const Gropchange = (i) => {
  GropName.value = i
  GroptArr.value.forEach((item) => {
    if (item.cReName == GropName.value.value) {
      GroupChooseObj.value = item
    }
  })
  if (Grop.value) {
    disabled.value = false
    TextfocusType.value = true
    focusType.value = false
    setfocus()
  }
  if (!Grop.value) {
    disabled.value = true
  }
}
const Foucs = () => {
  if (Grop.value) {
    disabled.value = true
    TextfocusType.value = true
    focusType.value = false
  }
}
const PeoFoucs = () => {}
const ScanInfo = ref({})
//扫描包
const GetData = () => {
  ScanInfo.value = {}
  uni.showLoading({
    title: '加载中......'
  })
  ScanPack({
    pbarcode: Station.value
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      if (!res.data) {
        uni.showToast({
          icon: 'none',
          title: '该包错误，请重新扫描！'
        })
        Station.value = ''
        return
      }
      if (GropName.value.value !== res.data.cDynamicsParm05) {
        uni.showToast({
          icon: 'none',
          title: '该包不属于此产线，请重新扫描！'
        })
        Station.value = ''
        return
      }
      ScanInfo.value = res.data
    } else {
      uni.hideLoading()
    }
  })
}
const ForArr = ref([])
const POstArr = ref([])
const Add = () => {
  let obj = {
    cVouchTypeCode: 1,
    cModeCode: 'QC.Pre_CheckVouch.R',
    cSourceCode: ScanInfo.value.cCode,
    cPackageCode: ScanInfo.value.Pbarcode,
    cLogisticsCode: ScanInfo.value.cLogisticsCode,
    cLogisticsName: ScanInfo.value.cLogisticsName,
    // "cWareHouseCode":'',
    // "cWaerHouseName":'',
    // "cWareHouseAreaCode":'',
    // "cWareHouseAreaName":'',
    cWareHouseLocationCode: ScanInfo.value.cPosCode,
    cWareHouseLocationName: ScanInfo.value.cPosName,
    cFactoryUnitCode: GroupChooseObj.value.cFactoryUnitCode,
    cFactoryUnitName: GroupChooseObj.value.cFactoryUnitName,
    cFactoryUnitResourceCode: GroupChooseObj.value.cNodeResourceCode,
    cFactoryUnitResourceName: GroupChooseObj.value.cFactoryUnitName
  }
  if (POstArr.value.length) {
    POstArr.value.some((item) => item.cPackageCode == obj.cPackageCode)
      ? uni.showToast({
          icon: 'none',
          title: '该包已扫描添加，请重新扫描'
        })
      : POstArr.value.unshift(obj)
    Station.value = ''
  } else {
    POstArr.value.unshift(obj)
    Station.value = ''
  }
}
const ListDel = (i, index) => {
  POstArr.value.splice(index, 1)
}
//保存
const Save = () => {
  let listPerson = [
    ...CXlIST.value.map((item) => ({
      bAttend: true,
      cPersonCode: item.value,
      cPersonName: item.text
    })),
    ...QXlIST.value.map((item) => ({
      bAttend: false,
      cPersonCode: item.value,
      cPersonName: item.text
    }))
  ]
  let obj = {
    cVouchTypeCode: '1',
    list_m: POstArr.value,
    list_Person: listPerson
  }
  if (POstArr.value.length <= 0 || listPerson.length <= 0) {
    uni.showToast({
      icon: 'none',
      title: '请添加相关数据'
    })
    return
  }
  uni.showLoading({
    title: '提交中......'
  })
  PackPut(obj).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '提交成功'
      })
      uni.hideLoading()
      uni.stopPullDownRefresh()
      POstArr.value = []
      QXlIST.value = []
      CXlIST.value = []
    } else {
      uni.hideLoading()
      uni.showToast({
        icon: 'none',
        title: '出错了'
      })
    }
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // if (current.value == 1) {
  // 	currentPage.value = 1
  // 	total.value = 0
  // 	PageList.value = []
  // 	getForPage()
  // }
  // if (current.value == 0) {
  // 	console.log('下拉----------');
  // 	DcurrentPage.value = 1
  // 	Dtotal.value = 0
  // 	DevDataList.value = []
  // 	GetAllDevice()
  // }
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // console.log('上拉');
  // if (current.value == 0) {
  // 	DcurrentPage.value++
  // 	if (DcurrentPage.value > DpageTotal.value) {
  // 		more.value = 'no-more'
  // 	} else {
  // 		GetAllDevice()
  // 	}
  // }
  // if (current.value == 1) {
  // 	currentPage.value++
  // 	if (currentPage.value > pageTotal.value) {
  // 		more.value = 'no-more'
  // 	} else {
  // 		getForPage()
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
