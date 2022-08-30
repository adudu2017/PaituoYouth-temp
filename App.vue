<script>
export default {
  onLaunch: function () {
    //�����ȡ�����û���code��������ȡ openid��unionid��session_key ����Ϣ���ٽ���Ϣ������̨�Լ��ĵ�¼ҵ�������
    let data = {};
    let token = uni.getStorageSync("miniapp-token");
    if (!token) {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/startPage/startPage",
        });
      }, 1200);
      return;
    }
    uni.addInterceptor("request", {
      success(args) {
        if (args.data.code === 40100) {
          uni.removeStorageSync("miniapp-token");
          uni.clearStorageSync();
          uni.reLaunch({
            url: "/pages/startPage/startPage",
          });
        }
      },
    });
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

        let status = result.data.data.status;
        setTimeout(() => {
          if (status >= 0) {
            if (status === 0) {
              uni.reLaunch({
                url: "/pages/aboutMeGender/index",
              });
            } else if (status === 1) {
              uni.reLaunch({
                url: "/pages/aboutMeBirday/index",
              });
            } else if (status === 2) {
              uni.reLaunch({
                url: "/pages/locationPageOne/locationPageOne",
              });
            } else if (status >= 3) {
	      uni.setStorageSync('headPhoto', result.data.data.avator)
              uni.reLaunch({
                url: "/pages/recommendBrief/recommendBrief",
              });
            }
          }
        }, 1200);
      } else {
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/startPage/startPage",
          });
        }, 1200);
      }
    });
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>
<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "@/static/iconfont.css";
uni-tabbar {
  .uni-tabbar {
    // tab背景
    background-image: linear-gradient(
      to top,
      #faf8f8,
      #ffffff
    ) !important; // tab背景图片或者渐变色，背景色和背景图片最多选择一个进行设置
    .uni-tabbar-border {
      // tabBar上边框
      background-color: #f7f4f4 !important; // tabBar上边框的颜色
    }
    .uni-tabbar__bd {
      // tabBar单项
      .uni-tabbar__icon {
        // 图标
        width: 48upx !important;
        height: 48upx !important;
      }
      .uni-tabbar__label {
        // 文字
        font-size: 20upx !important;
      }
    }
  }
}
// .uni-tabbar {
//   .uni-tabbar__item {
//     /* // tabBar 单项样式 */
//     height: 200rpx !important;

//     .uni-tabbar__icon {
//       /* // tabBar 图标样式 */
//       width: 60rpx !important;
//       height: 60rpx !important;
//     }

//     .uni-tabbar__label {
//       /* // tabBar 文字样式 */
//       color: yellow !important;
//     }
//   }
// }
</style>
