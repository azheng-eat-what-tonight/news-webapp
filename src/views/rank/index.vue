<template>
  <div class="rank-container">
    <!-- 顶部 -->
    <van-nav-bar class="rank-top" left-text="今日热榜" />
    <!-- 今日热榜列表 -->
    <div class="rank-list"></div>
  </div>
</template>

<script>
export default {
  name: "RankIndex",
  components: {},
  props: {},
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
}
</style>
