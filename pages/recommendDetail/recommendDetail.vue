<template>
  <view class="myPage">
    <u-navbar
      is-back="true"
      :border-bottom="false"
      title-color="black"
      bgColor="#E5E5E5"
      title="推荐页详情"
    ></u-navbar>
    <view class="top_img" @touchstart="touchStart" @touchend="touchEnd">
      <swiper indicator-dots circular>
        <swiper-item v-for="(item, index) in photoArray" :key="index">
          <image :src="item" style="width: 100%; height: 100%" alt=""></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="item item1">
      <view class="my-info-container1">
        <view class="my-info1">{{ homeInfo.nick || "" }}</view>
      </view>
      <view class="info_title">
        <home-page-info v-if="showInfo" :homeInfo="homeInfo" />
      </view>
    </view>
    <view class="item2">
      <view class="about-container">
        <view class="my-info1">自我介绍</view>
        <view class="my_info_box">
          <text v-if="!homeInfo.aboutMe" class="my-info-text2"
            >让大家更快速全面的了解你，真诚的介绍会更受欢迎哦</text
          >
          <text
            v-if="homeInfo.aboutMe"
            class="my-info-text2"
            style="margin-top: 20rpx"
            >{{ homeInfo.aboutMe }}</text
          >
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="leftBtn" @click="focus">
        <image
          src="@/static/assets/img/store.png"
          style="width: 30rpx; height: 30rpx"
        ></image>
        <text style="margin-left: 8rpx">
          {{ homeInfo.focusStatus === 1 ? "关注Ta" : "已关注" }}
        </text>
      </view>
      <view class="rightBtn" @click="gotoChat">
        <image
          src="@/static/assets/img/gotoChat.png"
          style="width: 30rpx; height: 30rpx"
        ></image>
        <text style="margin-left: 8rpx">跟Ta聊聊</text>
      </view>
    </view>
  </view>
</template>

<script>
import HomePageInfo from "@/components/HomePageInfo/HomePageInfo.vue";
export default {
  name: "recommendDetail",
  components: {
    HomePageInfo,
  },
  data() {
    return {
      showInfo: true,
      id: "",
      avator: "",
      homeInfo: {},
      photoArray: [],
      index: 0,
      startX: 0,
      complate: "",
    };
  },
  mounted() {},
  onLoad(option) {
    this.id = option.id;
    this.avator = option.avator;
    this.updateData();
    this.getInfo();
  },
  methods: {
    focus() {
      let data = {
        toUserId: this.id,
      };
      let options = {
        header: {
          "content-type": "application/json",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };
      this.$req.post("/miniapp/relation/focus", data, options).then(
        (res) => {
          let [err, result] = res;
          if (result.data && result.data.data === "success") {
            this.updateData();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    gotoChat() {
      let vm = this;
      // 1  2 资料未完善，跳转至完善个人信息页。
      if (vm.complate < 3) {
        uni.showModal({
          title: "完善个人信息",
          content:
            "为了打造真实交友平台，跟他人沟通时必须如实填写个人资料，否则将无法进行沟通",
          cancelText: "我知道了", // 取消按钮的文字
          confirmText: "完善信息", // 确认按钮文字
          confirmColor: "#576B95",
          cancelColor: "#a3a3a3",
          success(res) {
            //如果用户点击了确定完善信息按钮
            if (res.confirm) {
              uni.navigateTo({
                url: "/pages/completeInformation/index?complate=" + vm.complate,
              });
            }
          },
        });
      } else {
        vm.toChatDetail();
      }
    },
    toChatDetail() {
      uni.setStorageSync("otherNick", this.homeInfo.nick);
      uni.navigateTo({
        url:
          "/pages/chatDetail/chatDetail?id=" + this.id
      });
    },
    getInfo() {
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
          this.complate = result.data.data.complate;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    updateData() {
      let data = {
        id: this.id,
      };
      let options = {
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };
      this.$req.get("/miniapp/recommend/get/" + data.id, data, options).then(
        (res) => {
          let [err, result] = res;
          if (result.data && result.data.data) {
            this.homeInfo = result.data.data;
	    uni.setStorageSync('otherAvator', this.avator)
            this.photoArray.push(this.homeInfo.avator);
            if (this.homeInfo.photos && this.homeInfo.photos.length >= 1) {
              this.homeInfo.photos.forEach((item) => {
                this.photoArray.push(item.url);
              });
            }
            console.log(this.photoArray);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    /**
     * 触摸开始
     * @param {Object} e
     */
    touchStart: function (e) {
      if (e.touches.length == 1) {
        //设置触摸起始点水平方向位置
        this.startX = e.touches[0].clientX;
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
        if (Math.abs(diff) > 20) {
          if (diff > 0) {
            if (this.index > 0) {
              this.index -= 1;
            }
          } else {
            if (this.index < this.photoArray.length - 1) {
              this.index += 1;
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.myPage {
  // height: 100%;
  padding-bottom: 28rpx;
  width: 100%;
  background: #e5e5e5;
  min-height: 100vh;
  .div2 {
    height: 86rpx;
    line-height: 86rpx;
    border-top: #dbd9d9 1rpx solid;
    text-align: center;
    border-bottom: #eff2f3 8rpx solid;
    color: #000000;
  }
  .div3 {
    height: 86rpx;
    text-align: center;
    line-height: 86rpx;
    color: #000000;
  }
  .top_img {
    width: 660rpx;
    height: 660rpx;
    margin: 0 auto;
    padding-top: 20rpx;
    margin-bottom: 24rpx;
    background: #ffffff;
    position: relative;
    border-radius: 10px;
    swiper {
      width: 100%;
      height: 100%;
    }
    img {
      border-radius: 20rpx;
    }
  }
  .item {
    width: 694rpx;
    margin: 0 auto;
    margin-bottom: 24rpx;
    position: relative;
    background: #ffffff;
    border-radius: 20rpx;
    // height: 203rpx;
    padding-top: 26rpx;
    padding-left: 40rpx;
  }
  .edit_btn {
    z-index: 9999;
    text-align: center;
    position: absolute;
    width: 80rpx;
    height: 44rpx;
    line-height: 44rpx;
    right: 40rpx;
    top: 40rpx;
    font-weight: 400;
    font-size: 12px;
    color: #798fff;
    padding: 0;
    background: #f4f4f4;
    border-radius: 15px;
  }
  .item {
    // height: 248rpx;
  }
  .item1 {
    height: 320rpx;
    .info_title {
      width: 95%;
      padding-top: 14rpx;
      font-size: 24rpx;
      color: #a3a3a3;
      border-top: #dbd9d9 2rpx solid;
    }
  }
  .my-info-container1 {
    position: relative;
    width: 100%;
    height: 86rpx;
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
      font-size: 24rpx;
      line-height: 40rpx;
      /* identical to box height, or 200% */
      text-align: center;
      color: #a3a3a3;
    }
    .add_img {
      .imgBox {
        display: inline-block;
        position: relative;
        width: 100rpx;
        height: 100rpx;
        margin: 4rpx 6rpx;

        .picture {
          width: 100rpx;
          height: 100rpx;
        }
      }
    }
  }
  .item2 {
    width: 694rpx;
    margin: 0 auto;
    margin-bottom: 24rpx;
    position: relative;
    background: #ffffff;
    border-radius: 20rpx;
    padding-top: 26rpx;
    padding-left: 40rpx;
    padding-bottom: 40rpx;
    padding-right: 40rpx;
    .about-container {
      position: relative;
      width: 100%;
      .my_info_box {
        overflow: auto;
        min-height: 180rpx;
        padding-bottom: 6rpx;
      }
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
        width: 100%;
        height: auto;
        display: inline-block;
        white-space: pre-wrap;
        word-wrap: break-word;
        float: left;
        margin-top: 2rpx;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 40rpx;
        /* identical to box height, or 200% */

        color: #1d1d1f;
      }
      .my-info-icon1 {
        float: left;
        margin-top: 4rpx;
      }
      .my-info-text2 {
        float: left;
        margin-top: 2rpx;
        display: inline-block;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 40rpx;
        /* identical to box height, or 200% */

        color: #a3a3a3;
      }
      .add_img {
        .imgBox {
          display: inline-block;
          position: relative;
          width: 136rpx;
          height: 136rpx;
          margin: 4rpx 6rpx;

          .picture {
            width: 136rpx;
            height: 136rpx;
          }
        }
      }
    }
    .my_info_box {
      // height: 40rpx;
    }
    .info_title {
      width: 95%;
      padding-top: 14rpx;
      font-size: 24rpx;
      color: #a3a3a3;
      border-top: #dbd9d9 2rpx solid;
    }
    swiper {
      margin-top: 22rpx;
      width: 710rpx;
      height: 914rpx;
      border-radius: 50rpx !important;
      overflow: hidden;
      transform: translateY(0);
      image {
        width: 100%;
        height: 100%;
      }
    }
    .collect {
      width: 128rpx;
      height: 128rpx;
      margin-top: 456rpx;
      margin-left: 540rpx;
      border-radius: 64rpx;
      background-color: #f7bb21;
      position: absolute;
      z-index: 100;
    }
    .like {
      width: 128rpx;
      height: 128rpx;
      margin-top: 608rpx;
      margin-left: 540rpx;
      border-radius: 64rpx;
      background-color: #d94e4e;
      position: absolute;
      z-index: 100;
    }
    .dislike {
      width: 128rpx;
      height: 128rpx;
      margin-top: 760rpx;
      margin-left: 540rpx;
      border-radius: 64rpx;
      background-color: #377fee;
      position: absolute;
      z-index: 100;
    }
    .icon-offset {
      margin-top: 30rpx;
      margin-left: 30rpx;
    }
    .icon-offset2 {
      margin-top: 24rpx;
      margin-left: 24rpx;
    }
    .recommend-info {
      margin-top: 20rpx;
      margin-bottom: 10rpx;
      margin-left: 26rpx;
      .big-font {
        font-size: 40rpx;
      }
      .split-line {
        color: #bbbbbb;
      }
      .small-font {
        font-size: 28rpx;
        right: 0;
      }
      .other-tips {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        width: 98%;
        border-top: 2rpx solid #bbbbbb;
        .tip-item {
          margin-top: 22rpx;
          margin-right: 20rpx;
          height: 46rpx;
          padding-top: 0rpx;
          padding-left: 16rpx;
          padding-left: 24rpx;
          border: 5rpx solid #f0eeee;
          border-radius: 24rpx;
          font-size: 24rpx;
          color: #8d6e6e;
        }
      }
    }
    .other-info {
      font-size: 28rpx;
      border-top: 2rpx solid #bbbbbb;
      .other-info-item1 {
        height: 390rpx;
      }
      .other-info-item2 {
        display: relative;
        height: 500rpx;
      }
      .other-info-item3 {
        display: relative;
        height: 500rpx;
      }
      .info-item-name {
        margin-top: 34rpx;
        margin-left: 58rpx;
        color: #5e5b5b;
      }
      .item-content1 {
        margin-top: 42rpx;
        margin-bottom: 75rpx;
        .left-content-name {
          margin-right: 90rpx;
          color: #6c6868;
        }
      }
      .item-content2 {
        width: 636rpx;
        height: 368rpx;
        background-color: #faf9f9;
        margin-top: 22rpx;
        margin-left: 44rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: auto;
      }
    }
  }
  .footer {
    display: flex;
    width: 100%;
    .leftBtn {
      position: fixed;
      left: 13.07%;
      top: 88%;
      width: 216rpx;
      height: 74rpx;

      background: linear-gradient(
        180deg,
        #ff2020 0%,
        #ff3232 99.99%,
        #f44a4a 100%,
        #e0b2b2 100%
      );
      border-radius: 1000px;

      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 21px;
      /* identical to box height */

      color: #ffffff;
      text-align: center;
      line-height: 74rpx;
    }
    .rightBtn {
      position: fixed;
      left: 58.13%;
      top: 88%;
      width: 216rpx;
      height: 74rpx;

      /* 紫色渐变 */

      background: linear-gradient(180deg, #6e86ff 0%, #a7b5ff 100%);
      border-radius: 1000px;

      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 21px;
      /* identical to box height */

      color: #ffffff;
      text-align: center;
      line-height: 74rpx;
    }
  }
}
</style>
