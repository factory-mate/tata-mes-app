<script setup>
import { ref } from 'vue'
import { AuthHelperAPI } from '@/services'
import { onShow } from '@dcloudio/uni-app'
import { moduleMap } from '@/features/modules'

const groups = ref([])
const current = ref(0)

const onClickTabItem = ({ currentIndex }) => {
  current.value = currentIndex
}

const onClickModuleItem = (url) => uni.navigateTo({ url })

onShow(() => {
  if (groups.value.length === 0) {
    uni.showLoading({ title: '加载中' })
  }
  AuthHelperAPI.getMenuAuth()
    .then((res) => {
      groups.value = res.data
    })
    .finally(() => uni.hideLoading())
})
</script>

<template>
  <view>
    <uni-segmented-control
      :values="groups.map((i) => i.cMenuName)"
      styleType="text"
      activeColor="#ff0000"
      @clickItem="onClickTabItem"
    />

    <view
      v-for="(item, index) in groups"
      :key="item.cModelCode"
      v-show="current === index"
      class="group-item"
    >
      <view
        v-for="(child, i) in item.Child.filter((i) => !i.IsHidden).filter((i) =>
          moduleMap.has(i.cModelCode)
        )"
        :key="i"
        class="child-item-wrapper"
      >
        <view
          v-if="moduleMap.has(child.cModelCode)"
          class="child-item"
          @click="onClickModuleItem(moduleMap.get(child.cModelCode).url)"
        >
          <view class="img-wrapper">
            <image
              :src="moduleMap.get(child.cModelCode).src"
              mode="aspectFit"
              fade-show
            />
          </view>
          <view class="title">{{ child.cMenuName }}</view>
        </view>
      </view>

      <!-- <view class="child-item-wrapper">
        <view
          v-if="index === 0"
          class="child-item"
          @click="onClickModuleItem('/pages/wms/stock-count/index')"
        >
          <view class="img-wrapper">
            <image
              src="../../../static/img/workIcon/Allchuku.png"
              mode="aspectFit"
              fade-show
            />
          </view>
          <view class="title"> 仓库盘点 </view>
        </view>
        -->
    </view>
  </view>
</template>

<style scoped lang="scss">
.group-item {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
}

.child-item-wrapper {
  width: 33%;
  margin-bottom: 16px;

  .child-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .img-wrapper {
    background-color: white;
    border-radius: 100%;
    box-shadow: 0 2px 5px #d1d1d1;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 32px;
      height: 32px;
    }
  }

  .title {
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
