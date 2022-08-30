<template>
	<view class="rmd-container">
		<u-navbar
			:is-back="false"
			:border-bottom="false"
			title-color="black"
			bgColor="#E5E5E5"
			title="首页推荐"
		></u-navbar>
		<view class="rmd-sub-container2" @touchstart="touchStart" @touchend="touchEnd">
			<image :src="avator" class="img-container"></image>
			<view class="info-container1">
				<view class="degree-tip"  v-if="school || education">
					<text v-if="school && !education">{{ school }}</text>
					<text v-if="education && !school">{{ education }}</text>
					<text v-if="school && education">{{ school }} | {{ education }}</text>
				</view>
				<view class="my-info-tip2">
					<view style="margin-right: 18rpx; float: left;">{{ nick }}</view>
					<image src="@/static/gender/male.png" alt="" v-if="sex === 1"
						style="width: 38rpx;height: 38rpx;float: left;margin-top: 4rpx;" />
					<image src="@/static/gender/female.png" alt="" v-if="sex === 2"
						style="width: 42rpx;height: 42rpx;float: left;margin-top: 4rpx;" />
				</view>
				<view class="my-info-tip3">
					<text>
						<text v-if="age !== null && age !== undefined">{{ age }}岁</text>
						<text v-if="height">.{{ height }}CM</text>
						<text v-if="zodiac">.{{ zodiac }}</text>
					</text>
					<view style="position: relative" v-if="place || hometown">
						<image src="@/static/myPage/location.png" alt=""
							style="width: 30rpx;height: 30rpx;position: absolute;left: -32rpx;top: 4rpx;" />
						<text v-if="place && !hometown">{{ place }}</text>
						<text v-if="!place && hometown">{{ hometown }}</text>
						<text v-if="place && hometown">{{ place }}·{{ hometown }}</text>
					</view>
				</view>
				<view class="line"></view>
				<view class="behind-container">
					<view class="small-container" v-if="vocation">
						<text>职业：</text> 
						<text class="value-container">{{ vocation }}</text>
					</view>
					<view class="small-container" v-if="marriage">
						<text>婚姻状况： </text>
						<text class="value-container">{{ marriage }}</text>
					</view>
					<view class="small-container" v-if="annualIncome">
						<text>年薪： </text>
						<text class="value-container">{{ annualIncome }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'recommendBrief',
	data() {
		return {
			id: '',
			nick: '',
			school: '',
			education: '',
			height: '',
			vocation: '',
			marriage: '',
			age: null,
			zodiac: '',
			annualIncome: '',
			place: '',
			hometown: '',
			avator: '',
			sex: 0,
			listData: [],
			degreeData: [
				'小学',
				'初中',
				'高中',
				'中专',
				'大专',
				'本科',
				'硕士',
				'博士'
			],
			marriageData: ['未婚', '离异', '丧偶'],
			startX: 0,
			current: 1,
			size: 10,
			dataIndex: 0
		}
	},
	mounted() {
		let data = {
			current: 1,
			size: 10
		}
		let options = {
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'miniapp-token': uni.getStorageSync('miniapp-token')
			}
		}
		this.$req.get('/miniapp/recommend/page', data, options).then(res => {
			let [err, result] = res
			this.listData = result.data.data.records
			if (this.listData.length >= 1) {
				let currentData = this.listData[this.dataIndex]
				this.updateRecommendInfo(currentData)
			}
		}, err => {
			console.log(err)
		})
	},
	methods: {
		updateRecommendInfo(currentData) {
			this.id = currentData.id
			this.school = currentData.school
			this.education = this.degreeData[currentData.education]
			this.nick = currentData.nick
			this.height = currentData.height
			this.marriage = this.marriageData[currentData.marriage]
			this.annualIncome = currentData.annualIncome
			this.vocation = currentData.vocation
			this.age = currentData.age
			this.zodiac = currentData.zodiac
			this.sex = currentData.sex
			this.avator = currentData.avator
			let val = currentData
			if (val.place) {
				if (val.place.province.includes("市")) {
					this.place = val.place.province.split("市")[0];
				} else if (val.place.city.includes("市")) {
					this.place = val.place.city.split("市")[0];
				} else {
					this.place = val.place.city;
				}
				this.place = "现居" + this.place;
			}
			if (val.hometown) {
				if (val.hometown.province.includes("省")) {
					this.hometown =
						val.hometown.province.split("省")[0] +
						val.hometown.city.split("市")[0];
				} else if (val.hometown.province.includes("自治区")) {
					if (val.hometown.city.includes("市")) {
						this.hometown =
							val.hometown.province.split("自治区")[0] +
							val.hometown.city.split("市")[0];
					} else {
						this.hometown = val.hometown.province.split("自治区")[0];
					}
				} else if (val.hometown.province.includes("市")) {
					this.hometown = val.hometown.province.split("市")[0];
				}
				this.hometown = this.hometown + "人";
			}
		},
		/**
			* 触摸开始
			* @param {Object} e
			*/
		 touchStart: function (e) {
			if (e.touches.length == 1) {
				//设置触摸起始点水平方向位置
				this.startX=e.touches[0].clientX;
			}
		},
		/**
		 * 触摸结束
		 * @param {Object} e
		 */
		touchEnd: function (e) {
			if (e.changedTouches.length == 1) {
				//手指移动结束后水平位置
				let endX = e.changedTouches[0].clientX;
				let diff = endX - this.startX;
				if(Math.abs(diff) > 20){
					if(diff > 0){
						if (this.dataIndex > 0) {
							this.dataIndex -= 1
							let currentData = this.listData[this.dataIndex]
							this.updateRecommendInfo(currentData)
						}
					}else{
						if (this.dataIndex < this.listData.length - 1 &&
								this.dataIndex < this.size - 1) {
								this.dataIndex += 1
								let currentData = this.listData[this.dataIndex]
								this.updateRecommendInfo(currentData)
						}
					}
				} else {
					uni.navigateTo({
						url: '/pages/recommendDetail/recommendDetail?id=' + this.id +
							'&avator=' + this.avator
					})
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.rmd-container {
	.rmd-sub-container2 {
		margin-left: 30rpx;
		margin-top: 40rpx;
		width: 690rpx;
		.img-container {
			width: 100%;
			height: 920rpx;
			border-radius: 20rpx;
		}
		.info-container1 {
			width: 100%;
			padding-top: 26rpx;
			.degree-tip {
				width: 238rpx;
				height: 40rpx;
				background: #8196FF;
				border-radius: 10rpx;
				
				font-family: 'PingFang SC';
				font-style: normal;
				font-weight: 400;
				font-size: 26rpx;
				line-height: 40rpx;
				/* identical to box height, or 167% */
				text-align: center;
				
				color: #FFF5F5;
			}
			.my-info-tip2 {
				margin-top: 24rpx;
				margin-left: 18rpx;
				
				font-family: 'PingFang SC';
				font-style: normal;
				font-weight: 500;
				font-size: 36rpx;
				line-height: 44rpx;
				/* identical to box height, or 129% */
				
				color: #1D1D1F;
			}
			.my-info-tip3 {
				width: 90%;
				padding-top: 16rpx;
				margin-left: 18rpx;
				margin-right: 28rpx;
				display: flex;
				justify-content: space-between;
				
				font-family: 'PingFang SC';
				font-style: normal;
				font-weight: 400;
				font-size: 26rpx;
				line-height: 40rpx;
				
				color: #000000;
			}
			.line {
				margin-left: 18rpx;
				margin-top: 16rpx;
				width: 638rpx;
				height: 0rpx;
				border: 2rpx solid #D8D1D1;
			}
			.behind-container {
				display: flex;
				flex-wrap: wrap;
				width: 600rpx;
				.small-container {
					width: 216rpx;
					height: 48rpx;
					margin-top: 22rpx;
					margin-right: 52rpx;
					
					background: rgba(235, 235, 235, 0.46);
					border-radius: 8rpx;
				
					font-family: 'PingFang SC';
					font-style: normal;
					font-weight: 400;
					font-size: 26rpx;
					line-height: 40rpx;
					/* identical to box height, or 167% */
					
					text-align: center;
					
					color: #999999;
				}
				.value-container {
				  color: #000000; 
				}
			}
		}
	}
}
</style>