<template>
  <view class="inStorage">
    <uni-nav-bar
      dark
      shadow
      background-color="red"
      status-bar
      left-icon="left"
      :title="title"
      @clickLeft="clickLeft"
    />
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="(e) => onClickItem(e)"
        @click="clickTab"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
        <view
          class="listMain"
          :style="'height:' + (h - 160) + 'px'"
        >
          <view class="baseInfo">
            <text style="color: blue; font-size: 18px">基本信息</text>
            <view class="info">
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark"
                    >申报人：{{ ItemInfo.max_Error_dReportPerson }}</view
                  >
                </uni-col>
                <uni-col :span="12">
                  <view class="demo-uni-col dark">生产编号：{{ ItemInfo.cCode }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">产品名称：{{ ItemInfo.cInvName }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">生产日期：{{ ItemInfo.dProductDate }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark"
                    >产品类型：{{ ItemInfo.PACKAGEVOUCH_S_cDefindParm01 }}
                  </view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">线内序号：{{ ItemInfo.iIndxs }}</view>
                </uni-col>
                <uni-col :span="10">
                  <view class="demo-uni-col dark">序号：{{ ItemInfo.iOrderIndex }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="10">
                  <view class="demo-uni-col dark">材质：{{ ItemInfo.cDefindParm01 }}</view>
                </uni-col>
                <uni-col :span="10">
                  <view class="demo-uni-col dark">AB面：{{ ItemInfo.cDefindParm05 }}</view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark"
                    >尺寸：{{ ItemInfo.X }} *{{ ItemInfo.Y }}*{{ ItemInfo.Z }}
                  </view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">描述：{{ ItemInfo.cMemo }}</view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <view class="checkPic">
            <text style="color: blue; font-size: 18px">照片列表</text>
            <view
              class="info"
              v-for="(item, index) in PicArr"
              :key="index"
            >
              <uni-row class="demo-uni-row">
                <uni-col :span="8">
                  <view class="demo-uni-col dark">序号：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col dark">照片：{{ index + 1 }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col dark">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="preview(index)"
                    >
                      查看
                    </button>
                  </view>
                </uni-col>
              </uni-row>
            </view>
          </view>
          <view class="returnEdit">
            <text style="color: blue; font-size: 18px">返修编辑</text>
            <view class="info">
              <uni-row class="demo-uni-row">
                <uni-col :span="16">
                  <view class="demo-uni-col dark">返修原因：{{ ReasonName.label }}</view>
                </uni-col>
                <uni-col :span="8">
                  <view class="demo-uni-col dark">
                    <button
                      class="mini-btn"
                      type="warn"
                      size="mini"
                      @click="check"
                    >
                      选择
                    </button>
                  </view>
                </uni-col>
              </uni-row>
              <uni-row class="demo-uni-row">
                <uni-col :span="6">
                  <view class="demo-uni-col dark">返修类型： </view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">
                    <uni-data-select
                      style="width: 60%"
                      v-model="cDictonaryCode"
                      :localdata="rangeClass"
                      @change="change"
                    ></uni-data-select>
                  </view>
                </uni-col>
              </uni-row>

              <uni-row
                class="demo-uni-row"
                v-if="cDictonaryCode == '3'"
              >
                <uni-col :span="6">
                  <view class="demo-uni-col dark">审核人： </view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">
                    <uni-combox
                      :candidates="auditUsersCandidates"
                      placeholder="请选择审核人"
                      v-model="auditUser"
                      @input="onAuditUserInput"
                    ></uni-combox>
                  </view>
                </uni-col>
              </uni-row>

              <uni-row class="demo-uni-row">
                <uni-col :span="6">
                  <view class="demo-uni-col dark">返修备注： </view>
                </uni-col>
                <uni-col :span="16">
                  <view class="demo-uni-col dark">
                    <up-textarea
                      v-model="Cemo"
                      style="width: 80%"
                      placeholder="请输入备注"
                    />
                  </view>
                </uni-col>
              </uni-row>
            </view>
          </view>
        </view>
      </view>
      <view v-show="current === 1">
        <view
          class="listMain"
          :style="'height:' + (h - 160) + 'px'"
        >
          <DaTree
            ref="DaTreeRef"
            :data="TreeData"
            labelField="name"
            valueField="id"
            :showCheckbox="true"
            @change="handleTreeChange"
            @expand="handleExpandChange"
          ></DaTree>
        </view>
        <view class="saveBtn">
          <button
            class="mini-btn"
            type="warn"
            size="mini"
            @click="SaveEdit"
          >
            保存
          </button>
        </view>
      </view>
    </view>
    <up-popup
      :show="showPopup"
      @close="handlePopupClose"
      @open="GetReasonLists"
    >
      <view style="height: 500px; overflow-y: scroll">
        <view class="changeList">
          <DaTree
            ref="DaModalTreeRef"
            :data="roomTreeData"
            labelField="name"
            valueField="id"
            :showCheckbox="false"
            @change="handleModalTreeChange"
            @expand="handleModalExpandChange"
          />
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script setup>
import { ref, toRefs, reactive, nextTick, watch } from 'vue'
import {
  onLoad,
  onShow,
  onUnload,
  onHide,
  onBackPress,
  onReachBottom,
  onPullDownRefresh
} from '@dcloudio/uni-app'
import {
  GetPicList,
  GetClassify,
  GetRoute,
  GetRouteSave,
  GetReason,
  GetUserList
} from '@/api/PDA.js'
import DaTree from '@/components/da-tree/index.vue'
import permision from '@/common/permission.js'
import _ from 'lodash'
let branch = ref()
const h = ref('100') //页面高度
const title = ref('返修任务编辑')
const current = ref(0)
const styleType = ref('button')
const activeColor = ref('#ff0000')
const items = ref(['返修编辑', '返修工艺'])
const PicArr = ref([])
const cDictonaryCode = ref(0)
const rangeClass = ref([])
const DaTreeRef = ref()
const ItemInfo = ref({})
const ReasonName = ref('')
const ProcessCode = ref('') //工艺
const ProcessName = ref('') //工艺
const CheckNode = ref([])
const Cemo = ref('')
const TypeCode = ref('')
const LineArr = ref([])
const SaveAtate = ref(false)
const showPopup = ref(false)
const DaModalTreeRef = ref()
const auditUsers = ref([])
const auditUsersCandidates = ref([])
const auditUser = ref('')
onShow(() => {
  branch.value = uni.getStorageSync('unit').brand ? uni.getStorageSync('unit').brand : ''
  // branch = uni.getStorageSync('unit')
  // setInterval(function(){
  //         uni.hideKeyboard();//隐藏软键盘
  // },60);

  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', keypress)
  // #endif

  getUsers()
})
onUnload(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
onHide(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
onBackPress(() => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', keypress)
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', keypress)
  // #endif
})
//加载页面
onLoad((option) => {
  if (option.itemInfo) {
    ItemInfo.value = JSON.parse(option.itemInfo)
    uni.setStorageSync('ItemInfo', ItemInfo.value)
  }
  if (uni.getStorageSync('ItemInfo')) {
    ItemInfo.value = uni.getStorageSync('ItemInfo')
  }
  GetPic(ItemInfo.value)
  GetRepair()
  h.value = uni.getSystemInfoSync().windowHeight
  GetArtLIne()
})
const keypress = (e) => {
  // codeType.value = ''
  console.log(e, '按键码')
  // if (e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
  // if (e.keyCode == 66|| e.key=="Enter") {
  // 	codeType.value = 'enter'
  // 	getWl()
  // }
}

//图片预览
const preview = (index) => {
  uni.previewImage({
    current: index,
    urls: PicArr.value
  })
}
const url = ref('')
//获取图片列表
const GetPic = async (i) => {
  const res = await GetPicList({
    TaskSSSUID: i.S_S_S_uid
  })
  res.data.forEach((item) => {
    url.value = item.cFilePath + item.cFileReName + item.cFileSuffix
    PicArr.value.push(url.value)
  })
}
//获取返修类型
const GetRepair = () => {
  GetClassify({
    OrderByFileds: 'cDictonaryCode',
    Conditions: 'cDictonaryTypeCode=RepairType'
  }).then((res) => {
    if (res.status == 200) {
      rangeClass.value = res.data.map((item) => {
        return {
          value: item.cDictonaryCode,
          text: item.cDictonaryName
        }
      })
    } else {
      uni.showToast({
        icon: 'info',
        title: '获取返修类型失败'
      })
    }
  })
}
//返修类型
const change = (e) => {
  TypeCode.value = e
}
//原因选择
const check = () => {
  showPopup.value = true
}
const clickTab = () => {
  if (current.value == 0) {
  }
  if (current.value == 1) {
  }
}
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}

//树选中
const doExpandTree = (keys, expand) => {
  DaTreeRef.value?.setExpandedKeys(keys, expand)
  const gek = DaTreeRef.value?.getExpandedKeys()
  console.log('当前已展开的KEY ==>', gek)
}
const doCheckedTree = (keys, checked) => {
  DaTreeRef.value?.setCheckedKeys(keys, checked)
  const gek = DaTreeRef.value?.getCheckedKeys()
  console.log('当前已选中的KEY ==>', gek)
}
const handleTreeChange = (allSelectedKeys, currentItem) => {
  console.log('handleTreeChange ==>', allSelectedKeys, currentItem)
  ProcessCode.value = currentItem.key
  ProcessName.value = currentItem.label
  CheckNode.value = DaTreeRef.value?.getCheckedNodes()
}
const handleExpandChange = (expand, currentItem) => {
  if (expand) {
    DaTreeRef.value.setExpandedKeys('all', false)
  }
  DaTreeRef.value.setExpandedKeys([currentItem.key], expand)
}
//获取工艺路线
const TreeData = ref([])
const GetArtLIne = async () => {
  const res = await GetRoute({
    UID: ItemInfo.value.PRODUCT_VOUCH_S_S_S_UID
  })
  TreeData.value = JSON.parse(JSON.stringify(res.data).replace(/v_RouteDetails/g, 'children'))
  mapTree(TreeData.value)
}
const mapTree = (data) => {
  if (data) {
    data.forEach((item) => {
      Object.assign(item, {
        ['id']: item['cCraftCode'] ? item['cCraftCode'] : item['cCraftRouteCode'],
        ['name']: item['cCraftName'] ? item['cCraftName'] : item['cCraftRouteName']
      })
      mapTree(item.children)
    })
  }
}
//处理工艺和产线
const getLineName = () => {
  if (uni.getStorageSync('LineName')) {
    let lineName = uni.getStorageSync('LineName')
    CheckNode.value.forEach((item) => {
      lineName.forEach((i) => {
        if (item.originItem.cLineCode == i.value) {
          item.originItem.cLineName = i.text
        }
      })
    })
  }
  let NewArr = []
  CheckNode.value.forEach((item) => {
    NewArr.push(item.originItem)
    LineArr.value = NewArr.map((i) => {
      return {
        cFactoryUnitCode: i.cLineCode, //产线编码
        cFactoryUnitName: i.cLineName,
        cProcessCode: i.id, //工艺编码
        cProcessName: i.name
      }
    }).filter((i) => i.cFactoryUnitCode)
  })
}
//保存
const SaveEdit = async () => {
  getLineName()
  const auditUserCode = auditUsers.value.find(
    (item) => item.cUserName == auditUser.value
  )?.cLoginName
  console.log(auditUserCode)
  const res = await GetRouteSave({
    S_S_S_uid: ItemInfo.value.S_S_S_uid,
    cRepairTypeCode: TypeCode.value, //返修类型code
    cRepairReasonTypeCode: ReasonName.value.key, //返修原因code
    cMemo: Cemo.value, //备注
    cRepairReasonTypeName: ReasonName.value.label, //返修原因name
    list_Process: LineArr.value
  })
  if (res.success) {
    uni.showToast({
      icon: 'none',
      title: '保存成功'
    })
    SaveAtate.value = true
    uni.removeStorageSync('LineName')
    uni.removeStorageSync('ItemInfo')
    uni.navigateTo({
      url: '/pages/InSendPDA/InSendPDA'
    })
  } else {
    uni.showToast({
      icon: 'error',
      title: '失败'
    })
  }
}
//头部左侧,返回上一页
const clickLeft = () => {
  if (SaveAtate.value == false) {
    uni.showModal({
      // title: '提示',
      showCancel: true,
      content: '数据未保存，确定不保存修改数据？',
      success: function (res) {
        if (res.confirm) {
          uni.navigateBack({
            delta: 1
          })
          console.log('用户点击 确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
}

const handlePopupClose = () => {
  showPopup.value = false
}

const roomTreeData = ref([])
const DayList = ref([]) //原因

//获取原因
const GetReasonLists = async () => {
  uni.showLoading({
    title: '加载中'
  })
  const res = await GetReason()
  if (res.status == 200) {
    roomTreeData.value = JSON.parse(JSON.stringify(res.data).replace(/Child/g, 'children'))
    mapReasonModalTree(roomTreeData.value)
    // ADDdisable(roomTreeData.value)
    uni.hideLoading()
  } else {
    uni.hideLoading()
  }
}

let leve = 0
const mapReasonModalTree = (data, leve = 0) => {
  if (data) {
    leve++
    data.forEach((item) => {
      Object.assign(item, {
        ['leve']: leve,
        ['id']: item['cReasonClassCode'],
        ['name']: item['cReasonClassName'],
        ['disabled']: item.cParentCode == null || item.leve === 1 ? true : false
      })
      mapReasonModalTree(item.children, leve)
    })
  }
}

const handleModalTreeChange = (allSelectedKeys, currentItem) => {
  if (currentItem.level == 0) {
    console.log('00')
  } else {
    ReasonName.value = currentItem
    showPopup.value = false
  }
}
//同级节点只能展开一个
const handleModalExpandChange = (expand, currentItem) => {
  if (expand) {
    DaModalTreeRef.value.setExpandedKeys('all', false)
  }
  DaModalTreeRef.value.setExpandedKeys([currentItem.key], expand)
}

async function getUsers(name) {
  let Conditions = ''
  if (name) {
    Conditions = 'cUserName like ' + name
  }
  const {
    data: { data }
  } = await GetUserList({
    PageSize: 10,
    PageIndex: 1,
    Conditions
  })
  auditUsers.value = data
  auditUsersCandidates.value = data.map((item) => item.cUserName)
}

function onAuditUserInput() {
  getUsers(auditUser.value)
}
</script>

<style scoped lang="scss">
.inStorage {
  width: 100%;
  // padding: 20px;

  .uni-padding-wrap {
    margin: 20rpx 10rpx;
  }

  .content {
    width: 100%;

    .listMain {
      padding: 10px;
      margin-top: 2px;
      width: 100%;
      height: calc(100% - 240rpx);
      overflow-y: auto;
      font-size: 14px;

      .baseInfo {
        .info {
          .demo-uni-row {
            padding: 5px 0;
          }
        }
      }

      .checkPic {
        margin: 10px 0;

        .info {
          .demo-uni-row {
            padding: 3px 0;
          }
        }
      }

      .returnEdit {
        .info {
          .demo-uni-row {
            padding: 4px 0;
          }
        }
      }
    }

    .saveBtn {
      position: fixed;
      left: 40%;
      bottom: 40px;
    }
  }
}

.changeList {
  padding-bottom: 10rpx;
  width: 100%;
  height: 100%;

  .listMain {
    margin-top: 2px;
    width: 100%;
    height: calc(100% - 240rpx);
    // border: 1px solid red;
    overflow-y: auto;
    font-size: 16px;

    .project {
      background: #fff;
      padding: 20rpx;
      margin: 30rpx 20rpx;
      border-radius: 4px;
      box-shadow: 0 0 10px #eee;

      .pro_top {
        display: flex;
        justify-content: space-between;
        padding: 10rpx 0;
      }

      .textHint {
        color: #999;
      }
    }
  }
}
</style>
