<template>
  <!-- 保养 --文件-->
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
      <view class="demo-uni-col dark">文档列表</view>
    </view>
    <view class="content">
      <text
        v-if="!FileDataList.length"
        style="font-size: 16px; margin: 20px 30%"
        >暂无数据</text
      >
      <view
        class="listMain"
        :style="'height:' + (h - 240) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in FileDataList"
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
            <uni-col :span="16">
              <view class="demo-uni-col dark">文档名称：{{ item.cFileName }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">文档类型：{{ item.cFileType }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="12">
              <view class="demo-uni-col dark"> </view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">
                <button
                  class="mini-btn"
                  type="warn"
                  size="mini"
                  @click="preview(index, item)"
                >
                  查看
                </button>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <!-- 下载文件组件 -->
    <ss-download
      ref="ssdownload"
      :fileUrl="fileUrl"
      :fileType="fileType"
    ></ss-download>
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
import { GetFile, GetDevFile } from '@/api/PDA.js'
import permision from '@/common/permission.js'
import _ from 'lodash'
// import loginVue from '../login/login.vue';
let branch = ref()
const title = ref('查看文档')
const h = ref('100') //页面高度
const more = ref('more') //加载更多
//页面条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//总条数
const total = ref(0)
const code = ref()
const Devcode = ref()
const FileDataList = ref([])
//总页数
const pageTotal = ref(0)
const fileUrl = ref('')
const fileType = ref('')
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
  if (option.code) {
    code.value = option.code
    GetDataFile()
  }
  if (option.Devcode) {
    Devcode.value = option.Devcode
    GetDevFileData()
  }
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
}
//单据文档
const GetDataFile = () => {
  uni.showLoading({
    title: '加载中'
  })
  GetFile({
    OrderByFileds: '',
    Conditions: `cprogramcode=${code.value}`
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      FileDataList.value = res.data
    } else {
      uni.hideLoading()
    }
  })
}
//设备文档
const GetDevFileData = () => {
  uni.showLoading({
    title: '加载中'
  })
  GetDevFile({
    OrderByFileds: '',
    Conditions: `cDeviceCode=${Devcode.value}`
  }).then((res) => {
    if (res.status == 200) {
      uni.hideLoading()
      uni.stopPullDownRefresh()
      FileDataList.value = res.data
    } else {
      uni.hideLoading()
    }
  })
}
const preview = (index, i) => {
  console.log(i, '查看--------------')
  if (i.cFileType == '.png') {
    let arr = []
    const url = i.cFileRoteUrl + i.cActName + i.cFileType
    arr.push(url)
    uni.previewImage({
      current: index,
      urls: arr
    })
  } else {
    fileUrl.value = i.cFileRoteUrl + i.cActName + i.cFileType
    fileType.value = i.cFileType
    // Download(i)
  }
}

const Download = (i) => {
  let system = uni.getSystemInfoSync().platform
  if (system == 'ios') {
    uni.downloadFile({
      url: i.cFileRoteUrl + i.cActName + i.cFileType, //下载地址接口返回
      success: (data) => {
        if (data.statusCode === 200) {
          //文件保存到本地
          uni.saveFile({
            tempFilePath: data.tempFilePath, //临时路径
            success: function (res) {
              uni.showToast({
                icon: 'none',
                mask: true,
                title: '文件已保存：' + res.savedFilePath, //保存路径
                duration: 2000
              })
              setTimeout(() => {
                let filePath = res.savedFilePath
                filePath = encodeURI(filePath)
                //打开文档查看
                uni.openDocument({
                  filePath,
                  success: function (res) {
                    console.log('打开文档成功')
                  },
                  fail: (res1) => {
                    uni.getImageInfo({
                      src: filePath,
                      success: (imgInfo) => {
                        uni.previewImage({
                          current: filePath,
                          urls: [filePath]
                        })
                      },
                      fail: (err) => {
                        uni.showToast({
                          title: '不支持该格式',
                          icon: 'none'
                        })
                        return
                      }
                    })
                  }
                })
              }, 2000)
            }
          })
        }
      },
      fail: (err) => {
        console.log(err)
        uni.showToast({
          icon: 'none',
          mask: true,
          title: '失败请重新下载'
        })
      }
    })
  } else {
    let url = i.cFileRoteUrl + i.cActName + i.cFileType
    let dtask = plus.downloader.createDownload(
      url,
      {
        filename: 'file://storage/emulated/0/附件/' + item.fileName //利用保存路径，实现下载文件的重命名
      },
      function (d, status) {
        //d为下载的文件对象
        if (status == 200) {
          //下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
          let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename)
          plus.runtime.openFile(d.filename) //选择软件打开文件
        } else {
          //下载失败
          plus.downloader.clear() //清除下载任务
        }
      }
    )
    dtask.start()
  }
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
      height: calc(100% - 240rpx);
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
