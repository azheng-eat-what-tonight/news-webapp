<template>
  <div class="rank-container">
    <!-- 顶部 -->
    <van-nav-bar class="rank-top" left-text="今日热榜" />
    <!-- 今日热榜列表 -->
    <div class="mid">
      <van-cell
        class="news-list"
        v-for="(item, index) in NewList"
        :key="item.news_id"
      >
        <div class="rank-num" slot="icon">
          {{ index + 1 }}
        </div>
        <news-item :news="item" />
      </van-cell>
      <span class="down">----------------我是有底线的----------------</span>
    </div>
  </div>
</template>

<script>
import { getHotNews } from "../../api/news";
import NewsItem from "@/components/news-item";

export default {
  name: "RankIndex",
  components: { NewsItem },
  props: {},
  data() {
    return {
      NewList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.begin();
  },
  mounted() {},
  methods: {
    async begin() {
      const { data } = await getHotNews();
      console.log(data);
      this.NewList = data.data;
    }
  }
};
</script>

<style scoped lang="less">
.rank-container {
  .rank-top {
    /deep/ .van-nav-bar__content {
      height: 55px;
      .van-nav-bar__text {
        font-size: 16px;
        font-weight: 700;
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
  .news-list:nth-child(-n + 3) {
    .rank-num {
      font-weight: 600;
      font-size: 16px;
    }
  }
  // 第一名
  .news-list:nth-child(1) {
    color: rgb(252, 80, 81, 0);
    .rank-num {
      font-size: 16px;
    }
  }
  // 第二名
  .news-list:nth-child(2) {
    color: rgb(241, 130, 8, 0);
  }
  //第三名
  .news-list:nth-child(3) {
    color: rgb(225, 171, 119, 0);
  }
  .mid {
    margin-bottom: 55px;
  }
  .down {
    display: block;
    font-size: 3px;
    color: rgb(214, 209, 209);
    text-align: center;
    margin-top: 15px;
    margin-bottom: 35px;
  }
}
</style>
