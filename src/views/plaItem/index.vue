<template>
  <div class="plaItem-container">
    <!-- 底部背景图 -->
    <van-image class="image" :src="this.plaLogo">
      <van-overlay class-name="overlay" :show="show">
        <div class="mid">
          <van-image class="mid-img" round :src="this.plaLogo" />
          <div class="mid-name">{{ this.plaInfo.name }} 热榜</div>
          <div class="mid-info">2645条数据 / 147574人订阅</div>
          <van-button
            class="mid-btn"
            size="small"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            v-if="isSub"
            @click="userSub"
          >
            + 订阅
          </van-button>
          <van-button
            class="mid-btn"
            size="small"
            color="rgb(133, 144, 166)"
            v-else
            @click="userUnsub"
          >
            已订阅
          </van-button>
        </div>
      </van-overlay>
    </van-image>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="pla-item-topbar"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell
      class="news-list"
      v-for="(item, index) in plaNewList"
      :key="item.news_id"
    >
      <div class="rank-num" slot="icon">
        {{ index + 1 }}
      </div>
      <news-item :news="item" />
    </van-cell>
    <!-- <v-cell></v-cell>
     -->
  </div>
</template>

<script>
import { getPlaNews } from "@/api/news";
import { isSubscribePla, unsubscribePla, subscribePla } from "@/api/user";
import NewsItem from "@/components/news-item";

export default {
  name: "PlaItemIndex",
  components: {
    NewsItem
  },
  props: {
    plaInfo: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      plaNewList: [],
      plaLogo: "",
      show: true,
      isSub: true,
      jsonInfo: {}
    };
  },
  computed: {
    derList() {
      return this.$store.state.orderList;
    }
  },
  watch: {},
  created() {
    // 获取平台新闻列表
    this.loadPlaItem();
    // 获取平台订阅状况
    this.userIsSub();
  },
  mounted() {},
  methods: {
    // 加载对应平台数据
    async loadPlaItem() {
      try {
        this.jsonInfo = JSON.parse(this.plaInfo);
        const { data } = await getPlaNews({ pla_id: this.jsonInfo.id });
        const results = data.data;
        this.plaNewList.push(...results);
        console.log(this.plaNewList[0]);
        this.plaLogo = this.plaNewList[0].news_logo;
      } catch (e) {
        console.log(e);
      }
    },
    // 订阅 subscribePla
    async userSub() {
      try {
        await subscribePla({ pla_id: this.jsonInfo.id });
        this.isSub = !this.isSub;
      } catch (e) {
        console.log(e);
      }
    },
    // 用户取消订阅 unsubscribePla
    async userUnsub() {
      try {
        await unsubscribePla({ pla_id: this.jsonInfo.id });
        this.isSub = !this.isSub;
      } catch (e) {
        console.log(e);
      }
    },
    // 用户是否订阅 isSubsribePla
    async userIsSub() {
      try {
        const { data } = await isSubscribePla({ pla_id: this.jsonInfo.id });
        const subDetail = data.detail;
        console.log(subDetail);
        if (subDetail == "未订阅") {
          this.isSub = true;
        } else {
          this.isSub = false;
        }
      } catch (e) {
        console.log(e);
        this.$toast.fail("获取订阅状态失败");
      }
    },
    // 返回之前界面
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
.plaItem-container {
  // 头部组件
  .pla-item-topbar {
    float: left;
    /deep/.van-nav-bar__content {
      background-color: white;
      .van-nav-bar__left {
        width: 100px;
      }
      border: 0px solid;
      .van-nav-bar__text,
      .van-nav-bar__arrow {
        color: rgb(180, 180, 180);
      }
    }
  }

  .news-list {
    box-sizing: border-box;
    .rank-num {
      margin-top: 9px;
    }
  }
  // 前三名 加粗
  .news-list:nth-child(-n + 5) {
    .rank-num {
      font-weight: 600;
      font-size: 16px;
    }
  }
  // 第一名
  .news-list:nth-child(3) {
    color: rgb(252, 80, 81, 0);
    .rank-num {
      font-size: 16px;
    }
  }
  // 第二名
  .news-list:nth-child(4) {
    color: rgb(241, 130, 8, 0);
  }
  //第三名
  .news-list:nth-child(5) {
    color: rgb(225, 171, 119, 0);
  }
  // image
  .image {
    position: relative;
    width: 100%;
    .overlay {
      position: absolute;
      float: left; /*必须 */
      width: 100%;
    }
    .mid {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 18%;
      flex-direction: column;
      .mid-img {
        display: block;
        height: 30%;
        width: 30%;
        border: 2px solid #6495ed;
      }
      .mid-name {
        margin-top: 5%;
        font-weight: 700;
        color: white;
      }
      .mid-info {
        margin-top: 3%;
        font-size: 18px;
        font-weight: 500;
        color: white;
      }
      .mid-btn {
        border-radius: 6px !important;
        margin-top: 6%;
      }
    }
  }
}
</style>
