<template>
	<view style="margin-left: 94rpx; margin-right: 92rpx;">
		<view class="about-me-header">{{ header }}</view>
		<u-form
			labelPosition="top"
			:model="formModel"
			:rule="formRules"
			:label-style="labelStyle"
			ref="form"
		>
			<u-form-item
				label="你希望TA的年龄是"
				prop="expectedAge"
				borderBottom
				ref="expectedAgeItem"
			>
				<view id="expected-age" class="expected-age-text">
					{{exceptAge.rangeValue[0]}}-{{exceptAge.rangeValue[1]}}
				</view>
				<view class="expected-age-slider">
					<slider-range
					  :value="exceptAge.rangeValue"
					  :min="exceptAge.min"
					  :max="exceptAge.max"
					  :step="exceptAge.step"
					  :bar-height="exceptAge.barHeight"
					  :block-size="exceptAge.blockSize"
					  :background-color="exceptAge.backgroundColor"
					  :format="ageFormat"
					  :tipVisible="false"
					  @change="handleAgeRangeChange"
					></slider-range>
				</view>
			</u-form-item>
			<u-form-item
				label="你希望ta的身高是"
				prop="expectedHeight"
				borderBottom
				ref="expectedHeightItem"
			>
				<view id="expected-height" class="expected-height-text">
					{{ exceptHeight.rangeValue[0] }}-{{exceptHeight.rangeValue[1]}}
				</view>
				<view class="expected-height-slider">
					<slider-range
					  :value="exceptHeight.rangeValue"
					  :min="exceptHeight.min"
					  :max="exceptHeight.max"
					  :step="exceptHeight.step"
					  :bar-height="exceptHeight.barHeight"
					  :block-size="exceptHeight.blockSize"
					  :background-color="exceptHeight.backgroundColor"
					  :format="heightFormat"
					  :tipVisible="false"
					  @change="handleHeightRangeChange"
					></slider-range>
				</view>
			</u-form-item>
			<u-form-item
				label="你希望ta的学历是"
				prop="expectedDegree"
				borderBottom
				ref="expectedDegreeItem"
			>
				<view class="form-item">
					<picker @change="degreePickerChange" :value="degreeIndex" :range="degreeList" range-key="text">
						<text>{{ formModel.expectedDegree }}</text>
						<view class="bottom-icon">
							<uni-icons 
								type="bottom"
								size="24"
								color="black"
							></uni-icons>						
						</view>
					</picker>
				</view>
			</u-form-item>
			<u-form-item
				label="你希望ta的家乡是"
				prop="expectedHomelocation"
				borderBottom
				ref="expectedHomelocationItem"
			>
				<view class="form-item"	@click="showPickHometownCity">
					<text>{{ formModel.expectedHomelocation }}</text>
					<view class="bottom-icon">
						<uni-icons 
							type="bottom"
							size="24"
							color="black"
						></uni-icons>						
					</view>
					<pcaPicker ref="pcaHomePicker" @confirm="getHometownCity"></pcaPicker>
				</view>
			</u-form-item>
			<u-form-item
				label="你希望ta的现居地是"
				prop="expectedLivelocation"
				borderBottom
				ref="expectedLivelocationItem"
			>
				<view class="form-item" @click="showPickLivingCity">
					<text>{{ formModel.expectedLivelocation }}</text>
					<view class="bottom-icon">
						<uni-icons 
							type="bottom"
							size="24"
							color="black"
						></uni-icons>
					</view>
					<pcaPicker ref="pcaPicker" @confirm="getLivingCity"></pcaPicker>
				</view>
			</u-form-item>
			<u-form-item
				label="你希望ta的婚姻状况是"
				prop="expectedMarriage"
				borderBottom
				ref="expectedMarriageItem"
			>
				<picker @change="marriagePickerChange" :value="marriageIndex" :range="marriageList" range-key="text">
					<view class="form-item">
						<text>{{ formModel.expectedMarriage }}</text>
						<view class="bottom-icon">
							<uni-icons 
								type="bottom"
								size="24"
								color="black"
							></uni-icons>						
						</view>
					</view>
				</picker>
			</u-form-item>
		</u-form>
		<view class="footer">
			<view class="access-app" @click="toApp()">进入APP</view>
			<text class="footer-text" @click="toApp()">跳过，直接进入app</text>
		</view>
	</view>
</template>

<script>
import SliderRange from '../../components/primewind-sliderrange/components/primewind-sliderrange/index.vue'
import iconfont from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
import pcaPicker from '@/components/pcaPicker/pcaPicker.vue'
export default {
	name: 'filterComp',
	components: {
		SliderRange,
		iconfont,
		pcaPicker
	},
	data() {
		return {
			header: '请如实填写"期待TA"的信息，便于给你推荐符合你要求的拍拖青年！',
			labelStyle: {
				'font-size':'40rpx',
			},
			heightAAA: 155,
			show: true,
			columns: [
				['高中及以下', '大专', '本科及以上']
			],
			formModel: {
				expectedAge: 40,
				expectedHeight: 50,
				expectedDegree: '本科及以上',
				expectedHomelocation: '浙江省-杭州市-不限',
				expectedLivelocation: '浙江省-杭州市-不限',
				expectedMarriage: '未婚'
			},
			degreeIndex: 1,
			degreeList: [{
				value: 'juniorcollege',
				text: '大专及以上'
			}, {
				value: 'undergraduate',
				text: '本科及以上'
			}, {
				value: 'master',
				text: '硕士及以上'
			}],
			marriageIndex: 0,
			marriageList: [{
				value: 'notMarriage',
				text: '未婚'
			}, {
				value: 'breakNoChildren',
				text: '可接受离异无孩'
			}, {
				value: 'breakHasChildren',
				text: '可接受离异有孩'
			}],
			exceptAge: {
				rangeValue: [25, 30],
				min: 15,
				max: 40,
				step: 1,
				barHeight: 3,
				blockSize: 10
			},
			exceptHeight: {
				rangeValue: [155, 170],
				min: 140,
				max: 200,
				step: 1,
				barHeight: 3,
				blockSize: 10
			},
			formRules: {
				expectedAge: {
					required: true,
					message: '请选择性别',
					trigger: 'change'
				},
				expectedHeight: {
					required: true,
					message: '请选择性别',
					trigger: 'change'
				},
				expectedDegree: {
					required: true,
					message: '请选择性别',
					trigger: 'change'
				},
				expectedHomelocation: {
					required: true,
					message: '请选择性别',
					trigger: 'change'
				},
				expectedLivelocation: {
					required: true,
					message: '请选择性别',
					trigger: 'change'
				},
				expectedMarriage: {
					required: true,
					message: '请选择性别',
					trigger: 'change'
				}
			},
			openHomeFlag: false,
			openFlag: false
		}
	},
	methods: {
		ageFormat(val) {
			return val
		},
		heightFormat(val) {
			return val
		},
		handleAgeRangeChange(val){
			this.exceptAge.rangeValue = val
		},
		handleHeightRangeChange(val){
			this.exceptHeight.rangeValue = val
		},
		degreePickerChange(e) {
			this.degreeIndex = e.detail.value;
			this.formModel.expectedDegree = this.degreeList[this.degreeIndex].text
		},
		marriagePickerChange(e) {
			this.marriageIndex = e.detail.value;
			this.formModel.expectedMarriage = this.marriageList[this.marriageIndex].text
		},
		showPickHometownCity() {
			if (!this.openHomeFlag) {
				this.$refs.pcaHomePicker.show();
			}
			this.openHomeFlag = !this.openHomeFlag;
		},
		showPickLivingCity(e) {
			if (!this.openFlag) {
				this.$refs.pcaPicker.show();
			}
			this.openFlag = !this.openFlag;
		},
		getLivingCity(e) {
			console.log(e)
			this.formModel.expectedLivelocation = e;
			this.$refs.pcaPicker.hide();
		},
		getHometownCity(e) {
			console.log(e)
			this.formModel.expectedHomelocation = e;
			this.$refs.pcaHomePicker.hide();
		},
		toApp() {
			let data = {
			  "ageGt": 25,
			  "ageLt": 30,
			  "educationGt": 0,
			  "heightGt": 165,
			  "heightLt": 180,
			  "hometown": "浙江省-杭州市-滨江区",
			  "marriage": 0,
			  "place": "浙江省-杭州市-萧山市"
			}
			let options = {
				header: {
					'content-type': 'application/json',
					'miniapp-token': this.$pri.token
				}
			}
			this.$req.post('/miniapp/expect/update', data, options).then(res => {
				let [err, result] = res
				console.log(result.data.data)
			}, err => {
				console.log(err)
			})
			uni.switchTab({
				url: '../recommend/recommend'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.about-me-header {
	margin-top: 22rpx;
	font-size: 28rpx;
}
.form-item {
	position: relative;
	margin-top: -10rpx;
	margin-buttom: 6rpx;
	width: 578rpx;
	height: 80rpx;
	padding-left: 30rpx;
	font-size: 32rpx;
	border: 2rpx solid #101010;
	border-radius: 40rpx;
}
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 80rpx;
	margin-bottom: 10rpx;
	.footer-text {
		flex: 1;
	}
}
.access-app {
	margin-top: 20rpx;
	width: 494rpx;
	height: 104rpx;
	padding-top: 25rpx;
	text-align: center;
	font-size: 40rpx;
	color: white;
	background-color: #101010;
	border-radius: 52rpx;
	margin-bottom: 10rpx;
}
.expected-age-text {
	width: 104rpx;
	height: 58rpx;
	text-align: center;
	font-size: 30rpx;
	color: white;
	background-color: #101010;
	border-radius: 12rpx;
}
.expected-age-slider {
	width: 424rpx;
	margin-top: -70rpx;
	margin-left: 118rpx;
}
.expected-height-text {
	width: 134rpx;
	height: 58rpx;
	padding-bottom: 20rpx;
	padding-left: 15rpx;
	font-size: 30rpx;
	color: white;
	background-color: #101010;
	border-radius: 12rpx;
	z-index: 100000;
}
.expected-height-slider {
	width: 398rpx;
	margin-top: -70rpx;
	margin-left: 148rpx;
}
/deep/ .u-form-item--left__content__label {
	font-size: 28rpx !important;
}
/deep/ .slider-handle-block {
	width: 46rpx !important;
	height: 46rpx !important;
}
/deep/ .u-form-item {
	padding: 0rpx !important;
}
/deep/ .slider-range-inner {
	height: 60rpx !important;
}
/deep/ .u-form-item--left__content__label {
	margin-left: 30rpx;
	margin-bottom: 10rpx;
	margin-top: 22rpx;
	font-size: 28rpx !important;
}
/deep/ .u-form-item--left__content__label:before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	margin-top: 46rpx;
	width: 20rpx;
	height: 20rpx;
	background-image: url('@/static/assets/img/black.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.bottom-icon {
	float: right;
	padding-right: 22rpx;
	padding-top: 5rpx;
}
</style>