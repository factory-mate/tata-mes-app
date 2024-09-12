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
      right-icon="home"
      @clickRight="clickRight"
    />
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="onClickItem"
        @click="ChangTab"
      />
    </view>
    <view class="content">
      <!-- 待检验 -->
      <view v-if="current === 0">
        <!-- 过滤 -->
        <view class="form_sty iconNode">
          <view class="form_sty_item">
            <view style="width: 60px">报检日期：</view>
            <view style="flex: 1">
              <uni-datetime-picker
                v-model="form.date"
                type="day"
                @change=""
              />
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">检验类别：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product"
                  filterable
                  :localdata="Productrange"
                  dataKey="cDictonaryName"
                  dataValue="cDictonaryCode"
                  @inputChange="inputChange"
                  @change="PROchange"
                  :focus="PeofocusType"
                  @input="PeoFoucs"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">报检单号：</view>
            <view style="flex: 1">
              <uni-easyinput
                v-model="form.code"
                placeholder="请输入单号"
              />
            </view>
          </view>
          <view class="form_sty_item">
            <button
              class="mini-btn"
              style="
                margin-right: 10rpx;
                color: black;
                backgroundcolor: #ffff7f;
                bordercolor: #ffff7f;
              "
              type="warn"
              size="mini"
              @click="search()"
            >
              搜索
            </button>
            <button
              class="mini-btn"
              style="color: black; backgroundcolor: #aaaa7f; bordercolor: #aaaa7f"
              type="warn"
              size="mini"
              @click="reset()"
            >
              重置
            </button>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 200) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in listData"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">报检单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产线名称：{{ item.cPARM08 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">工位名称：{{ item.cPARM07 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品名称：{{ item.cInvCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验类别：{{ item.cPARM06Name }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="8">
                    <view class="demo-uni-col dark">日期：{{ item.dDate }}</view>
                  </uni-col>
                  <uni-col
                    :span="16"
                    style=""
                  >
                    <view
                      class=""
                      style="display: flex"
                    >
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #ffaa00; bordercolor: #ffaa00"
                        type="warn"
                        size="mini"
                        @click="Check(item)"
                      >
                        检验
                      </button>
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #ff0000; bordercolor: #ff0000"
                        type="warn"
                        size="mini"
                        @click="close(item)"
                      >
                        关闭
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
      <!-- 检验中 -->
      <view v-if="current === 1">
        <!-- 过滤 -->
        <view class="form_sty">
          <view class="form_sty_item">
            <view style="width: 60px">报检日期：</view>
            <view style="flex: 1">
              <uni-datetime-picker
                v-model="form.date"
                type="day"
                @change=""
              />
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">检验类别：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product"
                  filterable
                  :localdata="Productrange"
                  dataKey="name"
                  dataValue="value"
                  @inputChange="inputChange"
                  @change="PROchange"
                  :focus="PeofocusType"
                  @input="PeoFoucs"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">报检单号：</view>
            <view style="flex: 1">
              <uni-easyinput
                v-model="form.code"
                placeholder="请输入单号"
              />
            </view>
          </view>
          <view class="form_sty_item">
            <button
              class="mini-btn"
              style="
                margin-right: 10rpx;
                color: black;
                backgroundcolor: #ffff7f;
                bordercolor: #ffff7f;
              "
              type="warn"
              size="mini"
              @click="search()"
            >
              搜索
            </button>
            <button
              class="mini-btn"
              style="color: black; backgroundcolor: #aaaa7f; bordercolor: #aaaa7f"
              type="warn"
              size="mini"
              @click="reset()"
            >
              重置
            </button>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 230) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in listData"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">报检单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产线名称：{{ item.cPARM22 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">工位名称：{{ item.cPARM08 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品名称：{{ item.cInvCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验类别：{{ item.cPARM21 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">是否合格：{{ item.IsOk }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">{{ item.dDate }}</view>
                  </uni-col>
                </uni-row>

                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <!-- <uv-radio-group v-model="item.radioType" placement="row" @change="radioGroup(item)">
												<uv-radio name="1" label="合格"></uv-radio>
												<uv-radio name="0"  label="不合格"></uv-radio>
										</uv-radio-group> -->
                  </uni-col>
                  <uni-col
                    :span="8"
                    style=""
                  >
                    <view
                      class=""
                      style="display: flex"
                    >
                      <!-- <button class="mini-btn"
												style="color:black;backgroundColor:green;"
												type="warn" size="mini" @click="clickbaocun(item)">保存</button> -->
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #00c5ee; margin-left:"
                        type="warn"
                        size="mini"
                        @click="clickJYB(item)"
                      >
                        检验指标
                      </button>
                    </view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </view>
        <!-- 审核 -->
        <uni-popup
          ref="inputDialog"
          type="dialog"
          background-color="#fff"
        >
          <view class="viewCon">
            <view class="tit">原因</view>
            <uni-easyinput
              class="inp"
              v-model="yuanyin"
              placeholder="请输入"
            />
            <button
              class="butt"
              @click="shenpi"
            >
              确认审批
            </button>
          </view>
          <!-- <uni-popup-dialog ref="inputClose"  mode="input" title="原因" :value="yuanyin"
						placeholder="请输入内容" :before-close="true" confirmText='确认审批' @confirm="input?dialogInputConfirm():''"></uni-popup-dialog> -->
        </uni-popup>
      </view>
      <!-- 已检验 -->
      <view v-if="current === 2">
        <!-- 过滤 -->
        <view class="form_sty">
          <view class="form_sty_item">
            <view style="width: 60px">报检日期：</view>
            <view style="flex: 1">
              <uni-datetime-picker
                v-model="form.date"
                type="day"
                @change=""
              />
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">检验类别：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product"
                  filterable
                  :localdata="Productrange"
                  dataKey="name"
                  dataValue="value"
                  @inputChange="inputChange"
                  @change="PROchange"
                  :focus="PeofocusType"
                  @input="PeoFoucs"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">报检单号：</view>
            <view style="flex: 1">
              <uni-easyinput
                v-model="form.code"
                placeholder="请输入单号"
              />
            </view>
          </view>
          <view
            class="form_sty_item"
            style="margin-left: 60%"
          >
            <button
              class="mini-btn"
              style="
                margin-right: 10rpx;
                color: black;
                backgroundcolor: #ffff7f;
                bordercolor: #ffff7f;
              "
              type="warn"
              size="mini"
              @click="search()"
            >
              搜索
            </button>
            <button
              class="mini-btn"
              style="color: black; backgroundcolor: #aaaa7f; bordercolor: #aaaa7f"
              type="warn"
              size="mini"
              @click="reset()"
            >
              重置
            </button>
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 240) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in listData"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">报检单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产线名称：{{ item.cPARM22 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">工位名称：{{ item.cPARM08 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">产品名称：{{ item.cInvCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验类别：{{ item.cPARM21 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">是否合格：{{ item.IsOk }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">{{ item.dDate }}</view>
                  </uni-col>
                </uni-row>

                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <!-- <view class="demo-uni-col dark">拒收比例：{{}}</view> -->
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">
                      <button
                        class="mini-btn"
                        style="color: black; backgroundcolor: #009100"
                        type="warn"
                        size="mini"
                        @click="CheckEND(item)"
                      >
                        查看指标
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
import { Login } from '../../api/login'
import { filterModel } from '@/utils/flter.ts'
import {
  GetForPage_Two,
  Pre_GetForPage_Two,
  SetRealCheckVouch,
  Close,
  SaveScanningcPackageCode,
  SetCheckVouchIsOK,
  SHAdd,
  GetDicType
} from '@/api/lailiao.js'

let branch = ref()
const radioVal = ref('')
const yuanyin = ref('')
const inputDialog = ref()
const title = ref('首末件检验')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const checked = ref(false)
const disabled = ref(true)
const searchValue = ref()
const current = ref(0)
const iStatus = ref('1')
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['待检验', '检验中', '已检验'])
const code = ref()
const rado = ref('1')
const hege = ref('')

const form = ref({
  date: '',
  gys: '',
  code: '',
  res: '',
  leixing: ''
})
const hegedata = [
  {
    name: '合格',
    value: 1
  },
  {
    name: '不合格',
    value: 0
  }
]
const listData = ref([])
const listDataSJ = ref([])
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
const Product = ref('')
const Productrange = ref([
  { name: '合格', value: '1' },
  { name: '不合格', value: '0' }
])
const PeofocusType = ref(false)
const clickRight = () =>
  uni.switchTab({
    url: '/pages/tabbar/workHome/index'
  })
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
})
onUnload(() => {})
onHide(() => {})
onBackPress(() => {})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  getList()
  getselList()
})
//Tab切换
const onClickItem = (e) => {
  console.log(e.currentIndex, '--e.currentIndex')
  radioVal.value = ''
  current.value = e.currentIndex
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  getselList()
  reset()
}
const search = () => {
  radioVal.value = ''
  currentPage.value = 1
  listData.value = []
  getList()
}
const reset = () => {
  radioVal.value = ''
  currentPage.value = 1
  form.value = {
    date: '',
    gys: '',
    code: '',
    res: '',
    leixing: ''
  }
  Product.value = ''
  listData.value = []
  getList()
}
const getselList = () => {
  GetDicType({
    cTableCode: 'FM_QC_PRE_CHECKVOUCH',
    cAttributeCode: current.value == '0' ? 'cPARM06' : 'cPARM21'
  }).then((res) => {
    Productrange.value = res.data
  })
}
const getList = () => {
  console.log(current.value, 'currentPage.value.valuerm.value')
  let val = [
    {
      cAttributeCode: 'cVouchTypeCode',
      cAttributeCodeValue: '8',
      cConditions: '='
    },
    {
      cAttributeCode: 'iStatus',
      cAttributeCodeValue: JSON.stringify(current.value),
      cConditions: '='
    },
    {
      cAttributeCode: 'cVendorName',
      cAttributeCodeValue: form.value.gys ? form.value.gys : '',
      cConditions: 'like'
    },
    {
      cAttributeCode: 'dDate',
      cControlTypeCode: 'DatePicker',
      cAttributeCodeValue: form.value.date,
      cConditions: '='
    },
    {
      cAttributeCode: 'cCode',
      cAttributeCodeValue: form.value.code ? form.value.code : '',
      cConditions: 'like'
    },
    {
      cAttributeCode: current.value == '0' ? 'cPARM06' : 'cPARM21',
      cAttributeCodeValue: Product.value ? Product.value : '',
      cConditions: 'like'
    }
  ]
  let obj = {
    PageIndex: currentPage.value,
    PageSize: 5,
    OrderByFileds: '',
    Conditions: filterModel(val)
  }
  uni.showLoading({
    title: '加载中'
  })
  if (current.value == '0') {
    Pre_GetForPage_Two(obj).then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      pageTotal.value = res.data.pageCount

      listData.value = [...listData.value, ...res.data.data]
    })
  } else if (current.value) {
    GetForPage_Two(obj).then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      pageTotal.value = res.data.pageCount
      if (current.value == '1') {
        res.data.data.forEach((item) => {
          item.radioType = ''
        })
      }
      listData.value = [...listData.value, ...res.data.data]
    })
  } else {
  }
}
const close = (v) => {
  let obj = {
    UID: v.UID
  }
  Close(obj).then((res) => {
    uni.showToast({
      icon: 'none',
      title: res.msg || ''
    })
    if (res.status == '200') {
      listData.value = []
      currentPage.value = 1
      getList()
    }
  })
}
const Check = (v) => {
  let obj = {
    UID: v.UID
  }
  SetRealCheckVouch(obj).then((res) => {
    if (res.status == '200') {
      current.value = 1
      listData.value = []
      currentPage.value = 1
      getList()
    } else {
      uni.showToast({
        icon: 'none',
        title: res.errmsg[0].Value || '检验失败'
      })
    }
  })
}
// 是否合格
const radioGroup = (obj, v) => {
  // console.log(v,"--");
  console.log(obj, '--rad')
  radioVal.value = obj
  listData.value.forEach((item) => {
    if (obj.cCode != item.cCode) {
      item.radioType = ''
    }
  })
}
const funChecked = () => {
  return true
}
// 保存
const clickbaocun = (v) => {
  // console.log(v.radioType,'--radioVal.value');
  if (!v.radioType) {
    uni.showToast({
      icon: 'none',
      title: '请选择是否合格'
    })
    return false
  }
  let obj = {
    UID: v.UID,
    IsOk: v.radioType === '1' ? 'true' : 'false'
  }

  SetCheckVouchIsOK(obj).then((res) => {
    console.log(res)
    if (res.success === false) {
      let msgval = res.errmsg ? JSON.parse(res.errmsg[0].Value) : []
      // console.log(msgval,"--666");
      if (msgval.length && msgval[0].isFlow) {
        console.log(111)
        uni.showToast({
          icon: 'none',
          title: null,
          duration: 0
        })
        inputDialog.value.open()
        return false
      } else {
        console.log(22)
        uni.showToast({
          icon: 'none',
          title: res.msg || msgval[0].msg || '失败'
        })
        listData.value.forEach((item) => {
          item.radioType = ''
        })
        return false
      }
    }
    if (res.success === true) {
      console.log(33)
      uni.showToast({
        icon: 'none',
        title: res.msg || '成功'
      })
      radioVal.value = ''
      currentPage.value = 1
      listData.value = []
      listData.value.forEach((item) => {
        item.radioType = ''
      })
      getList()
    }
  })
}
const shenpi = () => {
  if (!yuanyin.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入原因'
    })
    return false
  }
  console.log(radioVal.value, '--23')
  let obj = {
    MID: radioVal.value.UID,
    cVouchTypeCode: 5,
    cPARM01: yuanyin.value
  }
  SHAdd(obj).then((res) => {
    if (res.status == '200') {
      uni.showToast({
        icon: 'none',
        title: res.msg || '开始审批'
      })
      inputDialog.value.close()
      listData.value.forEach((item) => {
        item.radioType = ''
      })
    }
  })
}

const ProductinputChange = () => {}
const CheckFoucs = () => {}
//抽检类型下拉变化
const Checkchange = () => {}
const Time = () => {}
//产品类型变化
const inputChange = () => {}
const PROchange = () => {}
const PeoFoucs = () => {}
//检验包
const clickJYB = (v) => {
  uni.navigateTo({
    url: '/pages/FirstLastInspectionJY/InspectingPackingViewZB?obj=' + JSON.stringify(v)
  })
}

const ChangTab = () => {
  // listData.value =[]
  // currentPage.value = 0
  // total.value = 0
  // if (current.value == 0) {
  // 	getList()
  // } else {
  // 	getList()
  // }
}

//检验中=======
//检验指标
const CheckPoint = () => {
  uni.navigateTo({
    url: '/pages/PeriodicSampling/CheckPoint/CheckPoint'
  })
}
// 已检验的查看指标
const CheckEND = (obj) => {
  uni.navigateTo({
    url: '/pages/FirstLastInspectionJY/InspectingPackingYJViewZB?obj=' + JSON.stringify(obj)
  })
}

//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  // currentPage.value = 1
  // total.value = 0
  // listData.value = []
  // getList()
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
    .form_sty {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
      .form_sty_item {
        display: flex;
        width: 50%;
        padding: 6px;
        box-sizing: border-box;
        // border: 1px solid red;
        align-items: center;
        // margin-left: 6%;
        margin-bottom: 10rpx;
      }

      :deep(.uni-date-x .uni-icons) {
        display: none;
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
