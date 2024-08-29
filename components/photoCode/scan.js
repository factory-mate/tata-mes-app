 // let Qrcode = require('@/pages/component/reqrcode.js')
import {qrcode} from './reqrcode.js' 

export function toScanCode(options) {
	let resultData = ''
	// #ifdef APP-PLUS
	let platform = uni.getSystemInfoSync().platform
	if (platform == 'ios') {
		resultData = scanCodeIos(options)
	} else {
		return new Promise((resolve, reject) => {
			uni.scanCode({
				onlyFromCamera: options.onlyFromCamera, // 只允许通过相机扫码
				scanType: ['barCode','qrCode'], //扫码类型 barCode一维码  qrCode二维码
				autoZoom:true,//是否启用自动放大，默认启用
				success: function(res) {
					resolve(res.result);
				}
			});
		})
	}
	// #endif 

	// #ifdef H5
	var ua = navigator.userAgent;
	var isWeixin = !!/MicroMessenger/i.test(ua);
	if (isWeixin) {
		getJsApiConfig();
		resultData = scanCodeWxH5(options)
	} else {
		resultData = scanCodeH5(options)
	}
	// #endif

	return Promise.resolve(resultData);
}


//处理扫码内容
export function scanContent(result) {

	var obj = null;
	try {
		obj = JSON.parse(result)
	} catch (err) {
		this.$tip.error("无法识别二维码");
		return
	}
	return obj;

}

//微信扫码   参考地址：https://mp.weixin.qq.com/s/ulq_cs-gGwkpmdt5zsU4aA
export function scanCodeWxH5(options) {
	let fromCamera = options.onlyFromCamera
	return new Promise((resolve, reject) => {
		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ['barCode','qrCode'], // 可以指定扫二维码还是一维码，默认二者都有  barCode一维码  qrCode二维码
			success: function(res) {
				resolve(res.resultStr)
			}
		});
	})
}

//ios 扫码  uniapp nvue自带的Barcode
export function scanCodeIos(options) {
	let fromCamera = options.onlyFromCamera
	return new Promise((resolve, reject) => {
		//开始扫码
		toHsScanCode({
			evalName: "hs-scancode", //扫码回调监听事件
			msg: '扫码', //提示文本
			fil: '0,1,2', //条码类型  0-qr二维码  1-EAN条形码标准版  2-EAN条形码简版
			onlyFromCamera: fromCamera // 只允许通过相机扫码
		}, res => {
			//扫码成功后 这里自己判断，如果要自己处理结果就返回 true
			resolve(res.result)
			return true
		})
	})
}
//这里可以写成一个通用方法
export function toHsScanCode(options, results) {
	const q = Object.entries(options).map(([key, value]) => `${key}=${value}`).join('&')
	uni.$on(options.evalName || "hs-scancode", ([error, res]) => {
		if (res) {
			//扫码结果
			uni.navigateBack({
				delta: 1,
				animationType: "fade-out", //用 fade-out 关闭页面，减少扫码成功后跳转页面的闪动
				animationDuration: 300,
			})
			if (results && results(res) === true) return;
		}
	})
	uni.navigateTo({
		url: `/pages/component/hs-scancode?${q}`
	})

}

// 调用接口获取config信息
export function getJsApiConfig() {
	//获取到的url是当前页面的域名，而不是完整url
	const apiUrl = location.href.split('#')[0];
	let param = {
		url: apiUrl
	}
	this.$http.get('/sys/wx/getJsApiConfig', {
		params: param
	}).then(res => {
		if (res.data.success) {
			getConfig(res.data.result);
		} else {
			this.$tip.error(res.data.message);
		}
	}).catch((err) => {
		console.log("请求返回err", err)
	})
}

export function getConfig(res) {
	// 配置config信息
	wx.config({
		debug: false,
		appId: res.appId, // 必填，公众号的唯一标识
		timestamp: res.timestamp, // 必填，生成签名的时间戳
		nonceStr: res.nonceStr, // 必填，生成签名的随机串
		signature: res.signature, // 必填，签名
		jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
	});
	// 通过ready接口处理成功验证
	wx.ready(function() {
		wx.checkJsApi({
			jsApiList: ['scanQRCode'],
			success: function(res) {
				console.log('检验成功');
			}
		});
	});
	// 通过error接口处理失败验证
	wx.error(function(res) {
		console.log('校验失败');
	});
}

// H5通过拉起相机拍照来识别二维码
export function scanCodeH5(options) {
	let fromCamera = options.onlyFromCamera
	let sourceType = ['camera','album']
	if(fromCamera){
		sourceType = ['camera']
	}
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1,
			sourceType: sourceType, //来源类型
			success: imgRes => {
				qrcode.decode(getObjectURL(imgRes.tempFiles[0]))
				qrcode.callback = (codeRes) => {
					if (codeRes.indexOf('error') >= 0) {
						// 识别失败
						reject("二维码识别失败");
					} else {
						// 识别成功
						let content = decodeStr(codeRes)
						let formatContent = scanContent(content)
						resolve(formatContent);
					}
				}
			}
		})
	})

}

// 获取文件地址函数
export function getObjectURL(file) {
	var url = null
	if (window.createObjectURL !== undefined) { // basic
		url = window.createObjectURL(file)
	} else if (window.URL !== undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file)
	} else if (window.webkitURL !== undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file)
	}
	return url
}

// 解码，输出：中文
export function decodeStr(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				// 0xxxxxxx
				out += str.charAt(i - 1);
				break;
			case 12:
			case 13:
				// 110x xxxx 10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				// 1110 xxxx 10xx xxxx 10xx xxxx
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) |
					((char2 & 0x3F) << 6) |
					((char3 & 0x3F) << 0));
				break;
		}
	}
	return out;
}