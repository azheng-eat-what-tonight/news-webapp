<template>
  <div class="plaItem-container">
    <!-- 底部背景图 -->
    <van-image class="image" :src="this.plaLogo">
      <van-overlay class-name="overlay" :show="show">
        <div class="mid">
          <van-image class="mid-img" round :src="this.plaLogo" />
          <div class="mid-name">{{ this.plaName }} 热榜</div>
          <div class="mid-info">2645条数据 / 147574人订阅</div>
          <van-button
            class="mid-btn"
            size="small"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
          >
            订阅
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

    <van-cell v-for="item in plaNewList" :key="item.news_id">
      <news-item :news="item" />
    </van-cell>
    <!-- <v-cell></v-cell>
     -->
  </div>
</template>

<script>
import { getPlaNews } from "@/api/news";
import NewsItem from "@/components/news-item";

export default {
  name: "PlaItemIndex",
  components: {
    NewsItem
  },
  props: {
    plaName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // pla_news: {
      //   pla_id: plaId.pla_id,
      //   news_pla: plaId.news_pla
      // },
      plaNewList: [],
      plaLogo: "",
      show: true,
      plaId: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadPlaItem();
  },
  mounted() {},
  methods: {
    async loadPlaItem() {
      // 1.加载对应平台数据
      // 2放入数据
      try {
        console.log(this.plaName);
        console.log(typeof this.plaName);
        var c = {
          plaid: "1",
          news_pla: this.plaName
        };
        const { data } = await getPlaNews(c);
        const results = data.data;
        this.plaNewList.push(...results);
        console.log(this.plaNewList[0]);
        this.plaLogo = this.plaNewList[0].news_logo;
      } catch (e) {
        console.log(e);
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
        margin-top: 6%;
      }
    }
  }
}
</style>
