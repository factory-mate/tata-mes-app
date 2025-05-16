<template>
  <view class="content">
    <!-- 登录logo -->
    <view class="top-img">
      <image
        src="/static/home_logo.png"
        class="top-logo"
        mode="aspectFit"
      />
    </view>
    <!-- 登录部分 -->
    <view class="login-form">
      <uni-forms
        ref="form"
        :modelValue="formData"
        :rules="formRules"
      >
        <uni-forms-item
          label="工号"
          required
          name="cLoginName"
        >
          <uni-easyinput
            type="text"
            v-model="formData.cLoginName"
            placeholder="工号"
          />
        </uni-forms-item>
        <uni-forms-item
          label="密码"
          required
          name="cPassWord"
        >
          <uni-easyinput
            type="password"
            v-model="formData.cPassWord"
            placeholder="请输入密码"
          />
        </uni-forms-item>
      </uni-forms>
      <button
        class="login-btn"
        @click="submit"
      >
        登录
      </button>
    </view>
    <view style="position: absolute; bottom: 4px; left: 0; right: 0; margin: auto">
      <view
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-direction: row;
        "
      >
        <image
          src="/static/img/logo.jpg"
          mode=""
          style="width: 25px; height: 25px"
        />
        <view style="display: flex; flex-direction: column; margin-left: 8px">
          <text>服务热线：4000153699</text>
          <text>Copyright © 慧友科技股份有限公司 版权所有</text>
        </view>
      </view>
    </view>
    <uni-popup
      ref="message"
      type="message"
    >
      <uni-popup-message
        :type="msgType"
        :message="messageText"
        :duration="3000"
      ></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Login, setCID } from '../../api/login.js'
import { onLoad } from '@dcloudio/uni-app'

const form = ref()
const formData = reactive({
  cLoginName: '',
  cPassWord: '',
  cSourceAppType: '002',
  bLocal: false,
  lan: 'zn_CN'
})

//登录规则
const formRules = reactive({
  cLoginName: {
    // name 字段的校验规则
    rules: [
      // 校验 name 不能为空
      {
        required: true,
        errorMessage: '请填写姓名'
      }
    ]
  }
})

const messageText = ref('')
const message = ref(null)
const msgType = ref('')
const submit = async () => {
  if (formData.cLoginName) {
    try {
      const res = await Login(formData)
      if (res.status == 200) {
        const { cLoginName, cPassWord } = formData
        uni.setStorageSync('account', { cLoginName, cPassWord })
        uni.setStorageSync('token', res.data.token)
        uni.setStorageSync('User', res.data.token_user)
        //登录成功跳转
        // NOTE: 24/05/20 首页暂时隐藏，跳转到工作台
        // uni.switchTab({
        //   url: '/pages/tabbar/home/index'
        // })

        // #ifdef APP-PLUS
        plus.push.getClientInfoAsync((info) => {
          const cid = info['clientid']
          console.log('cid', cid)
          setCID(cid).catch(() => {})
        })
        // #endif
        uni.switchTab({
          url: '/pages/tabbar/workHome/index'
        })
      } else {
        msgType.value = 'error'
        messageText.value = res.RspMsg
        message.value.open()
      }
    } catch (err) {
      console.log('失败')
    }
  } else {
    msgType.value = 'warn'
    messageText.value = `请输入工号和密码！`
    message.value.open()
  }
}

onLoad(() => {
  // 获取本地存储的账号密码
  const account = uni.getStorageSync('account') ?? null
  const token = uni.getStorageSync('token') ?? null
  if (token) {
    return uni.switchTab({
      url: '/pages/tabbar/workHome/index'
    })
  }
  if (account) {
    formData.cLoginName = account.cLoginName
    formData.cPassWord = account.cPassWord
  }
})
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
}

// 上方头像
.top-img {
  width: 90%;
  // border: 1px solid red;
  height: 250px;
  margin: 0 auto;
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  .top-logo {
    display: block;
    width: 400px;
    border-radius: 4px;
  }
}

.login-form {
  padding: 40rpx;
}

// 记住密码
.check {
  width: 560rpx;
  margin: 40rpx auto;
}

// 登录按钮
.login-btn {
  width: 560rpx;
  height: 90rpx;
  border-radius: 36rpx;
  background-color: #464c5b;
  color: white;
  margin-top: 20rpx;
}
</style>
