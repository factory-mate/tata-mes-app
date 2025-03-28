<template>
  <!-- 待保养--保养 -->
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
      <!-- <view class="demo-uni-col dark">图片：{{}}</view> -->
      <view
        class="demo-uni-col dark"
        style="
          width: 60%;
          height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        "
        @click="
          preview(
            1,
            imgfileList[0]?.cFilePath + imgfileList[0]?.cFileReName + imgfileList[0]?.cFileSuffix,
            true
          )
        "
        >图片：{{ imgfileList[0] && imgfileList[0]?.cFileName + imgfileList[0]?.cFileSuffix }}</view
      >
      <view class="demo-uni-col dark">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          style="background-color: green; white-space: nowrap"
          @click="takeMainPhoto"
        >
          增加图片
        </button>
      </view>
      <view class="demo-uni-col dark">
        <button
          class="mini-btn"
          type="warn"
          size="mini"
          style="background-color: rosybrown; white-space: nowrap; margin-left: 4px"
          @click="goFile"
        >
          文档
        </button>
      </view>
    </view>
    <view class="content">
      <!-- <text  style="font-size: 16px;margin: 20px 30%;">暂无数据，请添加</text> -->
      <view
        class="listMain"
        :style="'height:' + (h - 120) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in dataList"
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
              <view class="demo-uni-col dark">项目编码：{{ item.cProgramCode }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">项目名称：{{ item.cProgramName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark">是否已保养：{{ item.iStatusName }}</view>
            </uni-col>
            <uni-col :span="12">
              <view class="demo-uni-col dark">周期单位：{{ item.cPARM04 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
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
                加图
              </button>
            </view>
            <view class="demo-uni-col dark">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                style="background-color: green"
                @click="Finished(item)"
              >
                完成
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
          </view>
          <view style="display: flex; justify-content: space-around">
            <view class="demo-uni-col dark">
              <button
                class="mini-btn"
                type="warn"
                size="mini"
                style="background-color: orange"
                @click="ToPart(item)"
              >
                备件
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
import { GetMianItemInfo, EndPost, device_vouch_file, deleteDeviceVouchFile } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
import URLIP from '@/utils/serviceIP.js'

// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('设备保养')
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
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif
  getList()
  imgfile()
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
  imgfile()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//img
const imgfileList = ref([])
const imgfile = () => {
  const obj = {
    Conditions: `MID = ${uid.value}`
  }
  device_vouch_file(obj).then((res) => {
    imgfileList.value = res.data
  })
}
//完成
const Finished = (i) => {
  // 校验是否已经拍照
  if (!imgfileList.value[0]) {
    uni.showToast({
      icon: 'none',
      title: '请先添加图片'
    })
    return
  }
  EndPost({
    MID: uid.value,
    UID: i.UID
  })
    .then((res) => {
      if (res.status == 200) {
        uni.showToast({
          icon: 'none',
          title: '完成成功'
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '失败'
        })
      }
    })
    .finally(() => {
      getList()
    })
}
// 指标
const ToGtagrt = (i) => {
  uni.navigateTo({
    url: `/pages/ProDeviceMantin/ProManTainTarget/ProManTainTarget?uid=${i.UID}&code=${code.value}&partcode=${i.cProgramCode}`
  })
}
// 文档
const goFile = (i) => {
  if (i.cProgramName) {
    uni.navigateTo({
      url: `/pages/ProDeviceMantin/ProDevFile/ProDevFile?code=${i.cProgramCode}`
    })
  } else {
    uni.navigateTo({
      url: `/pages/ProDeviceMantin/ProDevFile/ProDevFile?Devcode=${code.value}`
    })
  }
}
// 报修
const ToRepairt = (i) => {
  uni.navigateTo({
    url: `/pages/ProDeviceMantin/ProDevRepair/ProDevRepair?code=${code.value}&name=${name.value}&addres=${address.value}&program=${i.cProgramName}&progeamCode=${i.cProgramCode}&cPar01=${Parm.value}&cParm03=${cParmCode.value}`
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
          url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/Vouch_S_FileAdd',
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
          url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/Vouch_FileAdd',
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
            imgfile()
          }
        })
      }
    }
  })
}

//备件
const ToPart = (i) => {
  uni.navigateTo({
    url: `/pages/ProDeviceMantin/ProReadyPart/ProReadyPart?id=${i.UID}`
  })
}
//获取数据
const getList = () => {
  uni.showLoading({
    title: '加载中'
  })
  GetMianItemInfo({
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
}
//图片预览
const preview = (index, i, isOrigin) => {
  console.log(i, '图片----')
  let arr = []
  let url = isOrigin ? i : i.split('&')[1]
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
    // justify-content: space-between;

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
      height: calc(100% - 200rpx);
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
</style>
