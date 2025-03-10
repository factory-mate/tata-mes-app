<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const printerModule = uni.requireNativePlugin('ammagician-printer')
const modal = uni.requireNativePlugin('modal')

const emit = defineEmits(['onConnect', 'onDisconnect', 'onError'])

const showDialog = ref(false)
const loading = ref(false)
const devices = ref([])
const selectedDevice = ref(null)

// 获取已配对的蓝牙设备列表
const refreshDevices = async () => {
  loading.value = true
  printerModule.getDevices({ isUSB: false }, (res) => {
    if (res.success) {
      devices.value = res.data || []
    } else {
      emit('onError', { message: res.msg || '获取设备列表失败' })
    }
    loading.value = false
  })
}

// 选择设备
const selectDevice = (device) => {
  selectedDevice.value = device
}

// 连接设备
const connectDevice = () => {
  if (!selectedDevice.value) {
    modal.toast({
      message: '请先选择设备',
      duration: 1.5
    })
    return
  }

  loading.value = true
  printerModule.connect(
    {
      address: selectedDevice.value.address,
      isUSB: false,
      isIP: false
    },
    (res) => {
      loading.value = false
      if (res.success) {
        emit('onConnect', selectedDevice.value)
        showDialog.value = false
      } else {
        emit('onError', { message: res.msg || '连接失败' })
      }
    }
  )
}

// 断开连接
const disconnectDevice = () => {
  printerModule.disconnect(
    {
      isUSB: false,
      isIP: false
    },
    (res) => {
      if (res.success) {
        selectedDevice.value = null
        emit('onDisconnect')
      } else {
        emit('onError', { message: res.msg || '断开连接失败' })
      }
    }
  )
}

// 打开选择设备弹窗
const openDeviceSelector = () => {
  showDialog.value = true
  refreshDevices()
}

// 监听蓝牙设备断开
onMounted(() => {
  printerModule.addEventListener('disConnect', () => {
    selectedDevice.value = null
    emit('onDisconnect')
  })
})

defineExpose({
  openDeviceSelector,
  disconnectDevice
})
</script>

<template>
  <div class="bluetooth-printer">
    <!-- 蓝牙设备选择弹窗 -->
    <uni-popup
      ref="popup"
      type="center"
      :show="showDialog"
      @close="showDialog = false"
    >
      <view class="dialog-content">
        <view class="dialog-header">
          <text class="dialog-title">选择蓝牙打印机</text>
          <text
            class="dialog-close"
            @click="showDialog = false"
            >×</text
          >
        </view>

        <view class="device-list">
          <view
            v-if="loading"
            class="loading"
          >
            加载中...
          </view>
          <template v-else>
            <view
              v-for="device in devices"
              :key="device.address"
              class="device-item"
              :class="{ 'device-selected': selectedDevice?.address === device.address }"
              @click="selectDevice(device)"
            >
              <text class="device-name">{{ device.name || '未知设备' }}</text>
              <text class="device-address">{{ device.address }}</text>
            </view>
            <view
              v-if="devices.length === 0"
              class="no-devices"
            >
              暂无可用设备
            </view>
          </template>
        </view>

        <view class="dialog-footer">
          <button
            class="btn btn-refresh"
            @click="refreshDevices"
            :disabled="loading"
          >
            刷新
          </button>
          <button
            class="btn btn-confirm"
            @click="connectDevice"
            :disabled="!selectedDevice || loading"
          >
            确认连接
          </button>
        </view>
      </view>
    </uni-popup>
  </div>
</template>

<style scoped lang="scss">
.dialog-content {
  background: #fff;
  border-radius: 8px;
  width: 80vw;
  max-width: 600px;
}

.dialog-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  font-size: 18px;
  font-weight: bold;
}

.dialog-close {
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.device-list {
  max-height: 50vh;
  overflow-y: auto;
  padding: 16px;
}

.device-item {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
}

.device-item:hover {
  background: #f5f5f5;
}

.device-selected {
  border-color: #007aff;
  background: #e6f2ff;
}

.device-name {
  font-size: 16px;
  display: block;
  margin-bottom: 4px;
}

.device-address {
  font-size: 14px;
  color: #666;
}

.dialog-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-refresh {
  background: #f5f5f5;
  color: #333;
}

.btn-confirm {
  background: #007aff;
  color: #fff;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.no-devices {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
