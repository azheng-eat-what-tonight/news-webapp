<template>
  <div class="login-container">
    <van-nav-bar
      left-text="返回"
      title="浏览记录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell v-for="item in newsList" :key="item.news_id">
      <news-item :news="item">
        <div>
          {{ item.news_toHotTime }}
        </div>
      </news-item>
    </van-cell>
  </div>
</template>

<script>
import { getHistoryRecord } from "@/api/user";
import NewsItem from "@/components/news-item";
export default {
  name: "hisIndex",
  components: { NewsItem },
  props: {},
  data() {
    return {
      newsList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserHis();
  },
  mounted() {},
  methods: {
    async getUserHis() {
      var { data } = await getHistoryRecord();
      this.newsList = data.data;
      console.log(this.newsList);
    },
    // 返回之前界面
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less"></style>
