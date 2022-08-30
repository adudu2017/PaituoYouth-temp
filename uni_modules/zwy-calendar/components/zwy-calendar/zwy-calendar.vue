<template>
	<view class="container">
		<!-- 选择年月 -->
		<picker v-if="checkDate" class="picker" mode="date" fields="month" @change="changeDate" />
		<!-- 当前年月 -->
		<view class="month">
			<text @click="lastMonth">上月</text>
			<text>{{year}}年{{month}}月</text>
			<text @click="nextMonth">下月</text>
		</view>
		<!-- 星期 -->
		<view class="week">
			<view :style="weekStyle(item)" v-for="item in weeks">{{item}}</view>
		</view>
		<!-- 日期 -->
		<view class="day">
			<view :class="dayClass(item)" :style="dayStyle(item)" v-for="item in days">{{item.day}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'zwyCalendar',
		props: {
			// 默认选中主题色
			themeColor: {
				type: String,
				default: '#006afe'
			},
			// 默认可选择年月
			checkDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				year: new Date().getFullYear(), //当前年
				month: new Date().getMonth() + 1, //当前月
				day: new Date().getDate(), //当前日
				today: new Date().toLocaleDateString(), //今天日期
				days: [], //本月日期集合
				weeks: ['日', '一', '二', '三', '四', '五', '六'], //星期
			}
		},
		mounted() {
			this.initDate()
		},
		computed: {
			// 设置星期样式
			weekStyle() {
				// 今天周几
				let weeked = this.weeks[new Date().getDay()]
				return item => {
					return `color:${item===weeked?this.themeColor:''};`
				}
			},
			// 指定日期样式
			dayClass() {
				return item => {
					return `${item.date===''?'checkday':item.date===this.today?'choose':''}`
				}
			},
			// 今天背景样式
			dayStyle() {
				return item => {
					return `background:${item.date===this.today?this.themeColor:''};`
				}
			}
		},
		methods: {
			// 选择年月
			changeDate(e) {
				this.year = parseInt(e.detail.value.split('-')[0])
				this.month = parseInt(e.detail.value.split('-')[1])
				this.initDate()
			},
			// 初始化日期
			initDate() {
				// 重置日期
				this.days = []
				// 本月总天数
				let total = new Date(this.year, this.month, 0).getDate()
				// 遍历总天数将日期逐个添加至数组
				for (let i = 1; i <= total; i++) {
					// 得到每日对应星期
					let value = (new Date(this.year, this.month - 1, i)).getDay()
					// 补充前面空白日期
					if (i === 1 && value !== 0) this.addBefore(value)
					// 添加本月日期
					this.days.push({
						date: this.year + '/' + this.month + '/' + i,
						day: i
					})
					// 补充后面空白日期
					if (i == total && value != 6) this.addAfter(value)
				}
			},
			// 补充前面空白日期
			addBefore(value) {
				let total = new Date(this.year, this.month - 1, 0).getDate()
				for (let i = 0; i < value; i++) {
					this.days.push({
						date: '',
						day: total - (value - i) + 1
					})
				}
			},
			// 补充后空白日期
			addAfter(value) {
				for (let i = 0; i < (6 - value); i++) {
					this.days.push({
						date: '',
						day: i + 1
					})
				}
			},
			// 上一个月
			lastMonth() {
				if (this.month == 1) {
					this.year -= 1
					this.month = 12
				} else {
					this.month -= 1
				}
				this.initDate()
			},
			// 下一个月
			nextMonth() {
				if (this.month == 12) {
					this.year += 1
					this.month = 1
				} else {
					this.month += 1
				}
				this.initDate()
			}
		}
	}
</script>

<style scoped>
	.container {
		flex-direction: column;
	}

	.picker {
		z-index: 2;
		width: 160rpx;
		height: 40rpx;
		position: absolute;
		left: 50%;
		top: 2%;
		transform: translateX(-50%);
	}

	.container,
	.container>view {
		display: flex;
	}

	.container>view {
		width: 700rpx;
		flex-direction: row;
		justify-content: space-between;
	}

	.month {
		margin: 30rpx 0;
		position: relative;
	}

	.week>view,
	.day>view {
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		position: relative;
		line-height: 100rpx;
	}

	.day {
		flex-wrap: wrap;
	}

	.checkday {
		color: #999;
	}

	.choose {
		color: #FFFFFF;
		border-radius: 50%;
	}
</style>
