<script setup>
import { sendPrintCommand } from '@/utils'

const handlePrint = () => {
  sendPrintCommand({
    data: [
      { type: 'size', width: 700, height: 1400 },
      {
        type: 'text',
        content: '零售-P24000509214福建省宁化县',
        x: 80,
        y: 25,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: 'P24000509214',
        x: 80,
        y: 50,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '福建省宁化县',
        x: 80,
        y: 75,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '2405544823',
        x: 80,
        y: 100,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: 'D24000501742',
        x: 80,
        y: 125,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '曲女士',
        x: 80,
        y: 150,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: 'P24000450124',
        x: 80,
        y: 175,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '宁化县库房',
        x: 80,
        y: 200,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'qrcode',
        x: 350,
        y: 50,
        tolerant: 1,
        content: 'www.baidu.com',
        model: '2',
        factor: 5,
        mask: 7,
        rotate: 90
      },
      {
        type: 'text',
        content: '数量：3',
        x: 80,
        y: 225,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '包号：第1包',
        x: 350,
        y: 225,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '福建省三明市瑞玺13-1-501',
        x: 80,
        y: 250,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '河南兰考县产业聚集区',
        x: 80,
        y: 275,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '兰考闼闼同创工贸有限公司(25厂)',
        x: 80,
        y: 300,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '产品名称',
        x: 80,
        y: 350,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '数量',
        x: 350,
        y: 350,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '餐边开放柜',
        x: 80,
        y: 375,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '1',
        x: 350,
        y: 375,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '餐边开放柜',
        x: 80,
        y: 400,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '1',
        x: 350,
        y: 400,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '餐边开放柜',
        x: 80,
        y: 425,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      },
      {
        type: 'text',
        content: '2',
        x: 350,
        y: 425,
        customFont: 'E:SIMSUN.TTF',
        font: '0',
        widthScale: 25,
        heightScale: 25
      }
    ]

    // [
    //   { type: 'size', width: 592, height: 640 },
    //   {
    //     type: 'text',
    //     content: '重量：6.980',
    //     font: '0',
    //     x: 200,
    //     y: 300,
    //     widthScale: 25,
    //     heightScale: 25,
    //     customFont: 'E:SIMSUN.TTF'
    //   },
    //   {
    //     type: 'text',
    //     content: 'rotate 0',
    //     font: 'B',
    //     x: 80,
    //     y: 500,
    //     widthScale: 20,
    //     heightScale: 20
    //   },
    //   {
    //     type: 'textBlock',
    //     content: '我们12345679qwertyuiop',
    //     font: 'A',
    //     x: 400,
    //     y: 400,
    //     widthScale: 20,
    //     heightScale: 20,
    //     width: 150,
    //     height: 200,
    //     customFont: 'E:SIMSUN.TTF'
    //   },
    //   { type: 'box', x: 10, y: 20, width: 200, height: 100, thickness: 2, radius: 0 },
    //   { type: 'bar', x: 10, y: 50, width: 200, height: 3 },
    //   { type: 'line', x: 10, y: 50, width: 200, height: 3, direction: 'L' },
    //   { type: 'circle', x: 10, y: 50, diameter: 200, thickness: 3 },
    //   { type: 'ellipse', x: 10, y: 50, width: 200, height: 100, thickness: 2 },
    //   {
    //     type: 'qrcode',
    //     x: 240,
    //     y: 360,
    //     tolerant: 1,
    //     content: 'www.baidu.com',
    //     model: '1',
    //     factor: 2,
    //     mask: 7,
    //     rotate: 90
    //   },
    //   {
    //     type: 'barcode',
    //     height: 60,
    //     x: 300,
    //     y: 520,
    //     content: '123456789',
    //     textPos: 1,
    //     rotate: 90
    //   }
    // ]
  })
}
</script>

<template>
  <view>
    <up-button @click="handlePrint">打印</up-button>
  </view>
</template>
