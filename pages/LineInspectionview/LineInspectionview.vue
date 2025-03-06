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
      <!-- 00 -->
      <view v-if="current === 0">
        <!-- 过滤 -->
        <view class="form_sty iconNode">
          <view class="form_sty_item">
            <view style="width: 60px">车间选择：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product1"
                  filterable
                  :localdata="Productrange1"
                  dataKey="cWorkName"
                  dataValue="cWorkCode"
                  @change="PROchange1"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">产线选择：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product2"
                  filterable
                  :localdata="Productrange2"
                  dataKey="cFactoryUnitName"
                  dataValue="cNodeResourceCode"
                  @change="PROchange2"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">工位名称：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product3"
                  filterable
                  :localdata="Productrange3"
                  dataKey="cPositionName"
                  dataValue="cPositionCode"
                  @change="PROchange3"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>

          <view class="form_sty_item">
            <view style="width: 60px">扫描工位：</view>
            <view style="flex: 1">
              <!-- <uni-easyinput v-model="form.code" @input="" placeholder="请输入单号" /> -->
              <uni-section
                title=""
                type="line"
              >
                <uni-search-bar
                  radius="100"
                  cancelButton="none"
                  @confirm="getGW"
                  v-model="gwVal"
                  placeholder="请输入物料条码"
                >
                </uni-search-bar>
              </uni-section>
            </view>
          </view>

          <view
            class="form_sty_item"
            v-if="false"
          >
            <view style="width: 60px">检验项目：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product4"
                  filterable
                  :localdata="Productrange4"
                  dataKey="cProjectName"
                  dataValue="cProjectCode"
                  @change="PROchange4"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>

          <view class="form_sty_item">
            <view style="">设备名称：{{ getGWObj.cResourceName }}</view>
          </view>

          <view class="form_sty_item">
            <view style="width: 60px">任务单：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product5"
                  filterable
                  :localdata="Productrange5"
                  dataKey="cCode"
                  dataValue="UID"
                  @change="PROchange5"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view>
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
              @click="generateTask"
            >
              生成任务单
            </button>
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
              @click="checkPositionEnd"
            >
              工位校验
            </button>
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
              @click="checkLineEnd"
            >
              产线校验
            </button>
            <!-- <button class="mini-btn" style="color:black;backgroundColor:#aaaa7f;borderColor:#aaaa7f" type="warn"
							size="mini" @click="reset()">重置</button> -->
          </view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 370) + 'px'"
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
                    <view class="demo-uni-col dark">检验项目：{{ item.cProjectName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">指标编码：{{ item.cStandardCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">指标名称：{{ item.cStandardName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验标准：{{ item.cCheckTypeName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">分析方法：{{ item.cAnalysisTypeName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">最大值：{{ item.nMaxValue }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">最小值：{{ item.nMinValue }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="8">
                    <view class="demo-uni-col dark">结果：{{ item.IsOkName }}</view>
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
                        @click="clckType(item)"
                      >
                        记录结果
                      </button>
                      <!-- <button class="mini-btn"
												style="color:black;backgroundColor:#ffaa00;borderColor:#ffaa00"
												type="warn" size="mini" @click="Check(item)">检验</button> -->
                      <!-- <button class="mini-btn"
												style="color:black;backgroundColor:#ff0000;borderColor:#ff0000"
												type="warn" size="mini" @click="close(item)">关闭</button> -->
                    </view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </view>
      </view>
      <!-- 111 -->
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
            <view style="width: 60px">产线名称：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product11"
                  filterable
                  :localdata="Productrange11"
                  dataKey="cLineName"
                  dataValue="cLineCode"
                  @change="PROchange11"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view class="form_sty_item">
            <view style="width: 60px">工位名称：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product22"
                  filterable
                  :localdata="Productrange22"
                  dataKey="cPositionName"
                  dataValue="cPositionCode"
                  @change="PROchange22"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
            </view>
          </view>
          <view
            class="form_sty_item"
            v-if="false"
          >
            <view style="width: 60px">检验项目：</view>
            <view style="flex: 1">
              <uni-section
                title="可搜索"
                type="line"
              >
                <zxz-uni-data-select
                  v-model="Product33"
                  filterable
                  :localdata="Productrange33"
                  dataKey="cProjectName"
                  dataValue="cProjectCode"
                  @change="PROchange33"
                  :focus="PeofocusType"
                  placeholder="选择"
                ></zxz-uni-data-select>
              </uni-section>
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
            :style="'height:' + (h - 280) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in listDataJG"
              :key="index"
            >
              <view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验项目：{{ item.cProjectName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验指标：{{ item.cStandardName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">检验标准：{{ item.cGuideMemo }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">结果：{{ item.IsOkName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">任务单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">工位名称：{{ item.PositionCode }}</view>
                  </uni-col>
                  <uni-col :span="12"> </uni-col>
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
                        查看结果
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
    </view>
  </view>
</template>

<script setup>
import { ref, toRefs, reactive, nextTick, watch, createTextVNode } from 'vue'
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
  GetForList,
  GetLineByWork,
  GetPositionByLine,
  ResourceBycPositionCode,
  GetProgramByPosition,
  GetForList5,
  GetForList_S_ByMID,
  Add_QualityInspection,
  Factory_Line,
  FactoryGetPositionByLine,
  GetProgramByPositionAA,
  GetForPage_S_V,
  Check_Position_End,
  Check_Line_End
} from '@/api/xunxian.js'

let branch = ref()
const radioVal = ref('')
const yuanyin = ref('')
const inputDialog = ref()
const title = ref('巡线检验')
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
const items = ref(['巡线操作', '巡线结果'])
const code = ref()
const rado = ref('1')
const hege = ref('')
const gwVal = ref('')
const Product11 = ref('')
const Product22 = ref('')
const Product33 = ref('')
const getGWObj = ref({})
const Productrange11 = ref([])
const Productrange22 = ref([])
const Productrange33 = ref([])

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
const listDataJG = ref([])
//产品类型
const Product1 = ref('')
const Product2 = ref('')
const Product3 = ref('')
const Product4 = ref('')
const Product5 = ref('')
const Productrange = ref([
  { name: '合格', value: '1' },
  { name: '不合格', value: '0' }
])
const Productrange1 = ref([])
const Productrange2 = ref([])
const Productrange3 = ref([])
const Productrange4 = ref([])
const Productrange5 = ref([])
const PeofocusType = ref(false)
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
})
onUnload(() => {})
onHide(() => {})
onBackPress(() => {})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  getselList1()

  getselList5()
  getListJG()
  FactoryLine()
})
//Tab切换
const onClickItem = (e) => {
  console.log(e.currentIndex, '--e.currentIndex')
  radioVal.value = ''
  current.value = e.currentIndex
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  getselList1()
  reset()
}
// 获取当前时间
const today = new Date()
// 获取当前时间(today)的年份
const year = today.getFullYear()
// 获取月份
const month = String(today.getMonth() + 1).padStart(2, '0')
// 获取当前日
const day = String(today.getDate()).padStart(2, '0')
// 得到年月日
const thisDayDate = `${year}-${month}-${day}` //打印当前日期

const generateTask = () => {
  getselList5()
  Add_QualityInspection({
    cLineCode: Product2.value,
    cPersonCode: '',
    cPersonName: ''
  }).then((res) => {
    if (res.status == '200') {
      uni.showToast({
        icon: 'none',
        title: '操作成功'
      })
    } else {
      uni.showToast({
        icon: 'error',
        title: '操作失败'
      })
    }
  })
}

const checkPositionEnd = () => {
  if (!Product3.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择工位'
    })
    return false
  }
  if (!Product5.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择任务单'
    })
    return false
  }
  Check_Position_End({
    val: Product5.value,
    cPositionCode: Product3.value
  }).then((res) => {
    if (res.success) {
      uni.showToast({
        icon: 'none',
        title: res.data
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '操作失败'
      })
    }
  })
}
const checkLineEnd = () => {
  if (!Product5.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择任务单'
    })
    return false
  }
  Check_Line_End({
    val: Product5.value
  }).then((res) => {
    if (res.success) {
      uni.showToast({
        icon: 'none',
        title: res.data
      })
    } else {
      uni.showToast({
        icon: 'none',
        title: '操作失败'
      })
    }
  })
}

const xunjian = () => {
  if (
    !Productrange1.value.length ||
    !Productrange2.value.length ||
    !Productrange3.value.length ||
    !Productrange4.value.length
  ) {
    uni.showToast({
      icon: 'none',
      title: '请选项/输入数据'
    })
    return false
  }
  let Product1List = []
  Productrange1.value.forEach((item) => {
    if (Product1.value == item.cWorkCode) {
      Product1List.push(item)
    }
  })
  let Product2List = []
  Productrange2.value.forEach((item) => {
    if (Product2.value == item.cNodeResourceCode) {
      Product2List.push(item)
    }
  })
  console.log(Product3.value, '--333')
  console.log(Productrange3.value, '--333')
  let Product3List = []
  Productrange3.value.forEach((item) => {
    if (Product3.value == item.cPositionCode) {
      Product3List.push(item)
    }
  })
  let Product4List = []
  Productrange4.value.forEach((item) => {
    if (Product4.value == item.cProjectCode) {
      Product4List.push(item)
    }
  })
  let obj = {
    cCheckPersonCode: 'string',
    cVouchTypeCode: 'string',
    cCode: 'string',
    cProjectCode: Product3.value, //工位code
    cPARM24: Product1.value, //车间编码
    cPARM25: Product1List[0].cWorkName, //车间名称
    cPARM22: Product2List[0].cFactoryUnitName, //产线名称
    cPARM23: Product2.value, //产线编码
    cPARM30: Product3.value, //工位编码
    cPARM08: Product3List[0].cPositionName, //工位名称
    // "cPARM08": '11',//工位名称
    cPARM26: Product4.value, //项目编号
    cPARM27: Product4List[0].cProjectName, //项目名称
    cPARM28: getGWObj.value.cPositionCode, //设备编号
    cPARM29: getGWObj.value.cPositionName //设备名称
  }
  Add_QualityInspection(obj).then((res) => {
    if (res.status == '200') {
      uni.showToast({
        icon: 'none',
        title: '成功'
      })
    } else {
      uni.showToast({
        icon: 'error',
        title: '失败'
      })
    }
  })
}
const search = () => {
  // radioVal.value=''
  // currentPage.value=1
  // listData.value=[]
  getListJG()
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
  Product11.value = ''
  Product22.value = ''
  Product33.value = ''
  getListJG()
}
const getGW = () => {
  // gwVal.value
  let obj = {
    cPositionCode: gwVal.value,
    // cPositionCode:'G0123',
    cResourceTypeCode: '9',
    LineCode: Product2.value
    // LineCode:'CX0143',
  }
  ResourceBycPositionCode(obj).then((res) => {
    getGWObj.value = res.data
  })
}
const getselList1 = () => {
  GetForList().then((res) => {
    Productrange1.value = res.data
  })
}
const getselList2 = () => {
  let obj = {
    WorkCode: Product1.value
  }
  GetLineByWork(obj).then((res) => {
    Productrange2.value = res.data
  })
}
const getselList3 = () => {
  let obj = {
    LineCode: Product2.value
  }
  GetPositionByLine(obj).then((res) => {
    Productrange3.value = res.data
  })
}
const getselList4 = () => {
  console.log(Product2.value, '--Product2.value')
  let obj = {
    LineCode: Product2.value,
    PositionCode: Productrange3.value[0].cPositionCode
  }
  GetProgramByPosition(obj).then((res) => {
    Productrange4.value = res.data
  })
}

const getselList5 = () => {
  console.log(Product2.value, '--Product2.value')
  let Conditions = `cVouchTypeCode=9 && istatus in (0,1) && dDate=${thisDayDate}`
  // 产线编码
  if (Product2.value) {
    Conditions += ` && cPARM23=${Product2.value}`
  }
  let obj = {
    // cResourceTypeCode: '9',
    // cPARM23: 'CX0003',
    // // cPARM23: Product2.value,
    // dDate: thisDayDate,
    Conditions
  }
  GetForList5(obj).then((res) => {
    Productrange5.value = res.data
  })
}
const PROchange1 = () => {
  getselList2()
}
const PROchange2 = () => {
  getselList3()
  getselList5()
}
const PROchange3 = () => {
  console.log(3)
  getselList4()
}
const PROchange4 = () => {
  console.log(4)
}
const PROchange5 = () => {
  console.log(5)
  getList()
}
const PROchange11 = () => {
  console.log(5)
  FactoryGetPositionByLineajax()
}
const PROchange22 = () => {
  console.log(5)
  GetProgramByPositionAAajax()
}
const PROchange33 = () => {
  console.log(5)
}
const getList = () => {
  console.log(current.value, 'currentPage.value.valuerm.value')

  let obj = {
    val: Product5.value
    // val:'B7BB5159-E8F0-4B10-853E-E07BF8F1F24F'
  }
  uni.showLoading({
    title: '加载中'
  })
  if (current.value == '0') {
    GetForList_S_ByMID(obj).then((res) => {
      uni.hideLoading()
      uni.stopPullDownRefresh()

      listData.value = res.data
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
//结果
const FactoryLine = () => {
  let obj = {
    OrderByFileds: '',
    Conditions: ''
  }
  Factory_Line(obj).then((res) => {
    Productrange11.value = res.data
  })
}
const FactoryGetPositionByLineajax = () => {
  let obj = {
    LineCode: Product11.value,
    PositionCode: Product22.value
  }
  FactoryGetPositionByLine(obj).then((res) => {
    Productrange33.value = res.data
  })
}
const GetProgramByPositionAAajax = () => {
  let obj = {
    LineCode: Product11.value
  }
  GetProgramByPositionAA(obj).then((res) => {
    Productrange22.value = res.data
  })
}
const getListJG = () => {
  let val = [
    {
      cAttributeCode: 'cVouchTypeCode',
      cAttributeCodeValue: '9',
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
      cAttributeCodeValue: form.value.date
        ? '"' + form.value.date + ' 00:00:00" && dDate < ' + '"' + form.value.date + ' 23:59:59"'
        : '',
      cConditions: '='
    },
    {
      cAttributeCode: 'LineCode', //产线
      cAttributeCodeValue: Product11.value ? Product11.value : '',
      cConditions: '='
    },
    {
      cAttributeCode: 'PositionCode', //工位
      cAttributeCodeValue: Product22.value ? Product22.value : '',
      cConditions: '='
    },
    {
      cAttributeCode: 'cProgramCode', //项目
      cAttributeCodeValue: Product33.value ? Product33.value : '',
      cConditions: '='
    }
  ]
  let obj = {
    OrderByFileds: '',
    PageSize: 100,
    PageIndex: currentPage.value,
    Conditions: filterModel(val)
  }
  GetForPage_S_V(obj).then((res) => {
    listDataJG.value = res.data.data
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
const inputChange = () => {
  console.log(111)
}

const PeoFoucs = () => {
  console.log(3333)
}
const clckType = (v) => {
  if (v.cAnalysisTypeName == '定量') {
    uni.navigateTo({
      url: '/pages/LineInspectionview/LineInspectionviewDL?obj=' + JSON.stringify(v)
    })
  } else {
    uni.navigateTo({
      url: '/pages/LineInspectionview/LineInspectionviewDX?obj=' + JSON.stringify(v)
    })
  }
}
//
const clickJYB = (v) => {
  console.log(v)
  if (v.cAnalysisTypeName == '定量') {
    uni.navigateTo({
      url: '/pages/LineInspectionview/LineInspectionviewViewDL?obj=' + JSON.stringify(v)
    })
  } else {
    uni.navigateTo({
      url: '/pages/LineInspectionview/LineInspectionviewViewDX?obj=' + JSON.stringify(v)
    })
  }
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
    getListJG()
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
