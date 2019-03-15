<template>
  <div :style="conheight">
    <x-header style="width:100%;background:blue;height:49px;margin-left:-1px;margin-top:-1px;">
      <!-- 搜索框 -->
      <div style="width:100%">
        <input style="width:83%" type="search" class="header_search" id="searchInput" placeholder="搜索关注的人">
        <div style="float:right;margin-top:8px">
          <x-icon style="color:black;" type="ios-search-strong" @click="search" size="30"></x-icon>
        </div>
      </div>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <!-- 用户区 -->
    <div style="text-align:center" @click="showUserDetail">
      <avatar style="" fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="60"></avatar>
      <div style="margin-top:-2px">小明</div>
    </div>
  </div>
</template>

<script>
import {XHeader, XButton} from 'vux'

export default {
  components: {
    XHeader,
    XButton
  },
  name: 'care',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    isShowside () {
      return this.$store.getters.isShowside
    },
    showUserIcon () {
      return this.$store.getters.isShowUserIcon
    }
  },
  mounted () {
  },
  methods: {
    backspace () {
      this.$router.push({path: '/'})
    },
    showUserDetail () {
      this.$router.replace({path: '/userDetail'})
    }
  }
}
</script>

<style scoped>
.header_search {
    box-sizing: border-box;
    padding-left: 10px;
    width: 90%;
    height: 34px;
    margin-top: 4px;
    border-radius: 17px;
    background: rgba(255,255,255,0.9);
    font-size: 14px;
    color: #999;
    border: none;
}
</style>
