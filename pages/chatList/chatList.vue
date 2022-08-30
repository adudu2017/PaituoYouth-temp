<template>
	<view class="content">
		<u-navbar
			:is-back="false"
			:border-bottom="false"
			title-color="black"
			bgColor="#E5E5E5"
			title="聊天"
		></u-navbar>
		<view class="chat-add">
			<view class="chat-add-name">消息</view>
			<view class="chat-add-btn">
				<image src="@/static/chat/Add.png"></image>
			</view>
		</view>
		<view style="margin-bottom: 44rpx;">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in headerList" btn-width="160" :key="item.id" @click="headerClick" @open="headerOpen" :options="headerOptions">
				<view class="item" :class="item.isTop ? 'bg_view' : ''" hover-class="message-hover-class">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="right u-border-bottom title-wrap">
						<view class="right_top">
							<view class="right_top_name u-line-1">{{ item.name }}</view>
							<view class="right_top_time ">{{ item.updateTime }}</view>
						</view>
						<view class="right_btm ">
							<view class="u-line-1">{{ item.sign }}</view>
							<view class=""></view>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<searchInput v-if="false" />
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" btn-width="160" :key="item.id" @click="click" @open="open" :options="options">
			<view class="item" :class="item.isTop ? 'bg_view' : ''" hover-class="message-hover-class" @tap="linkTo(item)">
				<image mode="aspectFill" :src="item.images" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="right u-border-bottom title-wrap">
					<view class="right_top">
						<view class="right_top_name u-line-1">{{ item.name }}</view>
						<view class="right_top_time ">{{ item.updateTime }}</view>
					</view>
					<view class="right_btm ">
						<view class="u-line-1">{{ item.sign }}</view>
						<view class=""></view>
					</view>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
import searchInput from '@/components/searchInput/index.vue';
import selectInput from '@/components/selectInput/selectInput.vue';
export default {
	components: { searchInput, selectInput },
	data() {
		return {
			headerList: [
				{
					id: 1,
					userId:3,
					name: 'Williamson Darlene',
					images: require('@/static/tmp/t1.png'),
					updateTime: '01:30',
					show: false,
					isTop: true,
					sign: '你附近的用户昵称发布了新动态'
				},
				{
					id: 2,
					userId: 4,
					name: 'Richards Aubrey',
					images: require('@/static/tmp/t2.png'),
					updateTime: '01:30',
					show: false,
					sign: '用户昵称查看了您的资料，点击查看'
				},
				{
					id: 3,
					userId: 2,
					name: 'Murphy Ann',
					images: require('@/static/tmp/t3.png'),
					updateTime: '01:30',
					show: false,
					sign: '李四赞了你发布的动态'
				}
			],
			list: [],
			selectShow: false,
			headerOptions: [
				{
					text: '删除',
					style: {
						backgroundColor: '#FA6650',
						fontSize: '28rpx',
						fontStyle: 'normal',
						fontFamily: 'PingFang SC',
						lineHeight: '36rpx'
					}
				}
			],
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#FA6650',
						fontSize: '28rpx',
						fontStyle: 'normal',
						fontFamily: 'PingFang SC',
						lineHeight: '36rpx'
					}
				}
			]
		};
	},
	mounted() {
		this.$openIM.getAllConversationList().then(({ data })=>{
			data = JSON.parse(data)
			let item = JSON.parse(data[0].latestMsg)
			this.list = []
			if (data && data.length !== 0) {
				data.forEach((item) => {
					let lastMsgObj = JSON.parse(item.latestMsg)
					let listItem = {
						id: item.conversationID,
						userId: item.userID,
						name: 'Hennry Arthur',
						images: require('@/static/tmp/t5.png'),
						updateTime: this.dateFormat(lastMsgObj.sendTime),
						show: false,
						sign: lastMsgObj.content
					}
					this.list.push(listItem)
				})
			}
		}).catch(err => {
			console.log(err)
		})
	},
	methods: {
		dateFormat(time) {
			if (typeof(time) === 'string') {
				return time
			}
			let todayTime = new Date(new Date().toDateString()).getTime()
			let todayYear = new Date(new Date().toDateString()).getYear() + 1900
			let yesterdayTime = new Date(new Date().toDateString()).getTime() - 86400000
			let newDate = new Date(time)
			if (time > todayTime) {
				let hour = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
				let min = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
				return hour + ':' + min
			} else if (time > yesterdayTime) {
				let hour = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
				let min = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
				return '昨天 ' + hour + ':' + min
			} else if (todayYear === newDate.getYear() + 1900) {
				let mon = (newDate.getMonth() + 1) > 9  ? (newDate.getMonth() + 1) : '0'
					+ (newDate.getMonth() + 1) 
				let day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()
				let hour = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
				let min = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
				return mon + '-' + day + ' ' + hour + ':' + min
			} else {
				let year = newDate.getYear() + 1900
				let mon = (newDate.getMonth() + 1) > 9  ? (newDate.getMonth() + 1) : '0' 
					+ (newDate.getMonth() + 1) 
				let day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()
				let hour = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
				let min = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
				return year + '-' + mon + '-' + day + ' ' + hour + ':' + min
			}
		},
		//action 点击事件
		headerClick(index, index1) {
			if (index1 == 0) {
				this.headerList.splice(index, 1);
			} 
		},
		//action 打开事件
		headerOpen(index) {
			if (this.headerList) {
				this.headerList[index].show = true;
				this.headerList.map((val, idx) => {
					if (index != idx) this.headerList[idx].show = false;
				});
			}
		},
		//action 点击事件
		click(index, index1) {
			if (index1 == 0) {
				this.list.splice(index, 1);
			} 
		},
		//action 打开事件
		open(index) {
			if (this.list && this.list.length !== 0) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				});
			}
		},
		//跳转
		linkTo({ id, name, images ,userId }) {
			this.$u.route({
				url: 'pages/chatDetail/chatDetail?id=' + userId
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.chat-add {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		gap: 114rpx;

		width: 100%;
		height: 88rpx;

		background: #FFFFFF;
		.chat-add-name {
			font-family: 'PingFang SC';
			font-style: normal;
			font-weight: 700;
			font-size: 44rpx;
			line-height: 36rpx;

			color: #000000;
		}
		.chat-add-btn {
			padding-top: 26rpx;
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.item {
		width: 750rpx;
		display: flex;
		align-items: center;
		// padding: 20rpx;
		image {
			width: 100rpx;
			height: 100rpx;
			margin: 20rpx;
			margin-left: 40rpx;
			border-radius: 50rpx;
		}
		.right {
			overflow: hidden;
			flex: 1 0;
			padding: 20rpx 20rpx 20rpx 0;
			&_top {
				display: flex;
				justify-content: space-between;
				&_name {
					font-family: 'PingFang SC';
					font-style: normal;
					font-weight: 600;
					font-size: 30rpx;
					line-height: 36rpx;
					/* or 120% */
					display: flex;
					align-items: center;
					
					color: $u-main-color;
					flex: 0 0 450rpx;
					overflow: hidden;
				}
				&_time {
					text-align: center;
					padding-right: 10rpx;
					font-size: 22rpx;
					color: $u-light-color;
				}
			}
			&_btm {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $u-tips-color;
				padding-top: 10rpx;
				
				font-family: 'PingFang SC';
				font-style: normal;
				font-weight: 400;
				font-size: 24rpx;
				line-height: 36rpx;
			}
		}
	}
	.bg_view {
		background-color: #fafafa;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx; 
	}
}
</style>