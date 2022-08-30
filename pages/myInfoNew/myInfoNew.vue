<template>
  <view class="container">
    <view class="sub-container1">
      <view
        style="
          display: flex;
          justify-content: space-between;
          padding-left: 40rpx;
        "
      >
        <image
          style="width: 140rpx; height: 140rpx; border-radius: 70rpx"
          :src="avator"
        ></image>
        <view class="my-info-container1">
          <view class="my-info1">{{ nick }}</view>
          <view>
            <view class="my-info-icon1" v-if="completeFlag == 3">
              <uni-icons
                custom-prefix="iconfont"
                type="icon-icon_correct"
                color="#4ECB71"
                size="16"
              >
              </uni-icons>
            </view>
            <view class="my-info-icon1" v-if="completeFlag != 3">
              <uni-icons
                custom-prefix="iconfont"
                type="icon-warning"
                color="#FF9A62"
                size="16"
              >
              </uni-icons>
            </view>
            <text class="my-info-text2">{{
              completeFlag == 3 ? "资料基本完善" : "未完善资料"
            }}</text>
          </view>
        </view>
        <view class="my-info-container2">
          <view @click="toMyPage" style="float: left; margin-right: 10rpx"
            >主页</view
          >
          <view style="float: left">
            <uni-icons type="right" size="20" color="#000000"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="sub-container2">
      <view class="flex-item">
        <view class="my-info2-num">{{ focusNum }}</view>
        <view class="my-info2-text">关注</view>
      </view>
      <view class="flex-item">
        <view class="my-info2-num">{{ fansNum }}</view>
        <view class="my-info2-text">粉丝</view>
      </view>
      <view class="flex-item">
        <view class="my-info2-num">6869</view>
        <view class="my-info2-text">最近来访</view>
      </view>
    </view>
    <view class="sub-container3">
      <view class="flex-container3">
        <view>推荐给朋友</view>
        <view class="my-info-icon3">
          <uni-icons type="right" size="20" color="#BFBFBF"></uni-icons>
        </view>
      </view>
      <view class="flex-container3">
        <view>帮助中心</view>
        <view class="my-info-icon3">
          <uni-icons type="right" size="20" color="#BFBFBF"></uni-icons>
        </view>
      </view>
      <view class="flex-container3">
        <view>个人中心</view>
        <view class="my-info-icon3">
          <uni-icons type="right" size="20" color="#BFBFBF"></uni-icons>
        </view>
      </view>
      <view @click.stop="ifReset" class="flex-container3">
        <view>账号注销</view>
        <view class="my-info-icon3">
          <uni-icons type="right" size="20" color="#BFBFBF"></uni-icons>
        </view>
      </view>
    </view>
    <view class="sub-container4">
      <view class="my-info-text4"> 预留卡片区域用于拓展 </view>
      <!-- <view class="reset-data" @click="resetData"> 清空用户数据 </view> -->
    </view>
  </view>
</template>

<script>
export default {
  name: "myInfoNew",
  data() {
    return {
      nick: "",
      avator: "",
      completeFlag: 1,
      fansNum: 0,
      focusNum: 0
    };
  },
  mounted() {
    this.updateData();
  },
  onShow() {
    if (uni.getStorageSync("headPhoto")) {
      this.nick = uni.getStorageSync("nick");
      if (this.avator != uni.getStorageSync("headPhoto")) {
        this.avator = uni.getStorageSync("headPhoto");
        if (this.avator == "") {
          this.updateData();
        }
      }
      this.completeFlag = uni.getStorageSync("completeFlag");
    } else {
      this.updateData();
    }
  },
  methods: {
    ifReset() {
      let vm = this;
      uni.showModal({
        title: "注销提示",
        content: "您确认要注销此账号吗？",
        success(res) {
          //如果用户点击了确定按钮
          if (res.confirm) {
            //调用清空数据
            vm.resetData();
          }
        },
      });
    },
    resetData() {
      let data = {};
      let options = {
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };
      this.$req.get("/miniapp/reset/exec", data, options).then(
        (res) => {
          let [err, result] = res;
          if (result.data && result.data.code === 20000) {
            uni.setStorageSync("headPhoto", "");
            uni.reLaunch({
              url: "/pages/startPage/startPage",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateData() {
      let data = {};
      let options = {
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };
      this.$req.get("/miniapp/user/get", data, options).then(
        (res) => {
          let [err, result] = res;
          if (result.data.data) {
            let tempFormData = result.data.data;
            this.nick = tempFormData.nick;
            this.avator = tempFormData.avator;
            this.completeFlag = tempFormData.complate;
	    this.fansNum = tempFormData.fansNum || 0;
	    this.focusNum = tempFormData.focusNum || 0;
            uni.setStorageSync("nick", tempFormData.nick);
            uni.setStorageSync("completeFlag", this.completeFlag);
            uni.setStorageSync("headPhoto", tempFormData.avator);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    toMyPage() {
      let navigateURL = "../myPage/index";
      if (this.completeFlag == 3) {
        navigateURL = "../myPage/index";
      } else {
        navigateURL = "../completeInformation/index?complate=" + this.complate;
      }
      uni.navigateTo({
        // url: "../myPage/index",
        url: navigateURL,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url("@/static/assets/img/backGround/background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .sub-container1 {
    padding-top: 190rpx;
    .my-info-container1 {
      position: relative;
      width: 400rpx;
      height: 44rpx;
      top: 48rpx;
      .my-info1 {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: 34rpx;
        line-height: 44rpx;
        /* identical to box height, or 129% */

        color: #1d1d1f;
      }
      .my-info-icon1 {
        float: left;
        margin-top: 4rpx;
      }
      .my-info-text2 {
        float: left;
        margin-left: 6rpx;
        margin-top: 2rpx;
        display: inline-block;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 20rpx;
        line-height: 40rpx;
        /* identical to box height, or 200% */

        text-align: center;
        letter-spacing: -1rpx;

        color: #a3a3a3;
      }
    }
    .my-info-container2 {
      margin-top: 56rpx;
      margin-right: 40rpx;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 20rpx;
      line-height: 42rpx;
      /* identical to box height, or 210% */

      color: #000000;
    }
  }
  .sub-container2 {
    width: 80%;
    display: flex;
    margin-top: 46rpx;
    margin-left: 10%;
    .flex-item {
      flex: 1 1 33.33%;
      text-align: center;
      .my-info2-num {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: 44rpx;
        line-height: 50rpx;
        text-align: center;

        color: #1d1d1f;
      }
      .my-info2-text {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 36rpx;

        text-align: center;

        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .sub-container3 {
    margin-top: 26rpx;
    width: 694rpx;
    // height: 312rpx;
    margin-left: 28rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .flex-container3 {
      postion: relative;
      width: 100%;
      height: 104rpx;

      /* Inside auto layout */

      display: flex;
      order: 0;
      flex-grow: 0;
      padding-left: 50rpx;
      padding-top: 31rpx;

      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 28rpx;
      line-height: 42rpx;

      color: #1d1d1f;
      .my-info-icon3 {
        position: absolute;
        left: 90%;
      }
    }
  }
  .sub-container4 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 694rpx;
    height: 566rpx;
    margin-top: 42rpx;
    margin-left: 28rpx;
    margin-bottom: 56rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .my-info-text4 {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 28rpx;
      line-height: 42rpx;
      color: #000000;
    }
    .reset-data {
      width: 300rpx;
      height: 60rpx;
      margin-top: 60rpx;
      font-size: 40rpx;
      line-height: 60rpx;
      text-align: center;
      background-color: #bfa;
    }
  }
}
</style>
