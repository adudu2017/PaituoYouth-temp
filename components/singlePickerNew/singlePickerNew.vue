<template>
  <view style="z-index: 999">
    <uni-popup ref="picker" type="bottom">
      <view class="but">
        <text>{{ type }}</text>
        <text
          v-if="type === '职位'"
          style="
            margin-top: 30rpx;
            color: #778dff;
            position: absolute;
            margin-left: 200rpx;
          "
          @click="changeInfo"
        >
          手动填写
        </text>
      </view>
      <picker-view
        v-if="visible"
        :value="startIndex"
        :indicator-style="indicatorStyle"
        @change="bindChange"
      >
        <picker-view-column>
          <view class="item" v-for="(item, index) in optionData" :key="index">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
      <view class="footContainer">
        <view class="confirmBtn" @click="ok">确定</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "singlePickerNew",
  props: {
    type: {
      type: String,
      default: "",
    },
    optionData: {
      type: Array,
      default: [],
    },
    startIndex: {
      type: Array,
      default: [],
    },
    selectedValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: true,
      value: "",
      selectedData: {},
      indicatorStyle: `height: 80rpx;`,
    };
  },
  mounted() {
    this.selectedData = {
      type: this.type,
      value: this.optionData[this.startIndex[0]],
    };
  },
  methods: {
    bindChange(e) {
      this.selectedData = {
        type: this.type,
        value: this.optionData[e.detail.value],
      };
    },
    close() {
      this.$refs.picker.close();
    },
    ok() {
      this.$emit("selectdata", this.selectedData);
      this.$refs.picker.close();
    },
    open() {
      this.$nextTick(() => {
        this.selectedData.type = this.type;
        this.$refs.picker.open();
      });
    },
    changeInfo() {
      let vocation = this.selectedValue || "";
      uni.navigateTo({
        url:
          "/pages/editFormItem/editFormItem?type=" +
          this.type +
          "&data=" +
          vocation,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
text {
  display: inline-block;
  color: $uni-text-color-grey;
}

.but {
  background: #fff;
  height: 112rpx;
  line-height: 112rpx;
  padding: 0 30rpx;
  border-bottom: 2rpx solid #f0f0f0;
  text-align: center;
  text {
    display: inline-block;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 600;
    font-size: 32rpx;
    line-height: 56rpx;
    color: #000000;
  }
}
picker-view {
  position: relative;
  width: 100%;
  background: #fff;
  height: 320rpx;
  text-align: center;
  picker-view-column {
    font-size: 32rpx;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    line-height: 48rpx;
    /* identical to box height, or 150% */
    text-align: center;
    /* dark/90 */
    color: rgba(0, 0, 0, 0.9);
  }
}

.footContainer {
  width: 100%;
  height: 300rpx;
  padding-top: 80rpx;
  background-color: #ffffff;
}

.confirmBtn {
  margin-left: 130rpx;
  padding-top: 20rpx;
  width: 494rpx;
  height: 90rpx;
  /* 紫色渐变 */

  background: linear-gradient(180deg, #6e86ff 0%, #a7b5ff 100%);
  border-radius: 45rpx;

  text-align: center;

  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 32rpx;
  line-height: 44rpx;

  color: #ffffff;
}
</style>
