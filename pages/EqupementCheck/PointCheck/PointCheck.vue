<template>
  <!-- 待点检--点检 -->
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
    <view class="HeadTop">
      <view
        class="demo-uni-col dark"
        @click="previewMainImage"
      >
        图片：{{ imgInfo.name }}
      </view>
      <view class="demo-uni-col dark">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          style="background-color: green"
          @click="takeMainPhoto"
        >
          设备拍照
        </button>
      </view>
      <view class="demo-uni-col dark">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          style="background-color: rosybrown"
          @click="goFile"
        >
          文档
        </button>
      </view>
    </view>
    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
      <view class="listMain">
        <scroll-view
          :style="'height:' + (h - 100) + 'px'"
          scroll-y="true"
          lower-threshold="50"
          show-scrollbar="true"
        >
          <template
            v-for="(item, index) in dataList"
            :key="index"
          >
            <view
              class="project"
              :class="item.iStatusName === '已完成' && 'list-item-finish'"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="12">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">状态：{{ item.iStatusName }}</view>
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
                  <view class="demo-uni-col dark">周期单位：{{ item.cPARM04 }}</view>
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">周期数值：{{ item.cPARM05 }}</view>
                </uni-col>
              </uni-row>
              <view
                style="font-size: 14px; margin: 10px"
                v-if="item.FileUID1"
              >
                <view style="display: flex; align-items: center">
                  <view
                    style="font-size: 14px; margin: 10px"
                    @click="preview(1, item.FileName1)"
                  >
                    {{ item.FileName1?.split('&')[0] }}
                  </view>
                  <view style="width: 100rpx">
                    <up-button
                      type="error"
                      size="small"
                      text="删除"
                      @click="handleDeletePhotoItem(item.FileUID1)"
                    />
                  </view>
                </view>

                <view
                  style="display: flex; align-items: center"
                  v-if="item.FileUID2"
                >
                  <view
                    style="font-size: 14px; margin: 10px"
                    @click="preview(2, item.FileName2)"
                  >
                    {{ item.FileName2?.split('&')[0] }}
                  </view>
                  <view style="width: 100rpx">
                    <up-button
                      type="error"
                      size="small"
                      text="删除"
                      @click="handleDeletePhotoItem(item.FileUID2)"
                    />
                  </view>
                </view>

                <view
                  style="display: flex; align-items: center"
                  v-if="item.FileUID3"
                >
                  <view
                    style="font-size: 14px; margin: 10px"
                    @click="preview(3, item.FileName3)"
                  >
                    {{ item.FileName3?.split('&')[0] }}
                  </view>
                  <view style="width: 100rpx">
                    <up-button
                      type="error"
                      size="small"
                      text="删除"
                      @click="handleDeletePhotoItem(item.FileUID3)"
                    />
                  </view>
                </view>
              </view>
              <view style="display: flex; justify-content: space-around">
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    style="background-color: green"
                    @click="ToPic(item)"
                  >
                    项目拍照
                  </button>
                </view>
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    style="background-color: orange"
                    @click="ToGtagrt(item)"
                  >
                    指标
                  </button>
                </view>
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    style="background-color: rosybrown"
                    @click="goFile(item)"
                  >
                    文档
                  </button>
                </view>
                <view class="demo-uni-col dark">
                  <button
                    class="mini-btn"
                    type="warn"
                    size="mini"
                    style="background-color: firebrick"
                    @click="ToRepairt(item)"
                  >
                    报修
                  </button>
                </view>
              </view>
            </view>
          </template>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
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
  DeviceListInfoItem,
  DeviceVouchFileGetForList,
  DeviceTourvouchGetById,
  deleteDeviceVouchFile
} from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'

// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('设备点检')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
//总页数
const pageTotal = ref(0)
const detail = ref({})
const dataList = ref({})
let uid = ref('')
const code = ref('')
const name = ref('')
const address = ref('')
const Parm = ref('')
const cParmCode = ref('')
const imgInfo = ref({})

onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  getList()
  if (uid.value) {
    getMainImage(uid.value)
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
  // detail.value = JSON.parse(option.detail)
  uid.value = option.id
  code.value = option.code
  name.value = option.name
  address.value = option.addres
  Parm.value = option.pamname
  cParmCode.value = option.ccode
  getList()
  getMainImage(option.id)
})
const getMainImage = (val) => {
  DeviceTourvouchGetById({ val }).then((res) => {
    if (res.status == 200) {
      const [name, url] = res.data.VouchFileName?.split('&') ?? []
      imgInfo.value = {
        name,
        url
      }
    }
  })
}

const previewMainImage = () => {
  uni.previewImage({
    current: 0,
    urls: [imgInfo.value.url]
  })
}

const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
// 指标
const ToGtagrt = (i) => {
  // 校验是否已经拍照
  if (!imgInfo.value.name) {
    uni.showToast({
      title: '请先进行设备拍照',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: `/pages/EqupementCheck/PointTarget/PointTarget?uid=${i.UID}`
  })
}
// 文档
const goFile = (i) => {
  if (i.cProgramName) {
    uni.navigateTo({
      url: `/pages/EqupementCheck/EquipFile/EquipFile?code=${i.cProgramCode}`
    })
  } else {
    uni.navigateTo({
      url: `/pages/EqupementCheck/EquipFile/EquipFile?Devcode=${code.value}`
    })
  }
}
// 报修
const ToRepairt = (i) => {
  uni.navigateTo({
    url: `/pages/EqupementCheck/EquipmentRepair/EquipmentRepair?code=${code.value}&name=${name.value}&addres=${address.value}&program=${i.cProgramName}&progeamCode=${i.cProgramCode}&cPar01=${Parm.value}&cParm03=${cParmCode.value}`
  })
}
//单据增加图片
const ToPic = (i) => {
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['camera'],
    success: (res) => {
      if (res.tempFilePaths?.length > 0) {
        uni.uploadFile({
          url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/Vouch_S_FileAdd',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            uid: i.UID
          },
          header: {
            Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
          },
          success: () => {
            uni.showToast({
              icon: 'none',
              title: '上传成功'
            })
            getList()
          }
        })
      }
    }
  })
}

const takeMainPhoto = () => {
  console.log(uid.value)
  uni.chooseImage({
    sizeType: ['compressed'],
    sourceType: ['camera'],
    success: (res) => {
      if (res.tempFilePaths?.length > 0) {
        uni.uploadFile({
          url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/Vouch_FileAdd',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            uid: uid.value
          },
          header: {
            Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
          },
          success: () => {
            uni.showToast({
              icon: 'none',
              title: '上传成功'
            })
            getList()
            getMainImage(uid.value)
          }
        })
      }
    }
  })
}
//设备添加图片
// const DEVpic = () => {
// 	uni.navigateTo({
// 		url: `/pages/EqupementCheck/TackPicture/TackPicture?Devuid=${uid.value}`
// 	})
// }
//获取数据
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  DeviceListInfoItem({
    val: uid.value
  }).then((res) => {
    if (res.status == 200) {
      dataList.value = res.data
      uni.hideLoading()
      uni.stopPullDownRefresh()
    } else {
      uni.hideLoading()
    }
  })
  DeviceVouchFileGetForList({
    Conditions: `mid=${uid.value}`
  }).then((res) => {
    if (res.status == 200) {
      console.log(res.data)
    }
  })
}
//图片预览
const preview = (index, i) => {
  console.log(i, '图片----')
  let arr = []
  let url = i.split('&')[1]
  arr.push(url)
  uni.previewImage({
    current: index,
    urls: arr
  })
}
//下拉
onPullDownRefresh(() => {
  console.log('下拉')
  // if (current.value == 1) {
  // 	currentPage.value = 1
  // 	total.value = 0
  // 	DJliST.value = []
  // 	GetPageList()
  // }
})
//上拉
const scrolltolower = () => {
  // more.value = 'loading'
  // // console.log('上拉');
  // if (current.value == 1) {
  // 	currentPage.value++
  // 	if (currentPage.value > pageTotal.value) {
  // 		more.value = 'no-more'
  // 	} else {
  // 		GetPageList()
  // 	}
  // }
}
//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}

const handleDeletePhotoItem = async (id) => {
  try {
    const { success } = await deleteDeviceVouchFile([id])
    if (success) {
      getList()
    }
  } catch {
    //
  }
}
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  padding-bottom: 10rpx;

  .HeadTop {
    font-size: 14px;
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
      height: calc(100% - 100rpx);
      overflow-y: auto;
      font-size: 14px;

      .project {
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

.list-item-finish {
  background-color: #95ed6b !important;
}
</style>
