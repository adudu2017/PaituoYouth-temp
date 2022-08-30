<template>
  <view class="container">
    <view class="text1">选择你的生日</view>
    <view class="text2">为你推荐适龄的异性</view>
    <view class="sub-container1">
      <img
        style="width: 160rpx; height: 160rpx"
        src="/static/birth.png"
        alt=""
      />
    </view>
    <view class="text-container">
      <view class="birthday-item" @click="selectBirthday">
        <text style="text-align: center">
          {{ birthday ? birthday : "点击选择出生日期" }}
        </text>
      </view>
    </view>
    <view
      :class="btnColorShow ? 'sub-container3' : 'sub_container3_ban'"
      @click="gotoNext"
    >
      下一步
    </view>
    <KXDateTime
      ref="datePop"
      :date="birthday"
      :value="defaultBirthIndex"
      :end="endDate"
      :start="startDate"
      @rundata="getBirthDay"
    ></KXDateTime>
  </view>
</template>

<script>
import KXDateTime from "@/components/kx-datetime/kx-datetime.vue";
export default {
  name: "locationPageOne",
  components: {
    KXDateTime,
  },
  data() {
    let defaultBirthIndex = [99, 0, 0];
    return {
      birthday: "",
      btnColorShow: false,
      defaultBirthIndex,
      startDate: "1923/01/01",
      endDate: "2022/12/31",
    };
  },
  methods: {
    getBirthDay(e) {
      this.birthday = e;
      this.btnColorShow = true;
    },
    selectBirthday() {
      this.$refs.datePop.open();
    },
    gotoNext() {
      if (!this.birthday) {
        return;
      }
      let data = {
        birth: this.birthday,
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
          console.log(result.data.data);
          if (result.data.code === 20000) {
            uni.navigateTo({
              url: "../locationPageOne/locationPageOne",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("@/static/assets/img/backGround/background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 240rpx;
  .text1 {
    font-size: 48rpx;
  }
  .text2 {
    margin-top: 40rpx;
    font-size: 32rpx;
  }
  .sub-container1 {
    margin-top: 86rpx;
  }
  .text-container {
    display: inline-block;
    padding-left: 40rpx;
    padding-right: 40rpx;
    margin-top: 56rpx;
    padding-bottom: 22rpx;
    border-bottom: 2rpx solid #aaa6a6;
    .birthday-item {
      text-align: center;
    }
  }

  .sub-container3 {
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
  .sub_container3_ban {
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
    background: #c2bfbf;
    border-radius: 1000px;
  }
}
</style>
