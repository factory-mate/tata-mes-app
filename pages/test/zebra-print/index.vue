<script setup>
import { sendPrintCommand } from '@/utils'

const handlePrint = () => {
  sendPrintCommand({
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
    ]
  })
}
</script>

<template>
  <view>
    <up-button @click="handlePrint">打印</up-button>
  </view>
</template>
