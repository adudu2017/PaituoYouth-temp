<template>
  <view class="container">
    <view class="first-page-container">
      <div class="content">
        <div class="con_top">Welcome To</div>
        <div class="con_bot">拍拖青年</div>
      </div>
      <div class="slogan">Loading</div>
    </view>
  </view>
</template>
<script>
export default {
  name: "loadingPage",
  data() {
    return {
      buttonName: "开启我的拍拖之旅",
      type: "bottom", // left right top bottom center
      transition: "slider", //none slider fade
      backgroundColor: "#FFF",
      active: false,
      height: "534rpx",
      width: "100%",
      popupId: 1,
      maskShow: true,
      maskClick: true,
    };
  },

  methods: {
    toTabBar() {
      uni.navigateTo({
        url: "../locationPageOne/locationPageOne",
      });
    },
    closeCallback: function () {},
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("@/static/assets/img/backGround/background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // padding-top: 362rpx;
}
.first-page-container {
  width: 100%;
}
.slogan {
  padding-top: 220rpx;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 200;
  font-size: 72rpx;
  box-sizing: border-box;
}
.content {
  padding-top: 260rpx;
  .con_top {
    text-align: center;
    font-size: 32rpx;
    font-weight: 400;
    font-family: "Poppins";
    font-style: normal;
  }
  .con_bot {
    text-align: center;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 200;
    font-size: 72rpx;
    line-height: 100rpx;
    letter-spacing: 0.2em;
    color: #000000;
  }
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
    border-bottom: 4rpx solid #f0eeee;
  }
  .user-info-container {
    height: 98rpx;
    border-bottom: 4rpx solid #f0eeee;
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
      background-color: #f2f2f2;
      color: #50ad62;
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
      background-color: #57be6a;
      color: #f3fbf6;
      text-align: center;
      border-radius: 8rpx;
      line-height: 80rpx;
      font-size: 32rpx;
    }
  }
}
</style>
