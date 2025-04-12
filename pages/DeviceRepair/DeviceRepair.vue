<template>
  <!-- 设备报修-->
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
      <view v-if="current === 0">
        <view class="listMain">
          <view class="project">
            <view
              class="ChangTarg"
              style="display: flex; align-items: center; justify-content: flex-start"
            >
              <view style="width: 15%; margin: 0 10px">设备条码:</view>
              <up-input
                v-model="Station"
                :focus="focusType"
                placeholder="请扫描设备条码"
                style="margin-top: 4px"
                @confirm="GetData"
              >
                <template #prefix>
                  <up-icon
                    name="scan"
                    color="#dd524d"
                    size="28"
                    @click="handleCameraScan('1')"
                  />
                </template>
              </up-input>
            </view>
            <view
              class="ChangTarg"
              style="display: flex; align-items: center; justify-content: space-around"
            >
              <view style="width: 15%; margin: 0 10px">搜索设备:</view>
              <view style="width: 50%">
                <uni-section
                  title="可搜索"
                  type="line"
                >
                  <view class="uni-px-5 uni-pb-5">
                    <zxz-uni-data-select
                      v-model="value"
                      filterable
                      :localdata="range"
                      @inputChange="inputChange"
                      @change="change"
                      :focus="TextfocusType"
                      @input="Foucs"
                      :placeholder="DevName"
                    ></zxz-uni-data-select>
                  </view>
                </uni-section>
              </view>
              <view>
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="opens"
                >
                  全部设备
                </button>
              </view>
            </view>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view class="demo-uni-col dark">设备编码：{{ DevData?.cDeviceCode }}</view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">设备名称：{{ DevData?.cDeviceName }}</view>
              </uni-col>
            </uni-row>
            <uni-row class="demo-uni-row">
              <uni-col :span="12">
                <view
                  class="demo-uni-col dark"
                  style="display: flex"
                  >是否停机：
                  <checkbox-group
                    @change="checkboxChange"
                    class="agreement_radio"
                  >
                    <checkbox
                      :value="checkVal"
                      :checked="checked"
                    />
                  </checkbox-group>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="demo-uni-col dark">设备位置：{{ DevData.cUsedAddress }}</view>
              </uni-col>
            </uni-row>
            <view
              class="ChangTarg"
              style="display: flex; align-items: center"
            >
              <view style="width: 15%; margin: 0 10px">故障名称:</view>
              <view style="width: 60%">
                <view>
                  <uni-section type="line">
                    <uni-data-select
                      v-model="Fauvalue"
                      :localdata="Faurange"
                      @change="Fauchange"
                    ></uni-data-select>
                  </uni-section>
                </view>
              </view>
            </view>
            <view
              class="ChangTarg"
              style="display: flex; align-items: center"
            >
              <view style="width: 8%; margin: 0 10px">描述:</view>
              <view style="width: 70%">
                <view>
                  <uni-section
                    title="多行文本"
                    subTitle="指定属性 type=textarea 使用多行文本框"
                    type="line"
                    padding
                  >
                    <uni-easyinput
                      type="textarea"
                      v-model="Textvalue"
                      placeholder="请输入内容"
                    ></uni-easyinput>
                  </uni-section>
                </view>
              </view>
            </view>
            <view style="font-size: 14px; margin: 10px">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                @click="TackPic"
              >
                拍照
              </button>
              <view v-if="PicArr.length">
                <view
                  v-for="(i, index) in PicArr"
                  :key="index"
                  style="display: flex; justify-content: space-around; align-items: center"
                >
                  <view
                    style="margin: 10px"
                    @click="preview(index, i)"
                    >图片{{ i.slice(i.lastIndexOf('/')) + 1 }}</view
                  >
                  <view style="width: 100px">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="DELPicList(i, index)"
                    >
                      删除
                    </button>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view>
            <!-- 抽屉 -->
            <uni-drawer
              ref="showRight"
              mode="right"
              :mask-click="false"
            >
              <scroll-view
                scroll-y="true"
                :style="'height:' + (h - 100) + 'px'"
                style="border: 1px solid red"
                lower-threshold="10"
                show-scrollbar="true"
                @scrolltolower="scrolltolower"
                @refresherrefresh="pukllk"
                refresher-enabled
                :refresher-triggered="tirgger"
              >
                <button
                  @click="closeDrawer"
                  type="primary"
                  style="position: fixed; bottom: 10px; right: 0"
                >
                  关闭
                </button>
                <!-- <view v-for="(item,index) in (1,60)" :key="index">{{item}}</view> -->
                <view style="margin: 50px 20px 20px 20px">
                  <view
                    style="margin: 20px; padding: 10px"
                    v-for="(item, index) in DevDataList"
                    :key="index"
                    @click="ChoseDevData(item)"
                  >
                    {{ item.cResourceName }}
                  </view>
                </view>
                <uni-load-more
                  :status="more"
                  v-if="DevDataList.length"
                ></uni-load-more>
              </scroll-view>
            </uni-drawer>
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
            报修
          </button>
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
        <view
          class="search-wl"
          style="display: flex; align-items: center"
        >
          <up-input
            v-model="searchValue"
            placeholder="请输入设备"
            style="margin-right: 4px; margin-top: 4px; margin-left: 4px"
          >
            <template #prefix>
              <up-icon
                name="scan"
                color="#dd524d"
                size="28"
                @click="handleCameraScan('2')"
              />
            </template>
          </up-input>
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
              v-for="(item, index) in PageList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">报修单号：{{ item.cCode }}</view>
                  </uni-col>
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">状态：{{ item.iStatusName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">设备名称：{{ item.cDeviceName }}</view>
                  </uni-col>
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
                  </uni-col>
                </uni-row>
                <view style="margin: 0 10px; font-size: 14px">
                  <view @click="preview(1, item.FileName1)"
                    >图片1:{{ item.FileName1?.split('&')[0] }}
                  </view>
                  <view @click="preview(2, item.FileName3)"
                    >图片2:{{ item.FileName2?.split('&')[0] }}
                  </view>
                  <view @click="preview(3, item.FileName3)">
                    图片3:{{ item.FileName3?.split('&')[0] }}
                  </view>
                </view>
                <uni-row class="demo-uni-row">
                  <uni-col :span="10">
                    <view class="demo-uni-col dark">是否停机：{{ item.IsStop ? '是' : '否' }}</view>
                  </uni-col>
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">设备位置：{{ item.cUsedAddress }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">故障名称：{{ item.cFaultName }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col dark"></view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">报修描述：{{ item.cMemo }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light"></view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="16">
                    <view class="demo-uni-col dark">报修时间：{{ item.cReportDate }}</view>
                  </uni-col>
                  <uni-col :span="8">
                    <view class="demo-uni-col light">报修人：{{ item.cCreateUserName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <button
                    type="warn"
                    size="mini"
                    @click="onClickConfirmRepair(item)"
                  >
                    维修确认
                  </button>
                  <button
                    type="warn"
                    size="mini"
                    @click="handleDel(item)"
                  >
                    删除
                  </button>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="PageList.length"
            ></uni-load-more>
          </scroll-view>
        </view>
      </view>
    </view>

    <uni-popup
      ref="confirmPopup"
      type="dialog"
    >
      <uni-popup-dialog
        title="您确定要执行该操作吗？"
        message="成功消息"
        :duration="2000"
        :before-close="true"
        @cancel="confirmPopup.close()"
        @close="confirmPopup.close()"
        @confirm="confirmRepair"
        confirmText="确定"
        cancelText="取消"
      ></uni-popup-dialog>
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
import {
  GetFaultList,
  GetFaultLists,
  getDevList,
  getRepairListByUser,
  getDevListPage,
  DeviceFalutVouchClose,
  factory_position_resource_page,
  DeviceFalutVouchDel
} from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'
import { Login } from '../../api/login'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('设备报修')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['报修单', '已报修'])
const value = ref() //设备下拉
const range = ref([]) //设备下拉
const DevArr = ref([]) //设备数组
const Fauvalue = ref() //下拉故障
const Faurange = ref([]) //下拉故障数组
const FauCode = ref() //故障编码
const Textvalue = ref('') //描述
const checkVal = ref('0') //复选框
const checked = ref(false)
const Station = ref() //设备编码
const focusType = ref(true)
const TextfocusType = ref(false)
const disabled = ref(false)
const searchValue = ref()
//日期范围
const Timerange = ref()
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
const confirmPopup = ref(null)
const currentConfirmItem = ref(null)
onShow(() => {
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
  // GetSelect()
  GetAllDevice()
})
const setfocus = () => {
  focusType.value = false
  setTimeout(() => {
    focusType.value = true
  }, 200)
}
const ChangTab = () => {
  // if (current.value == 1) {
  //   PageList.value = []
  //   currentPage.value = 1
  //   total.value = 0
  //   getForPage()
  // }
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 1) {
    PageList.value = []
    currentPage.value = 1
    total.value = 0
    getForPage()
  }
}
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//复选框状态变化
const checkboxChange = (e) => {
  if (e.detail.value == '0') {
    checked.value = true
  } else {
    checked.value = false
  }
}
const Foucs = () => {
  disabled.value = true
  TextfocusType.value = true
  focusType.value = false
}
const DevData = ref({})
//下拉设备选中
const change = (i) => {
  DevArr.value.forEach((item) => {
    if (item.cDeviceCode == i.value) {
      DevData.value = item
      console.log(DevData.value, 'DevData.value=========')
    }
  })
  GetSelect()
  getDevList({
    OrderByFileds: '',
    Conditions: `cDeviceCode = ${DevData.value.cDeviceCode}`
  }).then((res) => {
    if (res.status == 200) {
      DevArr.value = res.data
      DevData.value = res.data[0]
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
const Fauchange = (i) => {
  FauCode.value = i
}

const closeDrawer = () => {
  showRight.value.close()
}
const pukllk = () => {
  console.log('xaila-------------')
  tirgger.value = true
  DcurrentPage.value = 1
  Dtotal.value = 0
  DevDataList.value = []
  GetAllDevice()
}
//加载全部设备
const GetAllDevice = () => {
  factory_position_resource_page({
    PageIndex: DcurrentPage.value,
    PageSize: DpageSize.value,
    OrderByFileds: '',
    Conditions: `cResourceTypeCode = 9 && cPositionCode = ${uni.getStorageSync('User').UserCode}`
  }).then((res) => {
    if (res.status == 200) {
      tirgger.value = false
      DevDataList.value = [...DevDataList.value, ...res.data.data]
      Dtotal.value = res.data.dataCount
      DpageTotal.value = res.data.pageCount
    }
  })
}
//打开抽屉
const opens = () => {
  showRight.value.open()
}
// 选择抽屉设备数据
const ChoseDevData = (i) => {
  showRight.value.close()
  DevName.value = i.cResourceName //选择设备回显输入框
  DevData.value = i
  console.log(i)
  GetSelect()
}
//设备搜索
const inputChange = _.debounce((e) => {
  name.value = e
  GetData()
}, 3000)
const GetData = () => {
  uni.showLoading({
    title: '加载中......'
  })
  getDevList({
    OrderByFileds: '',
    Conditions: Station.value
      ? `cDeviceCode = ${Station.value}`
      : name.value
        ? `cDeviceName like ${name.value}`
        : ''
  }).then((res) => {
    if (res.status == 200) {
      DevArr.value = res.data
      if (Station.value) {
        DevData.value = res.data[0]
      }
      uni.hideLoading()
      uni.stopPullDownRefresh()
      GetSelect()
      range.value = res.data.map((i) => {
        return {
          value: i.cDeviceCode,
          text: i.cDeviceName
        }
      })
    } else {
      uni.hideLoading()
    }
  })
}
//获取下故障拉数据（设备存在为前提）
const GetSelect = () => {
  if (!DevData.value?.cResourceCode) {
    return
  }
  GetFaultLists({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${DevData.value?.cResourceCode}`
  }).then((res) => {
    if (res.status == 200) {
      Faurange.value = res.data.map((i) => {
        return {
          value: i.cFaultCode,
          text: i.cFaultName
        }
      })
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
  if (current.value == 1) {
    let arr = []
    let url = i.split('&')[1]
    arr.push(url)
    uni.previewImage({
      current: index,
      urls: arr
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
      title: '未拍照片'
    })
    return
  }

  uni.uploadFile({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/Add',
    files: PicArr.value.map((i) => ({ name: 'list_file', uri: i })),
    formData: {
      cDeviceCode: DevData.value.cResourceCode,
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
      DevData.value = {}
      Textvalue.value = ''
    }
  })
}
const maskClick = () => {}
const BeginTime = ref()
const EndTime = ref()
const sear = ref(false)
const getSearch = () => {
  PageList.value = []
  currentPage.value = 1
  total.value = 0
  sear.value = true
  if (Timerange.value) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  getForPage()
}
//已报修
// dCreateTime>= XXX && dCreateTime<=XXX && cDeviceName like XXX
const getForPage = () => {
  getRepairListByUser({
    PageIndex: currentPage.value,
    PageSize: pageSize.value,
    OrderByFileds: 'dCreateTime desc',
    Conditions:
      BeginTime.value && searchValue.value
        ? `dDate>= ${BeginTime.value} && dDate<=${EndTime.value} && cDeviceName like ${searchValue.value}`
        : BeginTime.value
          ? `dDate>= ${BeginTime.value} && dDate<=${EndTime.value}`
          : searchValue.value
            ? `cDeviceName like ${searchValue.value}`
            : ''
  }).then((res) => {
    if (res.status == 200) {
      uni.stopPullDownRefresh()
      PageList.value = [...PageList.value, ...res.data.data]
      total.value = res.data.dataCount
      pageTotal.value = res.data.pageCount
    } else {
      uni.showToast({
        icon: 'none',
        title: '错误'
      })
    }
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  if (current.value == 1) {
    currentPage.value = 1
    total.value = 0
    PageList.value = []
    getForPage()
  }
  if (current.value == 0) {
    console.log('下拉----------')
    DcurrentPage.value = 1
    Dtotal.value = 0
    DevDataList.value = []
    GetAllDevice()
  }
})
//上拉
const scrolltolower = () => {
  more.value = 'loading'
  console.log('上拉')
  if (current.value == 0) {
    DcurrentPage.value++
    if (DcurrentPage.value > DpageTotal.value) {
      more.value = 'no-more'
    } else {
      GetAllDevice()
    }
  }
  if (current.value == 1) {
    currentPage.value++
    if (currentPage.value > pageTotal.value) {
      more.value = 'no-more'
    } else {
      getForPage()
    }
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
const onClickConfirmRepair = (item) => {
  currentConfirmItem.value = item
  confirmPopup.value.open()
}

const handleDel = (item) => {
  uni.showModal({
    content: '确认删除？',
    cancelText: '取消',
    confirmText: '确定',
    success: function (res) {
      if (res.confirm) {
        DeviceFalutVouchDel([item.UID]).then((res) => {
          if (res.success) {
            uni.showToast({ title: '删除成功' })
            PageList.value = []
            currentPage.value = 1
            total.value = 0
            getForPage()
          }
        })
      }
    }
  })
}

const confirmRepair = () => {
  DeviceFalutVouchClose([currentConfirmItem.value.UID])
    .then((res) => {
      if (res.success) {
        uni.showToast({
          title: '操作成功',
          icon: 'none'
        })
      } else {
        uni.showToast({
          title: res?.errmsg?.[0]?.value || '操作失败',
          icon: 'none'
        })
      }
    })
    .finally(() => {
      PageList.value = []
      currentPage.value = 1
      total.value = 0
      getForPage()
      confirmPopup.value.close()
    })
}

const handleCameraScan = (status) => {
  uni.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log(res)
      if (status === '1') {
        Station.value = res.result
        GetData()
      } else {
        searchValue.value = res.result
        getSearch()
      }
    }
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
