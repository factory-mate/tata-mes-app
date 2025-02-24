<template>
  <view class="bgc">
    <view class="newsBox">
      <uni-nav-bar
        dark
        shadow
        background-color="red"
        status-bar
        left-icon="left"
        :title="title"
        @clickLeft="clickLeft"
        right-icon="home"
        @clickRight="clickHome"
      />
      <view class="search-wl">
        <!-- 搜索框 -->
        <view class="top-search">
          <uni-section
            title=""
            type="line"
            v-if="branch != 'alps'"
          >
            <up-input
              v-if="current == 0"
              v-model="wuValue"
              @confirm="searchWu('model')"
              placeholder="请输入物料条码"
            />

            <up-input
              v-else
              v-model="KuValue"
              @confirm="searchKu('model')"
              placeholder="请输入库位条码"
            />
          </uni-section>
          <view v-else>
            <up-input
              v-if="current == 0"
              class="inputSty"
              v-model="wuValue"
              :focus="focusType"
              @blur="setfocus"
              @input="searchWu('PDA')"
              placeholder="请输入物料条码"
            />
            <up-input
              v-else
              class="inputSty"
              v-model="KuValue"
              :focus="focusType"
              @blur="setfocus"
              @input="searchKu('PDA')"
              placeholder="请输入库位条码"
            />
          </view>
        </view>
      </view>
      <view class="Allcontent">
        <uni-section
          title=""
          type="line"
        >
          <view class="uni-padding-wrap uni-common-mt">
            <uni-segmented-control
              class="button"
              :current="current"
              :values="items"
              :style-type="styleType"
              :active-color="activeColor"
              @clickItem="onClickItem"
            />
          </view>
          <view class="head-text">
            <view class="wahouse">
              仓库：
              <!-- <text v-if="current === 0">{{ wuList.length ? wuList[0].cWhName : '' }}</text> -->
              <text>{{ kuList.length ? kuList[0].cWhName : '' }}</text>
              <text
                v-if="wuList.length && current == 0"
                style="float: right"
                >总数：{{ wuList.length }}</text
              >
              <text
                v-if="kuList.length && current == 1"
                style="float: right"
                >已入：{{ ruKuLen }}/{{ Ktotal }}</text
              >
            </view>
            <view class="wastation">
              库位：
              <!-- <text v-if="current === 0">{{ wuList.length ? wuList[0].cPosCode : '' }}</text> -->
              <text>{{ kuList.length ? kuList[0].cPosCode : '' }}</text>
              <text v-if="current === 1">
                <text
                  v-if="kuList.length ? kuList[0].PosTypeName == '待分配' : ''"
                  style="color: yellow; float: right"
                >
                  {{ kuList.length ? kuList[0].PosTypeName : '' }}
                </text>
                <text
                  v-if="kuList.length ? kuList[0].PosTypeName == '未入库' : ''"
                  style="color: red; float: right"
                >
                  {{ kuList.length ? kuList[0].PosTypeName : '' }}
                </text>
                <text
                  v-if="kuList.length ? kuList[0].PosTypeName == '部分入库' : ''"
                  style="color: orange; float: right"
                >
                  {{ kuList.length ? kuList[0].PosTypeName : '' }}
                </text>
                <text
                  v-if="kuList.length ? kuList[0].PosTypeName == '全部入库' : ''"
                  style="color: green; float: right"
                >
                  {{ kuList.length ? kuList[0].PosTypeName : '' }}
                </text>
              </text>
            </view>
            <!-- 分割线 -->
            <view class="color"> </view>
          </view>

          <view class="content">
            <!-- 已扫描 列表  物料 -->
            <view
              v-show="current === 0"
              class="listCon"
            >
              <scroll-view
                scroll-y="true"
                lower-threshold="30"
                show-scrollbar="true"
                @scrolltolower="scrolltolowerWu"
                :style="'height:' + (h - 400) + 'px'"
              >
                <view
                  class="scan-list"
                  v-for="(item, index) in wuList"
                  :key="index"
                >
                  <uni-swipe-action>
                    <uni-swipe-action-item
                      :right-options="options"
                      @click="delWuItem(item.Pbarcode, index)"
                      @change="change"
                    >
                      <view class="index-demo">
                        <view class="total">{{ index + 1 }}</view>
                      </view>

                      <view
                        class="project"
                        @click="goDetail(item)"
                      >
                        <uni-row class="demo-uni-row">
                          <uni-col :span="12">
                            <view class="demo-uni-col dark"
                              >单号：<text>{{ item.cCode }}</text>
                            </view>
                          </uni-col>
                          <uni-col :span="12">
                            <view class="demo-uni-col light">
                              <view>{{ item.scantime }}</view>
                            </view>
                          </uni-col>
                        </uni-row>
                        <uni-row class="demo-uni-row">
                          <uni-col :span="12">
                            <view class="demo-uni-col dark"
                              >单内序号：<text>{{ item.ProductIndex }}</text>
                            </view>
                          </uni-col>
                          <uni-col :span="12">
                            <view class="demo-uni-col light"
                              >包号：<text>{{ item.Pbarcode }}</text>
                            </view>
                          </uni-col>
                        </uni-row>
                        <uni-row class="demo-uni-row">
                          <uni-col :span="12">
                            <view class="demo-uni-col dark"
                              >发货批号：<text>{{ item.SendBatch }}</text>
                            </view>
                          </uni-col>
                          <uni-col :span="12">
                            <view class="demo-uni-col light"
                              >仓位：<text>{{ item.cPosCode }}</text>
                            </view>
                          </uni-col>
                        </uni-row>
                      </view>
                    </uni-swipe-action-item>
                  </uni-swipe-action>
                </view>
              </scroll-view>
              <!-- </scroll-view> -->
            </view>
            <!-- 在库列表 -->
            <view
              v-show="current === 1"
              class="listCon"
            >
              <scroll-view
                scroll-y="true"
                lower-threshold="30"
                show-scrollbar="true"
                @scrolltolower="scrolltolower"
                :style="'height:' + (h - 310) + 'px'"
              >
                <view
                  class="scan-list"
                  v-for="(item, index) in kuList"
                  :key="item.Pbarcode"
                >
                  <uni-swipe-action>
                    <!-- :right-options="options" -->
                    <uni-swipe-action-item>
                      <view class="index-demo">
                        <view class="total">{{ index + 1 }}</view>
                      </view>

                      <view class="project">
                        <uni-row class="demo-uni-row">
                          <uni-col :span="12">
                            <view class="demo-uni-col dark"
                              >单号：<text>{{ item.cCode }}</text>
                            </view>
                          </uni-col>
                          <uni-col :span="12">
                            <view class="demo-uni-col light">
                              <text
                                v-if="item.InType == '未入库'"
                                style="color: red"
                                >{{ item.InType }}</text
                              >
                              <text
                                v-if="item.InType == '已入库'"
                                style="color: green"
                                >{{ item.InType }}</text
                              >
                            </view>
                          </uni-col>
                        </uni-row>
                        <uni-row class="demo-uni-row">
                          <uni-col :span="12">
                            <view class="demo-uni-col dark"
                              >单内序号：<text>{{ item.ProductIndex }}</text>
                            </view>
                          </uni-col>
                          <uni-col :span="12">
                            <view class="demo-uni-col light"
                              >包号：<text>{{ item.Pbarcode }}</text>
                            </view>
                          </uni-col>
                        </uni-row>
                        <uni-row class="demo-uni-row">
                          <uni-col :span="12">
                            <view class="demo-uni-col dark"
                              >发货批号：<text>{{ item.SendBatch }}</text>
                            </view>
                          </uni-col>
                          <uni-col :span="12">
                            <view class="demo-uni-col light"
                              >仓位：<text>{{ item.cPosCode }}</text>
                            </view>
                          </uni-col>
                        </uni-row>
                      </view>
                    </uni-swipe-action-item>
                  </uni-swipe-action>
                </view>
                <uni-load-more
                  :status="more"
                  v-if="kuList.length"
                ></uni-load-more>
              </scroll-view>
            </view>
          </view>
        </uni-section>
      </view>

      <view
        class="button-wl"
        v-if="current == 0"
        :style="'bottom:' + branch != 'alps' ? '0' : '70rpx'"
      >
        <button
          type="default"
          :disabled="!wuList.length"
          class="put-btn"
          @click="clickWuList"
          style="color: red"
        >
          提交出库
        </button>
        <!-- <button type="primary" :disabled="!kuList.length" class="scan-btn" @click="wuCode">扫描物料条码</button> -->
      </view>
      <!-- <view class="button-wl" v-if="current==1">
				<button class="scan-btn" type="primary" @click="kuCode">扫描库位条码</button>
			</view> -->
    </view>
  </view>
</template>
<script setup>
import _ from 'lodash'
import { TimeCha, time } from '@/utils/time.js'
import {
  getStationInfo,
  getWLInfo,
  ScanOut,
  PosScanOut,
  errLog
} from '../../../../api/inStorage.js'
import { reactive, ref, getCurrentInstance } from 'vue'
import {
  onLoad,
  onShow,
  onUnload,
  onHide,
  onBackPress,
  onPullDownRefresh,
  onReachBottom
} from '@dcloudio/uni-app'
const branch = ref('')
const title = ref('成品出库')
const focusType = ref(true)
const KuValue = ref('') //AM001K
const wuValue = ref('')
const h = ref('100')
const ctype = ref(2)
const codeType = ref('')
const Ypage = ref(1)
const YpageSize = ref(5)
const YpageTotal = ref(0)
const Ytotal = ref(0)
const Kpage = ref(1)
const KpageSize = ref(5)
const KpageTotal = ref(0)
const Ktotal = ref(0)
const more = ref('more')
const moreW = ref('more')
const timeVal = ref('')

onShow((val) => {
  setfocus()
  Ypage.value = 1
  // wuAxiosList()
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  h.value = uni.getSystemInfoSync().windowHeight

  // if(uni.getStorageSync('unit').brand == 'alps'){
  // 	 h.value=h.value - 30;
  // }
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
})
onLoad((val) => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  h.value = uni.getSystemInfoSync().windowHeight
  // if(uni.getStorageSync('unit').brand == 'alps'){
  // 	 h.value=h.value - 30;
  // }
  ctype.value = val.type
  if (val.type == 2) {
    title.value = '成品出库'
  } else {
    title.value = '全库位出库'
  }
})
onUnload(() => {
  uni.removeStorageSync('KuValue')
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
onBackPress((event) => {
  //离开页面

  uni.removeStorageSync('KuValue')
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
// watch(KuValue,(newVal,oldval)=>{
// 	console.log(newVal,"----23423434");
// })
const keypress = (e) => {
  codeType.value = ''
  // console.log(e.keyCode, "----------按键码");
  // 102  左侧    103  右侧   104  中间按键
  // #ifdef APP-PLUS
  if (e.keyCode == 66 || e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
    codeType.value = 'enter'
    // kuList.value=[]
    if (current.value == 0) {
      searchWu(branch.value == 'alps' ? 'PDA' : 'model')
    }
    if (current.value == 1) {
      searchKu(branch.value == 'alps' ? 'PDA' : 'model')
    }
  }
  // #endif
  // #ifdef H5
  if (e.key == 'Enter') {
    codeType.value = 'enter'
    // kuList.value=[]
    if (current.value == 0) {
      searchWu(branch.value == 'alps' ? 'PDA' : 'model')
    }
    if (current.value == 1) {
      searchKu(branch.value == 'alps' ? 'PDA' : 'model')
    }
  }
  // #endif
}
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
//切换按钮设置
const items = reactive(['已扫描', '在库列表'])
const styles = reactive([
  {
    value: 'button',
    text: '按钮',
    checked: true
  },
  {
    value: 'text',
    text: '文字'
  }
])
const colors = ref('#000000')
let current = ref(1)
const colorIndex = ref(0)
const activeColor = ref('red')
const styleType = ref('button')
const kuList = ref([])
const wuList = ref([])
const ruKuLen = ref(0)
const kuCodeValue = ref('')
const onClick = () => {}

// 下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 0) {
    Ypage.value = 1
    wuList.value = []
    wuAxiosList()
  }
  if (current.value == 1) {
    if (uni.getStorageSync('KuValue') || kuList.value.length != 0) {
      Kpage.value = 1
      kuList.value = []
      // console.log("下拉触发了");
      searchKu()
    } else {
      uni.stopPullDownRefresh()
    }
  }
})
// 物料
const scrolltolowerWu = () => {
  console.log('物料上拉')
  // moreW.value='loading'
  // Ypage.value=Ypage.value+1
  // if(Ypage.value>YpageTotal.value){
  // 	moreW.value='no-more'
  // }else{
  // 	wuAxiosList()
  // }
}
// 库
const scrolltolower = () => {
  console.log('库上拉')

  more.value = 'loading'
  Kpage.value = Kpage.value + 1
  if (Kpage.value > KpageTotal.value) {
    more.value = 'no-more'
  } else {
    console.log('上拉数据')
    searchKu()
  }
}
const change = () => {}
//滑动删除
const options = [
  {
    text: '删除',
    style: {
      backgroundColor: 'red'
    }
  }
]
const clickHome = (v) => {
  if (v.type) {
    if (wuList.value.length) {
      uni.showModal({
        content: '已扫描条码未出库，确认退出？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            uni.switchTab({
              url: '/pages/tabbar/home/index'
            })
            uni.removeStorageSync('KuValue')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      uni.switchTab({
        url: '/pages/tabbar/home/index'
      })
      uni.removeStorageSync('KuValue')
    }
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  if (wuList.value.length) {
    uni.showModal({
      content: '已扫描条码未出库，确认退出？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          uni.navigateBack({
            delta: 1
          })
          uni.removeStorageSync('KuValue')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  } else {
    uni.navigateBack({
      delta: 1
    })
    uni.removeStorageSync('KuValue')
  }
}

//去物料详情页
const goDetail = (code) => {
  if (!code.cPosCode) {
    uni.showModal({
      showCancel: false,
      content: '缺少库位信息',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  } else {
    let data = {
      Pbarcode: code.Pbarcode,
      cPosCode: code.cPosCode,
      type: ctype.value
    }
    uni.navigateTo({
      url: '/pages/StorageOut/pages/detail/detail?data=' + JSON.stringify(data)
    })
  }
}
//点击按钮切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (e.currentIndex == 0) {
    // Ypage.value=1
    // wuList.value=[]
    wuAxiosList()
  } else {
    // Kpage.value=1
    // console.log("点击了切换");
    // searchKu()
  }
  // KuValue.value = ''
  wuValue.value = ''
}
const styleChange = (e) => {
  if (styleType.value !== e.detail.value) {
    styleType.value = e.detail.value
  }
}
const colorChange = () => {
  if (styleType.value !== e.detail.value) {
    console.log(e.detail.value)
    activeColor.value = e.detail.value
  }
}
// 删除单条
const delWuItem = _.debounce((val, i) => {
  uni.showModal({
    content: '确认删除？',
    success: function (res) {
      if (res.confirm) {
        wuList.value.splice(i, 1)
      }
    }
  })
}, 500)

//时间
const Timedata = () => {
  var date, year
  var d = new Date()
  year = d.getYear() < 1900 ? 1900 + d.getYear() : d.getYear()
  date =
    '【--当前时间】：' +
    (d.getMonth() + 1) +
    '月' +
    d.getDate() +
    '日 ' +
    d.getHours() +
    '时' +
    d.getMinutes() +
    '分' +
    d.getSeconds() +
    '秒'
  return date
}

//输入库位信息
const searchKu = _.debounce((v) => {
  timeVal.value = new Date()
  const lastKuValue = uni.getStorageSync('KuValue')
  if (KuValue.value != '') {
    if (lastKuValue && KuValue.value !== lastKuValue) {
      kuList.value = []
    }
    uni.setStorageSync('KuValue', KuValue.value)
  }
  if (v == 'PDA') {
    if (codeType.value !== 'enter') return false
  }
  if (uni.getStorageSync('KuValue') || kuList.value.length != 0) {
    uni.showLoading({
      title: '加载中'
    })
    Kpage.value = 1
    getStationInfo({
      PageIndex: Kpage.value,
      PageSize: KpageSize.value,
      OrderByFileds: 'InType,KFInScanTime desc',
      Conditions: 'cPosCode = ' + uni.getStorageSync('KuValue')
    })
      .then((res) => {
        if (res.success) {
          uni.hideLoading()
          codeType.value = ''
          // 全部入库
          if (!res.data.data.length) {
            uni.showModal({
              showCancel: false,
              content: '数据为空！'
            })
            KuValue.value = ''
            uni.removeStorageSync('KuValue')
            more.value = 'no-more'
            kuList.value = []
            return false
          }
          if (ctype.value == 3 && res.data.data[0].PosTypeName != '全部入库') {
            uni.showModal({
              showCancel: false,
              content: '库位：' + res.data.data[0].cPosCode + '非全部入库状态，无法整库位出库',
              success: function (res) {}
            })
            kuList.value = []
            KuValue.value = ''
            uni.removeStorageSync('KuValue')
          } else {
            // 在库列表数据
            uni.stopPullDownRefresh()
            kuList.value = [...kuList.value, ...res.data.data]
            ruKuLen.value = res.data.InCount
            Ktotal.value = res.data.dataCount
            KpageTotal.value = res.data.pageCount
            kuCodeValue.value = res.data.data[0].cPosCode || ''
            KuValue.value = ''
          }
        } else {
          uni.hideLoading()
          uni.showModal({
            showCancel: false,
            content: res.msg
          })
          codeType.value = ''
          KuValue.value = ''
          uni.removeStorageSync('KuValue')
        }
      })
      .finally(() => uni.hideLoading())
  } else {
    uni.stopPullDownRefresh()
  }
}, 500)
//输入获取条码信息
const searchWu = _.debounce(async (val) => {
  if (!kuList.value || !kuCodeValue.value) {
    uni.showToast({
      icon: 'error',
      title: '请先扫描库位'
    })
    return false
  }
  if (val == 'PDA') {
    if (codeType.value !== 'enter') return false
  }
  if (!wuValue.value) {
    return false
  }
  if (wuList.value.length) {
    if (wuList.value.some((item) => item.Pbarcode == wuValue.value)) {
      uni.showModal({
        showCancel: false,
        content: wuValue.value + '已存在'
      })
      wuValue.value = ''
      return false
    }
  }
  uni.showLoading({
    title: '加载中'
  })
  const data = {
    pbarcode: wuValue.value
  }
  wuValue.value = ''
  // 接口数据
  getWLInfo(data)
    .then((res) => {
      if (!res.success) {
        uni.hideLoading()
        uni.showModal({
          showCancel: false,
          content: res.msg
        })
        codeType.value = ''
        wuValue.value = ''
      } else {
        if (!res.data) {
          uni.showToast({
            icon: 'error',
            title: '条码数据不正确'
          })
          uni.hideLoading()
          return
        }

        if (res.data.cPosCode != kuList.value[0].cPosCode) {
          uni.showModal({
            showCancel: false,
            content: `条码库位【${res.data.cPosCode}】不一致`
          })
          uni.hideLoading()
          return
        }

        Ypage.value = 1
        // wuList.value=[]
        wuValue.value = ''

        res.data.ScanTime = time()

        wuList.value.unshift(res.data)

        uni.hideLoading()

        uni.showToast({
          icon: 'none',
          title: `扫描成功：${res.data.Pbarcode}`,
          duration: 1000
        })

        // wuAxiosList()
      }
    })
    .finally(() => uni.hideLoading())
}, 500)
// 已扫描   物料列表
const wuAxiosList = () => {
  timeVal.value = new Date()

  if (uni.getStorageSync('KuValue') || kuList.value.length) {
    // console.log(TimeCha(timeVal.value).m,"--mmmmmmmmmm");
    // if(TimeCha(timeVal.value).m >=5){
    // 	errLog({
    // 		Messege:'【出库-条码列表接口开始查询 】'+Timedata()+TimeCha(timeVal.value).data+',【codeType】:'+codeType.value+',【wuValue】:'+wuValue.value
    // 	})
    // }
    // uni.showLoading({
    // 	title: '加载中'
    // });
    // getInfoList({
    // 	ctype: ctype.value,
    // 	PageIndex:Ypage.value,
    // 	RowCount:YpageSize.value,
    // 	cPosCode:uni.getStorageSync('KuValue') || kuList.value[0].cPosCode,
    // 	bUserControl:true
    // }).then(res => {
    // 	if (res.RspCode !== "Successed") {
    // 		// console.log(TimeCha(timeVal.value).m,"--mmmmmmmmmm");
    // 		if(TimeCha(timeVal.value).m >=5){
    // 			errLog({
    // 				Messege:'【出库-条码列表接口查询失败 】'+Timedata()+TimeCha(timeVal.value).data+',【codeType】:'+codeType.value+',【wuValue】:'+wuValue.value
    // 			})
    // 		}
    // 		uni.hideLoading()
    // 		uni.showModal({
    // 			showCancel:false,
    // 			content:res.msg,
    // 			success: function (res) {
    // 				if (res.confirm) {
    // 					console.log('用户点击确定');
    // 				} else if (res.cancel) {
    // 					console.log('用户点击取消');
    // 				}
    // 			}
    // 		});
    // 		uni.stopPullDownRefresh()
    // 		codeType.value = ''
    // 		wuValue.value = ""
    // 	} else {
    // 		// console.log(TimeCha(timeVal.value).m,"--mmmmmmmmmm");
    // 		if(TimeCha(timeVal.value).m >=5){
    // 			errLog({
    // 				Messege:'【出库-条码列表接口查询成工 】'+Timedata()+TimeCha(timeVal.value).data+',【codeType】:'+codeType.value+',【wuValue】:'+wuValue.value
    // 			})
    // 		}
    // 		uni.stopPullDownRefresh()
    // 		uni.hideLoading()
    // 		codeType.value = ''
    // 		wuValue.value = ""
    // 		wuList.value=[...wuList.value,...res.Rspdata.data]
    // 		Ytotal.value=res.Rspdata.AllRowCount
    // 		YpageTotal.value=res.Rspdata.AllPageCount
    // 		// console.log(TimeCha(timeVal.value).m,"--mmmmmmmmmm");
    // 		if(TimeCha(timeVal.value).m >=5){
    // 			errLog({
    // 				Messege:'【出库-条码列表接口渲染完毕】'+Timedata()+TimeCha(timeVal.value).data+',【codeType】:'+codeType.value+',【wuValue】:'+wuValue.value
    // 			})
    // 		}
    // 	}
    // })
  } else {
    uni.showModal({
      showCancel: false,
      content: '请先扫描库位！'
    })
    uni.stopPullDownRefresh()
  }
}

// 提交出库
const clickWuList = _.debounce(() => {
  if (wuList.value.length <= 0) {
    uni.showToast({
      icon: 'error',
      title: '请扫描库位'
    })
    return false
  }
  const data = {
    cPosCode: uni.getStorageSync('KuValue'),
    mScans: wuList.value
  }
  if (ctype.value == 2) {
    // 部分出库
    uni.showModal({
      content: '确认提交出库？',
      success: function (res) {
        if (res.confirm) {
          ScanOut(data).then((res) => {
            if (res.success) {
              uni.showModal({
                showCancel: false,
                content: res.msg || '提交成功'
              })
              if (!res.data.length) {
                wuList.value = []
                KuValue.value = ''
                wuValue.value = ''
                uni.removeStorageSync('KuValue')
              }
            } else {
              uni.showModal({
                showCancel: false,
                content:
                  res.msg ||
                  res.errmsg?.[0]?.msg ||
                  res.errmsg?.[0]?.Value ||
                  res.errmsg ||
                  '提交失败'
              })
            }
          })
        }
      }
    })
  } else {
    //全部出库
    uni.showModal({
      content: '确认提交出库？',
      success: function (res) {
        if (res.confirm) {
          PosScanOut(data).then((res) => {
            if (res.success) {
              uni.showModal({
                showCancel: false,
                content: res.msg || '提交成功'
              })
              wuList.value = []
              KuValue.value = ''
              wuValue.value = ''
              uni.removeStorageSync('KuValue')
            } else {
              uni.showModal({
                showCancel: false,
                content:
                  res.msg ||
                  res.errmsg?.[0]?.msg ||
                  res.errmsg?.[0]?.Value ||
                  res.errmsg ||
                  '提交失败'
              })
            }
          })
        }
      }
    })
  }
}, 500)
</script>

<style lang="scss" scoped>
.newsBox {
  overflow-y: hidden;
  background: #fff;

  //输入框
  .search-wl {
    border-bottom: 1px solid #bbb;

    .top-search {
      margin: 0s 20rpx;
    }
  }

  .Allcontent {
    padding: 20rpx;

    .head-text {
      // background: pink;
      font-size: 40rpx;
      margin: 20rpx 0;
      border-bottom: 1px solid #bbb;

      .wahouse {
        padding: 20rpx;
      }

      .wastation {
        padding: 20rpx;
      }
    }

    .content {
      .listCon {
        // border:1px solid red;
        overflow-y: auto;

        .scan-list {
          border: 1px solid #bbb;
          border-radius: 4px;
          margin-bottom: 20rpx;

          .index-demo {
            width: 0;
            height: 0;
            border-top: 24px solid ghostwhite;
            border-right: 30px solid transparent;
          }

          .total {
            position: absolute;
            top: 0;
            font-size: 12px;
            margin: 2px;
          }
        }

        .project {
          // margin: 20rpx 0;
          font-size: 12px;
          padding-bottom: 10px;
          .demo-uni-row {
            display: flex;
            justify-content: space-between;
            padding: 10rpx 20rpx;
          }
        }
      }
    }
  }

  //底部按钮
  .button-wl {
    width: 100%;
    position: absolute;

    .put-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
    }

    .scan-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
      background: red;
    }

    .canel-btn {
      border-radius: 60rpx;
      margin-bottom: 10rpx;
      margin: 20rpx;
    }
  }
}
</style>
