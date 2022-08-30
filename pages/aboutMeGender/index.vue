<template>
  <view class="container">
    <view class="aboutMeBirday">
      <button
        :class="btnColorShow ? 'to_next' : 'next_step_ban'"
        @click="toBirdayPage()"
      >
        下一步
      </button>
      <div class="content">
        <div class="con_top">选择你的性别</div>
        <div class="con_bot">为你推荐优质的异性朋友</div>
      </div>
      <div class="gender_box">
        <div class="item" @click="selectGender(0)">
          <img
            style="width: 166rpx; height: 166rpx; margin-bottom: 40rpx"
            src="/static/man.png"
            alt=""
          />
          <div class="active_box" v-if="genderMan">
            <img
              style="width: 36rpx; height: 36rpx"
              src="/static/gender/active.png"
              alt=""
            />
            <span> 男生 </span>
          </div>
          <div class="no_active_box" v-if="!genderMan">
            <img
              style="width: 36rpx; height: 36rpx"
              src="/static/gender/notActive.png"
              alt=""
            />
            <span> 男生 </span>
          </div>
        </div>
        <div class="item" @click="selectGender(1)">
          <img
            style="width: 166rpx; height: 166rpx; margin-bottom: 40rpx"
            src="/static/woman.png"
            alt=""
          />
          <div class="active_box" v-if="genderWoman">
            <img
              style="width: 36rpx; height: 36rpx"
              src="/static/gender/active.png"
              alt=""
            />
            <span> 女生 </span>
          </div>
          <div class="no_active_box" v-if="!genderWoman">
            <img
              style="width: 36rpx; height: 36rpx"
              src="/static/gender/notActive.png"
              alt=""
            />
            <span> 女生 </span>
          </div>
        </div>
      </div>
      <div class="bot_box">性别只能选一次哦</div>
    </view>
  </view>
</template>

<script>
export default {
  name: "aboutMeGender",
  components: {},
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
      genderMan: false,
      genderWoman: false,
      sex: "",
      btnColorShow: false,
    };
  },
  methods: {
    selectGender(x) {
      this.btnColorShow = true;
      if (x == 0) {
        this.genderWoman = false;
        this.genderMan = true;
        this.sex = 1; // 保存数据
        uni.setStorageSync("sex", "male");
      }
      if (x == 1) {
        this.genderMan = false;
        this.genderWoman = true;
        this.sex = 2;
        uni.setStorageSync("sex", "female");
      }
    },
    toBirdayPage() {
      if (!this.sex) {
        return;
      }
      let data = {
        nick: uni.getStorageSync("nick"),
        avator: uni.getStorageSync("avatar"),
        sex: this.sex,
      };
      let options = {
        header: {
          "content-type": "application/json",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };

      this.$req.post("/miniapp/user/update", data, options).then(
        (res) => {
          let [err, result] = res;
          if (result.data.code === 20000) {
            uni.navigateTo({
              url: "../aboutMeBirday/index",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
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
.content {
  padding-top: 240rpx;
  padding-bottom: 60rpx;
  .con_top {
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 20px;
    /* identical to box height, or 83% */
    margin-bottom: 60rpx;
    text-align: center;

    color: #000000;
  }
  .con_bot {
    text-align: center;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 32rpx;
    line-height: 40rpx;
    /* identical to box height, or 125% */

    color: #000000;
  }
}
.gender_box {
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item {
    .active_box {
      width: 144rpx;
      margin: 0 auto;
      height: 60rpx;
      line-height: 60rpx;
      border: 3rpx solid #7b91ff;
      border-radius: 60rpx;
      display: flex;
      align-items: center;
      padding: 0 18rpx;
      justify-content: space-between;
    }
    .no_active_box {
      margin: 0 auto;
      width: 144rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 60rpx;
      border: 3rpx solid rgba(213, 213, 213, 0.54);
      display: flex;
      align-items: center;
      padding: 0 18rpx;
      justify-content: space-between;
    }
  }
}
.to_next {
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
  background: linear-gradient(180deg, #6e86ff 0%, #a7b5ff 100%);
  border-radius: 1000px;
}
.next_step_ban {
  background: #c2bfbf;
  border-radius: 1000px;
  color: #ffffff;
  position: absolute;
  left: 6.13%;
  right: 5.07%;
  top: 81.03%;
  bottom: 12.56%;
  font-size: 20px;
  font-weight: 400;
  height: 104rpx;
  line-height: 104rpx;
}
.bot_box {
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
.bot_box > span {
  color: #6e86ff;
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
