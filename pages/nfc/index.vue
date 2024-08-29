<template>  
    <view>  
        <view class="uni-padding-wrap">  
		<view style="width: 100%;text-align: center;padding:60px 0 30px 0;border-bottom: 1px solid ;">
			 NFC 测试
		</view>
            
            <view class="uni-common-mt" style="background:#FFF; padding:20upx;">  
					<p>NFC监测结果：{{tip}}</p>
					<p> UID:{{UID}}  </p>
            </view>  
        </view>  
    </view>  
</template>  

<script setup>  
    var NfcAdapter;  
	import {
		reactive,
		ref,
		nextTick,
		watch
	} from "vue";
	import {
		onLoad,
		onShow,
		onUnload,
		onHide,
		onBackPress,
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app";
	const title=ref('redNFC')
	const UID=ref('')
	const msg=ref('')
	const tip=ref('')
	onLoad(()=>{
		 console.log("onLoad"); 
	})
	onShow(()=>{
		console.log("onShow");
		NFCInit();
	})
	onHide(()=>{
		console.log("onHide");
		NFCReadUID();
	})
	const NFCInit=()=>{
		try {
		    var main = plus.android.runtimeMainActivity();  
		    //console.log(main);  
		    var Intent = plus.android.importClass('android.content.Intent');  
		    // console.log(Intent);  
		    var Activity = plus.android.importClass('android.app.Activity');  
		    //console.log(Activity);  
		    var PendingIntent = plus.android.importClass('android.app.PendingIntent');  
		    // console.log(PendingIntent);                    
		    var IntentFilter = plus.android.importClass('android.content.IntentFilter');  
		    // console.log(IntentFilter);  
		    // var Uri = plus.android.importClass('android.net.Uri');                     
		    // var Bundle = plus.android.importClass('android.os.Bundle');                    
		    // var Handler = plus.android.importClass('android.os.Handler');  
		    //console.log(Handler);  
		    NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');  
		    //console.log(NfcAdapter);  
		    var _nfcAdapter = NfcAdapter.getDefaultAdapter(main)  
		    // console.log(_nfcAdapter);  
		
		    var ndef = new IntentFilter("android.nfc.action.NDEF_DISCOVERED"); //NfcAdapter.ACTION_NDEF_DISCOVERED  
		    // console.log(ndef);  
		    var tag = new IntentFilter("android.nfc.action.TAG_DISCOVERED"); //NfcAdapter.ACTION_TECH_DISCOVERED  
		    // console.log(tag);  
		    var tech = new IntentFilter("android.nfc.action.TECH_DISCOVERED");  
		    // console.log(tech);  
		    var intentFiltersArray = [ndef, tag, tech];  
		
		    var techListsArray = [  
		        ["android.nfc.tech.Ndef"],  
		        ["android.nfc.tech.IsoDep"],  
		        ["android.nfc.tech.NfcA"],  
		        ["android.nfc.tech.NfcB"],  
		        ["android.nfc.tech.NfcF"],  
		        ["android.nfc.tech.Nfcf"],  
		        ["android.nfc.tech.NfcV"],  
		        ["android.nfc.tech.NdefFormatable"],  
		        ["android.nfc.tech.MifareClassi"],  
		        ["android.nfc.tech.MifareUltralight"]  
		    ];  
		
		    var _intent = new Intent(main, main.getClass());  
		    // console.log(_intent);  
		    _intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);  
		
		    var pendingIntent = PendingIntent.getActivity(main, 0, _intent, 0);  
		    // console.log(pendingIntent);  
		
		    if (_nfcAdapter == null) {  
		        tip.value = '本设备不支持NFC!';  
		    } else if (_nfcAdapter.isEnabled() == false) {  
		        tip.value = 'NFC功能未打开!';  
		    } else {  
		        tip.value = 'NFC正常';  
		        _nfcAdapter.enableForegroundDispatch(main, pendingIntent, IntentFilter, techListsArray);  
		    }  
		} catch (e) {  
		    //TODO handle the exception  
		}  
	}
	const NFCReadUID=()=>{
		var main = plus.android.runtimeMainActivity();
		var _intent = main.getIntent();  
		var _action = _intent.getAction();  
		// console.log("action type:" + _action);  
		
		if (NfcAdapter.ACTION_NDEF_DISCOVERED == _action || NfcAdapter.ACTION_TAG_DISCOVERED == _action || NfcAdapter.ACTION_TECH_DISCOVERED ==  
		    _action) {  
		    var Tag = plus.android.importClass('android.nfc.Tag');  
		    var tagFromIntent = _intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);  
		    var uid = _intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);  
		    console.log(uid);  
		    UID.value = Bytes2HexString(uid);  
		    //console.log(UID.value);  
		} 
	}
	//将byte[] 转为Hex， 
	const Bytes2HexString=(arrBytes)=>{
		var str = "";
		for (var i = 0; i < arrBytes.length; i++) {  
		    var tmp;  
		    var num = arrBytes[i];  
		    if (num < 0) {  
		        //Java中数值是以补码的形式存在的，应用程序展示的十进制是补码对应真值。补码的存在主要为了简化计算机底层的运算，将减法运算直接当加法来做  
		        tmp = (255 + num + 1).toString(16);  
		    } else {  
		        tmp = num.toString(16);  
		    }  
		    if (tmp.length == 1) {  
		        tmp = "0" + tmp;  
		    }  
		    str += tmp;  
		}  
		return str;  
	}
  
</script>  

<style>  

</style>  