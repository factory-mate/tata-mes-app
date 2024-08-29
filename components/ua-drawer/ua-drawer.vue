<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { isTrue, Int, isBool, isPromise, addUnit } from './util.js'
	const props = defineProps({
	modelValue: { type: Boolean, default: false },
		// 标题
	title: String,direction: { type: String, default: 'right' },size: { type: [Number, String], default: '80%' },customClass: String,customStyle: String,
		// 是否显示遮罩层
	shade: { type: [Boolean, String], default: true },shadeClose: { type: [Boolean, String], default: true },lockScroll: { type: [Boolean, String], default: true },
		opacity: { type: [Number, String] },zIndex: { type: [Number, String], default: 2023 },
	// 是否显示头部
	showHeader: { type: [Boolean, String], default: true },showClose: { type: [Boolean, String], default: true },
beforeClose: Function
	})
const emit = defineEmits(['update:modelValue','open','close'
	])
	const drawerRef = ref()
const visible = ref(false)
	const closed = ref(false)
const mIndex = ref(props.zIndex)
	const open = () => {
if(visible.value) return
	visible.value = true
		emit('open')
	}
	const hide = () => {
if(!visible.value) return
	closed.value = true
		emit('close')
	setTimeout(() => {
			closed.value = false
		visible.value = false
emit('update:modelValue', false)
		}, 250)
	}
const close = () => {
	if (!props.beforeClose) {
	hide()
		return
		}
	const shouldClose = props.beforeClose()
const isPromiseBool = [isPromise(shouldClose), isBool(shouldClose)].some(i => i)
	if(!isPromiseBool) {
console.warn('beforeClose函数必须返回类型：`Promise<boolean>` or `boolean`')
		}
	if(isPromise(shouldClose)) {
	shouldClose.then(res => {
			if(res) {
		hide()
			}
	}).catch(e => {
console.warn('>>throw reject：', e)
			})
		}
	else if(shouldClose) {
hide()
		}
	}
	const handleMask = () => {
if(isTrue(props.shade) && isTrue(props.shadeClose)) {
	close()
		}
	}
onMounted(() => {
	if(props.modelValue) {
open()
		}
	})
watch(() => props.modelValue, (val) => {
	if(val) {
open()
		}else {
	hide()
		}
	})
defineExpose({
		close
	})
</script>

<template>
	<div
	v-show="visible"
		class="ve__drawer" :class="[customClass,{'is-closed': closed}]" :style="[{'z-index': mIndex}]"
	>
	<div class="ve__drawer-container">
<div v-if="isTrue(shade)" class="ve__drawer-mask" :style="{'opacity': opacity}" @click="handleMask"></div>
		<div
		class="ve__drawer-wrap" :class="[direction]"
			:style="[
			customStyle,{'width': ['right', 'left'].includes(direction) ? addUnit(size) : '100%'},{'height': ['right', 'left'].includes(direction) ? '100%' : addUnit(size)}
				]"
			>
		<header v-if="isTrue(showHeader)" class="ve__drawer-header">
			<div class="ve__drawer-header__title">
				<slot name="title">{{title}}</slot>
					</div>
		<template v-if="$slots.extra || isTrue(showClose)">
				<slot name="extra" />
			<span v-if="!$slots.extra" class="ve__drawer-header__xclose" @click="handleMask"><i class="ve-icon-close"></i></span>
					</template>
			</header>
	<section class="ve__drawer-body"><div class="ve__drawer-body__inner"><slot /></div></section>
			<footer v-if="$slots.footer" class="ve__drawer-footer"><slot name="footer" /></footer>
</div>
	</div>
	</div>
</template>

<style lang="scss" scoped>
.ve__drawer-body--hidden{overflow-y: hidden!important; touch-action:none;}
	.ve__drawer {
margin: 0;overflow: hidden;position: fixed;left: 0;right: 0;top: 0;bottom: 0;z-index: 2023;
	}
.ve__drawer-container {height: 100%;width: 100%;position: relative;left: 0;right: 0;top: 0;bottom: 0;z-index: inherit;}
	.ve__drawer-wrap {
background-color: #fff;box-sizing: border-box;display: flex;flex-direction: column;overflow: hidden;outline: none;box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);position: absolute;
		z-index: inherit;
	}
	.ve__drawer-wrap.left, .ve__drawer-wrap.right {height: 100%; top: 0; bottom: 0;}
.ve__drawer-wrap.top, .ve__drawer-wrap.bottom {width: 100%; left: 0; right: 0;}
.ve__drawer-wrap.left {left: 0;}
	.ve__drawer-wrap.right {right: 0;}
.ve__drawer-wrap.top {top: 0;}
	.ve__drawer-wrap.bottom {bottom: 0;}
.ve__drawer-header {
display: flex;align-items: center;border-bottom: 1px solid #f2f6fc;color: #606266;padding: 12px;
	}
	.ve__drawer-header>:first-child {flex: 1;}
.ve__drawer-header__title {color: inherit; font-size: 16px;}
.ve__drawer-header__xclose {color: inherit;cursor: pointer;font-size: 20px;}
	.ve__drawer-header__xclose i {font-size: inherit; vertical-align: text-bottom;}
.ve__drawer-header__xclose:hover i {color: #409eff;}
.ve__drawer-body {flex: 1; overflow: auto;}
.ve__drawer-body__inner {padding: 12px;}
.ve__drawer-footer {padding: 12px 15px;}
	.ve__drawer-mask {
background: black;opacity: .5;pointer-events: auto;height: 100%;width: 100%;position: absolute;top: 0;left: 0;z-index: inherit;animation: anim__drawer-fadeIn .3s cubic-bezier(.23,1,.32,1);
	}
.ve__drawer.is-closed .ve__drawer-mask {animation: anim__drawer-fadeOut .3s cubic-bezier(.23,1,.32,1);}
	.ve__drawer .ve__drawer-wrap.top {animation: anim__drawer-topIn .3s cubic-bezier(.23,1,.32,1);}
.ve__drawer .ve__drawer-wrap.right {animation: anim__drawer-rightIn .3s cubic-bezier(.23,1,.32,1);}
	.ve__drawer .ve__drawer-wrap.bottom {animation: anim__drawer-bottomIn .3s cubic-bezier(.23,1,.32,1);}
.ve__drawer .ve__drawer-wrap.left {animation: anim__drawer-leftIn .3s cubic-bezier(.23,1,.32,1);}
.ve__drawer.is-closed .ve__drawer-wrap.top {animation: anim__drawer-topOut .3s cubic-bezier(.23,1,.32,1);}
.ve__drawer.is-closed .ve__drawer-wrap.right {animation: anim__drawer-rightOut .3s cubic-bezier(.23,1,.32,1);}
	.ve__drawer.is-closed .ve__drawer-wrap.bottom {animation: anim__drawer-bottomOut .3s cubic-bezier(.23,1,.32,1);}
.ve__drawer.is-closed .ve__drawer-wrap.left {animation: anim__drawer-leftOut .3s cubic-bezier(.23,1,.32,1);}
@keyframes anim__drawer-fadeIn {
0% {opacity: 0;}
	}
@keyframes anim__drawer-fadeOut {
100% {opacity: 0;}
	}
@keyframes anim__drawer-rightIn {
	    0% {transform: translate(100%);}
to {transform: translate(0);}
	}
@keyframes anim__drawer-rightOut {
	    0% {transform: translate(0);}
 to {transform: translate(100%);}
	}
@keyframes anim__drawer-leftIn {
0% {transform: translate(-100%);}
  to {transform: translate(0);}
	}
@keyframes anim__drawer-leftOut {
	 0% {transform: translate(0);}
to {transform: translate(-100%);}
	}
@keyframes anim__drawer-topIn {
	 0% {transform: translateY(-100%);}
to {transform: translate(0);}
	}
@keyframes anim__drawer-topOut {
	 0% {transform: translate(0);}
	    to {transform: translateY(-100%);}
	}
@keyframes anim__drawer-bottomIn {
	0% {transform: translateY(100%);}
to {transform: translate(0);}
	}
@keyframes anim__drawer-bottomOut {
	0% {transform: translate(0);}
to {transform: translateY(100%);}
}
</style>

