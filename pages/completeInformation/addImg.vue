<template>
  <view>
    <view class="top_box" @click="addImg"
      ><img src="../../static/uploadImg.jpg" alt=""
    /></view>
    <view class="editInfoFooter">
      <view class="saveBtn" @click="saveMyInfo">保存</view>
    </view>
    <!-- <u-popup
      v-model="showEditImg"
      :round="10"
      mode="bottom"
      @close="close"
      @open="open"
    >
      <view class="popup">
        <div class="top_box">
          <div class="title">
            上传本人真实的正面照，不规范的头像将无法通过审核哦
          </div>
          <img src="../../static/assets/img/myInfo/imgStandard.jpg" alt="" />
          <div class="span_box">
            <span class="span1">五官清晰</span>
            <span class="span2">墨镜口罩</span>
            <span class="span3">看不清人</span>
            <span class="span4">侧脸</span>
          </div>
        </div>
      </view>
      <view class="div2" @click="showCropperFn"> 从相册中选取 </view>
      <view class="div3" @click="closeModel"> 取消 </view>
    </u-popup> -->
  </view>
</template>

<script>
import cropper from "@/components/imgCropper/index.vue";
export default {
  name: "addImg",
  components: { cropper },
  data() {
    return {
      showEditImg: false,
      completeInfoTitle: "完善资料（1/2）",
    };
  },
  beforeMount() {},
  mounted() {},
  onLoad(option) {},
  beforeDestroy() {},
  methods: {
    open() {},
    close() {},
    tapImg(e) {
      // this.showEditImg = true;

      // 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
      this.$refs.gmyImgCropper.chooseImage(e);
    },
    closeModel() {
      this.showEditImg = false;
    },
    // 裁剪完成时,返回截取图片的临时路径
    getImg(imgPath) {
      uni.getFileSystemManager().readFile({
        filePath: imgPath, //选择图片返回的相对路径
        encoding: "base64", //编码格式
        success: (res) => {
          //成功的回调
          let data = {
            base64: res.data,
          };

          let options = {
            header: {
              "content-type": "application/json",
              "miniapp-token": uni.getStorageSync("miniapp-token"),
            },
          };

          this.$req
            .post("/miniapp/ma-user-photo/mainUpload", data, options)
            .then((res) => {
              let [err, result] = res;
              if (result && result.data) {
                this.showEditImg = false;
                this.getMyPageInfo();
                // this.topBgImg = result.data.url;
                uni.showToast({
                  title: "成功拍照或引用相册",
                  duration: 2000,
                });
              }
            });
        },
      });
    },
    editImgFn() {
      // 编辑顶部图片
      // this.showEditImg = true;
    },
    addImg() {
      let vm = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        success: (res) => {
          let allImg = res.tempFilePaths[0];
          new Promise((resolve, reject) => {
            uni.getFileSystemManager().readFile({
              filePath: allImg, //选择图片返回的相对路径
              encoding: "base64", //编码格式
              success: (res) => {
                if (res.data) {
                  resolve(res.data);
                }
              },
            });
          }).then((myImg) => {
            let data = {
              // base64:JSON.stringify(imgArr)
              base64: myImg,
            };
            let options = {
              header: {
                "content-type": "application/json",
                "miniapp-token": uni.getStorageSync("miniapp-token"),
              },
            };

            this.$req
              .post("/miniapp/ma-user-photo/mainUpload", data, options)
              .then(
                (res) => {
                  let [err, result] = res;
                  if (result) {
                    uni.showToast({
                      title: "头像上传成功",
                      duration: 1000,
                    });
                  }
                },
                (err) => {
                  console.log(err);
                  this.showEditImg = false;
                }
              );
          });
        },
      });
    },
    saveMyInfo() {
      uni.navigateTo({
        url: "/pages/myPage/index",
      });
    },
    getValueOnPage() {},
  },
};
</script>

<style lang="scss" scoped>
.top_box {
  width: 338rpx;
  height: 398rpx;
  padding-top: 60rpx;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.popup {
  padding-top: 28rpx;
  .top_box {
    text-align: center;
    padding-bottom: 26rpx;
    .title {
      width: 684rpx;
      color: #a3a3a3;
      margin: 0 auto;
      padding-bottom: 6rpx;
      font-size: 24rpx;
      text-align: left;
    }
    img {
      width: 684rpx;
      height: 158rpx;
    }
    .span_box {
      width: 684rpx;
      margin: 0 auto;
      span {
        font-size: 24rpx;
        display: inline-block;
        width: 25%;
        text-align: center;
        color: #9b9999;
      }
      .span1 {
        color: #000000;
      }
    }
  }
}
.editInfoFooter {
  position: fixed;
  top: 86%;
  width: 100%;
  height: 14%;
  background: #e5e5e5;
  // background-color: rgba(255, 255, 255, 0.4);
}
.saveBtn {
  position: fixed;
  left: 22.93%;
  right: 23.73%;
  top: 90%;
  height: 80rpx;
  padding-top: 18rpx;

  background: linear-gradient(180deg, #6e86ff 0%, #a7b5ff 100%);
  border-radius: 1000px;

  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 32rpx;
  line-height: 44rpx;

  color: #ffffff;
}
</style>
