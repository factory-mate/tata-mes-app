## 简介
- 该组件是基于H5的api开发的,仅支持nvue页面
- 该组件仅供参考,因需求不同请谨慎使用,如不是特殊需求,请使用官方扫码api也不错
- 该组件可作为组件也可以作为功能页面使用

## 功能

- 支持自定义页面(具体宽高自己设置,可以全屏,可以单独小窗口,根据需求修改)
- 支持闪光灯
- 支持扫描二维码(如要扫描别的请参考H5中的Barcode模块具体设置)
- 支持扫码跳转返回继续使用

## api

- this.createBarcode(currentWebview); 开启扫码
- this.createView(currentWebview);  创建打开手电筒
- lightIsShow 是否打开摄像头
- onmarked(type, result) 扫码成功回调
- onerror(type, result) 失败回调
- 具体查看代码即可