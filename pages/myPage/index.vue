<template>
  <view class="myPage">
    <u-navbar
      is-back="false"
      :autoBack="false"
      :border-bottom="false"
      leftIcon="arrowleft"
      @leftClick="leftClick"
      title-color="black"
      bgColor="#E5E5E5"
      title="我的主页"
    >
    </u-navbar>
    <cropper
      ref="gmyImgCropper"
      :quality="1"
      cropperType="fixed"
      :imgSrc="imgSrc"
      @getImg="getImg"
    ></cropper>
    <u-popup
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
    </u-popup>
    <div class="top_img">
      <button class="edit_btn" @click="editImgFn">编辑</button>
      <img style="width: 100%; height: 100%" :src="homeInfo.avator" alt="" />
    </div>
    <view class="item item1">
      <view class="edit_btn" @click="gotoInfoFormEdit">编辑</view>
      <view class="my-info-container1">
        <view class="my-info1">{{ homeInfo.nick || "" }}</view>
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
          <text class="my-info-text2">{{ perfectStatus }}</text>
        </view>
      </view>
      <div class="info_title">
        <div v-show="!showInfo" class="my-info-text2">
          完善基本信息，方可与对方进行沟通哦
        </div>
        <home-page-info v-show="showInfo" :homeInfo="homeInfo" />
      </div>
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
            class="info_text2"
            style="color: '#000000'"
            >{{ homeInfo.aboutMe }}</text
          >
        </view>
      </view>
      <div class="my_introduce" @click="editIntroduce">
        <img src="../../static/myPage/write.png" alt="" />
        <span> 填写自我介绍</span>
      </div>
    </view>

    <view class="item item3">
      <view class="my-info-img">
        <view class="my-info1">
          <span> 精美照片 </span>
          <span class="num"> （{{ imgData.length }}/6） </span>
        </view>
        <view class="add_img">
          <view class="imgBox" :key="index" v-for="(item, index) in imgData">
            <img
              @click="deleteImgFn(item.id)"
              class="deleteImg"
              src="../../static/deleteImg.png"
              alt=""
            />
            <img class="picture" :src="item.url" alt="" />
          </view>
          <div v-if="showAdd" class="imgBox" @click="addImg">
            <img class="picture" :src="addImgUrl" alt="" />
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import cropper from "@/components/imgCropper/index.vue";
import HomePageInfo from "@/components/HomePageInfo/HomePageInfo.vue";
import iconfont from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
export default {
  name: "recommend",
  components: {
    iconfont,
    HomePageInfo,
    cropper,
  },
  data() {
    return {
      shopData: "22", //店铺信息
      imgSrc: "", // 待裁剪图片
      showAdd: true,
      showEditImg: false,
      topBgImg: "../../static/assets/img/myInfo/imgStandard.jpg",
      imgNum: "",
      imgData: [],
      addImgUrl: "../../static/addImg.png",
      homeInfo: {},
      perfectStatus: "未完善资料", // 文本二 ：基本资料完善
      completeFlag: 1,
      showInfo: false,
    };
  },
  mounted() {
    // 进入页面获取基础相关信息
    this.getMyPageInfo();
    // 进入页面 获取照片
    this.getMyPhoto();
    if (this.imgData.length > 5) {
      this.showAdd = false;
    }
  },
  onNavigationBarButtonTap(e) {
    debugger;
    console.log(e);
  },
  methods: {
    rightClick() {
      debugger;
    },
    leftClick(e) {
      console.log(e.target);
      debugger;
      uni.switchTab({
        url: "/pages/myInfoNew/myInfoNew",
      });
    },
    updateData() {
      this.getMyPageInfo();
    },
    getMyPageInfo() {
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
          //     if (this.homeInfo.complate) {
          //   this.perfectStatus = "资料基本完善";
          //   this.showInfo = true;
          // }
          //  this.showInfo = true;
          this.homeInfo = result.data.data;
          this.imgSrc = this.homeInfo.avator;

          uni.setStorageSync("nick", this.homeInfo.nick);
          uni.setStorageSync("headPhoto", this.homeInfo.avator);
          this.completeFlag = this.homeInfo.complate || 1;
          uni.setStorageSync("completeFlag", this.completeFlag);
          if (this.homeInfo.complate) {
            this.perfectStatus = "资料基本完善";
            this.showInfo = true;
          } else {
            this.perfectStatus = "未完善资料";
            if (
              this.homeInfo.height ||
              this.homeInfo.weight ||
              this.homeInfo.hometown ||
              this.homeInfo.education ||
              this.homeInfo.school ||
              this.homeInfo.vocation ||
              this.homeInfo.company
            ) {
              this.showInfo = true;
            } else {
              this.showInfo = false;
            }
          }
          if (this.homeInfo.sex === 1) {
            uni.setStorageSync("sex", "male");
          } else if (this.homeInfo.sex === 2) {
            uni.setStorageSync("sex", "female");
          }
          if (this.homeInfo.height) {
            uni.setStorageSync("heightIndex", this.homeInfo.height - 150);
          }
          if (this.homeInfo.weight) {
            uni.setStorageSync("weightIndex", this.homeInfo.weight - 40);
          }
          if (this.homeInfo.marriage) {
            uni.setStorageSync("marriageIndex", this.homeInfo.marriage - 1);
          }
          if (this.homeInfo.education) {
            uni.setStorageSync("educationIndex", this.homeInfo.education - 1);
          }
          if (this.homeInfo.vocation) {
            uni.setStorageSync("vocation", this.homeInfo.vocation);
          }
          if (this.homeInfo.annualIncome) {
            uni.setStorageSync("annualIncome", this.homeInfo.annualIncome);
          }
          if (this.homeInfo.birth) {
            uni.setStorageSync("birth", this.homeInfo.birth);
          }
          if (this.homeInfo.place) {
            uni.setStorageSync("place", this.homeInfo.place);
          }
          if (this.homeInfo.hometown) {
            uni.setStorageSync("hometown", this.homeInfo.hometown);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getMyPhoto() {
      let data = {};
      let options = {
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };
      this.$req.get("/miniapp/ma-user-photo/photos", data, options).then(
        (result) => {
          this.imgData = [];
          if (result[1].data.data) {
            result[1].data.data.forEach((item) => {
              this.imgData.push({
                url: item.url,
                id: item.id,
              });
            });
          }

          if (this.imgData.length > 5) {
            this.showAdd = false;
          } else {
            this.showAdd = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteImgFn(id) {
      let data = {};
      let options = {
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "miniapp-token": uni.getStorageSync("miniapp-token"),
        },
      };
      this.$req.post(`/miniapp/ma-user-photo/delete/${id}`, data, options).then(
        (res) => {
          let [err, result] = res;
          console.log("aaaaaaaaa", result);
          this.getMyPhoto();
          // if(result[1].data.data){
          // 		result[1].data.data.forEach((item)=>{
          // 	this.imgData.push({
          // 		btn:'../../static/deleteImg.png',
          // 		url:item.url
          // 	})

          // })

          // }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    closeModel() {
      this.showEditImg = false;
    },
    tapImg(e) {
      // this.showEditImg = true;

      // 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
      this.$refs.gmyImgCropper.chooseImage(e);
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

    open() {
      // console.log('open');
    },
    close() {
      this.show = false;
      // console.log('close');
    },
    showCropperFn() {
      this.showEditImg = false;
      this.tapImg();
    },
    //小程序调起拍照和相册
    editPhotoFn() {
      uni.chooseImage({
        count: 1, //控制上传的数量
        sizeType: ["original", "compressed"],
        sourceType: ["camera", "album"], //camera 拍照 album 相册
        success: (res) => {
          // 此处上传照片后 调用后端接口上传照片。

          console.log(res.tempFilePaths[0]);

          uni.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
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
        fail() {
          uni.showToast({
            title: "拍照或引用相册失败",
            duration: 1000,
          });
        },
      });
    },

    close() {
      this.show = false;
    },
    addImg() {
      let vm = this;
      let num = 6 - vm.imgData.length;
      let imgArr = [];
      uni.chooseImage({
        count: num,
        sizeType: ["original", "compressed"],
        success: (res) => {
          console.log(res);
          let allImg = res.tempFilePaths;
          new Promise((resolve, reject) => {
            allImg.forEach((item) => {
              uni.getFileSystemManager().readFile({
                filePath: item, //选择图片返回的相对路径
                encoding: "base64", //编码格式
                success: (res) => {
                  //成功的回调
                  // let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
                  imgArr.push(res.data);
                  if (allImg.length == imgArr.length) {
                    resolve();
                  }
                },
              });
            });
          }).then(() => {
            let data = {
              // base64:JSON.stringify(imgArr)
              base64: imgArr,
            };
            let options = {
              header: {
                "content-type": "application/json",
                "miniapp-token": uni.getStorageSync("miniapp-token"),
              },
            };

            this.$req.post("/miniapp/ma-user-photo/upload", data, options).then(
              (res) => {
                let [err, result] = res;

                if (result) {
                  this.getMyPhoto();
                  this.showEditImg = false;
                  uni.showToast({
                    title: "成功拍照或引用相册",
                    duration: 2000,
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
    editImgFn() {
      // 编辑顶部图片
      this.showEditImg = true;
    },
    editIntroduce() {
      uni.navigateTo({
        url: "/pages/introduceEdit/introduceEdit",
      });
    },
    gotoInfoFormEdit() {
      uni.navigateTo({
        url: "/pages/infoEditForm/infoEditForm",
      });
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
  .top_img {
    width: 660rpx;
    height: 680rpx;
    margin: 0 auto;
    padding-top: 20rpx;
    margin-bottom: 24rpx;
    position: relative;
    border-radius: 20rpx;
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
    z-index: 88;
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
  .my_introduce {
    margin: 0 auto;
    margin-top: 26rpx;
    width: 286rpx;
    color: #fffbfb;
    text-align: center;
    height: 74rpx;
    line-height: 74rpx;
    background: linear-gradient(180deg, #6e86ff 0%, #a7b5ff 100%);
    border-radius: 1000px;
    img {
      width: 26rpx;
      height: 26rpx;
    }
    span {
      margin-left: 8rpx;
    }
  }
  .item1 {
    height: 320rpx;
    .my-info-container1 {
      height: 94rpx;
      .my-info1 {
        font-weight: 570;
      }
    }
    .info_title {
      width: 95%;
      padding-top: 14rpx;
      font-size: 24rpx;
      color: #a3a3a3;
      border-top: #dbd9d9 2rpx solid;
    }
  }
  .item3 {
    padding-bottom: 50rpx;
    .num {
      padding-left: 5rpx;
      color: #a3a3a3;
      font-size: 24rpx;
    }
  }
  .my-info-container1 {
    position: relative;
    width: 100%;
    height: 105rpx;
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
  .my-info-img {
    position: relative;
    width: 100%;

    .my-info1 {
      padding-bottom: 48rpx;
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
        width: 136rpx;
        height: 136rpx;
        margin: 4rpx 10rpx;
        .deleteImg {
          position: absolute;
          top: 6rpx;
          right: 6rpx;
          width: 26rpx;
          height: 26rpx;
        }
        .picture {
          width: 136rpx;
          height: 136rpx;
          border-radius: 10rpx;
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
        margin-top: 14rpx;
        min-height: 180rpx;
        padding-bottom: 20rpx;
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
      .my-info-icon1 {
        float: left;
        margin-top: 4rpx;
      }
      .info_text2 {
        float: left;
        margin-top: 2rpx;
        display: inline-block;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 40rpx;
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
}
</style>
