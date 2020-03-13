<template>
  <div class="app">
    <van-nav-bar title="QQ音乐">
  <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" slot="right" size="2rem"/>
  </van-nav-bar>
  <van-tabs swipeable v-model="activeName">
  <van-tab v-for="(item,index) in nav"  :key="index" :title="item.name" :name="item.path" :border="false" type="line" :to="item.path">
      <keep-alive>
        <router-view/>
      </keep-alive>
  </van-tab>
</van-tabs>
  <player/>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {NavBar,Icon,Tabs,Tab} from 'vant'
import player from './components/project/player.vue'
@Component({
  components:{
    [NavBar.name]:NavBar,
    [Icon.name]:Icon,
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    player
  }
})
export default class App extends Vue {
    private nav: object[] = [{id:1,name:'推荐',path:'recommend'},{id:2,name:'歌手',path:'singer'},
    {id:3,name:'流行',path:'popular'},{id:4,name:'搜索',path:'search'}]
    private activeName: string = window.location.hash.split('/')[1]
}
</script>

<style lang="stylus">
.van-hairline--top-bottom::after{
  border-width:0 0!important
}
.app{
  width:100%
  overflow hidden
}
</style>
