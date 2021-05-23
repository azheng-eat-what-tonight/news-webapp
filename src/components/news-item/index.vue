<template>
  <div class="news-item-container">
    <div>
      <div class="title">
        <a v-bind:href="news.news_url">{{ news.news_title }}</a>
      </div>
      <div class="label-wrap">
        <span>{{ news.news_createTime | relativeTime }}</span>
        <span>{{ news.news_hot }}</span>
        <span>{{ news.news_pla }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  components: {},
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.label-wrap {
  font-size: 11px;
  color: #b4b4b4;
}
.label-wrap span {
  margin-right: 12px;
}
</style>
