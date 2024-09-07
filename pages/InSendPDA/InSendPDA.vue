<template>
  <view class="changeList">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
    />
    <view>
      <view>
        <view style="display: flex; align-items: center; margin-top: 4px">
          <view style="width: 80px">申报日期：</view>
          <view style="flex: 1">
            <uni-datetime-picker
              v-model="form.date"
              type="day"
              @change=""
            />
          </view>
        </view>
        <view style="display: flex; align-items: center; margin-top: 4px">
          <view style="width: 80px">申报人：</view>
          <view style="flex: 1">
            <up-input
              v-model="form.user"
              placeholder="请输入申报人"
            />
          </view>
        </view>
        <view style="display: flex; align-items: center; margin-top: 4px">
          <view style="width: 80px">加工码：</view>
          <view style="flex: 1">
            <up-input
              v-model="form.code"
              placeholder="请输入加工码"
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
            style="margin-top: 4px; color: black; backgroundcolor: #aaaa7f; bordercolor: #aaaa7f"
            type="warn"
            size="mini"
            @click="reset()"
          >
            重置
          </button>
        </view>
      </view>

      <view
        class="listMain"
        :style="'height:' + (h - 140) + 'px'"
      >
        <view
          class="project"
          v-for="(item, index) in DataList"
          :key="index"
        >
          <uni-row class="demo-uni-row">
            <uni-col :span="10">
              <view
                class="demo-uni-col dark"
                style="font-size: 16px; color: blue"
                >申报人：{{ item.max_Error_dReportPerson }}</view
              >
            </uni-col>
            <uni-col :span="14">
              <view
                class="demo-uni-col dark"
                style="font-size: 16px; color: blue"
                >申报日期：{{ item.max_Error_dReportDate }}</view
              >
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">产品名称：{{ item.cInvName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="16">
              <view class="demo-uni-col dark">生产单号：{{ item.cCode }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark">单序号：{{ item.iOrderIndex }}</view>
            </uni-col>
            <uni-col :span="8">
              <view class="demo-uni-col dark">总序号：{{ item.iIndx }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="6">
              <view class="demo-uni-col dark">材质：{{ item.cDefindParm01 }}</view>
            </uni-col>
            <uni-col :span="16">
              <view class="demo-uni-col dark">尺寸：{{ item.X }} *{{ item.Y }}*{{ item.Z }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark">面板分号：{{ item.cDefindParm05 }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark">包装产线：{{ item.PackageUnitName }}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark">申报时间：{{}}</view>
            </uni-col>
          </uni-row>
          <uni-row class="demo-uni-row">
            <uni-col :span="8">
              <view class="demo-uni-col dark">加工码：{{ item.cBarCode }}</view>
            </uni-col>
          </uni-row>
          <view class="Two-btn">
            <button
              class="mini-btn"
              style="background-color: blue"
              type="warn"
              size="mini"
              @click="goReapirReturn(item)"
            >
              返修
            </button>
            <button
              class="mini-btn"
              style="background-color: green"
              type="warn"
              size="mini"
              @click="Close(item)"
            >
              关闭
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ErrorList, ErrorListClose } from '@/api/PDA.js'
const h = ref('100')
const title = ref('内返PDA')
//加载页面
onLoad((option) => {
  h.value = uni.getSystemInfoSync().windowHeight
})
onShow(() => {
  AjaxData()
})
const form = ref({
  date: '',
  code: '',
  user: ''
})

const reset = () => {
  form.value = {
    date: '',
    code: '',
    user: ''
  }
}

const search = () => {
  AjaxData()
}

let DataList = ref([])
//异常列表
const AjaxData = async () => {
  uni.showLoading({
    title: '加载中'
  })
  const res = await ErrorList()
  if (res.status == 200) {
    uni.hideLoading()
    DataList.value = res.data
  } else {
    uni.hideLoading()
    uni.showToast({
      icon: 'none',
      title: res.errmsg
    })
  }
}

//头部左侧,返回上一页
const clickLeft = () => {
  uni.navigateBack({
    delta: 1
  })
}
//列表跳转返修页
const goReapirReturn = (i) => {
  uni.navigateTo({
    url: '/pages/InSendPDA/ReturnReapir?itemInfo=' + JSON.stringify(i)
  })
}
//关闭
const Close = async (i) => {
  const res = await ErrorListClose({
    S_S_S_uid: i.S_S_S_uid
  })
  if (res.status == 200) {
    uni.showToast({
      icon: 'none',
      title: res.msg
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: res.errmsg
    })
  }
  console.log(res, '关闭-----')
}
</script>

<style scoped lang="scss">
.changeList {
  padding-bottom: 10rpx;
  width: 100%;
  height: 100%;

  .top-search {
    padding: 0 20rpx;
    border-bottom: 1px solid #eee;
  }

  .listMain {
    margin-top: 2px;
    width: 100%;
    height: calc(100% - 240rpx);
    overflow-y: auto;
    font-size: 14px;

    .project {
      background: #fff;
      padding: 20rpx;
      margin: 30rpx 20rpx;
      border-radius: 4px;
      box-shadow: 0 0 10px #d6d6d6;
      .demo-uni-row {
        padding: 5px 0;
      }
      .Two-btn {
        display: flex;
        margin-left: 50%;
        .mini-btn {
          margin: 10px 5px;
        }
      }
    }
  }
}
</style>
