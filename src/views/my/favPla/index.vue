<template>
  <div class="login-container">
    <van-nav-bar
      title="已订阅平台"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  name: "FavPlaIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 返回之前界面
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less"></style>
