<template>
  <view class="bgc">
    <view class="newsBox">
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
        <view class="content">
          <view v-if="current === 0">
            <head-nav
              :title="'消息通知'"
              :RType="'text1'"
              :NavUrl="'/pages/login/login'"
            >
            </head-nav>
            <!-- 搜索框 -->
            <uni-section
              title=""
              type="line"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
              >
              </uni-search-bar>
            </uni-section>
            <!-- 动态 -->
            <newsform
              :msg="msg"
              :wen="wen"
              :container="container"
              :btimes="btimes"
              :style="'arrow'"
              :toUrl="'/pages/tabbar/home/components/deatil/detail'"
            >
            </newsform>
            <newsform
              :msg="msg"
              :wen="wen"
              :container="container"
              :btimes="btimes"
              :style="'arrow'"
              :toUrl="'/pages/tabbar/home/components/deatil/detail'"
            >
            </newsform>
            <newsform
              :msg="msg"
              :wen="wen"
              :container="container"
              :btimes="btimes"
              :style="'arrow'"
              :toUrl="'/pages/tabbar/home/components/deatil/detail'"
            >
            </newsform>
          </view>
          <view v-if="current === 1">
            <head-nav
              :title="'消息通知'"
              :NavUrl="'/pages/login/login'"
            >
            </head-nav>
            <!-- 搜索框 -->
            <uni-section
              title=""
              type="line"
            >
              <uni-search-bar
                radius="100"
                cancelButton="none"
              >
              </uni-search-bar>
            </uni-section>
            <!-- 动态 -->
            <newsform
              :msg="msg"
              :wen="wen"
              :container="container"
              :btimes="btimes"
              :style="'arrow'"
              :toUrl="'/pages/tabbar/home/components/deatil/detail'"
            >
            </newsform>
          </view>
        </view>
      </uni-section>
    </view>
  </view>
</template>
<script setup>
import HeadNav from '@/components/head/head.vue'
import { reactive, ref } from 'vue'
//导航头部动态数据
const aa = ref('消息通知')
const msg = ref('新备注通知')
const wen = ref('新备注维护通知')
const container = ref('出新开向、锁具、合页、安装方式啦，请前往!')
const btimes = ref('查看详情')
//切换按钮设置
const items = reactive(['未读', '已读'])
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
const current = ref(0)
const colorIndex = ref(0)
const activeColor = ref('#dd524d')
const styleType = ref('button')
//点击按钮切换
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
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
</script>

<style lang="scss" scoped>
.bgc {
  // background-color: #f2f2f2;
}

.newsBox {
  position: absolute;
  top: 120rpx;
}

.navbar {
  height: 128rpx;
  background-color: lightpink;
}

//按钮布局
.button {
  // margin-right: 30px;
}

.uni-common-mt {
  margin-top: 20rpx;
}

.uni-padding-wrap {
  padding: 0rpx 30rpx;
}

.content {
  // height: 400rpx;
}
</style>
