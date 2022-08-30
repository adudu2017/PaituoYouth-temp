<template>
  <view>
    <view class="my-info">
      <view>
        <view class="my-info1">
          <!-- <image src="../../static/assets/img/profilePhoto/profilePhoto1.png"></image> -->
          <image src="../../static/assets/img/iconFont/next.png"></image>
        </view>
        <view class="my-info2">
          <text style="margin-right: 8rpx" class="my-info-text1">水冰月</text>
          <uni-icons
            custom-prefix="iconfont"
            type="icon-vip-fill"
            color="#F79C1C"
            size="20"
          >
          </uni-icons>
          <uni-icons
            custom-prefix="iconfont"
            type="icon-auth"
            color="#3041E1"
            size="20"
          >
          </uni-icons>
          <view class="edit-process">已完成70%</view>
        </view>
      </view>
      <view class="my-info-detail" @click="gotoEdit()">
        <uni-icons type="right" size="24" color="#999999"></uni-icons>
      </view>
    </view>
    <view class="interact-info">
      <view class="recent-people">
        <text class="recent-text">最近来访</text>
        <text class="recent-num">{{ recentNum }}</text>
        <view class="new-recent">
          <view class="new-recent-num">2</view>
        </view>
        <view class="user-brief-info"></view>
        <view class="to-detail-icon">
          <uni-icons type="right" size="12" color="#999999"></uni-icons>
        </view>
      </view>
      <view class="both-like">
        <text class="both-like-text">互相喜欢</text>
        <text class="both-like-num">{{ bothLike }}</text>
        <view class="new-both-like">
          <view class="new-both-num">2</view>
        </view>
        <view class="user-brief-info"></view>
        <view class="to-detail-icon">
          <uni-icons type="right" size="12" color="#999999"></uni-icons>
        </view>
      </view>
    </view>
    <view class="other-settings">
      <view class="setting-item">
        <view class="item-icon">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-pailietubiao-24"
            color="#131313"
            size="38"
          >
          </uni-icons>
        </view>
        <text class="setting-item-text">邀请好友</text>
        <view class="detail-icon1">
          <uni-icons type="right" size="24" color="#999999"></uni-icons>
        </view>
      </view>
      <view class="setting-item">
        <view class="item-icon">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-pailietubiao-20"
            color="#131313"
            size="38"
          >
          </uni-icons>
        </view>
        <text class="setting-item-text">设置</text>
        <view class="detail-icon2">
          <uni-icons type="right" size="24" color="#999999"></uni-icons>
        </view>
      </view>
      <view class="setting-item">
        <view class="item-icon">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-bangzhu"
            color="#131313"
            size="38"
          >
          </uni-icons>
        </view>
        <text class="setting-item-text">帮助</text>
        <view class="detail-icon3">
          <uni-icons type="right" size="24" color="#999999"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import iconfont from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
export default {
  name: "myInfo",
  components: {
    iconfont,
  },
  data() {
    return {
      recentNum: 200,
      bothLike: 20,
    };
  },
  methods: {
    gotoEdit() {
      uni.navigateTo({
        url: "../editInfo/editInfo",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-info {
  display: flex;
  width: 750rpx;
  height: 216rpx;
  background-color: aliceblue;
  .my-info1 {
    width: 160rpx;
    height: 160rpx;
    margin-top: 24rpx;
    padding-left: 40rpx;
    float: left;
    font-size: 36rpx;
    image {
      width: 128rpx;
      height: 128rpx;
    }
  }
  .my-info2 {
    margin-top: 24rpx;
    font-size: 36rpx;
    float: left;
    width: 450rpx;
    .my-info-text1 {
      margin-left: 20rpx;
      margin-bottom: 40rpx;
    }
    .edit-process {
      margin-left: 20rpx;
      margin-top: 28rpx;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      width: 166rpx;
      height: 50rpx;
      background-color: #f26161;
      border-radius: 25rpx;
      color: white;
      font-size: 24rpx;
    }
  }
  .my-info-detail {
    width: 136rpx;
    padding-left: 86rpx;
    padding-top: 54rpx;
    float: right;
    padding-right: 20rpx;
  }
}

.interact-info {
  width: 718rpx;
  height: 280rpx;
  background-color: aliceblue;
  margin-top: 32rpx;
  margin-left: 18rpx;
  margin-right: 15rpx;
  padding-left: 40rpx;
  border-radius: 30rpx;
  .recent-people {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 150rpx;
    .recent-text {
      margin-right: 32rpx;
      font-size: 36rpx;
      color: #5e5b5b;
      align-self: center;
    }
    .recent-num {
      font-size: 36rpx;
      align-self: center;
    }
    .new-recent {
      width: 48rpx;
      height: 48rpx;
      margin-left: 18rpx;
      margin-top: 36rpx;
      border-radius: 24rpx;
      background-color: #e1452f;
      font-size: 24rpx;
      color: white;
      .new-recent-num {
        margin-top: 6rpx;
        margin-left: 18rpx;
      }
    }
  }
  .both-like {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-top: 8rpx solid #f0eeee;
    height: 150rpx;
    .both-like-text {
      margin-right: 32rpx;
      font-size: 36rpx;
      color: #5e5b5b;
      align-self: center;
    }
    .both-like-num {
      font-size: 36rpx;
      align-self: center;
    }
    .new-both-like {
      width: 48rpx;
      height: 48rpx;
      margin-left: 18rpx;
      margin-top: 36rpx;
      border-radius: 24rpx;
      background-color: #e1452f;
      font-size: 24rpx;
      color: white;
      .new-both-num {
        margin-top: 6rpx;
        margin-left: 18rpx;
      }
    }
  }
  .user-brief-info {
    width: 230rpx;
    height: 82rpx;
    border-radius: 41rpx;
    background-color: #f0eeee;
    margin-top: 32rpx;
    margin-left: 92rpx;
  }
  .detail-icon {
    width: 100rpx;
    image {
      margin-top: 50rpx;
      width: 60rpx;
      height: 60rpx;
    }
  }
  .to-detail-icon {
    padding-top: 60rpx;
    padding-left: 8rpx;
  }
}

.other-settings {
  width: 718rpx;
  background-color: aliceblue;
  margin-top: 20rpx;
  margin-left: 15rpx;
  margin-right: 15rpx;
  padding-left: 48rpx;
  border-radius: 30rpx;
  .setting-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 140rpx;
    .setting-item-text {
      margin-left: 20rpx;
      font-size: 40rpx;
      align-self: center;
    }
    .item-icon {
      align-self: center;
    }
    .detail-icon1 {
      margin-left: calc(100% - 152px);
      align-self: center;
    }
    .detail-icon2 {
      margin-left: calc(100% - 112px);
      align-self: center;
    }
    .detail-icon3 {
      margin-left: calc(100% - 112px);
      align-self: center;
    }
  }
}
</style>
