<template>
  <view class="container">
    <view class="first-page-container">
      <button class="wx_longin" @click="loginByWeixin()">微信快捷登录</button>
      <div class="content">
        <div class="con_top">Welcome To</div>
        <div class="con_bot">拍拖青年</div>
      </div>
      <div class="slogan">Slogan</div>
      <div class="bot_box">
        轻触登录即代表您同意
        <span @click="toUserAgreement"> 《用户协议》 </span>
        与
        <span @click="toPrivacyPolicy"> 《隐私条款》 </span>
      </div>
    </view>
  </view>
</template>

<script>
export default {
  name: "startPage",
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
    loginByWeixin() {
      let vm = this;
      uni.showModal({
        title: "登录提示",
        content: "您需要授权微信登录后才能正常使用小程序功能",
        success(res) {
          //如果用户点击了确定按钮
          if (res.confirm) {
            //调用授权和登录
            vm.getUserProfile();
          }
        },
      });
    },
    getUserProfile() {
      let that = this;
      uni.getUserProfile({
        desc: "登录",
        success: (info) => {
          console.log("用户的信息", info);
          that.$pri.nick = info.userInfo.nickName;
          that.$pri.avatar = info.userInfo.avatarUrl;
          uni.setStorageSync("nick", info.userInfo.nickName);
          uni.setStorageSync("avatar", info.userInfo.avatarUrl);
          //这里取到的是用户的信息，自己安排自己的业务
          uni.login({
            provider: "weixin",
            success: (res) => {
              console.log("获取的是用户的code", res);
              //这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
              that.$req.get("/token/" + res.code).then((res) => {
                that.$pri.token = res[1].data.data;
                if (res[1].data.code === 20000) {
                  uni.setStorageSync("miniapp-token", res[1].data.data);
		  this.loginImChat(res[1].data.data);
		  setTimeout(() => {
			  uni.navigateTo({
			  	url: "../aboutMeGender/index",
			  });
		  }, 800);
                }
              });
            },
          });
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
	loginImChat(token) {
		let data = {};
		let options = {
		  header: {
		    "content-type": "application/x-www-form-urlencoded",
		    "miniapp-token": token,
		  },
		};
		this.$req.get("/miniapp/user/get", data, options).then((resbody) => {
		  let [err, result] = resbody;
		  if (result.data.code == 20000) {
		    const config = {
		      userID: result.data.data.id.toString(),
		      token: result.data.data.imToken,
		      url: "wss://wss.apach.cc",
		      platformID: 5,
		    };
		    uni.setStorageSync("userId", result.data.data.id.toString());
		    this.$openIM
		      .login(config)
		      .then((res) => {
		        console.log("res", res);
		        console.log("login suc...");
		      })
		      .catch((err) => {
		        console.log("login failed...");
		      });
		  }
		});
	},
    toTabBar() {
      uni.navigateTo({
        url: "../locationPageOne/locationPageOne",
      });
    },
    toUserAgreement() {
      uni.navigateTo({
        url: "../userAgreement/index",
      });
    },
    toPrivacyPolicy() {
      uni.navigateTo({
        url: "../privacyPolicy/index",
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

.wx_longin {
  position: absolute;
  left: 6.13%;
  right: 5.07%;
  top: 81.03%;
  bottom: 12.56%;
  font-size: 40rpx;
  font-weight: 400;
  color: #ffffff;
  height: 104rpx;
  line-height: 104rpx;
  /* 紫色渐变 */

  background: linear-gradient(180deg, #6e86ff 0%, #a7b5ff 100%);
  border-radius: 7px;
}
.bot_box {
  font-size: 24rpx;
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
