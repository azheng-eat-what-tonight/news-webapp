<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" active-color="#6495ED" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/rank">热榜</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/pla">平台</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {
      active: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less"></style>
