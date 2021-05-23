<template>
  <div class="news-list">
    <!-- 刷新列表 -->
    <van-pull-refresh
      v-model="isLoadingRefresh"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1400"
      :animation-duration="600"
    >
      <!-- 新闻列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in newsList" :key="item.news_id">
          <news-item :news="item" />
        </van-cell>
      </van-list>
      <!-- /新闻列表 -->
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNews } from "@/api/news";
//import NewItems from "@/components/news-item/";
import NewsItem from "@/components/news-item";

export default {
  name: "NewsList",
  components: {
    NewsItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      list: [],
      newsList: [],
      loading: false,
      finished: false,
      isLoadingRefresh: false,
      refreshSuccessText: "",
      page: 1
    };
  },
  computed: {},
  watch: {},
  created() {
    getNews();
  },
  mounted() {},
  methods: {
    // 获取对应标签下的请求
    async onLoad() {
      try {
        var data111 = {
          pageNum: this.page,
          page: 21
        };
        console.log(typeof data111);

        const { data } = await getNews({ pageNum: this.page, page: 21 });
        const results = data.data;
        // page = data.page + 1;
        this.newsList.push(...results);
        this.loading = false;
      } catch (e) {
        this.$toast.fail("获取内容失败");
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        // getNews 获取对应标签下的请求
        const { data } = await getNews({
          page: 1
        });
        // 2. 把数据放到数据列表中（往顶部追加）
        const results = data.data;
        this.newsList.unshift(...results);
        this.refreshSuccessText = `更新了${results.length}条数据`;
      } catch (e) {
        this.$toast.fail("获取内容失败");
      }
      this.isLoadingRefresh = false;
    }
  }
};
</script>

<style scoped lang="less">
.news-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 43px;
  overflow-y: auto;
}
</style>
