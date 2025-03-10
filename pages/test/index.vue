<script setup>
function handleBluetooth() {
  uni.navigateTo({
    url: '/pages/test/bluetooth/index'
  })
}

function handlePrint() {
  uni.navigateTo({
    url: '/pages/test/print/index'
  })
}

function handleZebraPrint() {
  uni.navigateTo({
    url: '/pages/test/zebra-print/index'
  })
}
</script>

<template>
  <view>
    <up-button @click="handleBluetooth">测试蓝牙</up-button>
    <up-button @click="handlePrint">测试打印</up-button>
    <up-button @click="handleZebraPrint">测试 Zebra 打印</up-button>
  </view>
</template>
