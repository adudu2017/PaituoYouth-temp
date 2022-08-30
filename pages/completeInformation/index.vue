<template>
  <view class="completeInformation">
    <u-navbar
      is-back="true"
      :border-bottom="false"
      title-color="black"
      bgColor="#E5E5E5"
      :title="completeInfoTitle"
    ></u-navbar>
    <view class="top_box">
      <view class="item_box"
        ><view class="text1">1</view>
        <view class="text2">基本信息</view>
      </view>
      <view>.......</view>
      <view class="item_box"
        ><view :class="componentFalg ? 'text_action' : 'text1'">2</view>
        <view class="text2">上传头像</view>
      </view>
    </view>
    <info-form @closeForm="closeForm" v-if="componentFalg"></info-form>
    <add-img v-if="!componentFalg"></add-img>
  </view>
</template>

<script>
import InfoForm from "./infoForm";
import AddImg from "./addImg.vue";
export default {
  name: "completeInformation",
  components: {
    InfoForm,
    AddImg,
  },
  data() {
    return {
      completeInfoTitle: "完善资料（1/2）",
      componentFalg: true,
      complate: 1,
    };
  },
  beforeMount() {},
  mounted() {},
  onLoad(option) {
    // 接收传过来的资料完善情况。
    this.complate = option.complate;
    if (this.complate == 2) {
      this.componentFalg = false;
      this.completeInfoTitle = "完善资料（2/2）";
    }
  },
  beforeDestroy() {},
  methods: {
    closeForm(flag) {
      console.log(flag);
      if (flag == false) {
        this.componentFalg = false;
        this.completeInfoTitle = "完善资料（2/2）";
      }
    },
    getValueOnPage() {
      let keys = Object.keys(this.tempFormData);
    },
  },
};
</script>

<style lang="scss" scoped>
.completeInformation {
  padding-bottom: 28rpx;
  width: 100%;
  height: 100%;
  background: #e5e5e5;
  .top_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 40rpx 130rpx;
    padding-bottom: 0;
    .item_box {
      .text1 {
        height: 62rpx;
        width: 62rpx;
        background: #94a5f7;
        border-radius: 50%;
        line-height: 62rpx;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 18rpx;
        color: #c6c6c6;
        font-weight: 600;
      }
      .text_action {
        height: 62rpx;
        width: 62rpx;
        border-radius: 50%;
        line-height: 62rpx;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 18rpx;
        font-weight: 600;
        color: #c6c6c6;
        border: 4rpx solid #c6c6c6;
      }
    }
  }
}
</style>
