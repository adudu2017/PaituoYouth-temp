<template>		
	<view class="pcaPicker" @touchmove.stop.prevent="preventTouchMove" v-if="popFlag">
	  <view :class="popFlag?'popMask':''" @click="hide"></view>
	  <view class="popBottom" :class="popFlag?'popRound':''">
	  <view class="headTextContainer">
		  <view class="headText">
			<text>请选择</text>
			<view>
				<text style="margin-right: 30%;">中国地区</text>
				<text>海外地区</text>
			</view>
		  </view>
	  </view>
	    <picker-view :value="pcaIndex" @change="pcaChange">
	      <picker-view-column>
	        <block v-for="(item,index) in pcaArr" :key="index">
	          <view>{{item.name}}</view>
	        </block>
	      </picker-view-column>
	      <picker-view-column>
	        <block v-for="(item,index) in pcaArr[pcaIndex[0]].children" :key="index">
	          <view>{{item.name}}</view>
	        </block>
	      </picker-view-column>
	    </picker-view>
		<view class="pcaBtnfooter">
		  <text class="btn" @click="confirm">确认</text>
		</view>
	  </view>
	</view>
</template>

<script>
	let pcaData=require('./pcaData.js').pca;
	export default {
		data() {
			return {
				popFlag:false,
				pcaArr:pcaData,
				pcaIndex:[0,0,0],
			}
		},
		methods: {
			// 防穿透
			preventTouchMove(){},
			// 滚动切换
			pcaChange(e){
			  let currentIndex=e.detail.value;
			  if(currentIndex[0]!=this.pcaIndex[0]){
			    this.pcaIndex.splice(0,3,currentIndex[0],0,0);
			    return;
			  }
			  if(currentIndex[1]!=this.pcaIndex[1]){
			    this.pcaIndex.splice(1,2,currentIndex[1],0);
			    return;
			  }
			  if(currentIndex[2]!=this.pcaIndex[2]){
			    this.pcaIndex.splice(2,1,currentIndex[2]);       
			    return;
			  }      
			},
			// 显示
			show(e){
			  this.popFlag=true;
			},
			// 隐藏
			hide(e){
			  this.popFlag=false;
			},
			// 确认
			confirm(e){
			  let name = this.pcaArr[this.pcaIndex[0]].name+'-'+this.pcaArr[this.pcaIndex[0]].children[this.pcaIndex[1]].name;
			  let code = this.pcaArr[this.pcaIndex[0]].children[this.pcaIndex[1]].code
			  this.$emit('confirm', {name, code})
			  this.hide();
			}
		}

	}
</script>

<style>
	/deep/ picker-view-column {
		width: 40% !important;
	}
	.headTextContainer {
		width: 100%;
		padding-top: 22rpx;
	}
	.headTextContainer>.headText {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 600;
		font-size: 32rpx;
		line-height: 56rpx;
		text-align: center;
		
		color: #000000;
	}
	.pcaBtnfooter {
		width: 100%;
		height: 120rpx;
		display: flex;
		text-align: center;
	}
	.pcaBtnfooter>.btn {
		margin-left: 126rpx;
		width: 498rpx;
		height: 90rpx;
		background: linear-gradient(180deg, #6E86FF 0%, #A7B5FF 100%);
		border-radius: 45rpx;
		text-align: center;
		
		padding-top: 20rpx;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		
		color: #FFFFFF;
	}
	.pcaPicker>.popMask {
	  position: fixed;
	  top: 0;
	  right: 0;
	  left: 0;
	  bottom: 0;
	  background: rgba(0, 0, 0, 0.6);
	  z-index: 10000;
	}
	.pcaPicker>.popBottom{
	  width: 100vw;
		background-color: #ffffff;
		font-size: 32rpx;
	  position: fixed;
	  bottom:0;
	  left:0;
	  transition: all 0.3s ease;
	  transform: translateY(100%);
	  opacity: 0;
	  z-index: 20000;
	}
	.pcaPicker>.popRound{
	  transition: all 0.3s ease;
	  transform: translateX(0);
	  opacity: 1;
	}
	.pcaPicker>.popBottom>.head{
	  width: 100%;
	  height: 80rpx;
	  display: flex;
	  align-items: center;
	  box-sizing: border-box;
	  text-align: center;
	  padding: 0 30rpx 0 30rpx;
	  border-bottom: 1px solid #f0f0f0;
	}
	.pcaPicker>.popBottom>.head>text{
	  display: block;
	  width: 100rpx;
	  height: 100%;
	  text-align: center;
	  line-height: 80rpx;
	  font-weight: bold;
	}
	.pcaPicker>.popBottom>picker-view{
		height: 500rpx;
	}
	.pcaPicker>.popBottom>picker-view view{
		text-align: center;
		line-height: 68rpx;
	}
</style>
