<template>
	<view>
		<u-navbar
			is-back="true"
			:border-bottom="false"
			title-color="black"
			bgColor="#E5E5E5"
			title="编辑基础资料"
		></u-navbar>
		<view class="edit-container1">
			<view class="edit-container1-title">
				<view class="edit-container1-title-pre"></view>
				<view class="edit-container1-text">基本资料</view>
			</view>
			<view class="edit-context-container1">
				<view v-for="(item, index) in baseInfo" :key="index">
					<edit-item :text="item.text" :value="item.value"></edit-item>
				</view>
			</view>
		</view>
		<view class="edit-container2">
			<view class="edit-container2-title">
				<view class="edit-container2-title-pre"></view>
				<view class="edit-container2-text">教育及工作资料</view>
			</view>
			<view class="edit-context-container2">
				<view v-for="(item, index) in eduWorkInfo" :key="index">
					<edit-item :text="item.text" :value="item.value"></edit-item>
				</view>
			</view>
		</view>
		<view class="editInfoFooter" v-if="footBtnShow || true">
			<view class="saveBtn" @click="saveMyInfo">保存</view>
		</view>
		<KXDateTime
			ref="datePop"
			:date='date'
			:value='defaultBirthIndex'
			:end='endDate'
			:start='startDate'
			@rundata='getBirthDay'>
		</KXDateTime>
		<view>
			<pcaPicker ref="pcaLiveCityPicker" @confirm="updateLiveCity"></pcaPicker>
		</view>
		<view>
			<pcaPicker ref="pcaHomeCityPicker" @confirm="updateHomeCity"></pcaPicker>
		</view>
		<singlePickerNew 
			ref="height" :type="selectType" @selectdata="getSelectData"
			:optionData="heightData" :startIndex="defaultHeightIndex"></singlePickerNew>
		<singlePickerNew
			ref="weight" :type="selectType" @selectdata="getSelectData"
			:optionData="weightData" :startIndex="defaultWeightIndex"></singlePickerNew>
		<singlePickerNew
			ref="marriage" :type="selectType" @selectdata="getSelectData"
			:optionData="marriageData" :startIndex="defaultMarriageIndex"></singlePickerNew>
		<singlePickerNew
			ref="position" :type="selectType" @selectdata="getSelectData"
			:selectedValue="selectValue" :optionData="positionData"
			:startIndex="defaultPositionIndex"></singlePickerNew>
		<singlePickerNew
			ref="degree" :type="selectType" @selectdata="getSelectData"
			:optionData="degreeData" :startIndex="defaultDegreeIndex"></singlePickerNew>
		<singlePickerNew
			ref="income" :type="selectType" @selectdata="getSelectData"
			:optionData="incomeData" :startIndex="defaultIncomeIndex"></singlePickerNew>
	</view>
</template>

<script>
import editItem from './components/editItem'
import KXDateTime from "@/components/kx-datetime/kx-datetime.vue"
import pcaPicker from '@/components/pcaPicker/pcaPicker.vue'
import singlePickerNew from '@/components/singlePickerNew/singlePickerNew.vue'
export default {
	name: 'infoEditForm',
	components: {
		editItem,
		KXDateTime,
		pcaPicker,
		singlePickerNew
	},
	data() {
		let heightData = []
		for (let i = 150; i < 210; i++) {
			heightData.push(i + 'CM')
		}
		let defaultHeightIndex = []
		if (uni.getStorageSync("heightIndex")) {
			defaultHeightIndex.push(uni.getStorageSync("heightIndex"))
		} else if (uni.getStorageSync("sex") === 'male') {
			defaultHeightIndex.push(20)
		} else if (uni.getStorageSync("sex") === 'female') {
			defaultHeightIndex.push(10)
		}
		
		let weightData = []
		for (let i = 40; i < 100; i++) {
			weightData.push(i + 'KG')
		}
		let defaultWeightIndex = []
		if (uni.getStorageSync("weightIndex")) {
			defaultWeightIndex.push(uni.getStorageSync("weightIndex"))
		} else if (uni.getStorageSync("sex") === 'male') {
			defaultWeightIndex.push(30)
		} else if (uni.getStorageSync("sex") === 'female') {
			defaultWeightIndex.push(20)
		}
		
		let marriageData = ['未婚', '离异', '丧偶']
		let defaultMarriageIndex = []
		if (uni.getStorageSync("marriageIndex")) {
			defaultMarriageIndex.push(uni.getStorageSync("marriageIndex"))
		} else {
			defaultMarriageIndex.push(0)
		}
		
		let positionData = [
			'产品经理', '程序员', '设计师', '学生', '运营', '项目经理', '游戏策划',
			'法务','市场', '客服', '销售','公务员','顾问','商务','行政','财务',
			'后勤','个体户','投资人','医生','护士','猎头','教练','翻译','主持人',
			'演员','导演','秘书', '总经理', '自媒体'
		]
		let defaultPositionIndex = []
		if (uni.getStorageSync("vocation")) {
			let vocation = uni.getStorageSync("vocation")
			positionData.forEach((item, index) => {
				if (item === vocation) {
					defaultPositionIndex.push(index)
				}
			})
		} else {
			defaultPositionIndex.push(0)
		}

		let degreeData = [
			'小学',
			'初中',
			'高中',
			'中专',
			'大专',
			'本科',
			'硕士',
			'博士'
		]
		let defaultDegreeIndex = []
		if (uni.getStorageSync("educationIndex")) {
			defaultDegreeIndex.push(uni.getStorageSync("educationIndex"))
		} else {
			defaultDegreeIndex.push(5)
		}
		
		let incomeData = [
			'5~15w',
			'15~30w',
			'30~50w',
			'50~100w',
			'100w以上'
		]
		let defaultIncomeIndex = []
		if (uni.getStorageSync("vocation")) {
			let annualIncome = uni.getStorageSync("annualIncome")
			incomeData.forEach((item, index) => {
				if (item === annualIncome) {
					defaultIncomeIndex.push(index)
				}
			})
		} else {
			defaultIncomeIndex.push(0)
		}
		
		let defaultBirthIndex = [99,0,0]
		let birth = ''
		if (uni.getStorageSync("birth")) {
			defaultBirthIndex = []
			birth = uni.getStorageSync("birth")
			let birthYearIndex = parseInt(birth.split('-')[0]) - 1923
			defaultBirthIndex.push(birthYearIndex)
			let birthMonIndex = parseInt(birth.split('-')[1]) - 1
			defaultBirthIndex.push(birthMonIndex)
			let birthDayIndex = parseInt(birth.split('-')[2]) - 1
			defaultBirthIndex.push(birthDayIndex)
		}
		
		return {
			footBtnShow: true,
			heightData,
			defaultHeightIndex,
			weightData,
			defaultWeightIndex,
			marriageData,
			defaultMarriageIndex,
			positionData,
			defaultPositionIndex,
			degreeData,
			defaultDegreeIndex,
			incomeData,
			defaultIncomeIndex,
			defaultBirthIndex,
			baseInfo: [{
				text: '昵称',
				value: ''
			},{
				text: '出生日期',
				value: ''
			},{
				text: '性别',
				value: ''
			},{
				text: '身高',
				value: ''
			},{
				text: '体重',
				value: ''
			}, {
				text: '现居住地',
				value: ''
			}, {
				text: '家乡',
				value: ''
			}, {
				text: '婚姻状况',
				value: ''
			}],
			eduWorkInfo: [{
				text: '最高学历',
				value: ''
			},{
				text: '毕业院校',
				value: ''
			},{
				text: '职位',
				value: ''
			},{
				text: '公司',
				value: ''
			},{
				text: '年收入',
				value: ''
			}],
			selectTypeMap: {
				'position': '职位',
				'height': '身高',
				'weight': '体重',
				'marriage': '婚姻状况',
				'degree': '最高学历',
				'income': '年收入'
			},
			date: birth,
			selectType: '',
			selectValue: '',
			startDate: '1923/01/01',
			endDate: '2022/12/31',
			openHomeCityFlag: false,
			openLiveCityFlag: false,
			homeLocation: {},
			liveLocation: {},
			selectedData: '',
			formData: {
				nick: '',
				birth: '',
				sex: 0,
				height: 0,
				weight: 0,
				place: 0,
				school: '',
				hometown: 0,
				marriage: '',
				education: 0,
				school: '',
				vocation: '',
				company: '',
				annualIncome: ''
			},
			tempFormData: {}
		}
	},
	beforeMount() {
		this.$pub.subscribe('changeMyInfo', (item, value)=> {
			if (value === 'popupDate') {
				this.$refs.datePop.open()
				this.footBtnShow = false
			} else if (value === 'hometown'){
				if (!this.openHomeCityFlag) {
					this.$refs.pcaHomeCityPicker.show();
				}
				this.openHomeCityFlag = !this.openHomeCityFlag;
			} else if (value === 'livePlace') {
				if (!this.openLiveCityFlag) {
					this.$refs.pcaLiveCityPicker.show();
				}
				this.openLiveCityFlag = !this.openLiveCityFlag;
			} else if (value === 'position') {
				this.selectType = this.selectTypeMap[value]
				this.eduWorkInfo.forEach((item) => {
					if (item.text === this.selectType) {
						this.selectValue = item.value
					}
				})
				this.$refs.position.open()
			} else if (value === 'height') {
				this.selectType = this.selectTypeMap[value]
				this.$refs.height.open()
			} else if (value === 'weight') {
				this.selectType = this.selectTypeMap[value]
				this.$refs.weight.open()
			} else if (value === 'marriage') {
				this.selectType = this.selectTypeMap[value]
				this.$refs.marriage.open()
			} else if (value === 'degree') {
				this.selectType = this.selectTypeMap[value]
				this.$refs.degree.open()
			} else if (value === 'income') {
				this.selectType = this.selectTypeMap[value]
				this.$refs.income.open()
			}
		})
	},
	mounted() {
		let data = {}
		let options = {
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'miniapp-token': uni.getStorageSync('miniapp-token')
			}
		}
		let that = this
		this.$req.get('/miniapp/user/get', data, options).then(res => {
			let [err, result] = res
			that.tempFormData = {}
			if (result.data.data) {
				that.tempFormData = result.data.data
				that.formData.nick = that.tempFormData.nick || ''
				that.formData.birth = that.tempFormData.birth || ''
				that.formData.sex = that.tempFormData.sex
				that.formData.height = that.tempFormData.height ?
					that.tempFormData.height : null
				that.formData.weight = that.tempFormData.weight ?
					that.tempFormData.weight : null
				that.formData.place = that.tempFormData.place ?
					that.tempFormData.place.cityCode : null
				that.formData.hometown = that.tempFormData.hometown ? 
					that.tempFormData.hometown.cityCode : null
				that.formData.marriage = that.tempFormData.marriage || null
				that.formData.education = that.tempFormData.education || null
				that.formData.school = that.tempFormData.school || null
				that.formData.vocation = that.tempFormData.vocation || null
				that.formData.company = that.tempFormData.company || null
				that.formData.annualIncome = that.tempFormData.annualIncome || null
				that.getValueOnPage()
			}
		}, err => {
			console.log(err)
		})
	},
	onLoad(option) {
		this.baseInfo.forEach((item) => {
			if (item.text === option.type) {
				item.value = option.value
			}
		})
		this.eduWorkInfo.forEach((item) => {
			if (item.text === option.type) {
				item.value = option.value
			}
		})
	},
	beforeDestroy() {
		this.$pub.unsubscribe('changeMyInfo')
	},
	methods: {
		getValueOnPage() {
			let keys = Object.keys(this.tempFormData)
			for (let key of keys) {
				if (key === 'nick' && this.tempFormData[key]) {
					this.updateDataFormView('昵称', this.tempFormData[key])
				} else if (key === 'birth' && this.tempFormData[key]) {
					this.updateDataFormView('出生日期', this.tempFormData[key])
				} else if (key === 'sex' && this.tempFormData[key]) {
					this.updateDataFormView('性别', this.tempFormData[key])
				} else if (key === 'height' && this.tempFormData[key]) {
					this.updateDataFormView('身高', this.tempFormData[key])
				} else if (key === 'weight' && this.tempFormData[key]) {
					this.updateDataFormView('体重', this.tempFormData[key])	
				} else if (key === 'place' && this.tempFormData[key]) {
					this.updateDataFormView('现居住地', this.tempFormData[key])
				} else if (key === 'hometown' && this.tempFormData[key]) {
					this.updateDataFormView('家乡', this.tempFormData[key])				
				} else if (key === 'marriage' && this.tempFormData[key]) {
					this.updateDataFormView('婚姻状况', this.tempFormData[key])				
				} else if (key === 'education' && this.tempFormData[key]) {
					this.updateDataFormView('最高学历', this.tempFormData[key])				
				} else if (key === 'school' && this.tempFormData[key]) {
					this.updateDataFormView('毕业院校', this.tempFormData[key])				
				} else if (key === 'vocation' && this.tempFormData[key]) {
					this.updateDataFormView('职位', this.tempFormData[key])				
				} else if (key === 'company' && this.tempFormData[key]) {
					this.updateDataFormView('公司', this.tempFormData[key])				
				} else if (key === 'annualIncome' && this.tempFormData[key]) {
					this.updateDataFormView('年收入', this.tempFormData[key])				
				}
			}
		},
		updateDataFormView(name, value) {
			if (name === '现居住地' || name === '家乡') {
				value = value.province + '-' + value.city
			} else if (name === '性别') {
				value = value === 1 ? '男' : value === 2 ? '女' : ''
			} else if (name === '身高') {
				value = value + 'CM'
			} else if (name === '体重') {
				value = value + 'KG'
			} else if (name === '婚姻状况') {
				value = value === 1 ? '未婚' : value === 2 ? '离异' : '丧偶'
			} else if (name === '最高学历') {
				let degreeArr = ['小学', '初中', '高中', '中专', '大专', '本科', '硕士', '博士'] 
				value = degreeArr[value - 1]
			}
			this.baseInfo.forEach((item) => {
				if (item.text === name) {
					item.value = value
				}
			})
			this.eduWorkInfo.forEach((item) => {
				if (item.text === name) {
					item.value = value
				}
			})
		},
		saveMyInfo() {
			let data = {
				nick: this.formData.nick,
				birth: this.formData.birth,
				height: this.formData.height,
				weight: this.formData.weight,
				place: this.formData.place,
				hometown: this.formData.hometown,
				marriage: this.formData.marriage,
				education: this.formData.education,
				school: this.formData.school,
				vocation: this.formData.vocation,
				company: this.formData.company,
				annualIncome: this.formData.annualIncome			
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
		},
		open(){
			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			this.$refs.popup.open('bottom')
		},
		getBirthDay(e){
			this.date = e
			this.formData.birth = e
			this.baseInfo.forEach((item) => {
				if (item.text === '出生日期') {
					item.value = e
				}
			})
		},
		getSelectData(e) {
			this.selectedData = e.value
			if (e.type === '身高') {
				this.formData.height = parseInt(e.value.split('CM')[0])
			} else if (e.type === '体重') {
				this.formData.weight = parseInt(e.value.split('KG')[0])
			} else if (e.type === '婚姻状况') {
				let marriageArr = ['未婚', '离异', '丧偶']
				marriageArr.forEach((item, index) => {
					if (item === e.value) {
						this.formData.marriage = index + 1
					}
				})
			} else if (e.type === '最高学历') {
				let degreeArr = ['小学', '初中', '高中', '中专', '大专', '本科', '硕士', '博士']
				degreeArr.forEach((item, index) => {
					if (item === e.value) {
						this.formData.education = index + 1
					}
				})	
			} else if (e.type === '职位') {
				this.formData.vocation = e.value
			} else if (e.type === '年收入') {
				this.formData.annualIncome = e.value
			}
 			this.baseInfo.forEach((item) => {
				if (item.text === e.type) {
					item.value = e.value
				}
			})
			this.eduWorkInfo.forEach((item) => {
				if (item.text === e.type) {
					item.value = e.value
				}
			})
		},
		upData(type, value) {
			if (type === '昵称') {
				this.formData.nick = value
			} else if (type === '毕业院校') {
				this.formData.school = value
			} else if (type === '公司') {
				this.formData.company = value
			} else if (type === '职位') {
				this.$refs.position.close()
				this.formData.vocation = value
			}
			this.baseInfo.forEach((item) => {
				if (item.text === type) {
					item.value = value
				}
			})
			this.eduWorkInfo.forEach((item) => {
				if (item.text === type) {
					item.value = value
				}
			})
		},
		updateHomeCity(e) {
			this.homeLocation = {
				name: e.name,
				cityCode: e.code
			}
			this.formData.hometown = parseInt(e.code)
			this.baseInfo.forEach((item) => {
				if (item.text === '家乡') {
					item.value = e.name
				}
			})
			this.$refs.pcaHomeCityPicker.hide();
		},
		updateLiveCity(e) {
			this.liveLocation = {
				name: e.name,
				cityCode: e.code
			}
			this.formData.place = parseInt(e.code)
			this.baseInfo.forEach((item) => {
				if (item.text === '现居住地') {
					item.value = e.name
				}
			})
			this.$refs.pcaLiveCityPicker.hide();
		}
	}
}
</script>

<style lang="scss" scoped>
.edit-container1 {
	margin-top: 50rpx;
	margin-left: 34rpx;
	.edit-container1-title {
		.edit-container1-title-pre {
			float: left;
			width: 6rpx;
			height: 44rpx;
			left: 34rpx;
			top: 220rpx;
			background: #7B91FF;
			margin-right: 8rpx;
		}
		.edit-container1-text {
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
	.edit-context-container1 {
		margin-top: 52rpx;
	}
}
.edit-container2 {
	margin-left: 34rpx;
	.edit-container2-title {
		.edit-container2-title-pre {
			float: left;
			width: 6rpx;
			height: 44rpx;
			left: 34rpx;
			top: 220rpx;
			background: #7B91FF;
			margin-right: 8rpx;
		}
		.edit-container2-text {
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
	.edit-context-container2 {
		margin-top: 48rpx;
		padding-bottom: 128rpx;
	}
}
.editInfoFooter {
	position: fixed;
	top: 86%;
	width: 100%;
	height: 14%;
	background-color: rgba(255,255,255,0.4);
}
.saveBtn {
	position: fixed;
	left: 22.93%;
	right: 23.73%;
	top: 90%;
	height: 80rpx;
	padding-top: 18rpx;
	
	background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
	border-radius: 1000px;
	
	text-align: center;
	font-family: 'PingFang SC';
	font-style: normal;
	font-weight: 400;
	font-size: 32rpx;
	line-height: 44rpx;
	
	color: #FFFFFF;
}
</style>