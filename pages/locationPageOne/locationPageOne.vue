<template>
	<view class="container">
		<view class="text1">选择你的居住城市</view>
		<view class="text2">为你优先推荐周边的异性</view>
		<view class="sub-container1">
			<uni-icons
				custom-prefix="iconfont" 
				type="icon-round_location_fill" 
				color="#8599FF"
				size="81">
			</uni-icons>
		</view>
		<view class="text-container" @click="selectCity">
			<text>{{ locationName ? locationName : '点击选择居住城市' }}</text>
			<pcaPicker ref="pcaCityPicker" @confirm="updateCity"></pcaPicker>
		</view>
		<view class="sub-container2" @click="getLocationQuick">
			<uni-icons
				custom-prefix="iconfont" 
				type="icon-location" 
				color="#8599FF"
				size="20">
			</uni-icons>
			<text style="margin-left:10rpx">快速获取定位</text>
		</view>
		<view :class="btnColorShow? 'sub-container3' : 'sub_container3_ban'"  @click="gotoNext">
			开启我的交友之旅
		</view>
	</view>
</template>

<script>
import pcaPicker from '@/components/pcaPicker/pcaPicker.vue'
export default {
	name: 'locationPageOne',
	components: {
		pcaPicker
	},
	data() {
		return {
			locationName: '',
			cityCode: 0,
			openCityFlag: false,
			btnColorShow:false,
			startT: 0
		}
	},
	methods: {
		getLocationQuick() {
			let endT = new Date()
			if (endT - this.startT > 10 * 1000) {
				this.startT = endT
				this.getLocationQuickFunc()
			}
		},
		getLocationQuickFunc() {
			let _this = this;
			uni.getSetting({
				success (res) {
					if (!res.authSetting['scope.userLocation']) {
						uni.authorize({
							scope: 'scope.userLocation',
							success() { //1.1 允许授权
								uni.getLocation({
									type: 'wgs84',
									success(res) {
										uni.openSetting(); // 打开地图权限设置
										_this.getLocationFromLocationvx(res);
									}
								});
							},
							fail(){    //1.2 拒绝授权
								console.log("你拒绝了授权，无法获得周边信息")
								uni.showModal({
								  title: '提示',
								  content: '若点击不授权，将无法使用位置功能',
								  cancelText: '不授权',
								  cancelColor: '#999',
								  confirmText: '授权',
								  confirmColor: '#f94218',
								  success (res) {
									console.log(res)
									if (res.confirm) {
									  // 选择弹框内授权
									  uni.openSetting({
										success (res) {
										  console.log(res.authSetting)
										}
									  })
									} else if (res.cancel) {
									  // 选择弹框内 不授权
									  console.log('用户点击不授权')
									}
								  }
								})
							}
						})
					} else {
					// 有权限则直接获取
					uni.getLocation({
					  type: 'wgs84',
					  success: function (res) {
						uni.openSetting(); // 打开地图权限设置
						_this.getLocationFromLocationvx(res);
					  }, fail (error) {
						uni.showToast({
						  title: '请勿频繁调用！',
						  icon: 'none',
						})
						console.log('失败', error)
					  }
					})
				}
				}
			})
		},
		getLocationFromLocationvx(location) {
			let data = {
				lat: location.latitude,
				lng: location.longitude
			};
			let options = {
				header: {
					'content-type':'application/x-www-form-urlencoded',
					'miniapp-token': uni.getStorageSync('miniapp-token')
				}
			};
			this.$req.get('/latitude2Area', data, options).then(res => {
				let [err, result] = res;
				if (result && result.data && result.data.data) {
					let data = result.data.data
					this.cityCode = data.cityCode;
					this.btnColorShow = true;
					this.locationName = data.province + '-' + data.city
				}
			}, err => {
				console.log(err);
			})
			console.log(location)
		},
		gotoNext() {
			if (!this.locationName || !this.cityCode) {
				return;
			}
			if(this.btnColorShow == false){
				return;
			}
			let data = {
				place: this.cityCode,
			}
			let options = {
				header: {
					'content-type': 'application/json',
					'miniapp-token': uni.getStorageSync('miniapp-token')
				}
			}
			this.$req.post('/miniapp/user/update', data, options).then(res => {
				let [err, result] = res
				console.log(result.data.data)
				if (result.data.code === 20000) {
					uni.switchTab({
						url: '../recommendBrief/recommendBrief'
					})
				}
			}, err => {
				console.log(err)
			})
		},
		selectCity(e) {
			if (!this.openCityFlag) {
				this.$refs.pcaCityPicker.show();
			}
			this.openCityFlag = !this.openCityFlag;
		},
		updateCity(e) {
			this.locationName = e.name;
			this.cityCode = e.code;
			this.btnColorShow = true;
			this.$refs.pcaCityPicker.hide();
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	text-align: center;
	background: url('@/static/assets/img/backGround/background.png');
	background-size: 100% 100%;
	background-repeat:no-repeat;
	padding-top: 244rpx;
	.text1 {
		font-size: 48rpx;
	}
	.text2 {
		margin-top: 40rpx;
		font-size: 32rpx;
	}
	.sub-container1 {
		margin-top: 86rpx;
	}
	.text-container {
		display:inline-block;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin-top: 56rpx;
		padding-bottom: 22rpx;
		border-bottom: 2rpx solid #AAA6A6;
	}
	.sub-container2 {
		width: 300rpx;
		height: 96rpx;
		text-align: center;
		font-size: 32rpx;
		margin-top: 86rpx;
		margin-left: 226rpx;
		padding-top: 20rpx;
		border-radius: 48rpx;
		border: 2rpx solid #AAA6A6;
	}
	.sub-container3 {
		position: absolute;
		left: 6.13%;
		right: 5.07%;
		top: 81.03%;
		bottom: 12.56%;
		font-size: 20px;
		font-weight: 400;
		color: #ffffff;
		height: 104rpx;
		line-height: 104rpx;
		/* 紫色渐变 */
		background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
		border-radius: 1000px;
	
	}
	.sub_container3_ban {
		position: absolute;
		left: 6.13%;
		right: 5.07%;
		top: 81.03%;
		bottom: 12.56%;
		font-size: 20px;
		font-weight: 400;
		color: #FFFFFF;
		height: 104rpx;
		line-height: 104rpx;
		/* 紫色渐变 */
		background: #C2BFBF;
		border-radius: 1000px;
	
	}
}
</style>