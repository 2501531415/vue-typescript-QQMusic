<template>
  <div class="music" ref="music">
    <div class="imgClass" :style="bg" v-show="headImgClass">
      <van-nav-bar left-arrow :title="list.name" :border="false" @click-left="onClickLeft" />
    </div>
    <div class="header" :style="bg" v-show="!headImgClass">
      <van-nav-bar left-arrow :title="list.name" :border="false" @click-left="onClickLeft" />
    </div>
    <scroll
      :probeType="2"
      class="wrapper"
      @position="position"
      :class="{contentChange:headImgClass}"
      v-if="!data && !rankData"
    >
      <div class="content1">
        <div v-for="(item,index) in list.songlist" :key="index" class="content-item">
           <van-button icon="plus" class="icon" size="mini" @click="goToPlayList(item)"></van-button>
          <div @click="play(item)">
            <div>{{item.title}}</div>
            <div>{{item.singer[0].name}}·{{item.title}}</div>
          </div>
        </div>
      </div>
    </scroll>
    <scroll
      :probeType="2"
      class="wrapper"
      @position="position"
      :class="{contentChange:headImgClass}"
      v-if="data"
    >
      <div class="content1">
        <div v-for="(item,index) in data" :key="index" class="content-item">
          <van-button icon="plus" class="icon" size="mini" @click="singerPlayList(item)"></van-button>
          <div @click="singerPlay(item)">
            <div>{{item.musicData.songorig}}</div>
            <div>{{item.musicData.songorig}}·{{list.name}}</div>
          </div>
        </div>
      </div>
    </scroll>
    <scroll
      :probeType="2"
      class="wrapper"
      @position="position"
      :class="{contentChange:headImgClass}"
    >
      <div class="content1" v-if="rankData">
        <div v-for="(item,index) in rankData[0]" :key="index" class="content-item">
             <van-button icon="plus" class="icon" size="mini" @click="goToPlayList(item)"></van-button>
          <div @click="play(item)">
            <div>{{item.name}}</div>
            <div>{{item.name}}·{{item.singer[0].name}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {Getter, Mutation } from "vuex-class";
import { NavBar, Icon,Button,Toast } from "vant";
import { SongDetail } from "../../network/detail";
import Scroll from "components/common/scroll/scroll.vue";
@Component({
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]:Button,
    Scroll
  }
})
export default class MusicList extends Vue {
  @Prop(Object)
  list!: any;
  @Prop()
  data!: any[];
  @Prop()
  rankData!: any[];
   @Getter private PlayList: any
  @Mutation private addPlayerList: any;
  @Mutation private addToPlayList: any;
  private headImgClass = false;
  onClickLeft() {
    history.back();
  }
  // 滚动的高度
  position(position: any) {
    if (position.y < 0) {
      if (-position.y > 154) {
        this.headImgClass = true;
      }
    }
    if (-position.y < 154) {
      this.headImgClass = false;
    }
  }
  get bg() {
    return `background-image:url(${
      this.list.logo ? this.list.logo : this.list.imgUrl
    })`;
  }
  play(list: any) {
    const data = new SongDetail(
      list.title,
      list.singer[0].name,
      list.mid,
      list.album.mid
    );
    this.addPlayerList(data);
  }
    //播放
  singerPlay(list: any) {
    const data = new SongDetail(
      list.musicData.songorig,
      list.musicData.singer[0].name,
      list.musicData.songmid,
      list.musicData.albummid
    );
    this.addPlayerList(data);
  }
    //加入播放菜单
    goToPlayList(list: any){
        const data = new SongDetail(
      list.title,
      list.singer[0].name,
      list.mid,
      list.album.mid
    );
    if(this.PlayList.length == 0){
        this.addPlayerList(data);
        return;
    }
    const song = this.PlayList.find((item: any)=>item.mid == data.mid)
    if(song){
        Toast('歌曲已在歌单')
    }else{
         this.addToPlayList(data)
         Toast('加入成功')
    }
    }
    //加入歌手菜单
    singerPlayList(list: any){
        const data = new SongDetail(
      list.musicData.songorig,
      list.musicData.singer[0].name,
      list.musicData.songmid,
      list.musicData.albummid
    );
     if(this.PlayList.length == 0){
        this.addPlayerList(data);
        return;
    }
    const song = this.PlayList.find((item: any)=>item.mid == data.mid)
    if(song){
        Toast('歌曲已在歌单')
    }else{
         this.addToPlayList(data)
         Toast('加入成功')
    }
    }
}
</script>
<style lang="stylus" scoped>
.imgClass {
  height: 46px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-repeat: no-repeat;
  background-size: cover;
}

.music {
  overflow: hidden;
}

.wrapper {
  height: calc(100vh - 200px);
}

.header {
  height: 200px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.van-nav-bar {
  background-color: transparent !important;
}

.contentChange {
  margin-top: 46px;
  height: calc(100vh - 46px) !important;
}

.content1 {
  padding: 15px;
  font-size: 12px;
  background-color: #eee;
}

.content-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 10px;
}
.van-button--mini{
    min-width 20px!important
    background-color: gainsboro
}
</style>