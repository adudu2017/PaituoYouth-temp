<template>
	<view name='KXDateTime'>
		<uni-popup ref="popup" type="bottom">
			<view class="but">
				<text>出生日期</text>
			</view>
			<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
			<view class="footContainer">
				<view class="confirmBtn" @click="ok">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'KXDateTime',
		props: {
			date: '',
			start: '',
			end: '',
			value: {
				type: Array,
				default: []
			}
		},
		data() {
			let years = []
			for (let i = 1923; i <= 2022; i++) {
				years.push(i)
			}
			let months = []
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			let days = []
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year: '',
				months,
				month: '',
				days,
				day: '',
				valueStr: '',
				visible: true,
				strYMDHM: '',
				indicatorStyle: `height: 80rpx;`
			}
		},
		mounted() {},
		methods: {
			open() {
				let start;
				if (this.start) {
					start = this.start.replace(/-/g, "/")
					start = new Date(start);
				} else {
					start = new Date(0);
				}
				let starty = start.getFullYear(); //开始年份
				let end;
				if (this.end) {
					end = this.end.replace(/-/g, "/")
					end = new Date(end);
				} else {
					end = new Date();
				}
				if (start > end) {
					uni.showToast({
						title: '时间范围错误！',
						icon: 'none',
						duration: 2000
					});
					return false
				}

				this.$forceUpdate();
				if (this.valueStr) {
					this.value = JSON.parse(this.valueStr);
					setTimeout(this.amend, 100)
					this.$refs.popup.open()
				} else {
					setTimeout(this.amend, 100)
					this.$refs.popup.open()
				}
			},
			close() {
				this.$refs.popup.close()
			},
			ok() {
				let day = this.day < 10 ? '0' + this.day : this.day,
					month = this.month < 10 ? '0' + this.month : this.month
				let data = this.year + '-' + month + '-' + day
				this.$emit("rundata", data)
				this.$refs.popup.close()
			},
			bindChange: function(e) {
				let val = e.detail.value
				this.valueStr = JSON.stringify(val);
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
			},
			//数据校正
			amend() {
				if (this.valueStr) {
					let val = JSON.parse(this.valueStr);
					this.year = this.years[val[0]]
					this.month = this.months[val[1]]
					this.day = this.days[val[2]]
				}
				let start;
				if (this.start) {
					start = this.start.replace(/-/g, "/")
					start = new Date(start);
				} else {
					start = new Date(0);
				}
				let starty = start.getFullYear(); //开始年份
				let startm = start.getMonth() + 1; //开始月份
				let startd = start.getDate(); //开始天
				let end;
				if (this.end) {
					end = this.end.replace(/-/g, "/")
					end = new Date(end);
				} else {
					end = new Date();
				}
				let endy = end.getFullYear(); //终止年份
				let endm = end.getMonth() + 1; //终止月份
				let endd = end.getDate(); //终止天
				//如果选择起始年份
				let years = [],
					months = [],
					days = [];
				let month31 = [1, 3, 5, 7, 8, 10, 12],
					month30 = [4, 6, 9, 11];
				let daysNum;
				for (let i = starty; i <= endy; i++) {
					years.push(i)
				}
				if (month31.indexOf(this.month) > -1) {
					daysNum = 31
				} else if (month30.indexOf(this.month) > -1) {
					daysNum = 30
				} else {
					if (this.year % 4 == 0) {
						daysNum = 29
					} else {
						daysNum = 28
					}
				}
				let	defaulty = starty + this.value[0],
					defaultm = startm + this.value[1],
					defaultd = startd + this.value[2];
				//当数值异常是设施默认
				if (!this.year) {
					this.year = defaulty
				}
				if (!this.month) {
					this.month = defaultm
				}
				if (!this.day) {
					this.day = defaultd
				}
				//判断年份是在起始年
				if (this.year == starty) {
					//判断起始年份和终止年份是否相等
					if (starty == endy) {
						//如果等，那么月份取两者中间
						for (let i = startm; i <= endm; i++) {
							months.push(i)
						}
						//判断月份是在起始月
						if (this.month == startm) {
							//判断起始月和终止月是否相等
							if (startm == endm) {
								//如果等，那么天数取两者中间
								for (let i = startd; i <= endd; i++) {
									days.push(i)
								}
							} else {
								//如果不等，
								for (let i = startd; i <= daysNum; i++) {
									days.push(i)
								}
							}
						} else {
							//判断月份是在终止月
							if (this.month == endm) {
								//终止月取到截止天
								for (let i = 1; i <= endd; i++) {
									days.push(i)
								}
							}
						}
					} else {
						//如果不等，去开始到12月份
						for (let i = startm; i <= 12; i++) {
							months.push(i)
						}
						//判断月份是在起始月
						if (this.month == startm) {
							//是，取天数之后
							for (let i = startd; i <= daysNum; i++) {
								days.push(i)
							}
						}
					}
				} else if (this.year == endy) {
					//年份中终止年
					//月份取到终止月
					for (let i = 1; i <= endm; i++) {
						months.push(i)
					}
					//判断月份是在终止月
					if (this.month == endm) {
						//终止月取到截止天
						for (let i = 1; i <= endd; i++) {
							days.push(i)
						}
					}
				} else {
					for (let i = 1; i <= 12; i++) {
						months.push(i)
					}
					for (let i = 1; i <= daysNum; i++) {
						days.push(i)
					}
				}
				if (months.length == 0) {
					for (let i = 1; i <= 12; i++) {
						months.push(i)
					}
				}
				if (days.length == 0) {
					for (let i = 1; i <= daysNum; i++) {
						days.push(i)
					}
				}
				this.years = years;
				this.months = months;
				this.days = days;
				this.$forceUpdate();
			}
		},
		watch: {
			year() {
				this.amend();
			},
			month() {
				this.amend();
			},
			day() {
				this.amend();
			},
			years(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			},
			months(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			},
			days(n, m) {
				if (n.toString() != m.toString()) {
					this.amend();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	text {
		display: inline-block;
		color: $uni-text-color-grey;
	}

	.but {
		background: #fff;
		height: 112rpx;
		line-height: 112rpx;
		padding: 0 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
		text-align: center;

		text {
			display: inline-block;
			
			font-family: 'PingFang SC';
			font-style: normal;
			font-weight: 600;
			font-size: 36rpx;
			line-height: 56rpx;
			
			color: #000000;
		}

	}

	picker-view {
		position: relative;
		width: 100%;
		background: #fff;
		height: 320rpx;
		text-align: center;
		picker-view-column {
			font-size: 32rpx;
			font-family: 'PingFang SC';
			font-style: normal;
			font-weight: 400;
			line-height: 48rpx;
			/* identical to box height, or 150% */
			
			text-align: center;
			
			/* dark/90 */
			
			color: rgba(0, 0, 0, 0.9);
		}
	}
	.footContainer {
		width: 100%;
		height: 300rpx;
		padding-top: 80rpx;
		background-color: #FFFFFF;
	}
	.confirmBtn {
		margin-left: 130rpx;
		padding-top:  20rpx;
		width:   494rpx;
		height:  90rpx;

		
		/* 紫色渐变 */
		
		background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
		border-radius: 45rpx;
		
		text-align: center;

		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 32rpx;
		line-height: 44rpx;

		color: #FFFFFF;
	}
</style>
