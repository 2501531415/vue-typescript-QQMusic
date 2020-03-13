<template>
<div class="recommend" :class="[singStatus?'sing':'']">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" height="150">
  <van-swipe-item v-for="(item, index) in banner" :key="index">
    <img v-lazy="item.pic_info.url"  class="img"/>
  </van-swipe-item>
</van-swipe>
<van-nav-bar title="热门歌单推荐" :border="false"/>
<van-list
  v-model="loading"
  :finished=finished
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="false"
>
  <div v-for="(item,index) in recommend" :key="index" class="list-item" @click="go(item.dissid)">
      <img :src="item.imgurl" alt="">
      <div class="list-content">
          <div>{{item.creator.name}}</div>
          <div>{{item.dissname}}</div>
      </div>
  </div>
</van-list>
<router-view></router-view>
</div>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {getBanner,getRecommend} from '../network/home'
import {Swipe, SwipeItem,NavBar,List} from 'vant'
import {Getter} from 'vuex-class'
@Component({
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [NavBar.name]:NavBar,
        [List.name]:List,
    }
})
export default class ClassName extends Vue{
    private banner: object[] = []
    private pageSize = 5
    private recommend: object[] = []
    private loading = false
    private finished = false
    @Getter private currentSong: any
    mounted () {
    getBanner().then(res=>{
        this.banner = res.data.data
      })
    this._getRecommend(this.pageSize)
    }
    _getRecommend(pageSize: number){
        getRecommend(pageSize).then(res=>{
            this.recommend = res.data.data.list
        })
    }
    onLoad(){
        this.pageSize +=5
        this._getRecommend(this.pageSize)
        this.loading = false
        if(this.pageSize === 60){
            this.finished = true
        }
    }
    go(id: string){
        this.$router.push(`/recommend/${id}`)
    }
    // 歌曲播放时
    get singStatus(){
        if(this.currentSong){
            return true
        }else{
            return false
        }
    }
}
</script>
<style lang="stylus" scoped>
.recommend{
    height:calc(100vh - 44px - 46px)
    overflow auto
}
.sing{
    height calc(100vh - 44px - 46px - 46px)
}
.img{
    height:150px
}
.list-item
    display flex
    padding 0 14px
    font-size 13px
    margin-bottom 20px

.list-item img
    width 69px
    height 55px
    margin-right:15px

.list-content
    display: flex
    margin: 5px 0
    flex-direction: column
    justify-content: space-between
.van-list
    height: 100%;
</style>