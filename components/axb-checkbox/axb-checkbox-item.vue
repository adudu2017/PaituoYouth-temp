<template>
	<view>
		<view v-if="name === '男生' || name === '女生'">
			<view class="gender-radio" :class="{'gender-radio-width-default':widthDefault}" :style="checked?activeStyle :itemStyle" @click="handleChange">
				<view v-if="name === '男生'">
					<uni-icons 
						custom-prefix="iconfont" 
						type="icon-boy" 
						:color="checked? '#FFFFFF' : '#101010'"
						size="20">
					</uni-icons>
				</view>
				<view v-if="name === '女生'">
					<uni-icons
						custom-prefix="iconfont"
						type="icon-girl"
						:color="checked? '#FFFFFF' : '#101010'"
						size="20"
						>
				</uni-icons>
				</view>
				<view class="gender-name">
					{{name}}
				</view>
			</view>
		</view>
		<view v-if="name !== '男生' && name !== '女生'" 
			class="radio" 
			:class="{'radio-width-default':widthDefault}" 
			:style="checked?activeStyle :itemStyle" 
			@click="handleChange">
			{{name}}
		</view>
	</view>
</template>

<script>
import iconfont from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	/**
 * 防抖
 * @param {*} fun 
 * @param {*} delay 
 * @param {*} immediate 
 */
const debounce = function (fun, delay, immediate) {
  var timer, lasttime, context, arg
  var later = function () {
    var now = new Date().getTime(),
      l = now - lasttime
    if (l < delay && l >= 0) {
      clearTimeout(timer)
      timer = setTimeout(later, delay - l)
    } else {
      clearTimeout(timer)
      timer = null
      if (!immediate) {
        fun.apply(context, arg)
        if (!timer) context = arg = null
      }
    }
  }
  return function () {
    context = this
    arg = arguments
    lasttime = new Date().getTime()
    var callNow = immediate && !timer
    if (!timer) timer=setTimeout(later, delay)
    if (callNow) {
      fun.apply(context, arg)
      context = arg = null
    }
  }
}

export default {
	components: {
		iconfont
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		value: {
			default: null,
		},
		checked: {
			type: [Boolean, Number],
			default: false
		},
	},
	computed: {
		widthDefault() {
			return this.name.length <= 3
		},
		activeStyle() {
			return `background: #101010;color: #FFFFFF;border-color: #101010;`
		},
		itemStyle() {
			return `background: #F0EEEE;color: #101010;`
		}
	},
	data() {
		return {

		};
	},
	methods: {
		handleChange: debounce(handleChange, 200,true)
	},
	mounted() {}
}

function handleChange() {
	this.$emit('change', this.value)
}
</script>

<style>
	.gender-radio {
		display: inline-block;
		height: 76rpx;
		margin-left: 18rpx;
		margin-top: 18rpx;
		line-height: 60rpx;
		padding: 0 70rpx;
		border-radius: 38rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		border: 1rpx solid #c3c3c3;
	}
	
	.gender-radio-width-default {
		width: 266rpx;
		padding-top: 4rpx;
	}
	
	.gender-name {
		margin-top: -65rpx;
		margin-left: 45rpx;
	}
	
	.radio {
		display: inline-block;
		height: 76rpx;
		margin-left: 18rpx;
		margin-top: 18rpx;
		line-height: 60rpx;
		padding: 0 22rpx;
		border-radius: 38rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		border: 1rpx solid #c3c3c3;
	}

	.radio:not(:last-child) {
		margin: 0 20rpx 30rpx 0;
	}


	.radio-width-default {
		width: 170rpx;
		text-align: center;
		padding-top: 4rpx;
	}
</style>
