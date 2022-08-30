<template>
  <view class="HomePageInfo">
    <div class="infoItem" v-if="height || weight">
      <img src="../../static/myPage/person.png" alt="" />
      <span v-if="height && !weight">{{ height }}</span>
      <span v-if="!height && weight">{{ weight }}</span>
      <span v-if="height && weight">{{ height }}-{{ weight }}</span>
    </div>
    <div class="infoItem" v-if="place || hometown">
      <img src="../../static/myPage/location.png" alt="" />
      <span v-if="place && !hometown">{{ place }}</span>
      <span v-if="!place && hometown">{{ hometown }}</span>
      <span v-if="place && hometown">{{ place }}-{{ hometown }}</span>
    </div>
    <div class="infoItem" v-if="education || school">
      <img src="../../static/myPage/school.png" alt="" />
      <span v-if="education && !school">{{ education }}</span>
      <span v-if="!education && school">{{ school }}</span>
      <span v-if="education && school">{{ education }}-{{ school }}</span>
    </div>
    <div class="infoItem" v-if="vocation && !company">
      <img src="../../static/myPage/school.png" alt="" />
      <span>{{ vocation }}</span>
    </div>
    <div class="infoItem" v-if="!vocation && company">
      <img src="../../static/myPage/school.png" alt="" />
      <span>{{ company }}</span>
    </div>
    <div class="infoItem only_row" v-if="vocation && company">
      <img src="../../static/myPage/building.png" alt="" />
      <span>{{ vocation }}-{{ company }}</span>
    </div>
  </view>
</template>

<script>
export default {
  name: "HomePageInfo",
  props: ["homeInfo"],
  data() {
    return {
      name: "Eva",
      date: "",
      showOnleRow: true,
      msg: "Hey, Moenning what's up?",
      imgUrl: "../../static/homeInfo/homeInfo.jpg",
      height: "",
      weight: "",
      place: "",
      hometown: "",
      education: "",
      school: "",
      company: "",
      vocation: "",
    };
  },
  mounted() {
    console.log(this.homeInfo);
  },
  watch: {
    homeInfo: {
      handler(newValue, oldValue) {
        this.homeInfo = newValue;
        console.log(this.homeInfo);
      },
    },
    deep: true,
  },
  methods: {
    toMsgDetail() {
      uni.navigateTo({
        url: "../HM-chat/HM-chat",
      });
    },
  },
  watch: {
    homeInfo: {
      handler(val) {
        if (val.sex) {
          this.height = val.height ? val.height + "CM" : "";
          this.weight = val.weight ? val.weight + "KG" : "";
          if (val.place) {
            if (val.place.province.includes("市")) {
              this.place = val.place.province.split("市")[0];
            } else if (val.place.city.includes("市")) {
              this.place = val.place.city.split("市")[0];
            } else {
              this.place = val.place.city;
            }
            this.place = "现居" + this.place;
          }
          if (val.hometown) {
            if (val.hometown.province.includes("省")) {
              this.hometown =
                val.hometown.province.split("省")[0] +
                val.hometown.city.split("市")[0];
            } else if (val.hometown.province.includes("自治区")) {
              if (val.hometown.city.includes("市")) {
                this.hometown =
                  val.hometown.province.split("自治区")[0] +
                  val.hometown.city.split("市")[0];
              } else {
                this.hometown = val.hometown.province.split("自治区")[0];
              }
            } else if (val.hometown.province.includes("市")) {
              this.hometown = val.hometown.province.split("市")[0];
            }
            this.hometown = this.hometown + "人";
          }
          if (val.education) {
            let degreeArr = [
              "小学",
              "初中",
              "高中",
              "中专",
              "大专",
              "本科",
              "硕士",
              "博士",
            ];
            this.education = degreeArr[val.education - 1];
          }
          this.school = val.school || "";
          this.vocation = val.vocation || "";
          this.company = val.company || "";
        }
      },
    },
    immediate: true,
    deep: true,
  },
};
</script>

<style lang="scss" scoped>
.HomePageInfo {
  display: flex;
  flex-wrap: wrap;
  .infoItem {
    width: 50%;
    padding: 2rpx 4rpx;
    font-weight: 400;
    font-size: 24rpx;
    line-height: 40rpx;
    color: #000000;
    margin: 2rpx 0;
    img {
      width: 24rpx;
      height: 24rpx;
    }
    span {
      margin-left: 14rpx;
    }
  }
  .only_row {
    width: 80%;
  }
}
</style>
