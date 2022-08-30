<template>
	<view style="margin-left: 94rpx; margin-right: 92rpx;">
		<view class="about-me-header">{{ header }}</view>
		<u-form
			labelPosition="top"
			:model="formModel"
			:rules="rules"
			:label-style="labelStyle"
			ref="form"
		>
			<u-form-item
				label="请选择你的性别,注册完成后将无法修改"
			
				borderBottom
				ref="genderItem"
			>
			  <view>
			  	<axb-check-box
			  		ref="genderRadio"
			  		:list="genderList"
			  		@change="genderRadioChange">
			  	</axb-check-box>
			  </view>
			</u-form-item>
			<u-form-item
				label="请选择你的学历"
			
				borderBottom
				ref="degreeItem"
			>
				<view>
					<axb-check-box
						ref="genderRadio"
						:list="degreeList"
						@change="degreeChangeList">
					</axb-check-box>
				</view>
			</u-form-item>
			<u-form-item
				label="请选择你目前的状态"
			
				borderBottom
				ref="degreeStatusItem"
			>
				<view>
					<axb-check-box
						ref="genderRadio"
						:list="degreeStatusList"
						@change="degreeStatusChangeList">
					</axb-check-box>
				</view>
			</u-form-item>
			<u-form-item
				label="请选择你的婚姻状况"
			
				borderBottom
				ref="marriageStatusItem"
			>
				<view>
					<axb-check-box
						ref="marriageStatusRadio"
						:list="marriageStatusList"
						@change="marriageStatusChangeList">
					</axb-check-box>
				</view>
			</u-form-item>
			<u-form-item
				label="请选择你的身高"
			
				borderBottom
				ref="heightItem"
			>
				<view style="display: flex; flex-direction: row;">
					<view class="my-height"> 
						{{ formModel.height }}
					</view>
					<view style="width: 75%; margin-left: 10rpx; margin-top: 20rpx">
						<slider
							:value="formModel.height"
							min='0'
							max='220'
							@change="heightChangeSlider"
							@changing="heightChangeSlider"
							activeColor="#FFCC33" 
							backgroundColor="#000000" 
							block-color="#8A6DE9"
							 block-size="20"
						/>
							
					</view>
					
				</view>
			</u-form-item>
			<u-form-item
				label="请选择你的出生年月"
			
				borderBottom
				ref="birthdayItem"
			>
				<picker mode="date" @change="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="birthday-item">
						<text style="margin-right: 280rpx;">
							{{ formModel.birthday }}
						</text>
						<uni-icons
							custom-prefix="iconfont" 
							type="icon-calendar" 
							:color="checked? '#FFFFFF' : '#101010'"
							size="20">
						</uni-icons>
					</view>
				</picker>
			</u-form-item>
			<u-form-item
				label="请输入姓名"
				prop="nameText"
				ref="nameItem"
			>
				<uni-easyinput @input="nameOnBlur" @blur='nameOnBlur' v-model="formModel.nameText" placeholder="请输入姓名"></uni-easyinput>
				</u-form-item>
				<u-form-item
				label="请输入身份证号码"
				prop="nameId"
				borderBottom
				ref="nameItem"
			>
			<uni-easyinput @input="nameOnBlur" @blur='nameOnBlur' v-model="formModel.nameId" placeholder="请输入身份证号码"></uni-easyinput>
			</u-form-item>
		</u-form>
		<view :class="btnColorShow? 'next-step' : 'next_step_ban'" @click="toNext()">下一步（1/3）
		</view>
	</view>
</template>

<script>
import axbCheckBox from '@/components/axb-checkbox/axb-checkbox.vue'
import iconfont from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
export default {
	name: 'aboutMe',
	components: {
		axbCheckBox,
		iconfont
	},
	data() {
		return {
			header: '请如实填写“关于我”的信息，便于拍拖青年们更了解你',
			labelStyle: {
				'font-size':'28rpx',
			},
			btnColorShow:false,
			heightSliderValue: '175',
			calendarMode: 'single',
			birthday: [],
			formModel: {
				gender: '',
				degree: '',
				workStatus:'',
				marriageStatus: '',
				height: 180,
				birthday: '1993-10-1',
				nameText: '',
				nameId: ''
			},
			rules: {
					'nameText': [
						{
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				}
					],
				'nameId': [
					{
					type: 'number',
				
					required: true,
					message: '请填写身份证号',
					trigger: ['blur', 'change']
				},
				{
			pattern: /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g,
			// 正则检验前先将值转为字符串
			transform(value) {
				return String(value);
			},
			message: '请输入正确格式的身份证号'
		},
				],
			
				// gender: {
				// 	required: true,
				// 	message: '请选择性别',
				// 	trigger: 'change'
				// },
				// degree: {
				// 	require: true,
				// 	message: '请选择学历',
				// 	trigger: 'change'
				// },
				// marriageStatus: {
				// 	require: true,
				// 	message: '请选择你目前的状态',
				// 	trigger: 'change'
				// }
			},
			genderList: [{
				name: '男生',
				value: 'male',
				checked: 0
			}, {
				name: '女生',
				value: 'female',
				checked: 0
			}],
			degreeList: [{
				name: '博士',
				value: 'doctor',
				checked: 0
			},{
				name: '硕士',
				value: 'master',
				checked: 0
			},{
				name: '本科',
				value: 'undergraduate',
				checked: 0
			},{
				name: '大专',
				value: 'junior',
				checked: 0
			},{
				name: '高中及以下',
				value: 'high',
				checked: 0
			}],
			degreeStatusList: [{
				name: '在校学生',
				value: 'ungraduated',
				checked: 0
			}, {
				name: '已经毕业',
				value: 'graduated',
				checked: 0
			}],
			marriageStatusList: [{
				name: '未婚',
				value: 'noMarried'
			},{
				name: '离异',
				value: 'breakUp'
			},{
				name: '丧偶',
				value: 'loseLove'
			}],
			multiArray: [['1900'], ['01']],
			multiIndex: [0, 0]
		}
	},
	onReady() {
		
		this.$refs.form.setRules(this.rules);
	},
	mounted() {
		for (let i = 1901; i <= 2022; i++) {
			this.multiArray[0].push(i.toString())
		}
		for (let i = 2; i <= 12; i++) {
			if (i < 10) {
				this.multiArray[1].push('0' + i.toString())
			} else {
				this.multiArray[1].push(i.toString())
			}
		}
		this.multiIndex[0] = 100
	},
	methods: {
		bindMultiPickerColumnChange(e) {
			let multiIndex = e.detail.value;
			this.formModel.birthday = multiIndex
		
		},
		genderRadioChange(value) {
		
		 this.formModel.gender = value;
		 this.changeColor()
		},
		// 学历
		degreeChangeList(value) {
			this.formModel.degree = value;
		 this.changeColor()
		},
		// 目前状态
		degreeStatusChangeList(value) {
	      this.formModel.workStatus = value;
		 this.changeColor()
		},

		// 婚姻状态
		marriageStatusChangeList(value) {
			  this.formModel.marriageStatus = value;
		 this.changeColor()
		},
		nameOnBlur(value) {
			 
		 this.changeColor()
		},
	
		getHeightSliderValue(value) {
			console.log('hhhhh',value);
			return Number((value - 150) / 50)
		},
		heightChangeSlider(event){
		 
		 this.formModel.height = event.detail.value
		 console.log(this.formModel.height);
		},
		changeBirthday(e) {
			
			console.log(e)
		},
		confirmBirthday(e) {
			console.log(e);
		},
		//填完表单控制按钮颜色
		
            changeColor(){
				console.log('111',this.formModel);
				if(this.formModel.gender&&this.formModel.degree&&this.formModel.workStatus&&this.formModel.marriageStatus&&this.formModel.nameText&&this.formModel.nameId){
					this.btnColorShow = true;
					console.log('222',this.formModel);
                }else{
					this.btnColorShow = false;
					console.log('333',this.formModel);
                }
            },
		toNext() {
			if(this.btnColorShow==false){
				uni.$u.toast('请填写完成信息')
				return;
			};
				let data = {
				education: 0,
				marriage: 0,
				height: this.formModel.height
			}
			let options = {
				header: {
					'content-type': 'application/json',
					'miniapp-token': this.$pri.token
				}
			}
			this.$refs.form.validate(valid => {
				console.log(valid)
				if (valid) {
					console.log('验证通过');

				this.$req.post('/miniapp/user/update', data, options).then(res => {
				let [err, result] = res
				console.log(result.data.data)
			}, err => {
				console.log(err)
			})
			uni.navigateTo({
				url: '../aboutMeSecond/aboutMeSecond'
			})

				} else {
					uni.$u.toast('请填写完成信息')
				}
			});
		
		
		
		}
	}
}
</script>

<style lang="scss" scoped>
.about-me-header {
	margin-top: 22rpx;
	font-size: 28rpx;
}
.birthday-item {
	border: 2px solid #101010;
	border-radius: 40rpx;
	padding-left: 30rpx;
	width: 568rpx;
	height: 80rpx;
	font-size: 32rpx;
}
/deep/ .u-calendar__action{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/ .u-slider__gap {
	position: relative;
	border-radius: inherit;
	background-color: #101010 !important;
}
/deep/ .is-input-border {
	width: 558rpx;
	height: 80rpx;
	padding-left: 10rpx !important;
	margin-bottom: 12rpx;
	border-radius: 40rpx;
	border-color: #101010 !important;
	font-size: 32rpx;
}
.next-step {
	margin-top: 20rpx;
	margin-left: 35rpx;
	margin-bottom: 40rpx;
	width: 494rpx;
	height: 104rpx;
	padding-top: 25rpx;
	padding-left: 20rpx;
	text-align: center;
	font-size: 40rpx;
	color: white;
	background-color: #101010;
	border-radius: 52rpx;
}
.next_step_ban{
	background-color:#C0C0C0;
	margin-top: 20rpx;
	margin-left: 35rpx;
	margin-bottom: 40rpx;
	width: 494rpx;
	height: 104rpx;
	padding-top: 25rpx;
	padding-left: 20rpx;
	text-align: center;
	font-size: 40rpx;
	color: white;
	border-radius: 52rpx;
}
.my-height {
	width: 104rpx;
    height: 58rpx; 
	font-size: 28rpx;
	text-align: center;
	background-color: #101010;
	color: #ffffff;
	border-radius: 16rpx;
	margin-top: -10rpx;
}
/deep/ .u-form-item--left__content__label {
	margin-left: 30rpx;
	margin-bottom: 10rpx;
	margin-top: 22rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
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
/deep/ .u-slider__button {
	width: 48rpx !important;
	height: 48rpx !important;
}
/deep/ .u-form-item {
	padding: 7rpx !important;
}
</style>