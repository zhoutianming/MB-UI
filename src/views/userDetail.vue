<template>
  <!-- user详情页 -->
  <div style="width:100%;height:100%;">
    <x-header style="background:blue;height:49px;width:100%;position: fixed;margin-left:-1px;margin-top:-1px;">
      <span>用户</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <!-- <div id="nav" style="margin-top:-8px;background:#ffffff;width:100%;position: fixed">
      <i style="width:20px;color:#000000cf;float:left;margin-left:5px;margin-top:5px" class="fa fa-angle-left fa-2x" @click="backspace"></i>
    </div>
    <br><br> -->
    <div style="height:auto;background:#edff008a;text-align:center;padding:10px">
      <avatar style="margin-top:50px" fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="150"></avatar>
      <br>
      <span style="font-size:24px">小明</span>
      <br><br>
      <el-button style="background:blue;color:white;width:35%;margin-bottom:20px;">+关注</el-button>
    </div>
    <br>
    <hr>
    <div style="height:auto">
      <el-steps direction="vertical">
        <el-step title="2019-01-20" icon="el-icon-edit">
          <i slot="icon" style="color:#000000" class="fa fa-pencil-square-o fa-2x"></i>
          <span slot="title" style="color:#000000">2019-12-12</span>
          <div slot="description" style="margin-bottom:20px;color:#000000">
            <span style="width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left">今天天气很好,不知的合法化 合法的恢复大会反对和和和获得丰厚道什么时候才能遇见</span>
            <img src="../assets/one.gif" style="width:80%;display: block;">
          </div>
        </el-step>
        <el-step title="2019-01-16" icon="el-icon-edit">
          <i slot="icon" style="color:#000000" class="fa fa-pencil-square-o fa-2x"></i>
          <span slot="title" style="color:#000000">2019-12-12</span>
          <div slot="description" style="margin-bottom:20px;color:#000000">
            <span style="width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left">今天天气很好,不知的合法化 合法的恢复大会反对和和和获得丰厚道什么时候才能遇见</span>
            <img src="../assets/one.gif" style="width:80%;display: block;">
          </div>
        </el-step>
        <el-step title="2019-01-20" icon="el-icon-edit">
          <i slot="icon" style="color:#000000" class="fa fa-pencil-square-o fa-2x"></i>
          <span slot="title" style="color:#000000">2019-12-12</span>
          <div slot="description" style="margin-bottom:20px;color:#000000">
            <span style="width:90%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left">今天天气很好,不知的合法化 合法的恢复大会反对和和和获得丰厚道什么时候才能遇见</span>
            <img src="../assets/one.gif" style="width:73%;display: block;">
          </div>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import {XHeader} from 'vux'

export default {
  components: {
    XHeader
  },
  name: 'userDetail',
  data () {
    return {

    }
  },
  created () {
  },
  mounted: {
  },
  methods: {
    backspace () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
</style>
