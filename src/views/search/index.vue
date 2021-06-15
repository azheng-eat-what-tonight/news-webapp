<template>
  <div class="search-container">
    <van-search
      v-model="serchValue"
      shape="round"
      background="#6495ED"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      show-action
    >
      <template #action>
        <div class="search-font" @click="onSearch">搜索</div>
      </template>
      <van-button
        slot="left"
        class="top-btn"
        @click="onClickLeft"
        plain
        type="primary"
      >
        <van-icon slot="default" size="15px" name="arrow-left" />
      </van-button>
    </van-search>
    <!-- left -->
    <van-cell class="news-list" v-for="item in NewList" :key="item.news_id">
      <news-item :news="item" :isH="serchValue" />
    </van-cell>
  </div>
</template>

<script>
import { selectNews } from "@/api/news";
import NewsItem from "@/components/news-item";

export default {
  name: "SearchIndex",
  components: { NewsItem },
  props: {},
  data() {
    return {
      serchValue: "",
      NewList: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.back();
    },
    async onSearch() {
      if (this.serchValue != "") {
        const { data } = await selectNews({ news_title: this.serchValue });
        if (data.data != "") {
          this.NewList = data.data;
          console.log(data);
        } else {
          this.NewList = [];
          this.serchValue = "";
          this.$toast.fail("搜索结果为空");
        }
      } else {
        this.$toast.fail("输入不能为空");
      }
    }
  }
};
</script>

<style scoped lang="less">
.search-container {
  // 返回按钮
  .top-btn {
    height: 50%;
    width: 12%;
    color: white;
    border: none;
    margin-left: -10px;
  }
  .search-font {
    color: white;
  }
}
</style>
