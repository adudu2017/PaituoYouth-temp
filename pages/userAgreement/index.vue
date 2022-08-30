<template>
	<view>
		<view class='userAgreement'>
			
				
					用户协议
			
		
		</view>
	
	</view>
</template>

<script>
export default {
	name: 'userAgreement',
	data() {
		return {
			buttonName: '开启我的拍拖之旅',
	
		}
	},

	methods: {
		toTabBar() {
			uni.navigateTo({
				url: '../aboutMe/aboutMe'
			})
		},
		closeCallback:function() {}
	},
	mounted() {

	
	}
}
</script>

<style scoped lang="scss">
.first-page-container {
	width: 100%
}
.content{
	margin-top: 260rpx;
	.con_top{
		text-align: center;
		font-size:16px;
		font-weight:400;
		font-family: 'Poppins';
       font-style: normal;
	}
	.con_bot{
		text-align: center;
		font-family: 'PingFang SC';
font-style: normal;
font-weight: 200;
font-size: 36px;
line-height: 50px;
letter-spacing: 0.2em;

color: #000000;
	}
}

.wx_longin{
	position: absolute;
left: 6.13%;
right: 5.07%;
top: 81.03%;
bottom: 12.56%;
font-size: 20px;
font-weight: 400;
color: #ffffff;
height: 78rpx;
line-height: 78rpx;
/* 紫色渐变 */

background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
border-radius: 7px
}
.bot_box{
	font-size: 12px;
	color: #999999;
	text-align: center;
	position: absolute;
left: 6.13%;
right: 5.07%;

bottom: 8.56%;
height: 18rpx;
line-height: 18rpx;
}
.bot_box>span{
	color: #6E86FF;
}
.pop-container {
	width: 100%;
	height: 100%;
	margin-left: 42rpx;
	.app-name {
		margin-top: 42rpx;
		font-size: 28rpx;
	}
	.item-name1 {
		margin-top: 52rpx;
		font-size: 32rpx;
	}
	.item-name2 {
		margin-top: 24rpx;
		padding-bottom: 18rpx;
		font-size: 26rpx;
		border-bottom: 4rpx solid #F0EEEE;
	}
	.user-info-container {
		height: 98rpx;
		border-bottom: 4rpx solid #F0EEEE;
		.user-info-item1 {
			float: left;
			width: 80rpx;
			height: 80rpx;
			margin-top: 9rpx;
		}
		.user-info-item2 {
			float: left;
			margin-top: 9rpx;
			margin-left: 16rpx;
		}
	}
	.user-info-footer {
		width: 100%;
		height: 200rpx;
		.refuse-btn {
			float: left;
			margin-top: 40rpx;
			margin-left: 90rpx;
			margin-right: 100rpx;
			width: 200rpx;
			height: 80rpx;
			background-color: #F2F2F2;
			color: #50AD62;
			text-align: center;
			border-radius: 8rpx;
			line-height: 80rpx;
			font-size: 32rpx;
		}
		.allow-btn {
			float: left;
			margin-top: 40rpx;
			width: 200rpx;
			height: 80rpx;
			background-color: #57BE6A;
			color: #F3FBF6;
			text-align: center;
			border-radius: 8rpx;
			line-height: 80rpx;
			font-size: 32rpx;
		}
	}
}
</style>