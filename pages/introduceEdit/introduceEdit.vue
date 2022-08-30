<template>
	<view>
		<u-navbar
			is-back="true"
			:border-bottom="false"
			title-color="black"
			bgColor="#E5E5E5"
			title="编辑个人信息"
		></u-navbar>
		<view class="title-container">
			<view class="title-pre"></view>
			<view class="title-word">自我介绍</view>
		</view>
		<view class="content-container">
			<textarea class="textarea"
					:placeholder="introducePlaceholder"
					:placeholder-style="placeholderStyle"
					maxlength="800"
					auto-height
					@input="inputFn"
					v-model="introduceContent" />
			<view class="num" v-if="introduceContent.length < 20 && introduceContent.length > 0">
				<text class="num_left">
					至少20个字
				</text>
				<text class="num_right">
					{{ introduceContent.length }}/800
				</text>
			</view>
			<view class="num2" v-else>
				<text>
					{{ introduceContent.length }}/800
				</text>
			</view>
		</view>
		
		<view :class="confirm ? 'confirm' : 'confirm_ban'"  @click="confirmBtn">确定</view>
	</view>
</template>

<script>
export default {
	name: 'introduceEdit',
	data() {
		return {
			introducePlaceholder: '介绍下自己的性格、优点、缺点、兴趣爱好等，真诚的介绍会更受欢迎哦',
			placeholderStyle: {
				'font-family': 'PingFang SC',
				'font-tyle': 'normal',
				'font-weight': 400,
				'font-size': '28rpx',
				'line-height': '40rpx',
				
				'letter-spacing': '-1rpx',
				
				'color': '#A3A3A3'
			},
			introduceContent: '',
			confirm: false
		}
	},
	mounted() {
		let data = {}
		let options = {
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'miniapp-token': uni.getStorageSync('miniapp-token')
			}
		}
		this.$req.get('/miniapp/user/get', data, options).then(res => {
			let [err, result] = res
			if (result.data.data) {
				let tempFormData = result.data.data
				this.introduceContent = tempFormData.aboutMe || ''
				if (this.introduceContent.length >= 20) {
					this.confirm = true
				}
			}
		}, err => {
			console.log(err)
		})
	},
	methods: {
		inputFn() {
			this.confirm = this.introduceContent.length >= 20
		},
		confirmBtn() {
			if (this.introduceContent.length < 20) {
				return
			}
			let data = {
				aboutMe: this.introduceContent		
			}
			let options = {
				header: {
					'content-type': 'application/json',
					'miniapp-token': uni.getStorageSync('miniapp-token')
				}
			}
			this.$req.post('/miniapp/user/update', data, options).then(res => {
				let [err, result] = res
				if (result.data.data === 'success' && result.data.code === 20000) {
					let pages = getCurrentPages()
					//获取上一页栈
					let prevPage = pages[pages.length - 2]
					//出发上一页updata函数
					prevPage.$vm.updateData()
					//返回上一页
					uni.navigateBack({
						delta: 1
					})
				}
			}, err => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.title-container {
	margin-left: 38rpx;
	margin-top: 32rpx;
	.title-pre {
		float: left;
		margin-right: 8rpx;
		width: 6rpx;
		height: 44rpx;
		left: 38rpx;
		top: 202rpx;
		
		background: #7B91FF;
	}
	.title-word {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 24px;
		color: #000000;
		
		mix-blend-mode: normal;
		opacity: 0.9;
	}
}
.content-container {
	margin-left: 38rpx;
	margin-top: 18rpx;
	width: 686rpx;
	padding: 20rpx;
	padding-left: 40rpx;
	background-color: #FFFFFF;
	/deep/ .uni-textarea-textarea{
		font-size: 28rpx;
		line-height: 45rpx;
	}
	/deep/ .textarea  {
		min-height: 300rpx !important;
		width: 100%;
	}
	/deep/ .uni-easyinput__placeholder-class {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
		line-height: 40rpx;
		
		letter-spacing: -1rpx;
		
		color: #A3A3A3;
	}
	.num{
		margin-right: 40rpx;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
		line-height: 40rpx;
		
		color: #A3A3A3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.num_left{
			font-family: 'PingFang SC';
			font-style: normal;
			font-weight: 400;
			font-size: 28rpx;

			color: #FF6161;
		}
	}
	.num2 {
		margin-right: 40rpx;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
		line-height: 40rpx;
		
		color: #A3A3A3;
		text-align: right;
	}
}
.confirm {
	position: fixed;
	height: 80rpx;
	padding-top: 20rpx;
	left: 22.13%;
	right: 24.53%;
	// top: 90.72%;
	bottom: 50rpx;
	text-align: center;
	
	/* 紫色渐变 */
	
	background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
	border-radius: 1000px;
	
	font-family: 'PingFang SC';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	
	color: #FFFFFF;
}
.confirm_ban{
	position: fixed;
	height: 80rpx;
	padding-top: 20rpx;
	left: 22.13%;
	right: 24.53%;
	// top: 90.72%;
	bottom: 50rpx;
	text-align: center;
	
	/* 紫色渐变 */
	
	background: #C2BFBF;
	border-radius: 1000px;
	
	font-family: 'PingFang SC';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	color: #FFFFFF;
}
</style>