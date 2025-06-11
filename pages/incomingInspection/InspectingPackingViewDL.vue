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
        <uni-col :span="12">
          <view class="demo-uni-col">指标编号：{{ getByVal.cStandardCode }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">指标名称：{{ getByVal.cStandardName }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">包号：{{ getByVal.cPackageCode }}</view>
        </uni-col>
        <uni-col :span="12">
          <view
            style="display: flex; align-items: center"
            class="required"
          >
            <view style="width: 90px">包检测数量：</view>
            <view
              class="search-inpt"
              style="width: 60%"
            >
              <up-input
                type="number"
                v-model="baoVal"
                placeholder="请输入数量"
              >
              </up-input>
            </view>
          </view>
        </uni-col> </uni-row
      ><uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">检验方法：{{ getByVal.cCheckTypeName }}</view>
        </uni-col>
        <uni-col :span="12">
          <view style="display: flex; align-items: center">
            <view style="width: 90px">不良数量：</view>
            <view
              class="search-inpt"
              style="width: 60%"
            >
              <up-input
                type="number"
                v-model="buslVal"
                placeholder="请输入数量"
              >
              </up-input>
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="24">
          <view class="demo-uni-col">检验标准：{{ getByVal.cGuideMemo }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">标准值：{{ getByVal.nStandValue }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">下限值：{{ getByVal.nMinValue }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">单位：</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">上限值：{{ getByVal.nMaxValue }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="12">
          <view class="demo-uni-col">包数量：{{ getByVal.nCheckQuantity }}</view>
        </uni-col>
        <uni-col :span="12">
          <view class="demo-uni-col">拒收比例：{{ getByVal.nNoQualificationRate }}</view>
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <uni-col :span="24">
          <view class="demo-uni-col"
            >附件：{{
              getByVal.FileList
                ? getByVal.FileList[0].cFilePath +
                  getByVal.FileList[0].cFileReName +
                  getByVal.FileList[0].cFileSuffix
                : ''
            }}</view
          >
        </uni-col>
      </uni-row>
      <uni-row class="demo-uni-row formSty">
        <!-- 	<uni-col :span="12" v-if="getByVal.ImageList[0]">
					<view class="demo-uni-col picSty" @click="preview(0)">图片：{{getByVal.ImageList}}</view>
				</uni-col> -->
        <!-- <uni-col :span="12" v-if="PicArr[1] ">
					<view class="demo-uni-col picSty" @click="preview(1)">图片：{{funPic(PicArr[1])}}</view>
				</uni-col> -->
      </uni-row>
      <view class="picStyCon">
        <view
          class="picSty"
          @click="preview(i + 1, getByVal.ImageList)"
          v-for="(item, i) in getByVal.ImageList"
          :key="item"
          >图片：{{ item.cFileReName }}{{ item.cFileSuffix }}</view
        >
      </view>

      <up-image
        v-for="(item, i) in getByVal.ImageList"
        :show-loading="false"
        :src="item.cFilePath + item.cFileReName + item.cFileSuffix"
        width="80px"
        height="80px"
      ></up-image>

      <view style="margin-left: 80%; margin-top: -30rpx; padding-bottom: 20rpx">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          @click="TackPic"
          style="margin-top: 50rpx"
        >
          拍照
        </button>
      </view>
    </view>

    <view class="content">
      <!-- 搜索框 -->
      <view class="search-wl">
        <uni-row
          class="demo-uni-row"
          style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20rpx"
        >
          <uni-col :span="18">
            <view
              style="display: flex; text-align: center; justify-content: start; align-items: center"
            >
              <view style="width: 50px">检测值：</view>
              <view
                class="search-inpt"
                style="width: 60%"
              >
                <up-input
                  type="digit"
                  v-model="jcVal"
                  placeholder="请输入值"
                >
                </up-input>
              </view>
            </view>
          </uni-col>
          <uni-col :span="6">
            <button
              class="mini-btn"
              type="warn"
              size="mini"
              @click="clickEnd"
              style=""
            >
              确定
            </button>
          </uni-col>
        </uni-row>
      </view>
      <view class="listMain">
        <scroll-view
          :style="'height:' + (h - 390) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
          @scrolltolower="scrolltolower"
        >
          <view class="project">
            <view
              class="wLIst"
              v-for="(item, i) in xiangMList"
              :key="i"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="8">
                  <view class="demo-uni-col dark">序号：{{ i + 1 }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col dark">检测值：{{ item.nCheckValue }}</view>
                </uni-col>
                <uni-col :span="8">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    @click="clickDel(item)"
                    style=""
                  >
                    删除
                  </button>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <!-- <uni-load-more :status="more"></uni-load-more> -->
        </scroll-view>
      </view>

      <uni-row
        class="demo-uni-row"
        style="position: fixed; bottom: 10px; left: 10px; right: 10px"
      >
        <uni-col :span="24">
          <up-button
            type="error"
            size="small"
            @click="clickTJ"
            text="提交"
          />
        </uni-col>
      </uni-row>
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
import URLIP from '@/utils/serviceIP.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import {
  SetSnNoPassQuantityTJ,
  GetBodyXL,
  Get_S_ById,
  GetForList_S_S,
  Add_S_S,
  Del_S_S
} from '@/api/lailiao.js'
// import loginVue from '../../login/login.vue';
let branch = ref()
const h = ref('100') //页面高度
const more = ref('more') //加载更多
const focusType = ref(false)
const focusXM = ref(true)
const title = ref('来料质检单详情-定量')
const current = ref(0)
const WList = ref([])
const XMliST = ref([])
const xiangMObj = ref('')
const jcVal = ref('')
const xiangMList = ref([])
const PicArr = ref([])
const Product = ref('')
const ProductName = ref('')
const slVal = ref('')
const Productrange = ref([{ name: '11', value: '11' }])
const buslVal = ref('')
const baoVal = ref('')
const xlList = ref([])
const getByVal = ref({})

const PeofocusType = ref(false)
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
  console.log(routeVal.value, 'ii')
  h.value = uni.getSystemInfoSync().windowHeight
  getby()
  // getGetBodyXL()
  getList()
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
const getGetBodyXL = () => {
  GetBodyXL({ cStandardCode: routeVal.value.cStandardCode }).then((res) => {
    xlList.value = res.data || []
  })
}
//产品类型变化
const PROchange = () => {
  console.log(Product.value, '1')
  xlList.value.forEach((item) => {
    if (item.cParmValueCode == Product.value) {
      ProductName.value = item.cParmValueName || ''
    }
  })
}
const inputChange = () => {
  console.log(Product.value, '2')
}
const zhibiao = () => {
  uni.navigateTo({
    url: '/pages/incomingInspection/InspectingPackingViewZB'
  })
}
const clickTJ = () => {
  if (!baoVal.value) {
    uni.showToast({
      icon: 'error',
      title: '包检测数量不能为空'
    })
    return false
  }
  // if (!buslVal.value) {
  //   uni.showToast({
  //     icon: 'error',
  //     title: '不良数量不能为空'
  //   })
  //   return false
  // }
  let obj = {
    UID: routeVal.value.UID,
    nCheckQuantity: baoVal.value,
    nNoPassQuantity: buslVal.value ?? 0,
    nNoQualificationRate: getByVal.nNoQualificationRate
  }
  SetSnNoPassQuantityTJ(obj).then((res) => {
    uni.showToast({
      icon: '',
      title: res.msg || '成功'
    })
    baoVal.value = ''
    buslVal.value = ''
    uni.navigateBack({
      delta: 1
    })
  })
}
// 箱码
const getXiangMa = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    cKeyCode: xmVal.value
  }
  GetSingleBycBarCode(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    // console.log(res,"-resxiangMObj.value");
    xiangMObj.value = res.data
    // xiangMObj.value.cDefindParm02=xmVal.value
    // xiangMList.value.push(xiangMObj.value)
    // xmVal.value=''
  })
}
const clickEnd = () => {
  console.log(jcVal.value, '--slVal.value')
  if (jcVal.value == '') {
    uni.showToast({
      icon: 'error',
      title: '请输入值'
    })
    return false
  }

  let obj = {
    MID: routeVal.value.UID,
    IsRefCheck: true, //定量 true 定性 false
    cParmValueCode: '',
    cParmValueName: '',
    nCheckValue: jcVal.value,
    nQuantity: 0
  }
  Add_S_S(obj).then((res) => {
    if (res.status == 200) {
      uni.showToast({
        icon: 'success',
        title: res.msg || '成功！'
      })

      jcVal.value = ''

      getList()
    } else {
      uni.showToast({
        icon: 'error',
        title: res.msg || '失败！'
      })
    }
  })
}
const getby = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    val: routeVal.value.UID
  }
  Get_S_ById(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    getByVal.value = res.data
    baoVal.value = res.data.nCheckQuantity ?? ''
    buslVal.value = res.data.nNoPassQuantity ?? ''
    // if(res.data.ImageList.length){
    // 	res.data.ImageList.forEach(item=>{
    // 		PicArr.value.push(item.)

    // 	})
    // }
    // pageTotal.value=res.data.pageCount
  })
}
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  let obj = {
    MID: routeVal.value.UID
  }
  GetForList_S_S(obj).then((res) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    xiangMList.value = res.data
    // pageTotal.value=res.data.pageCount
  })
}
const clickDel = (v) => {
  Del_S_S([v.UID]).then((res) => {
    if (res.status == '200') {
      uni.showToast({
        icon: '',
        title: res.msg || '删除成功！'
      })
      getList()
    } else {
      uni.showToast({
        icon: 'error',
        title: res.msg || '删除失败！'
      })
    }
  })
}
const funPic = (v) => {
  if (v) {
    let arr = v.split('/')
    return arr[arr.length - 1]
  }
}
//拍照
const TackPic = () => {
  openSelectImage()
}
//调取拍照
const openSelectImage = () => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      if (res.tempFilePaths?.length > 0) {
        console.log(res, '拍照-------------------')
        picSave(res.tempFilePaths[0])

        // // #ifdef MP
        // this.recursionCompressMP(tempList, (e) => {
        // 	console.log('压缩后结果-----', e)
        // })
        // // #endif
        // // #ifdef H5
        // this.recursionCompressH5(tempList, (e) => {
        // 	console.log('压缩后结果-----', e)
        // })
        // // #endif
      }
    },
    fail: (err) => {
      console.log('err: ------', err)
    }
  })
}
//图片预览
const preview = (index, arr) => {
  let list = []
  arr.forEach((item) => {
    list.push(item.cFilePath + item.cFileReName + item.cFileSuffix)
  })
  console.log(list)
  uni.previewImage({
    current: index,
    urls: list
  })
}
// 图片上传
const picSave = (item) => {
  //单据图片
  uni.uploadFile({
    url: URLIP.BASE_URL_Quantity + '/api/Project/UpLoad?uid=' + routeVal.value.UID,
    filePath: item,
    name: 'file',
    // method:'',
    // formData: {
    // 	'uid': routeVal.value.UID,
    // },
    header: {
      //请求头配置
      Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
    },
    success: (res) => {
      if (JSON.parse(res.data).status == '200') {
        uni.showToast({
          icon: 'none',
          title: '保存成功'
        })
        getby()
      } else {
        uni.showToast({
          icon: 'error',
          title: JSON.parse(res.data).errmsg[0].Value || '失败'
        })
      }
      // PicArr.value.push(item)
      // console.log(PicArr.value,"---PicArr.value");
      // PicArr.value = []
    }
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // currentPage.value = 1
  // total.value = 0
  // xiangMList.value = []
  // getList()
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // console.log('上拉');
  // currentPage.value++
  // if (currentPage.value > pageTotal.value) {
  // 	more.value = 'no-more'
  // } else {
  // 	getList()
  // }
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
:deep(.uni-searchbar__box-icon-search) {
  display: none;
}
.picStyCon {
  // border: 1px solid red;
  width: 100%;
  font-size: 12px;
  display: flex;
}
</style>
