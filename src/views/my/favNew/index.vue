<template>
  <div class="login-container">
    <van-nav-bar
      left-text="返回"
      title="收藏的新闻"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell v-for="item in newsList" :key="item.news_id">
      <news-item :news="item" />
    </van-cell>
  </div>
</template>

<script>
import { getCollectionNews } from "@/api/user";
import NewsItem from "@/components/news-item";
export default {
  name: "FavNewIndex",
  components: { NewsItem },
  props: {},
  data() {
    return {
      newsList: [],
      newsIdList: [],
      isCollected: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserFavNews();
  },
  mounted() {},
  methods: {
    // 获取用户收藏的新闻
    async getUserFavNews() {
      var { data } = await getCollectionNews();
      this.newsList = data.data;

      for (const i in this.newsList) {
        this.newsIdList.push(this.newsList[i].news_id);
      }
      // this.checkIsCollectionNews();
    },
    // 获取用户收藏的新闻标记
    async checkIsCollectionNews() {
      try {
        const { data } = await isCollectionNews({
          news_id: this.newsIdList
        });
        isCollected = data.data;
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

<style scoped lang="less"></style>
