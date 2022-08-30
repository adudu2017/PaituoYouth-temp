<template>
	<view>
		<view class="input-container">
			<view style="display: flex;
						justify-content: space-between;
						padding-left: 28rpx;
						padding-top: 26rpx">
				<view style="width: 660rpx;">
					<input
					  :placeholder="placeholder"
					  :maxlength="20"
					  v-model="value"
					  :clearable="false"
					  @input="inputFn"
					></input>
				</view>
				<view style="width: 20%;color:#A3A3A3;text-align: center;padding-right: 10rpx;">{{ value.length }}/20</view>
			</view>
		</view>
		<view class="footer" :class="confirmStatus ? '': 'footer_ban'" @click="confirm">确定</view>
	</view>
</template>

<script>
export default {
	name: 'editFormItem',
	data() {
		return {
			type: '',
			value: '',
			placeholder: '',
			confirmStatus: false
		}
	},
	onLoad(option){
		uni.setNavigationBarTitle({
			title: option.type || ''
		})
		this.type = option.type || ''
		this.value = option.data || ''
		if (this.type == '公司'){
			this.placeholder = '请输入' + this.type + '名称'
		} else {
			this.placeholder = '请输入' + this.type
		}
		this.confirmStatus = this.value.length > 0
	},
	methods: {
		inputFn(e) {
			if (e.detail.value.length === 0) {
				this.confirmStatus = false
			} else {
				this.confirmStatus = true
			}
		},
		confirm() {
			if (this.confirmStatus === false) {
				return
			}
			//获取页面栈
			let pages = getCurrentPages()
			//获取上一页栈
			let prevPage = pages[pages.length - 2]
			//出发上一页updata函数
			prevPage.$vm.upData(this.type, this.value)
			//返回上一页
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.input-container {
	margin-left: 42rpx;
	margin-top: 42rpx;
	width: 666rpx;
	height: 100rpx;
	background: rgba(239, 238, 238, 0.6);
	/deep/ .u-input__input {
		float: left;
		width: 70%;
		height: 100%;
		background: rgba(239, 238, 238, 0.6);
		border-radius: 6rpx;
	}
	/deep/ input {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		font-size: 34rpx;
		line-height: 48rpx;
		
		color: #000000;
		
		mix-blend-mode: normal;
		opacity: 0.9;
	}
}
.footer {
	position: fixed;
	left: 22.13%;
	right: 24.53%;
	top: 90%;
	height: 80rpx;
	/* 紫色渐变 */
	
	background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
	border-radius: 1000px;
	
	text-align: center;
	padding-top: 16rpx;
	font-family: 'PingFang SC';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	
	color: #FFFFFF;
}
.footer_ban {
	background: #C2BFBF !important;
}
</style>