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
import { getNews, getTypeNews, recommend } from "@/api/news";
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
  created() {},
  mounted() {},
  methods: {
    // 获取对应标签下的请求
    async onLoad() {
      try {
        if (this.channel.typeName == "推荐") {
          var { data } = await recommend({
            type_name: this.channel.typeName,
            pageNum: this.page
          });
        } else {
          var { data } = await getTypeNews({
            type_name: this.channel.typeName,
            pageNum: this.page
          });
        }
        const results = data.data;
        // console.log(results.length);
        this.newsList.push(...results);
        this.loading = false;
        // 4. 数据全部加载完成
        if (results.length) {
          // 更新获取下一页数据的页码
          this.page++;
        } else {
          // 没有数据了，把加载状态设置结束，不再触发加载更多
          this.finished = true;
        }
      } catch (e) {
        this.$toast.fail("获取内容失败");
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        if (this.channel.typeName == "推荐") {
          var { data } = await recommend({
            type_name: this.channel.typeName,
            pageNum: this.page
          });
        } else {
          var { data } = await getTypeNews({
            type_name: this.channel.typeName,
            pageNum: this.page
          });
        }
        this.page++;
        // 2. 把数据放到数据列表中（往顶部追加）
        const results = data.data;

        this.newsList.unshift(...results);
        if (results.length) {
          this.refreshSuccessText = `更新了${results.length}条数据`;
        } else {
          this.refreshSuccessText = `数据已全部展示`;
        }
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
