<script setup>
import { ref, onMounted } from 'vue'

// 获取 module,所有接口返回的数据格式为json： {success: true, msg: '' , data: Object}
const printerModule = uni.requireNativePlugin('ammagician-printer')
const modal = uni.requireNativePlugin('modal')

// 主动监听蓝牙设备断开后，插件向外发送的事件。该事件依赖于插件内部注册的广播。
printerModule.addEventListener('disConnect', function (e) {})

const device = ref({ name: '' })
const devices = ref([])

// 是否准备完毕
function isReady() {
  printerModule.isReady({}, (res) => {
    modal.toast({
      message: JSON.stringify(res.data),
      duration: 1.5
    })
  })
}

// 是否连接了设备
function isConnect() {
  printerModule.isConnect({}, (res) => {
    modal.toast({
      message: JSON.stringify(res.data),
      duration: 1.5
    })
  })
}

// 获取当前连接设备的地址
function getConnectDevice() {
  printerModule.getConnectDevice({}, (res) => {
    modal.toast({
      message: JSON.stringify(res.data),
      duration: 1.5
    })
  })
}

// 打开蓝牙
function openBluetooth() {
  printerModule.openBluetooth({}, (res) => {
    modal.toast({
      message: JSON.stringify(res.data),
      duration: 1.5
    })
  })
}

// 关闭蓝牙
function closeBluetooth() {
  printerModule.closeBluetooth({}, (res) => {
    modal.toast({
      message: JSON.stringify(res.data),
      duration: 1.5
    })
  })
}

// 获取绑定的设备, 返回 data 为 { success: true, msg: '' , data: [name: 'xx', address: 'yyy', type: 0|1|2|3] }
// 设备类型 0：未知 1：低功耗 2：经典蓝牙 3：低功耗、经典蓝牙双模
function refresh(type) {
  printerModule.getDevices({ isUSB: type == 2 }, (res) => {
    modal.toast({
      message: JSON.stringify(res.data),
      duration: 1.5
    })
    devices.value = res.data
  })
}

// 选择设备
function selectDevice(item) {
  modal.toast({
    message: item.name,
    duration: 1.5
  })
  device.value = item
}

// 连接设备
function connect() {
  if (device.value) {
    //参数为设备地址,
    //如果设备为BLE设备，需要增加参数BLE特征值"uuid_ble"、写特征值"uuid_write"、叙词特征值"uuid_descriptor"
    //该值默认分别为："0000fff1-0000-1000-8000-00805f9b34fb"、"0000fff2-0000-1000-8000-00805f9b34fb"、"00002902-0000-1000-8000-00805f9b34fb"
    //如连接、发送数据等出现问题，请联系设备厂商
    printerModule.connect(
      {
        address: device.value.address, //蓝牙连接
        vendorId: device.value.vendorId, //usb连接需要
        productId: device.value.productId, //usb连接需要
        deviceId: device.value.deviceId, //usb连接需要
        isUSB: !!device.value.productId, //是否为USB连接，与isIP不能同时为TRUE
        ip: device.value.vendorId, //wifi连接需要
        port: device.value.productId, //wifi连接需要
        isIP: false //是否为WiFi连接，与isUSB不能同时为TRUE
      },
      (res) => {
        modal.toast({
          message: res.msg,
          duration: 1.5
        })
      }
    )
  }
}

// 打印
function print() {
  if (device.value) {
    printerModule.print(
      {
        encoding: 'utf-8', //默认为gbk
        cmdType: 'zpl',
        data: [
          { type: 'size', width: 592, height: 640 },
          {
            type: 'text',
            content: '重量：6.980',
            font: '0',
            x: 200,
            y: 300,
            widthScale: 40,
            heightScale: 40,
            customFont: 'E:SIMSUN.TTF'
          },
          {
            type: 'text',
            content: 'rotate 0',
            font: 'B',
            x: 100,
            y: 500,
            widthScale: 20,
            heightScale: 20
          },
          {
            type: 'textBlock',
            content: '我们12345679qwertyuiop',
            font: 'A',
            x: 400,
            y: 400,
            widthScale: 20,
            heightScale: 20,
            width: 150,
            height: 200,
            customFont: 'E:SIMSUN.TTF'
          },
          { type: 'box', x: 10, y: 20, width: 200, height: 100, thickness: 2, radius: 0 },
          { type: 'bar', x: 10, y: 50, width: 200, height: 3 },
          { type: 'line', x: 10, y: 50, width: 200, height: 3, direction: 'L' },
          { type: 'circle', x: 10, y: 50, diameter: 200, thickness: 3 },
          { type: 'ellipse', x: 10, y: 50, width: 200, height: 100, thickness: 2 },
          {
            type: 'qrcode',
            x: 240,
            y: 360,
            tolerant: 1,
            content: 'www.baidu.com',
            model: '1',
            factor: 2,
            mask: 7,
            rotate: 90
          },
          {
            type: 'barcode',
            height: 60,
            x: 300,
            y: 520,
            content: '123456789',
            textPos: 1,
            rotate: 90
          }
          // { type: 'image', width: 120, height: 120, x: 320, y: 180, content: imgStr }
        ],
        isUSB: !!device.value.productId, //是否为USB连接，与isIP不能同时为TRUE
        isIP: false //是否为WiFi连接，与isUSB不能同时为TRUE
      },
      (res) => {
        modal.toast({
          message: res.msg,
          duration: 1.5
        })
      }
    )
  }
}

// 断开设备
function disconnect() {
  printerModule.disconnect(
    {
      isUSB: !!device.value.productId, //是否为USB连接，与isIP不能同时为TRUE
      isIP: false //是否为WiFi连接，与isUSB不能同时为TRUE
    },
    (res) => {
      modal.toast({
        message: res.msg,
        duration: 1.5
      })
    }
  )
}

// 获取打印机状态
function getState() {
  //获取打印机状态： timeout(100~1000) resry(1~10)  cmd十进制命令数组   resultLength返回结果字节数
  //具体的命令以及返回结果长度，需要参考具体打印机厂商的开发文档。目前例子cmd[29, 153]参数仅对济强有效
  //{27, 33, 101, 120, 105, 116, 13, 10, 27, 33, 63, 27, 33, 68} 芯烨
  //{29, 153} 芝柯
  printerModule.getState(
    {
      isUSB: !!device.value.productId, //是否为USB连接，与isIP不能同时为TRUE
      isIP: false, //是否为WiFi连接，与isUSB不能同时为TRUE
      timeout: 500,
      resry: 1,
      cmd: [29, 153],
      resultLength: 4
    },
    (res) => {
      modal.toast({
        message: res.msg,
        duration: 1.5
      })
    }
  )
}

// 默认情况下，插件会自动向系统注册蓝牙断开的广播，如果被调用 removeBroadcastReceiver 移除后，可以重新加回来
function addBroadcastReceiver() {
  printerModule.addBroadcastReceiver({}, (res) => {
    modal.toast({
      message: res.msg,
      duration: 1.5
    })
  })
}

// 默认情况下，插件会自动向系统注册蓝牙断开的广播，可以调用 removeBroadcastReceiver 移除，为了避免系统内存泄漏，建议在系统退出是调用此方法
function removeBroadcastReceiver() {
  printerModule.removeBroadcastReceiver({}, (res) => {
    modal.toast({
      message: res.msg,
      duration: 1.5
    })
  })
}

function startSearch() {
  printerModule.search({}, (res) => {
    modal.toast({
      message: JSON.stringify(res),
      duration: 3
    })
  })
}

function stopSearch() {
  printerModule.stopSearch({}, (res) => {
    modal.toast({
      message: JSON.stringify(res),
      duration: 3
    })
  })
}

function bond() {
  //需要配对的地址
  const address = '00:12:52:40:60:79'
  printerModule.bond({ address: address }, (res) => {
    modal.toast({
      message: JSON.stringify(res),
      duration: 3
    })
  })
}

onMounted(() => {
  //注册蓝牙搜索结果回调
  printerModule.addEventListener('searchHandler', function (e) {
    console.info(JSON.stringify(e))
  })
})
</script>

<template>
  <div>
    <button
      type="primary"
      @click="refresh(1)"
    >
      刷新已配对蓝牙设备
    </button>
    <button
      type="primary"
      @click="refresh(2)"
    >
      刷新USB设备列表
    </button>
    <button
      type="primary"
      @click="connect"
    >
      连接
    </button>
    <button
      type="primary"
      @click="disconnect"
    >
      断开连接
    </button>
    <button
      type="primary"
      @click="print"
    >
      打印
    </button>
    <button
      type="primary"
      @click="getState"
    >
      获取状态
    </button>
    <button
      type="primary"
      @click="addBroadcastReceiver"
    >
      注册断开连接广播
    </button>
    <button
      type="primary"
      @click="removeBroadcastReceiver"
    >
      移除断开连接广播
    </button>
    <button
      type="primary"
      @click="startSearch"
    >
      搜索设备
    </button>
    <button
      type="primary"
      @click="stopSearch"
    >
      停止搜索
    </button>
    <button
      type="primary"
      @click="bond"
    >
      配对
    </button>
    <div>
      <div>当前选择设备: {{ device.name }}</div>
      <div>
        <div
          v-for="item in devices"
          @click="selectDevice(item)"
          :key="item.address"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
