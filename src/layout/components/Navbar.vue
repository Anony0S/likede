<template>
  <div class="navbar">
    <img
      src="@/assets/common/logoimg.png"
      style="width: 88px; margin: 6px 0 0 15px"
    >
    <div class="right-menu">
      <div class="avatar-wrapper">
        <img
          v-imgerror="require('@/assets/common/avatar.png')"
          :src="avatar"
          class="user-avatar"
        >
        <span>欢迎您，admin</span>
        <span class="exit" @click="logout">
          退出
          <i class="el-icon-caret-bottom" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters(['avatar'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #5373e0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #fff;

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    img {
      margin-right: 10px;
    }

    span {
      margin-right: 20px;
    }
    .exit {
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
