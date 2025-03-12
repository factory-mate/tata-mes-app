<template>
  <!-- 设备维修页面 -->
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
    <view
      v-if="current == 0"
      style="display: flex; justify-content: space-between; align-self: center"
    >
      <view style="display: flex; align-items: center">
        <view style="margin: 10px 5px">图片：</view>
        <view @click="previewMainImage">{{ itemInfo?.VouchFileName?.split('&')?.[0] }}</view>
      </view>
      <view>
        <button
          style="margin: 10px 5px"
          class="mini-btn"
          type="warn"
          size="mini"
          @click="goDevPics()"
        >
          增加图片
        </button>
        <button
          style="margin: 10px 5px"
          class="mini-btn"
          type="warn"
          size="mini"
          @click="goFile()"
        >
          文档
        </button>
      </view>
    </view>
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
          <scroll-view
            :style="'height:' + (h - 200) + 'px'"
            scroll-y="true"
            lower-threshold="50"
            show-scrollbar="true"
            @scrolltolower="scrolltolower"
          >
            <view>
              <view
                class="ChangTarg"
                style="display: flex; align-items: center"
              >
                <view
                  style="width: 20%; margin: 0 10px"
                  class="required"
                  >项目名称:</view
                >
                <view style="width: 60%">
                  <view>
                    <uni-section type="line">
                      <uni-data-select
                        v-model="program"
                        :localdata="programrange"
                        @change="programchange"
                      ></uni-data-select>
                    </uni-section>
                  </view>
                </view>
              </view>
              <view
                class="ChangTarg"
                style="display: flex; align-items: center"
              >
                <view
                  style="width: 20%; margin: 0 10px"
                  class="required"
                  >故障原因:</view
                >
                <view style="width: 60%">
                  <view>
                    <uni-section type="line">
                      <uni-data-select
                        v-model="value"
                        :localdata="range"
                        @change="change"
                      ></uni-data-select>
                    </uni-section>
                  </view>
                </view>
              </view>
              <view
                class="ChangTarg"
                style="display: flex; align-items: center"
              >
                <view
                  style="width: 20%; margin: 0 10px"
                  class="required"
                  >方案名称:</view
                >
                <view style="width: 60%">
                  <view>
                    <uni-section type="line">
                      <uni-data-select
                        v-model="project"
                        :localdata="projectrange"
                        @change="projectchange"
                      ></uni-data-select>
                    </uni-section>
                  </view>
                </view>
              </view>
              <view
                class="ChangTarg"
                style="display: flex; align-items: center"
              >
                <view style="width: 20%; margin: 0 10px">备件:</view>
                <view style="width: 60%">
                  <view>
                    <uni-section type="line">
                      <uni-data-select
                        v-model="part"
                        :localdata="partrange"
                        @change="partchange"
                        @click="Getpart"
                      ></uni-data-select>
                    </uni-section>
                  </view>
                </view>
              </view>
              <view
                class="ChangTarg"
                style="display: flex; align-items: center"
                v-if="partrange.length"
              >
                <view style="width: 20%; margin: 0 10px">备件数量:</view>
                <view style="width: 60%; display: flex; align-items: center">
                  <view>
                    <input
                      class="inputSty"
                      v-model="partnum"
                      placeholder="请输入"
                      placeholder-style="font-size:12px"
                    />
                  </view>
                  <view style="width: 60%">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="AddList"
                    >
                      确定
                    </button>
                  </view>
                </view>
              </view>
              <view class="listMain">
                <view
                  class="project"
                  v-for="(item, index) in partdataList"
                  :key="index"
                >
                  <uni-row class="demo-uni-row">
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                    </uni-col>
                    <uni-col :span="18">
                      <view class="demo-uni-col dark"></view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">备件编码：{{ item.cInvCode }}</view>
                    </uni-col>
                    <uni-col :span="12">
                      <view class="demo-uni-col dark">备件名称：{{ item.cInvName }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="24">
                      <view class="demo-uni-col dark">备件规格：{{ item.cStd }}</view>
                    </uni-col>
                    <uni-col :span="24">
                      <view class="demo-uni-col dark">数量：{{ item.iActQuantity }}</view>
                    </uni-col>
                  </uni-row>
                  <uni-row class="demo-uni-row">
                    <uni-col :span="24">
                      <!-- <view class="demo-uni-col dark">图片：{{}}</view> -->
                    </uni-col>
                    <uni-col :span="24">
                      <button
                        class="mini-btn"
                        type="warn"
                        size="mini"
                        @click="DELPartList(item, index)"
                      >
                        删除
                      </button>
                    </uni-col>
                  </uni-row>
                </view>
              </view>
              <view style="display: flex; justify-content: space-between; align-self: center">
                <view>
                  <button
                    style="margin: 10px 30px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="goPic()"
                  >
                    拍照
                  </button>
                </view>
              </view>
              <view class="content">
                <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
                <view>
                  <view
                    v-for="(item, index) in PicArrList"
                    :key="index"
                    style="display: flex; justify-content: space-around; margin-bottom: 4px"
                  >
                    <view @click="preview(index)">
                      <up-image
                        :src="item.path || item.name || item"
                        width="60"
                        height="60"
                      />
                    </view>
                    <view>
                      <button
                        class="mini-btn"
                        type="warn"
                        size="mini"
                        @click="DELPicList(index)"
                      >
                        删除
                      </button>
                    </view>
                  </view>
                </view>
              </view>
              <view
                class="ChangTarg"
                style="display: flex; align-items: center"
              >
                <view style="width: 10%; margin: 0 10px">描述:</view>
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
                        autoHeight
                      ></uni-easyinput>
                    </uni-section>
                  </view>
                </view>
              </view>
              <view style="display: flex; alignitems: center">
                <!-- <button class="mini-btn" type="warn" size="mini" @click="goPart">备件</button> -->
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="ListAdd"
                >
                  添加
                </button>
              </view>
            </view>
            <view
              class="project"
              v-for="(item, index) in postList"
              :key="index"
            >
              <view class="wLIst">
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
                    <view class="demo-uni-col dark">项目编码：{{ item.cProgramCode }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">方案名称：{{ item.cPARM02 }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">故障原因：{{ item.cPARM01 }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previewImg(item.cFilePath + item.cFileReName + item.cFileSuffix)"
                    >
                      图片：{{ item.cFileName }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">描述：{{ item.cMemo }}</view>
                  </uni-col>
                </uni-row>
                <view style="display: flex; justify-content: flex-end">
                  <!-- 						<button style="margin: 10px 5px;" class="mini-btn" type="warn" size="mini"
										@click="goStart()">文档</button>
									<button style="margin: 10px 5px;" class="mini-btn" type="warn" size="mini"
										@click="goReapir()">备件</button> -->
                  <button
                    style="margin: 10px 5px"
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="Del(item, index)"
                  >
                    删除
                  </button>
                </view>
              </view>
            </view>
            <view style="display: flex; margin-top: 10px">
              <button
                style="background-color: yellowgreen"
                class="mini-btn"
                type="warn"
                size="mini"
                @click="goSave"
                :disabled="isSaveLoading"
              >
                保存
              </button>
            </view>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </view>
      </view>
      <view v-if="current === 1">
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
              v-for="(item, index) in RepairList"
              :key="index"
            >
              <view class="wLIst">
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备名称：{{ item.cDeviceName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previews(1, item.FileName1)"
                    >
                      图片：{{ item.FileName1?.split('&')[0] }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previews(2, item.FileName2)"
                    >
                      图片：{{ item.FileName2?.split('&')[0] }}</view
                    >
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view
                      class="demo-uni-col dark"
                      @click="previews(3, item.FileName3)"
                    >
                      图片：{{ item.FileName3?.split('&')[0] }}</view
                    >
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">设备位置：{{ item.cUsedAddress }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col dark">故障名称：{{ item.cFaultName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修单号：{{ item.cCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修描述：{{ item.cMemo }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">设备编号：{{ item.cDeviceCode }}</view>
                  </uni-col>
                </uni-row>
                <uni-row class="demo-uni-row">
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修人：{{ item.cCreateUserName }}</view>
                  </uni-col>
                  <uni-col :span="12">
                    <view class="demo-uni-col light">报修时间：{{ item.dCreateTime }}</view>
                  </uni-col>
                </uni-row>
              </view>
            </view>
            <uni-load-more
              :status="more"
              v-if="RepairList.length"
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
  PDAPROGRAM,
  PDAPROGRAMs,
  GetFaultLists,
  PDAPROJECT,
  PDAPROJECTs,
  RepairVouchSave,
  PDAGetBodys,
  PDAPART,
  DeviceRepairVouchGetById,
  PDAGetItemCheck
} from '@/api/PDA.js'

import URLIP from '@/utils/serviceIP.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const title = ref('设备维修')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['维修项目', '报修详情'])
const value = ref() //下拉故障
const range = ref([]) //下拉故障数组
const Textvalue = ref() //描述
const program = ref()
const programrange = ref([])
const project = ref()
const projectrange = ref([])
const part = ref()
const partrange = ref([])
const isSaveLoading = ref(false)
//日期范围
const Timerange = ref()
//设备列表数据
const DevList = ref([])
const ReadDevList = ref([])
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const itemInfo = ref({})
const SenPicArr = ref([])
const partnum = ref()
const partdataList = ref([])
const cDevCode = ref('')
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  if (itemInfo.value.UID) {
    getMainImage(itemInfo.value.UID)
    getList(itemInfo.value.UID)
  }
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

  try {
    itemInfo.value = JSON.parse(decodeURIComponent(option.item))
    cDevCode.value = itemInfo.value.cDeviceCode
  } catch (e) {
    console.log(e)
  }

  getProgram()
  getProiet()
  getFault()
})

const getMainImage = (val) => {
  DeviceRepairVouchGetById({ val }).then((res) => {
    if (res.status == 200) {
      itemInfo.value.VouchFileName = res.data.VouchFileName
    }
  })
}

const getList = (val) => {
  PDAGetItemCheck({ val }).then((res) => {
    if (res.success) {
      postList.value = res.data.map((i) => ({
        ...i,
        cFileName: i.FileName1?.split('&')[0],
        cFilePath: i.FileName1?.split('&')[1],
        cFileReName: '',
        cFileSuffix: ''
      }))
    }
  })
}

const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  if (e.keyCode == 66 || e.key == 'Enter') {
    codeType.value = 'enter'
  }
}
const ChangTab = () => {
  if (current.value == 0) {
    GETREpairView()
  } else {
    GETREpairView()
  }
}
//Tab切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  if (current.value == 0) {
    GETREpairView()
  } else {
    GETREpairView()
  }
}
//日期选中
const maskClick = (e) => {
  console.log(e, '日期====')
}
const BeginTime = ref()
const EndTime = ref()
const ProgramArr = ref([])
const faultArr = ref([])
const projectArr = ref([])
const RepairList = ref([])
const GETREpairView = () => {
  uni.showLoading({
    title: '加载中...'
  })
  PDAGetBodys({
    Conditions: `cCode=${itemInfo.value.cSouceCode}`,
    OrderByFileds: ''
  }).then((res) => {
    if (res.status == 200) {
      RepairList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
}
// 项目
const getProgram = () => {
  PDAPROGRAMs({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${cDevCode.value}`
  }).then((res) => {
    if (res.status == 200) {
      ProgramArr.value = res.data
      programrange.value = res.data.map((i) => {
        return {
          value: i.cProgramCode,
          text: i.cProgramName
        }
      })
    } else {
    }
  })
}
//故障
const getFault = () => {
  GetFaultLists({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${cDevCode.value}`
  }).then((res) => {
    if (res.status == 200) {
      faultArr.value = res.data
      range.value = res.data.map((i) => {
        return {
          value: i.cFaultCode,
          text: i.cFaultName
        }
      })
    } else {
      console.log('88')
    }
  })
}
//方案
const getProiet = () => {
  if (!faultItem.value.cFaultCode) {
    return
  }
  PDAPROJECTs({
    OrderByFileds: '',
    Conditions: `cFaultCode=${faultItem.value?.cFaultCode}`
  }).then((res) => {
    if (res.status == 200) {
      projectArr.value = res.data
      projectrange.value = res.data.map((i) => {
        return {
          value: i.cProjectCode,
          text: i.cProjectName
        }
      })
    } else {
      console.log('88')
    }
  })
}
//备件
const partArr = ref([])
const Getpart = () => {
  if (!ProItem.value.cProgramCode) {
    uni.showToast({
      icon: 'none',
      title: '请选择项目',
      duration: 1000
    })
    return
  }
  PDAPART({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${itemInfo.value.cDeviceCode} && cProgramCode=${ProItem.value.cProgramCode}`
  }).then((res) => {
    if (res.status == 200) {
      partArr.value = res.data
      partrange.value = res.data.map((i) => {
        return {
          value: i.cInvCode,
          text: i.cInvName
        }
      })
    } else {
      console.log('88')
    }
  })
}
const faultItem = ref({})
const change = (i) => {
  faultArr.value.forEach((item) => {
    if (item.cFaultCode == i) {
      faultItem.value = item
    }
  })
  getProiet()
}
const ProItem = ref({})
const programchange = (i) => {
  if (!i) {
    ProItem.value = {}
  }
  ProgramArr.value.forEach((item) => {
    if (item.cProgramCode == i) {
      ProItem.value = item
    }
  })
  Getpart()
  console.log(ProItem.value, 'ProItem.value----------')
}
const proiectItem = ref({})
const projectchange = (i) => {
  projectArr.value.forEach((item) => {
    if (item.cProjectCode == i) {
      proiectItem.value = item
    }
  })
}
const partItem = ref({})
const partchange = (i) => {
  partArr.value.forEach((item) => {
    if (item.cInvCode == i) {
      partItem.value = item
    }
  })
}

//确定
const AddList = () => {
  let obj = {
    cInvCode: partItem.value.cInvCode,
    cInvName: partItem.value.cInvName,
    iActQuantity: partnum.value,
    cStd: partItem.value.cStd
  }
  partdataList.value.push(obj)
  obj = {}
  partnum.value = ''
}
//删除备件
const DELPartList = (item, index) => {
  partdataList.value.splice(index, 1)
}
const PicArr = ref([])
const PicArrList = ref([])
//图片拍照
const goPic = () => {
  // uni.navigateTo({
  // 	url:'/pages/PDARepair/PDAPic/PDAPic'
  // })
  openSelectImage()
}
//调取拍照
const openSelectImage = () => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log(res, '--res')
      if (res.tempFilePaths?.length > 0) {
        PicArr.value = [...PicArr.value, ...res.tempFilePaths]
        PicArrList.value = [...PicArrList.value, ...res.tempFiles]
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
const preview = (index) => {
  uni.previewImage({
    current: index,
    urls: PicArr.value
  })
}

const previewMainImage = () => {
  uni.previewImage({
    current: 0,
    urls: [itemInfo.value.VouchFileName?.split('&')[1]]
  })
}
//图片预览
const previews = (index, i) => {
  let arr = []
  let url = i.split('&')[1]
  arr.push(url)
  uni.previewImage({
    current: index,
    urls: arr
  })
}
const previewImg = (url) => {
  uni.previewImage({
    current: 0,
    urls: [url]
  })
}
//删除照片
const DELPicList = (index) => {
  PicArr.value.splice(index, 1)
  PicArrList.value.splice(index, 1)
}
const msg = ref([])
const goDevPics = () => {
  uni.navigateTo({
    url: '/pages/PDARepair/PDAPic/PDAPic?Devuid=' + itemInfo.value.UID
  })
}
//备件
const goPart = () => {
  // if (!ProItem.value.cProgramCode) {
  // 	uni.showToast({
  // 		icon: "none",
  // 		title: '请选择项目',
  // 		duration: 1000,
  // 	})
  // 	return
  // }
  // uni.navigateTo({
  // 	url: `/pages/PDARepair/PDAPart/PDAPart?uid=${itemInfo.value.cDeviceCode}&code=${ProItem.value.cProgramCode}`
  // })
}

//搜索
const getSearch = () => {
  if (Timerange.value) {
    BeginTime.value = Timerange.value[0]
    EndTime.value = Timerange.value[1]
  }
  console.log(Timerange.value, 'Timerange----')
}
const postList = ref([])
const arr = ref([])
//添加cPARM01：故障编码、 cPARM02：方案编码、
const ListAdd = () => {
  if (!PicArr.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请拍照'
    })
    return
  }
  uni.showLoading({
    title: '添加中...'
  })
  PicArr.value.forEach((item) => {
    uni.uploadFile({
      url: URLIP.BASE_URL_PDEVICE + '/api/device_vouch_file/Add',
      filePath: item,
      name: 'file',
      formData: {
        // 'uid': uid.value,
      },
      header: {
        //请求头配置
        Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
      },

      success: (uploadFileRes) => {
        msg.value = JSON.parse(uploadFileRes.data)
        PicArr.value = []
        arr.value.unshift(msg.value.data.UID)
        let obj = {
          FileUID: arr.value,
          UID: itemInfo.value.UID,
          cProgramCode: ProItem.value.cProgramCode,
          cProgramName: ProItem.value.cProgramName,
          cPARM01: faultItem.value.cFaultCode,
          cPARM02: proiectItem.value.cProjectCode,
          cMemo: Textvalue.value,
          invs: partdataList.value,
          cFileName: msg.value.data.cFileName,
          cFilePath: msg.value.data.cFilePath,
          cFileReName: msg.value.data.cFileReName,
          cFileSuffix: msg.value.data.cFileSuffix
        }
        postList.value.push(obj)
        uni.hideLoading()
        uni.stopPullDownRefresh()
        obj = {}
        arr.value = []
        Textvalue.value = ''
      }
    })
  })
}
//删除
const Del = (item, index) => {
  postList.value.splice(index, 1)
}
//保存
const goSave = () => {
  if (!postList.value.length) {
    uni.showToast({
      icon: 'none',
      title: '请先点添加按钮！'
    })
    return
  }
  isSaveLoading.value = true
  RepairVouchSave(postList.value)
    .then((res) => {
      if (res.status == 200) {
        uni.showToast({
          icon: 'none',
          title: res.msg,
          duration: 1000
        })
        postList.value = []
        uni.navigateBack({ delta: 1 })
      } else {
        let errVal = JSON.parse(res.errmsg?.[0].Value)?.[0]
        uni.showToast({
          icon: 'none',
          title: errVal.name + errVal.msg,
          duration: 1000
        })
      }
    })
    .finally(() => {
      isSaveLoading.value = false
    })
}
// 文档
const goFile = () => {
  uni.navigateTo({
    url: `/pages/PDARepair/PDAFile/PDAFile?Devcode=` + itemInfo.value.cDeviceCode
  })
}

//删除
const goClose = (i) => {}
//查看
const goCheck = (i) => {}
//下拉
onPullDownRefresh(() => {
  // console.log('下拉');
  // currentPage.value = 1
  // total.value = 0
  // PDAawaitList.value = []
  // WaitList()
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (currentPage.value > pageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	WaitList()
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

  .content {
    width: 100%;
    font-size: 12px;

    .RUDetail {
      padding: 20rpx;

      .demo-uni-col {
        margin: 10rpx;
      }
    }

    .listMain {
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .RUlist {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;
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
        margin: 20rpx 10rpx;
        border-radius: 4px;
        box-shadow: 0 0 10px #b5b5b5;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 20rpx;

          .mini-btn {
            margin-left: 60rpx;
          }
        }
      }

      .projects {
        background: #fff;
        font-size: 12px;
        margin: 20rpx 10rpx;

        .demo-uni-row {
          display: flex;
          justify-content: space-between;
          padding: 10rpx;
        }
      }
    }

    .two-button {
      display: flex;
      justify-content: center;
      margin-top: -15px;

      .mini-btn {
        // position: fixed;
        // bottom: 30rpx;
        // left: 39%;
      }
    }
  }
}

.search-wl {
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
</style>
