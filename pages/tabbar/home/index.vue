<template>
  <view
    class="content"
    v-if="false"
  >
    <!-- 头部 -->
    <view class="header">
      <!-- 颜色选择器 -->
      <!-- 	<view>
				<button @click="open" class="changecolor">选择颜色</button>
				<t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker>

			</view> -->
      <view>{{ userName }}</view>
      <!-- <view class="boxs">
				<view>
					<view>设备总数</view>
					<text>973</text>
				</view>
				<view>
					<view>维保设备</view>
					<text>671</text>
				</view>
			</view> -->
    </view>
    <!-- 待处理消息 -->
    <!-- @click="HandleNews()" -->
    <view class="msgSty">
      <view
        class="icon-img"
        style="margin-right: 20rpx"
      >
        <view class="iconfont icon-xiao-xi-tong-zhi"> </view>
      </view>
      你有新的消息待处理，请注意查收并处理！

      <!-- <uni-badge size="small" :text="100" absolute="center" type="error">
				<view class="jiaobiao">
				</view>
			</uni-badge> -->
    </view>
    <view class="work">
      <view class="itemCon">
        <!-- <view class="itemMain">
					<view class="paddSty" @click="clickNav('待办')">
						<uni-badge size="small" text="" absolute="rightTop" type="error">
							<view class="iconSty" style="background: url('../../../static/img/workIcon/daiban.png') center center no-repeat;	background-size: 70rpx 70rpx;">
							</view>
						</uni-badge>
						<text class="itext">待办</text>
					</view>
				</view>
				<view class="itemMain">
					<view class="paddSty" @click="clickNav('已办')">
						<uni-badge size="small" text="" absolute="rightTop" type="error">
							<view class="iconSty"  style="background: url('../../../static/img/workIcon/yiban.png') center center no-repeat;	background-size: 70rpx 70rpx;">
							</view>
						</uni-badge>
						<text class="itext">已办</text>
						v-if = "数组.find(item=>item.menuname == '成品入库')"
					</view>
				</view> -->
        <!-- {{[meuList.find(item=>{return item.menuname=='成品入库'})][0]!=null}}--22 -->
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('成品入库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                ruku
                style="
                  background: url('../../../static/img/workIcon/.png') center center no-repeat;
                  background-size: 70rpx 70rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">成品入库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('成品出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/chuku.png') center center no-repeat;
                  background-size: 70rpx 70rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">成品出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('整货位出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/Allchuku.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">整货位出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('到货确认')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/queren.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">到货确认</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('PDA上架')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/shangjia.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">PDA上架</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('领料通知')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tongzhi.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">领料通知</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('领料出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/chuku.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">领料出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('线边仓收料')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/shouliao.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">线边仓收料</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('发起异常')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/errors.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">发起异常</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('内返PDA')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/shouliao.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">内返PDA</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('产品入库通知')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/icons/productInfo.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">产品入库通知</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('产品入库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/icons/productIn.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">产品入库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('销售出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/icons/productOut.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">销售出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备自主点检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/check.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备自主点检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备专业点检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/ProCheck.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备专业点检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备自主保养')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/miantain.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备自主保养</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备专业保养')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/Promain.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备专业保养</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备报修')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/Repair.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备报修</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('物料盘点')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/wuliao.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">物料盘点</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('仓库盘点')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/cangku.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">仓库盘点</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('PDA指派')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/point.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">PDA指派</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备维修')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/repairGood.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备维修</text>
          </view>
        </view>
        <!-- <view class="itemMain">
					<view class="paddSty" @click="clickNav('质量异常')">
						<uni-badge size="small" text="" absolute="rightTop" type="error">
							<view class="iconSty"  style="background: url('../../../static/img/workIcon/yichang.png') center center no-repeat;	background-size: 70rpx 70rpx;">
							</view>
						</uni-badge>
						<text class="itext">质量异常</text>
					</view>
				</view> -->
        <!-- <view class="itemMain">
					<view class="paddSty" @click="clickNav('检验申请')">
						<uni-badge size="small" text="" absolute="rightTop" type="error">
							<view class="iconSty"
								style="background: url('../../../static/img/workIcon/chuku.png') center center no-repeat;	background-size: 60rpx 60rpx;">
							</view>
						</uni-badge>
						<text class="itext">检验申请</text>
					</view>
				</view> -->
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('生产退料申请')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">生产退料申请</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('生产退料通知')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaott.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">生产退料通知</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('退料入库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuidan.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">退料入库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备上刀')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/djaz.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备上刀</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('设备下刀')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/djx.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">设备下刀</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('刀具采购入库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/caigou.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">刀具采购入库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('刀具调拨入库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/x-tb.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">刀具调拨入库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('刀具调拨出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/x-tb.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">刀具调拨出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('刀具研磨入库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/ym.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">刀具研磨入库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('刀具研磨出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/ymc.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">刀具研磨出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('刀具报废出库')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/baofei.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">刀具报废出库</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('采购检验申请')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">采购检验申请</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('采购退货下架')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">采购退货下架</text>
          </view>
        </view>

        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('库存拆包')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">库存拆包</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('库位移动')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">库位移动</text>
          </view>
        </view>

        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('按包抽检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">按包抽检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('按单抽检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">按单抽检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('日常抽检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">日常抽检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('定期抽检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">定期抽检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('发货检查')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">发货检查</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('来料检验单')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">来料检验单</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('库存检验单')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">库存检验单</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('生产过程')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <!-- iconfont icon-chuku -->
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/ProCheck.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">生产过程</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('不良单处理')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">不良单处理</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('不良包处理')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">不良包处理</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('扫码取样')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">扫码取样</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('人工送样')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">人工送样</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('实验室检验')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">实验室检验</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('首末件报检')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">首末件报检</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('首末件检验')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">首末件检验</text>
          </view>
        </view>
        <view class="itemMain">
          <view
            class="paddSty"
            @click="clickNav('巡线检验')"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/tuiliaosq.png') center center
                    no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">巡线检验</text>
          </view>
        </view>
        <!-- 生产退料
				<view class="itemMain">
					<view class="paddSty" @click="clickNav('仓库管理')">
						<uni-badge size="small" text="" absolute="rightTop" type="error">
							<view class="iconSty"  style="background: url('../../../static/img/workIcon/ku.png') center center no-repeat;	background-size: 70rpx 70rpx;">
							</view>
						</uni-badge>
						<text class="itext">仓库管理</text>
					</view>
				</view>
				<view class="itemMain">
					<view class="paddSty" @click="clickNav('仓位管理')">
						<uni-badge size="small" text="" absolute="rightTop" type="error">
							<view class="iconSty"  style="background: url('../../../static/img/workIcon/wei.png') center center no-repeat;	background-size: 60rpx 60rpx;">
							</view>
						</uni-badge>
						<text class="itext">仓位管理</text>
					</view>
				</view> -->
        <view class="itemMain">
          <view
            class="paddSty"
            @click="addItem"
          >
            <uni-badge
              size="small"
              text=""
              absolute="rightTop"
              type="error"
            >
              <view
                class="iconSty"
                style="
                  background: url('../../../static/img/workIcon/jia.png') center center no-repeat;
                  background-size: 60rpx 60rpx;
                "
              >
              </view>
            </uni-badge>
            <text class="itext">更多</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view
    v-else
    style="text-align: center"
  >
    首页：敬请期待
  </view>
</template>
<script setup>
// // 引入onshow生命周期函数
// import {
// 	onShow
// } from '@dcloudio/uni-app'
// import {
// 	ref,
// 	reactive
// } from 'vue'
// import {
// 	useStore
// } from 'vuex'
// const store = useStore()
// const a = ref("")
// let colors = ref()
// const color = {
// 	r: 255,
// 	g: 0,
// 	b: 0,
// 	a: 0.6
// }
// let colorPicker = ref(null)
// // 打开颜色选择器
// const open = (item) => {
// 	colorPicker.value.open()
// }
// // 确定颜色
// const confirm = (e) => {
// 	console.log(e);
// 	let icolor = e.hex
// 	console.log(icolor);
// 	store.dispatch('changColor', icolor)
// 	colors.value = e.hex
// 	console.log(color);
// }
// 页面显示从vuex取值赋给colors
// onShow(() => {
// 	// vuex获取本地color值
// 	store.commit('getcolor')
// 	colors.value = store.state.iconColor
// })
import { reactive, ref, nextTick } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getMue } from '@/api/login.js'
const userName = ref('')
onShow(() => {
  //权限注销
  // userName.value = uni.getStorageSync('User') ? uni.getStorageSync('User').UserName : ''
})
let userPermiss = ref('')
const meuList = ref([])
//获取权限
onLoad(() => {
  //权限注销
  // userPermiss.value = uni.getStorageSync('User').UserCode
  // console.log(userPermiss.value, '权限---000000');
  // mueAjax()
})
const mueAjax = async () => {
  const res = await getMue({
    usercode: userPermiss.value,
    bMobile: true,
    b_from_local: false
  })
  if (res.RspCode == 'Successed') {
    uni.showToast({
      title: '获取权限成功',
      icon: 'none'
    })
    meuList.value = res.RspData
  } else {
    uni.showToast({
      title: '获取权限失败',
      icon: 'none'
    })
  }
}

const addItem = () => {
  uni.showToast({
    title: '敬请期待...',
    icon: 'none'
  })
  // uni.navigateTo({
  // 	// url: "/pages/repairBill/serviceDetail/servicedetail",
  // })
}
//路径跳转
const clickNav = (data) => {
  console.log(data, '----')
  switch (data) {
    case '待办':
      uni.navigateTo({
        url: '/pages/todo/pages/todo/todo'
      })
      break
    case '已办':
      uni.navigateTo({
        url: '/pages/finished/pages/finished/finished'
      })
      break
    case '故障报修':
      uni.navigateTo({
        url: '/pages/repairs/pages/repairs/repairs'
      })
      break
    case '保养单':
      uni.navigateTo({
        url: '/pages/upKeep/index'
      })
      break
    case '巡检单':
      uni.navigateTo({
        url: '/pages/Polling/pages/Polling/Polling'
      })
      break
    case '维修单':
      uni.navigateTo({
        url: '/pages/repairBill/repairLIst/index'
      })
      break
    case '备件申请':
      uni.navigateTo({
        url: '/pages/spareRequest/requestList/requestlist'
      })
      break
    case '设备看板':
      uni.navigateTo({
        url: '/pages/KanBan/KanBan'
      })
      break
    case '成品入库':
      uni.navigateTo({
        url: '/pages/inStorage/pages/inStorage/inStorage'
      })
      break
    case '成品出库':
      // 扫码成功后跳转到页面
      uni.navigateTo({
        url: '/pages/StorageOut/pages/inWare/inWare?type=2'
      })
      break
    case '整货位出库':
      // 扫码成功后跳转到页面
      uni.navigateTo({
        url: '/pages/StorageOut/pages/inWare/inWare?type=3'
      })
      break
    case '质量异常':
      uni.navigateTo({
        url: '/pages/IssueQuality/pages/IssueQuality/IssueQuality'
      })
      break
    case '仓库管理':
      uni.navigateTo({
        url: '/pages/storeManage/pages/storeManage/storeManage'
      })
      break
    case '仓位管理':
      uni.navigateTo({
        url: '/pages/shipSpace/pages/shipSpace/shipSpace'
      })
      break
    case '备品备件统计':
      // uni.navigateTo({
      // 	url: '/pages/tabbar/home/components/news/news'
      // })
      break
    case '到货确认':
      uni.navigateTo({
        url: '/pages/PDAgoods/PDAgoods/PDAgoods'
      })
      break
    case 'PDA上架':
      uni.navigateTo({
        url: '/pages/PDAput/PDAput/PDAput'
      })
      break
    case '检验申请':
      uni.navigateTo({
        url: '/pages/WireSideRequest/WireSideRequest'
      })
      break
    case '生产退料申请':
      uni.navigateTo({
        url: '/pages/ReturnMaterInfoSQ/ReturnMaterInfoSQ'
      })
      break
    case '生产退料通知':
      uni.navigateTo({
        url: '/pages/ReturnMaterInfo/ReturnMaterInfo'
      })
      break
    case '退料入库':
      uni.navigateTo({
        url: '/pages/ReturnWarehouse/ReturnWarehouse'
      })
      break
    case '领料通知':
      uni.navigateTo({
        url: '/pages/HandelMaterInfo/HandelMaterInfo'
      })
      break
    case '领料出库':
      uni.navigateTo({
        url: '/pages/MaterOut/MaterOut'
      })
      break
    case '线边仓收料':
      uni.navigateTo({
        url: '/pages/ReceiveMater/ReceiveMater'
      })
      break
    case '发起异常':
      uni.navigateTo({
        url: '/pages/SendError/SendError'
      })
      break
    case '内返PDA':
      uni.navigateTo({
        url: '/pages/InSendPDA/InSendPDA'
      })
      break
    case '产品入库通知':
      uni.navigateTo({
        url: '/pages/FinshiedProductInfo/FinshiedProductInfo'
      })
      break
    case '产品入库':
      uni.navigateTo({
        url: '/pages/ProductInwarePut/ProductInwarePut'
      })
      break
    case '销售出库':
      uni.navigateTo({
        url: '/pages/ProductInwareOut/ProductInwareOut'
      })
      break
    case '设备自主点检':
      uni.navigateTo({
        url: '/pages/EqupementCheck/EqupementCheck'
      })
      break
    case '设备专业点检':
      uni.navigateTo({
        url: '/pages/ProEquipmentCheck/ProEquipmentCheck'
      })
      break
    case '设备自主保养':
      uni.navigateTo({
        url: '/pages/DeviceMantin/DeviceMantin'
      })
      break
    case '设备专业保养':
      uni.navigateTo({
        url: '/pages/ProDeviceMantin/ProDeviceMantin'
      })
      break
    case '设备报修':
      uni.navigateTo({
        url: '/pages/DeviceRepair/DeviceRepair'
      })
      break
    case '物料盘点':
      uni.navigateTo({
        url: '/pages/checkBills/checkBills'
      })
      break
    case '仓库盘点':
      uni.navigateTo({
        url: '/pages/warehouseBills/warehouseBills'
      })
      break
    case 'PDA指派':
      uni.navigateTo({
        url: '/pages/PDAPonit/PDAPonit'
      })
      break
    case '设备维修':
      uni.navigateTo({
        url: '/pages/PDARepair/PDARepair'
      })
      break
    case '刀具采购入库':
      uni.navigateTo({
        url: '/pages/ToolByuInStorage/ToolByuInStorage'
      })
      break
    case '刀具调拨入库':
      uni.navigateTo({
        url: '/pages/ToolAllotOutStorage/ToolAllotInStorage'
      })
      break
    case '刀具调拨出库':
      uni.navigateTo({
        url: '/pages/ToolAllotOutStorageCK/ToolAllotOutStorageCK'
      })
      break
    case '设备上刀':
      uni.navigateTo({
        url: '/pages/PDAshangdao/PDAshangdao'
      })
      break
    case '设备下刀':
      uni.navigateTo({
        url: '/pages/PDAxiadao/PDAxiadao'
      })
      break
    case '刀具报废出库':
      uni.navigateTo({
        url: '/pages/ToolScarp/ToolScarp'
      })
      break
    case '刀具研磨入库':
      uni.navigateTo({
        url: '/pages/ToolGrindIn/ToolGrindIn'
      })
      break
    case '刀具研磨出库':
      uni.navigateTo({
        url: '/pages/ToolGrindOut/ToolGrindOut'
      })
      break
    case '采购检验申请':
      uni.navigateTo({
        url: '/pages/applicationSQ/applicationSQ'
      })
      break

    case '采购退货下架':
      uni.navigateTo({
        url: '/pages/PurchaseReturnsShelves/PurchaseReturnsShelves'
      })
      break
    case '库存拆包':
      uni.navigateTo({
        url: '/pages/kunCaibao/kunCaibao'
      })
      break
    case '库位移动':
      uni.navigateTo({
        url: '/pages/kunYidong/kunYidong'
      })
      break
    case '按包抽检':
      uni.navigateTo({
        url: '/pages/PackBagCheck/PackBagCheck'
      })
      break
    case '按单抽检':
      uni.navigateTo({
        url: '/pages/DanCheck/DanCheck'
      })
      break
    case '日常抽检':
      uni.navigateTo({
        url: '/pages/DailyCheck/DailyCheck'
      })
      break
    case '定期抽检':
      uni.navigateTo({
        url: '/pages/PeriodicSampling/PeriodicSampling'
      })
      break
    case '发货检查':
      uni.navigateTo({
        url: '/pages/SamplingCheck/SamplingCheck'
      })
      break
    case '来料检验单':
      uni.navigateTo({
        url: '/pages/incomingInspection/incomingInspection'
      })
      break
    case '库存检验单':
      uni.navigateTo({
        url: '/pages/kuIncomingInspection/incomingInspection'
      })
      break
    case '生产过程':
      uni.navigateTo({
        url: '/pages/ProductProcessCheck/ProductProcessCheck'
      })
      break
    case '不良单处理':
      uni.navigateTo({
        url: '/pages/BadOrderTreatment/BadOrderTreatment'
      })
      break
    case '不良包处理':
      uni.navigateTo({
        url: '/pages/BadOrderTreatmentBao/BadOrderTreatment'
      })
      break
    case '扫码取样':
      uni.navigateTo({
        url: '/pages/SweepSampling/SweepSampling'
      })
      break
    case '人工送样':
      uni.navigateTo({
        url: '/pages/ManualSampleDelivery/ManualSampleDelivery'
      })
      break
    case '实验室检验':
      uni.navigateTo({
        url: '/pages/laboratoryInspection/laboratoryInspection'
      })
      break
    case '首末件报检':
      uni.navigateTo({
        url: '/pages/FirstLastInspection/FirstLastInspection'
      })
      break
    case '首末件检验':
      uni.navigateTo({
        url: '/pages/FirstLastInspectionJY/FirstLastInspectionJY'
      })
      break
    case '巡线检验':
      uni.navigateTo({
        url: '/pages/LineInspectionview/LineInspectionview'
      })
      break
    default:
      break
  }
}
// 待处理消息
const HandleNews = () => {
  uni.navigateTo({
    url: '/pages/tabbar/home/components/news/news'
  })
}
</script>
<style scoped lang="scss">
// 改变颜色按钮
// .changecolor {
// 	position: absolute;
// 	right: 0rpx;
// 	top: 0rpx;
// }
//整体
// 	.changecolor {
// 	position: absolute;
// 	right: 0rpx;
// 	top: 0rpx;
// }
.content {
  width: 100%;
  background-color: #fff;
  // position: absolute;
  // top: 70rpx;
}

// 头部
.header {
  // background-image: url("../../../static/img/home/bg7.png");
  // background-size: cover;
  // color: #fff;
  // font-size: 50rpx;
  // width: 100%;
  // height: 368rpx;
  // text-align: center;
  // line-height: 130rpx;
}

.boxs {
  font-size: 40rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  align-items: center;
}

// 待处理消息
.msgSty {
  width: 100%;
  height: 80rpx;
  background-color: white;
  line-height: 80rpx;
  font-size: 28rpx;
  padding-left: 35rpx;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 4px 5px #eee;
  margin-bottom: 20px;
}

.jiaobiao {
  width: 10rpx;
  height: 10rpx;
  margin-left: 20rpx;
}

.work {
  width: 100%;
  background-color: #fff;

  .itemCon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .itemMain {
      width: 33.33%;
      display: flex;
      justify-content: center;
      margin-bottom: 20rpx;

      .paddSty {
        width: 140rpx;
        height: 140rpx;

        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .iconSty {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90rpx;
          height: 90rpx;
          background-color: #fff;
          box-shadow: 0 2px 5px #d1d1d1;
          border-radius: 50%;
          color: red;
          font-size: 30rpx;

          .imgIconSty {
            width: 60rpx;
            height: auto;
          }
        }

        .itext {
          font-size: 12px;
          line-height: 50rpx;
          width: 80px;
        }
      }
    }
  }
}
</style>
