<template>
  <view
    class="item-container"
    :class="text === '婚姻状况' ? 'margin-bottom-new' : ''"
  >
    <view class="left-content">{{ text }}</view>
    <view class="right-content" @click="changeInfo">
      <text style="margin-right: 6rpx">{{ value ? value : "未设置" }}</text>
      <uni-icons type="right" size="15" color="#BCBCBE"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  name: "editName",
  props: {
    text: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeInfo() {
      if (["昵称", "毕业院校", "公司"].includes(this.text)) {
        uni.navigateTo({
          url:
            "/pages/editFormItem/editFormItem?type=" +
            this.text +
            "&data=" +
            this.value,
        });
      } else if (this.text === "出生日期") {
        this.$pub.publish("changeMyInfo", "popupDate");
      } else if (this.text === "现居住地") {
        this.$pub.publish("changeMyInfo", "livePlace");
      } else if (this.text === "家乡") {
        this.$pub.publish("changeMyInfo", "hometown");
      } else if (this.text === "职位") {
        this.$pub.publish("changeMyInfo", "position");
      } else if (this.text === "身高") {
        this.$pub.publish("changeMyInfo", "height");
      } else if (this.text === "体重") {
        this.$pub.publish("changeMyInfo", "weight");
      } else if (this.text === "婚姻状况") {
        this.$pub.publish("changeMyInfo", "marriage");
      } else if (this.text === "最高学历") {
        this.$pub.publish("changeMyInfo", "degree");
      } else if (this.text === "年收入") {
        this.$pub.publish("changeMyInfo", "income");
      } else if (this.text === "性别") {
        uni.$u.toast("性别不允许进行更改哦！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  justify-content: space-between;
  width: 680rpx;
  height: 112rpx;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  padding: 0 40rpx;
  margin-bottom: 20rpx;
  .left-content {
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
  }
  .right-content {
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #bcbcbe;
  }
}
.margin-bottom-new {
  margin-bottom: 20rpx !important;
}
</style>
