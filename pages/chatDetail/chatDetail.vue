<template>
	<view>
		<u-navbar
			is-back="true"
			:border-bottom="false"
			title-color="black"
			bgColor="#E5E5E5"
			:title="nick"
		></u-navbar>
		<view class="tips color_fff size_12 align_c" :class="{ 'show':ajax.loading }" @tap="getHistoryMsg">{{ajax.loadText}}</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${item.id}`">
					<view class="time-tip" v-if="item.msgTimeShow">{{ item.msgTime ? dateFormat(item.msgTime) : '' }}</view>
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<image :src="item.type == 1 ? avator : item.pic" mode="aspectFill" class="pic"></image>
						<view class="content">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="说点什么吧..." placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				talkList:[],
				ajax:{
					rows: 20,	//每页数量
					page: 1,	//页码
					flag: true,	// 请求开关
					loading: true,	// 加载中
					loadText: '正在获取消息'
				},
				content:'',
				avator: '',
				otherAvator: '',
				id: '',
				nick: '',
				startId: '',
				msgShowList: [],
				lastSendTime: 0
			}
		},
		mounted() {
			this.avator = uni.getStorageSync("headPhoto")
			this.$openIM.on('OnRecvNewMessage',(data) => {
				if (data && data.data) {
					let newData = JSON.parse(data.data)
					let msgTimeShow = false
					if (!this.lastSendTime || newData.sendTime - this.lastSendTime > 3 * 60 * 1000) {
						msgTimeShow = true
					}
					let newChatdata = [{
						"id": newData.clientMsgID,	// 消息的ID
						"content": newData.content,	// 消息内容
						"type": 0,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
						"pic": this.otherAvator,	// 头像
						"msgTime": newData.sendTime,
					  "msgTimeShow": msgTimeShow
					}]
					this.lastSendTime = newData.sendTime
					this.rollData(newChatdata)
				}
			})
		},
		onLoad(option) {
			this.id = option.id
			this.otherAvator = uni.getStorageSync('otherAvator')
			console.log('otherAvator', this.otherAvator)
			this.updateData()
			this.$nextTick(()=>{
				this.getHistoryMsg();
			});
		},
		onPageScroll(e){
			if(e.scrollTop < 5){
				this.getHistoryMsg();
			}
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
			updateData() {
				let data = {
					id: this.id
				}
				let options = {
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'miniapp-token': uni.getStorageSync('miniapp-token')
					}
				}
				this.$req.get('/miniapp/recommend/get/' + data.id , data, options).then(res => {
					let [err, result] = res
					if (result.data && result.data.data) {
						// this.otherAvator = result.data.data.avator
						this.nick = result.data.data.nick
					}
				}, err => {
					console.log(err)
				})
			},
			// 获取历史消息
			getHistoryMsg() {
				if (!this.ajax.flag) {
					return; //
				}
				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async ()=>{
					this.hideLoadTips();
					this.ajax.flag = false;
					let data = await this.joinHistoryMsg();
					this.rollData(data)
				}
				get()
			},
			rollData(data) {
				// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
				let selector = '';
				
				// 将获取到的消息数据合并到消息数组中
				this.talkList = [...data, ...this.talkList];
				if (this.talkList && this.talkList.length !== 0) {
					if (this.ajax.page > 1) {
						// 非第一页，则取历史消息数据的第一条信息元素
						selector = `#msg-${this.talkList[0].id}`;
					} else {
						// 第一页，则取当前消息数据的最后一条信息元素
						selector = `#msg-${data[data.length - 1].id}`;
					}
					
					// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
					this.$nextTick(()=>{
						// 设置当前滚动的位置
						this.setPageScrollTo(selector);
						
						this.hideLoadTips(true);
												
						if (data.length < this.ajax.rows){
							// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
							// 可在此处编写无更多消息数据时的逻辑
						} else {
							this.ajax.page ++;
							// 延迟 200ms ，以保证设置窗口滚动已完成
							setTimeout(() => {
								this.ajax.flag = true;
							}, 200)
						}
					})
				} else {
					this.hideLoadTips(true);
				}
			},
			// 拼接历史记录消息，正式项目可替换为请求历史记录接口
			joinHistoryMsg(){
				let join = (msgData) => {
					for (let i = 0; i < msgData.length; i++) {
						this.msgShowList.push(false)
					}
					
					for (let i = msgData.length - 1; i >= 1; i--) {
						console.log(msgData[i].sendTime - msgData[i - 1].sendTime)
						if (msgData[i].sendTime - msgData[i - 1].sendTime > 3 * 60 * 1000) {
							this.msgShowList[i] = true
						}
					}
					this.msgShowList[0] = true
					this.lastSendTime = msgData[msgData.length - 1].sendTime
					let arr = [];
					
					//通过当前页码及页数，模拟数据内容
					let startIndex = 0;
					let endIndex = msgData.length >= this.ajax.rows ? startIndex + this.ajax.rows :
							startIndex + msgData.length;
					this.startId = msgData[startIndex].clientMsgID
					for(let i = startIndex; i < endIndex; i++){
						arr.push({
							"id": msgData[i].clientMsgID,	// 消息的ID
							"content": msgData[i].content,	// 消息内容
							"type": parseInt(msgData[i].sendID) ===
								parseInt(uni.getStorageSync('userId')) ? 1 : 0	,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
							"pic": this.otherAvator,	// 头像
							"msgTime": msgData[i].sendTime,
							"msgTimeShow": this.msgShowList[i]
						})
					}
					
					return arr;
				}
				
				const options = {
					groupID: '',
					startClientMsgID: this.startId,
					count: 20,
					userID: this.id
				}

				
				// 此处用到 ES6 的 Promise 知识，不懂的请自行学习。
				return new Promise((done, fail)=>{
					// 无数据请求接口，由 setTimeout 模拟，正式项目替换为 ajax 即可。
					this.$openIM.getHistoryMessageList(options).then(({ data })=>{
					  data = JSON.parse(data)
						if (data && data.length !== 0) {
							data = join(data)
						}
						done(data);
					}).catch(err => {
						console.log('history err', err)
					})
				})
			},
			// 设置页面滚动位置
			setPageScrollTo(selector){
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					uni.pageScrollTo({
					    scrollTop: res.top - 30,	// -30 为多显示出大半个消息的高度，示意上面还有信息。
					    duration: 0
					});
				}).exec();
			},
			// 隐藏加载提示
			hideLoadTips(flag){
				if(flag){
					this.ajax.loadText = '消息获取成功';
					setTimeout(()=>{
						this.ajax.loading = false;
					},300);
				}else{
					this.ajax.loading = true;
					this.ajax.loadText = '正在获取消息';
				}
			},
			// 发送信息
			send(){
				if(!this.content){
					uni.showToast({
						title:'请输入有效的内容',
						icon:'none'
					})
					return;
				}
				
				uni.showLoading({
					title:'正在发送'
				})
				setTimeout(()=>{
					uni.hideLoading();
					
					// 将当前发送信息 添加到消息列表。
					let nowTime = new Date().getTime()
					let msgTimeShow = false
					if (!this.lastSendTime || nowTime - this.lastSendTime > 3 * 60 * 1000) {
						msgTimeShow = true
					}
					this.lastSendTime = nowTime
					let data = {
						"id": nowTime,
						"content": this.content,
						"type": 1,
						"pic": "",
						"msgTime": this.dateFormat(nowTime, 1),
						"msgTimeShow": msgTimeShow
					}
					this.talkList.push(data);
					
					this.$openIM.createTextMessage(this.content).then(res=>{
						console.log('res', res)
						if (res.data) {
							const options = {
							  recvID: this.id,
							  groupID: '',
							  message: res.data,
							};
							this.$openIM.sendMessage(options).then(({ data, errCode })=>{
							  console.log('data', data)
								console.log('errCode', errCode)
							}).catch(err=>{
							  console.log('err', err)
							})
						}
					}).catch(err => {
					  console.log('err2', err)
					})
					
					this.$nextTick(()=>{
						// 清空内容框中的内容
						this.content = '';
						uni.pageScrollTo({
						    scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
						    duration: 0
						});
					})
				}, 500);
			}
		}
	}
</script>

<style lang="scss">
	@import "@/static/global.scss";
	page{
		background-color: #F3F3F3;
		font-size: 28rpx;
	}
	
	/* 加载数据提示 */
	.tips{
		position: fixed;
		left: 0;
		top: var(--window-top) + 160rpx;
		width: 100%;
		z-index: 9;
		background-color: rgba(0,0,0,0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform:translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;
		
		&.show{
			transform:translateY(0);
		}
	}
	
	.box-1{
		width: 100%;
		height: auto;
		padding-bottom: 180rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.box-2{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 2rpx;
		box-sizing: content-box;
		background-color: #F3F3F3;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		
		>view{
			padding: 0 20rpx;
			height: 100rpx;
		}
		
		.content{
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}
		
		.send{
			background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;
			
			&:active{
				background-color: #5fc496;
			}
		}
	}
	
	.talk-list{
		padding-bottom: 20rpx;
		
		.time-tip {
			width: 100%;
			padding-top: 10rpx;
			text-align: center;
			
			font-family: 'PingFang SC';
			font-style: normal;
			font-size: 26rpx;
			color: #878787;
		}
		/* 消息项，基础类 */
		.item{
			padding: 20rpx 20rpx 0 20rpx;
			align-items:flex-start;
			align-content:flex-start;
			color: #333;
			
			.pic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
			
			.content{
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}
			
			/* 收到的消息 */
			&.pull{
				.content{
					margin-left: 32rpx;
					background-color: #1D1D2C;
					
					color: #fff;
					font-family: 'PingFang SC';
					font-style: normal;
					font-weight: 500;
					font-size: 28rpx;
					line-height: 42rpx;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #1D1D2C;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}
			
			/* 发出的消息 */
			&.push{
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;
				
				.content{
					margin-right: 32rpx;
					background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
					
					color: #fff;
					font-family: 'PingFang SC';
					font-style: normal;
					font-weight: 400;
					font-size: 28rpx;
					line-height: 48rpx;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #6E86FF;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
</style>