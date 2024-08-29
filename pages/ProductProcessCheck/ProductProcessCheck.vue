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
      <view v-if="current === 0">
        <view
          class="ChangTarg"
          style="display: flex; align-items: center; justify-content: flex-start"
        >
          <view style="width: 15%; margin: 0 10px">扫描工位:</view>
          <view style="width: 60%">
            <up-input
              :disabled="disabled"
              v-model="Station"
              @confirm="GetData"
              :focus="focusType"
              placeholder="请扫描工位"
            />
          </view>
        </view>
        <view style="margin-left: 10px; font-size: 14px">
          <uni-row class="demo-uni-row">
            <uni-col :span="14">
              <view class="demo-uni-col dark">工位名称：{{ DevData?.cPositionName }}</view>
            </uni-col>
            <uni-col :span="10">
              <view class="demo-uni-col dark"></view>
            </uni-col>
          </uni-row>
        </view>
        <view class="uni-padding-wrap uni-common-mt">
          <uni-segmented-control
            :current="currents"
            :values="itemss"
            :style-type="styleTypes"
            :active-color="activeColors"
            @clickItem="onClickItems"
            @click="ChangTabs"
          />
        </view>
        <view v-if="currents === 0">
          <view
            class="ChangTarg"
            style="display: flex; align-items: center; justify-content: flex-start"
          >
            <view style="width: 15%; margin: 0 10px">扫描产品:</view>
            <view style="width: 60%">
              <up-input
                :disabled="Productdisabled"
                v-model="Product"
                @confirm="ProductGetData"
                :focus="ProductfocusType"
                placeholder="请扫描产品"
              />
            </view>
          </view>

          <view class="row-p">
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">订单号：{{ ProductList?.cSourceCode }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">产品名称：{{ ProductList?.cInvName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">品牌：{{ ProductList?.cPARM05 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">是否样品：{{ ProductList?.cPARM04 }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">尺寸：{{ ProductList?.cPARM06 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">材质：{{ ProductList?.cPARM07 }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">备注：{{ ProductList?.cPARM010 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">工序名称：{{ ProductList?.cPARM09 }}</view>
              </uni-col>
            </uni-row>
            <view
              style="color: red; font-size: 16px; text-align: center"
              v-if="Show"
              >注意此单为内返单！</view
            >
          </view>
          <view class="listMain">
            <scroll-view
              :style="'height:' + (h - 520) + 'px'"
              scroll-y="true"
              lower-threshold="50"
              show-scrollbar="true"
              @scrolltolower="scrolltolower"
            >
              <view
                class="project"
                v-for="(item, index) in ProductList?.list_s"
                :key="index"
              >
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">检验指标：{{ item.cStandardName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">分析方法：{{ item.cAnalysisTypeName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">检验标准：{{ item.cGuideMemo }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">结果：{{ item.IsOKName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                </uni-row>
              </view>
              <uni-load-more :status="more"></uni-load-more>
            </scroll-view>
          </view>
        </view>

        <view v-if="currents === 1">
          <view
            class="ChangTarg"
            style="display: flex; align-items: center; justify-content: flex-start"
          >
            <view style="width: 15%; margin: 0 10px">扫描产品:</view>
            <view style="width: 60%">
              <up-input
                :disabled="Productdisabled"
                v-model="badProduct"
                @confirm="ProductGetDatas"
                :focus="ProductfocusType"
                placeholder="请扫描产品"
              />
            </view>
          </view>

          <view class="row-p">
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">订单号：{{ BadProductList?.cSourceCode }} </view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">产品名称：{{ BadProductList?.cInvName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">品牌：{{ BadProductList?.cPARM05 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view class="demo-uni-col dark">是否样品：{{ BadProductList?.cPARM04 }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">尺寸：{{ BadProductList?.cPARM06 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view
                  class="demo-uni-col dark"
                  @click="preview(1, PicArr[0])"
                >
                  图片1：{{ PicArr[0] }}
                </view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">备注：{{ BadProductList?.cPARM010 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view
                  class="demo-uni-col dark"
                  @click="preview(1, PicArr[1])"
                >
                  图片2：{{ PicArr[1] }}
                </view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="10">
                <view class="demo-uni-col dark">工序名称：{{ BadProductList?.cPARM09 }}</view>
              </uni-col>
              <uni-col :span="16">
                <view
                  class="demo-uni-col dark"
                  @click="preview(2, PicArr[2])"
                >
                  图片3：{{ PicArr[2] }}
                </view>
              </uni-col>
            </uni-row>
            <uni-row
              class="demo-uni-row"
              style="display: flex; align-items: center"
            >
              <uni-col :span="16">
                <view class="demo-uni-col dark">材质：{{ BadProductList?.cPARM07 }}</view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="TackPic"
                  >
                    拍照
                  </button>
                </view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="16">
                <view
                  class="demo-uni-col dark"
                  style="display: flex; align-items: center"
                >
                  <view> 指标名称：</view>
                  <up-input
                    v-model="filterName"
                    placeholder="请输入指标名称"
                    clearable
                  />
                </view>
              </uni-col>
              <uni-col :span="8">
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="searchFilterName"
                  >
                    过滤
                  </button>
                </view>
              </uni-col>
            </uni-row>

            <view
              style="color: red; font-size: 16px; text-align: center"
              v-if="Shows"
              >注意此单为内返单！</view
            >
          </view>

          <view class="listMain">
            <scroll-view
              :style="'height:' + (h - 650) + 'px'"
              scroll-y="true"
              lower-threshold="50"
              show-scrollbar="true"
              @scrolltolower="scrolltolower"
            >
              <view
                class="project"
                v-for="(item, index) in filteredList"
                :key="index"
              >
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">检验指标：{{ item.cStandardName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">分析方法：{{ item.cAnalysisTypeName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">检验标准：{{ item.cGuideMemo }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">结果：{{ item.IsOKName }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">
                      <button
                        class="mini-btn"
                        type="warn"
                        :style="{ background: item.IsOKName == '合格' ? 'green' : 'red' }"
                        size="mini"
                        @click="ChangeStatus(item, index)"
                      >
                        {{ item.IsOKName == '合格' ? '合格' : '不合格' }}
                      </button>
                    </view>
                  </uni-col>
                </uni-row>
              </view>
              <uni-load-more :status="more"></uni-load-more>
            </scroll-view>
          </view>
          <view style="display: flex">
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="pUTlISYT"
            >
              提交
            </button>
          </view>
        </view>
      </view>
      <view v-if="current === 1">
        <view
          class="example-body"
          style="margin: 0 10px"
        >
          <!-- 搜索框 -->
          <uni-datetime-picker
            v-model="Timerange"
            type="daterange"
            @maskClick="maskClick"
          />
        </view>
        <view style="display: flex; align-items: center; padding: 0 10px">
          <view style="width: 60px">产线：</view>
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
                  :focus="LinefocusType"
                  @input="LineFoucs"
                  placeholder="请选择产线"
                ></zxz-uni-data-select>
              </view>
            </uni-section>
          </view>
        </view>
        <view style="display: flex; align-items: center; padding: 0 10px">
          <view style="width: 60px">工位：</view>
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
                  v-model="Product"
                  filterable
                  :localdata="Productrange"
                  @inputChange="inputChange"
                  @change="PROchange"
                  :focus="PeofocusType"
                  @input="PeoFoucs"
                  placeholder="请选择产工位"
                ></zxz-uni-data-select>
              </view>
            </uni-section>
          </view>
        </view>

        <view
          class="search-wl"
          style="display: flex; align-items: center"
        >
          <view
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 10px;
            "
          >
            <view style="width: 60px">结果：</view>
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
                    v-model="Result"
                    filterable
                    :localdata="Resultrange"
                    @inputChange="ResultinputChange"
                    @change="Resultchange"
                    :focus="ResultfocusType"
                    @input="ResultFoucs"
                    placeholder="请选择结果"
                  ></zxz-uni-data-select>
                </view>
              </uni-section>
            </view>
          </view>
          <button
            class="mini-btn"
            style="
              color: black;
              backgroundcolor: #e8e873;
              bordercolor: #e8e873;
              width: 20%;
              height: 30px;
            "
            type="warn"
            size="mini"
            @click="getSearch"
          >
            搜索
          </button>
        </view>
        <view style="display: flex; justify-content: space-around; margin: 10rpx 0">
          <view class="demo-uni-col dark">总数量：{{ dataNum?.TotalCount }}</view>
          <view class="demo-uni-col dark">合格数量：{{ dataNum?.OKCount }}</view>
          <view class="demo-uni-col dark">不良数量：{{ dataNum?.BADCount }}</view>
        </view>
        <view class="listMain">
          <scroll-view
            :style="'height:' + (h - 220) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view
              class="project"
              v-for="(item, index) in TwoPageList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">序列号：{{ item.cPARM17 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">订单号：{{ item.cSourceCode }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">工位名称：{{ item.cPARM08 }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col dark">工序名称：{{ item.cPARM09 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">是否样品：{{ item.cPARM04 }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light">品牌：{{ item.cPARM05 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">尺寸：{{ item.cPARM06 }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light">材质：{{ item.cPARM07 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">检验结果：{{ item.IsOKName }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light">备注：{{ item.cPARM10 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">是否处理：{{ item.cPARM18 }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light">
                      <button
                        class="mini-btn"
                        style="
                          color: black;
                          backgroundcolor: #e8e873;
                          bordercolor: #e8e873;
                          height: 30px;
                        "
                        type="warn"
                        size="mini"
                        @click="GoCheck(item)"
                      >
                        查看指标
                      </button>
                    </view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="TwoPageList.length"
            ></uni-load-more>
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
import {
  GetProductScan,
  GetStationScan,
  GetBadProductScan,
  ProductPut,
  getCheckEdList,
  GetProudctClassify,
  GetGropList
} from '@/api/Quanilty.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
const title = ref('生产过程')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['检验操作', '已检验'])
const currents = ref(0)
const styleTypes = ref('button')
const activeColors = ref('#ff0000')
const itemss = ref(['合格', '不良'])

const range = ref([]) //设备下拉
const DevArr = ref([]) //设备数组
const Fauvalue = ref() //下拉故障
const Faurange = ref([]) //下拉故障数组
const FauCode = ref() //故障编码
const Textvalue = ref() //描述
const checkVal = ref('0') //复选框
const checked = ref(false)
//工位数据
const Station = ref()
const focusType = ref(true)
const TextfocusType = ref(false)
const disabled = ref(false)
const DevData = ref({})
const searchValue = ref()
//产品输入框
const Product = ref()
const ProductfocusType = ref(false)
const ProductTextfocusType = ref(true)
const Productdisabled = ref(true)
const ProductList = ref()
const badProduct = ref()
const BadProductList = ref()
const Show = ref(false)
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
//图片
const PicArr = ref([])
//总页数
const pageTotal = ref(0)
const name = ref('')
const DevDataList = ref([])
const drawer2 = ref(false)
const DevName = ref('')
const showRight = ref()
const tirgger = ref(false)
//下拉
const Productrange = ref([])
const Line = ref()
const Linerange = ref([])
const Resultrange = ref([])
const Result = ref()
const LinefocusType = ref(false)
const PeofocusType = ref(false)
const ResultfocusType = ref(false)
const Shows = ref(false)
onShow(() => {
  // setfocus()
})
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
  setfocus()
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const Productsetfocus = () => {
  ProductfocusType.value = false
  setTimeout(() => {
    ProductfocusType.value = true
  }, 200)
}
const ChangTab = () => {
  // if (current.value == 1) {
  // 	PageList.value = []
  // 	currentPage.value = 1
  // 	total.value = 0
  // 	getForPage()
  // }
}
const ChangTabs = () => {
  if (currents.value == 1) {
  }
}
//Tab切换
const onClickItems = (e) => {
  if (currents.value !== e.currentIndex) {
    currents.value = e.currentIndex
  }
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 1) {
    // PageList.value = []
    // currentPage.value = 1
    // total.value = 0
    GetPageTwoList()
    GetData() //工位
    GetProduct() //结果
    GetLine() //产线
  }
}
const LineinputChange = () => {}
const inputChange = () => {}
const ResultinputChange = () => {}
const LineName = ref()
const ProductName = ref()
const PROchange = (i) => {
  console.log(i, '工位-----------')
  ProductName.value = i.text
}
const Resultchange = (i) => {}
const Linechange = (i) => {
  console.log(i, '产线-------')
  LineName.value = i.text
}
const LineFoucs = () => {}
const PeoFoucs = () => {}
const ResultFoucs = () => {}
//扫描工位
const GetData = () => {
  GetStationScan({
    OrderByFileds: '',
    Conditions: Station.value ? `cPositionCode = ${Station.value}` : ''
  }).then((res) => {
    if (res.status == 200) {
      DevArr.value = res.data
      if (Station.value && res.data.length > 0) {
        DevData.value = res.data[0]
      } else {
        uni.showToast({
          icon: 'none',
          title: '工位不存在！'
        })
        setfocus()
        return
      }
      Productdisabled.value = false
      Productsetfocus()

      Productrange.value = res.data.map((i) => {
        return {
          value: i.cPositionCode,
          text: i.cPositionName
        }
      })
      uni.stopPullDownRefresh()
    }
  })
}

//扫描产品--合格
const ProductGetData = () => {
  if (!DevData.value?.cPositionCode) {
    uni.showToast({
      icon: 'none',
      title: '请扫描工位！'
    })
    return
  }
  Show.value = false
  GetProductScan({
    cPositionCode: DevData.value?.cPositionCode,
    cBarCode: Product.value
  })
    .then((res) => {
      if (res.status == 200) {
        ProductList.value = res.data
        let words = RegExp(/反馈/)
        if (words.test(ProductList.value?.cPARM03)) {
          Show.value = true
        }
        uni.stopPullDownRefresh()
      }
      Productsetfocus()
    })
    .catch(() => {
      Product.value = ''
    })
}
//扫描产品--不良
const ProductGetDatas = () => {
  Shows.value = false
  GetBadProductScan({
    cPositionCode: DevData.value?.cPositionCode,
    cBarCode: badProduct.value
  })
    .then((res) => {
      if (res.status == 200) {
        BadProductList.value = res.data
        uni.hideLoading()
        uni.stopPullDownRefresh()
        let words = RegExp(/反馈/)
        if (words.test(BadProductList.value?.cPARM03)) {
          Shows.value = true
        }
      }
      Productsetfocus()
    })
    .catch(() => {
      badProduct.value = ''
    })
}
const ChangeStatus = (i, index) => {
  if (i.IsOKName == '合格') {
    i.IsOKName = '不合格'
    BadProductList.value.list_s.forEach((item) => {
      if (item.UID == i.UID) {
        i.IsOK = false
      }
    })
  } else {
    i.IsOKName = '合格'
    BadProductList.value.list_s.forEach((item) => {
      if (item.UID == i.UID) {
        i.IsOK = true
      }
    })
  }
}
//图片保存
const PICURL = ref([])
const msg = ref({})
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
        // 'MID': Info.value.UID,
        // 'cModeCode': 'QC.CheckVouch.R',
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
        msg.value = JSON.parse(uploadFileRes.data)
        PICURL.value.push(msg.value.data.UID)
      }
    })
  })
}
//不良提交
const pUTlISYT = () => {
  if (!BadProductList.value || PICURL.value.length <= 0) {
    uni.showToast({
      icon: 'none',
      title: '请扫描产品/拍照！'
    })
    return
  }
  ProductPut({
    Data: BadProductList.value,
    list_fileUID: PICURL.value
  }).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'none',
        title: '提交成功！'
      })
      BadProductList.value = {}
      PICURL.value = []
      PicArr.value = []
    }
  })
}

const GetProduct = () => {
  GetProudctClassify({
    cTableCode: 'FM_QC_CHECKVOUCH',
    cAttributeCode: 'IsOK'
  }).then((res) => {
    if (res.status == 200) {
      Resultrange.value = res.data.map((i) => {
        return {
          value: i.cDictonaryCode,
          text: i.cDictonaryName
        }
      })
    }
  })
}
const GetLine = () => {
  GetGropList({
    OrderByFileds: '',
    Conditions: ''
  }).then((res) => {
    if (res.status == 200) {
      Linerange.value = res.data.map((i) => {
        return {
          value: i.cFactoryUnitCode,
          text: i.cFactoryUnitName
        }
      })
    }
  })
}
const TwoPageList = ref([])
const dataNum = ref({})
const filterName = ref('')
const filteredList = ref([])
const searchFilterName = () => {
  if (!filterName.value) {
    filteredList.value = BadProductList.value?.list_s
    return
  }
  filteredList.value = BadProductList.value?.list_s.filter((item) =>
    item.cStandardName.includes(filterName.value)
  )
}
//以检验--列表
const GetPageTwoList = () => {
  uni.showLoading({
    title: '搜索中...'
  })
  if (Timerange.value.length) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  getCheckEdList({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: '',
    Conditions:
      Product.value && Line.value && Timerange.value.length > 0 && Result.value
        ? `cPARM08 like ${ProductName.value} && cFactoryUnitName like ${LineName.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}&& IsOK=${Result.value}`
        : Product.value && Line.value && Timerange.value.length > 0
          ? `cPARM08 like ${ProductName.value} &&  cFactoryUnitName like ${LineName.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
          : Product.value && Timerange.value.length > 0 && Result.value
            ? `cPARM08 like ${ProductName.value} && IsOK=${Result.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
            : Line.value && Timerange.value.length > 0 && Result.value
              ? `cPARM08 like ${ProductName.value}cFactoryUnitName like ${LineName.value} && IsOK=${Result.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
              : Product.value && Line.value && Result.value
                ? `cPARM08 like ${ProductName.value} && cFactoryUnitName like ${LineName.value} && IsOK=${Result.value}`
                : Timerange.value.length > 0 && Product.value
                  ? `cPARM08 like ${ProductName.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
                  : Timerange.value.length > 0 && Line.value
                    ? `cFactoryUnitName like ${LineName.value} && dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
                    : Product.value && Line.value
                      ? `cPARM08 like ${ProductName.value} && cFactoryUnitName like ${LineName.value}`
                      : Result.value && Product.value
                        ? `IsOK=${Result.value} && cPARM08 like ${ProductName.value}`
                        : Result.value && Line.value
                          ? `IsOK=${Result.value} && cFactoryUnitName like ${LineName.value}`
                          : Result.value && Timerange.value.length > 0
                            ? `dDate>=${BeginTime.value} && dDate<=${EndTime.value} && IsOK=${Result.value}`
                            : Timerange.value.length > 0
                              ? `dDate>=${BeginTime.value} && dDate<=${EndTime.value}`
                              : Product.value
                                ? `cPARM08 like ${ProductName.value}`
                                : Line.value
                                  ? `cFactoryUnitName like ${LineName.value}`
                                  : Result.value
                                    ? `IsOK=${Result.value}`
                                    : ''
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      dataNum.value = res.data
      TwoPageList.value = [...TwoPageList.value, ...res.data?.PageData.data]
      total.value = res.data.PageData?.dataCount
      pageTotal.value = res.data.PageData?.pageCount
    } else {
      uni.hideLoading()
    }
  })
}

//拍照
const TackPic = () => {
  openSelectImage()
}
const PicStr = ref([])
//调取拍照
const openSelectImage = () => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      if (res.tempFilePaths?.length > 0) {
        PicArr.value = [...PicArr.value, ...res.tempFilePaths]
        PicSave()
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
  if (current.value == 0) {
    uni.previewImage({
      current: index,
      urls: PicArr.value
    })
  }
}
//删除照片
const DELPicList = (item, index) => {
  PicArr.value.splice(index, 1)
}
//保存
const Save = () => {
  if (!PicArr.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请拍照'
    })
    return
  }
  PicArr.value.forEach((item) => {
    uni.uploadFile({
      url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/Add',
      filePath: item,
      name: 'list_file',
      formData: {
        cDeviceCode: DevData.value.cDeviceCode,
        cFaultCode: FauCode.value,
        IsStop: checked.value,
        // 'cPARM01': Parm01.value,
        cPARM02: '5',
        // 'cPARM03': Parm03.value,
        cMemo: Textvalue.value
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
      }
    })
  })
}
const maskClick = () => {}
const BeginTime = ref()
const EndTime = ref()
const sear = ref(false)
const getSearch = () => {
  // PageList.value = []
  // currentPage.value = 1
  // total.value = 0
  // sear.value = true

  // getForPage()
  if (current.value == 1) {
    TwoPageList.value = []
    currentPage.value = 1
    total.value = 0
    if (Timerange.value) {
      BeginTime.value = Timerange.value[0]
      EndTime.value = Timerange.value[1]
    }
    GetPageTwoList()
  }
}

const GoCheck = (i) => {
  uni.navigateTo({
    url: '/pages/ProductProcessCheck/CheckTarget/CheckTarget?Info=' + JSON.stringify(i)
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 1) {
    currentPage.value = 1
    total.value = 0
    TwoPageList.value = []
    GetPageTwoList()
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
      GetPageTwoList()
    }
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
