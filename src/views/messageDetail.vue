<template>
  <!-- 每个留言的详情页 -->
  <div style="">
    <x-header style="width:100%;background:blue;height:49px;position:fixed;">
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
      <div style="text-align:center" @click="showUserDetail">
        <avatar style="" fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="35"></avatar>
        <span style="margin-top:-2px">小明</span>
      </div>
    </x-header>
    <!-- <div id="nav" style="background:#d0b9b9;width:100%;position: fixed">
      <i style="width:20px;color:#000000cf;float:left;margin-left:5px;margin-top:5px" class="fa fa-angle-left fa-2x" @click="backspace"></i>
      <div style="float:right;text-align:center;margin-right:160px" @click="showUserDetail">
        <avatar style="float:left" fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="35"></avatar>
        <span style="float:left;margin-top:8px;font-size:1.2em">小明</span>
      </div>
    </div> -->
    <!-- <div style="width:100%;height:40px;background:#d0b9b9;position: fixed;left: 0;top: 93%;margin-top: 0;z-index: 10;" @touchmove.prevent>
      <i style="color:#7d7775;float:left;margin-left:5px;margin-top:5px" animate="animated jello" class="fa fa-heart fa-2x" @click="addOne"></i>
      <i style="color:#7d7775;float:left;margin-left:5px;margin-top:5px" animate="animated jello" class="fa fa-star fa-2x" @click="addOne"></i>
      <a style="float:right" href="#ma">
        <i class="fa fa-tags fa-2x" style="color:#000000;margin-right:5px;margin-top:5px" animate="animated jello" @click="showMarkPage"></i>
      </a>
    </div> -->
    <x-header style="width:100%;background:blue;height:49px;position:fixed;left:0px;top:93%;;margin-left:-1px;margin-top:-1px;" @touchmove.prevent>
      <div slot="overwrite-left">
        <i style="font-size:30px" class="iconfont icon-dianzan" @click="addOne"></i>
        <i style="margin-left:5px;font-size:30px" class="iconfont icon-shoucang1" @click="addOne"></i>
      </div>
      <div slot="right">
        <i style="font-size:35px;" class="iconfont icon-tubiaozhizuomobanyihuifu-" @click="showMarkPage"></i>
      </div>
    </x-header>
    <br>
    <div style="background:#4b69de52;width:100%;text-align:center;margin-top:49px;">
      <span style="width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:20px">今天天气很好,不知的合法化 合法的恢复大会反对和和和获得丰厚</span>
      <div style="margin-left:2%;width:96%;display: block;">
        <img src="../assets/one.gif" style="margin-top:20px;margin-bottom:20px;width:100%;height:100%">
      </div>
    </div>
    <time class="time" style="float:left">{{currentDate}}</time><br>
    <br>
    <div style="text-align:center;">
        <span style="font-size:12px">浏览{{goodNumber}}次</span>
        <i style="font-size:20px;margin-left:15px" class="iconfont icon-dianzan" @click="addOne"></i>
        <span style="font-size:0.5em">{{goodNumber}}</span>
        <i style="font-size:20px;margin-left:15px" class="iconfont icon-shoucang1" @click="addOne"></i>
        <span style="font-size:0.5em">99</span>
        <i style="font-size:23px;margin-left:15px" class="iconfont icon-006pinglunhuifu" @click="showMarkerList"></i>
        <span style="font-size:0.5em">1566</span>
    </div>
    <div style="background:#8c8c904d;width:90%;margin-left:5%;margin-bottom:70px" v-show="showMarkerPage">
      <div>
        <div @click="showUserDetail">
          <avatar fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="30"></avatar>
          <span style="padding:1px;font-size:15px">小明</span>
        </div>
        <span style="margin-left:20px;width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:15px">说的对</span>
        <div style="margin-top:30px;margin-left:50px;width:80%;max-height:150px;overflow: hidden;background:#eae1e14d">
          <span style="padding:1px;font-size:10px;color:#bdd02f">小明</span>:
          <span style="overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:8px">说的防御高腹股沟发给与法国 风格战术打法真实性的财富和自行车抗军对</span>
        </div>
      </div>
      <div>
        <div @click="showUserDetail">
          <avatar fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="30"></avatar>
          <span style="padding:1px;font-size:15px">小明</span>
        </div>
        <span style="margin-left:20px;width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:15px">说的对</span>
        <div style="margin-top:30px;margin-left:50px;width:80%;max-height:150px;overflow: hidden;background:#eae1e14d">
          <span style="padding:1px;font-size:10px;color:#bdd02f">小明</span>:
          <span style="overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:8px">说的防御高腹股沟发生日当天工商分局的高度发达国家反恐爱的是法国抗军对</span>
        </div>
      </div>
      <div>
        <div @click="showUserDetail">
          <avatar fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="30"></avatar>
          <span style="padding:1px;font-size:15px">小明</span>
        </div>
        <span style="margin-left:20px;width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:15px">说的对</span>
        <div style="margin-top:30px;margin-left:50px;width:80%;max-height:150px;overflow: hidden;background:#eae1e14d">
          <span style="padding:1px;font-size:10px;color:#bdd02f">小明</span>:
          <span style="overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:8px">说的防御高腹股沟发dstyuligukyjhgdfs>机返二try图一规反抗军对</span>
        </div>
      </div>
    </div>
    <!-- 评论界面 -->
    <el-dialog
      width="100%"
      top="20%"
      :visible.sync="isShowMarkPage"
      :modal="false"
      :append-to-body="true"
      :show-close="false"
      style="opacity:0.8"
      >
      <div style="margin-top:-48px;width:100%;height:100%">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea3"
        >
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer" style="opacity:1">
        <el-button style="float:left;width:40%" @click="isShowMarkPage = false">取 消</el-button>
        <el-button style="float:right;width:40%" type="primary" @click="isShowMarkPage = false">评论</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import {XHeader, Icon} from 'vux'

export default {
  components: {
    XHeader,
    Icon
  },
  name: 'messageDetail',
  data () {
    return {
      goodNumber: 100,
      currentDate: '2019-11-12',
      isShowMarkPage: false,
      showMarkerPage: false
    }
  },
  methods: {
    backspace () {
      this.$router.push({path: '/'})
    },
    showUserDetail () {
      this.$router.replace({path: '/userDetail'})
    },
    showMarkerList () {
      this.showMarkerPage = !this.showMarkerPage
    },
    showMarkPage () {
      this.showMarkerPage = true
      this.isShowMarkPage = true
    },
    addOne () {
      this.goodNumber = this.goodNumber + 1
    }
  }
}
</script>

<style>

</style>
