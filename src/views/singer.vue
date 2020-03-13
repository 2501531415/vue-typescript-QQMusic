<template>
<div class="singer" :class="[singStatus?'sing':'']">
<van-index-bar :index-list="indexList" v-for="(item,index) in hot" :key="index" :index="item.title" highlight-color="red">
  <van-index-anchor>{{item.title}}</van-index-anchor>
    <div v-for="name in item.items" :key="name.singerId" class="content" @click="goToDetail(name.singerMid)">
        <img :src="name.avatarUrl" alt="">
        <span>{{name.singerName}}</span>
    </div>
</van-index-bar>
<router-view></router-view>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {getSinger,Singer} from '../network/home'
import {checkCh} from '../config/config'
import {IndexBar, IndexAnchor} from 'vant'
import {Getter} from 'vuex-class'
@Component({
    components:{
        [IndexBar.name]:IndexBar,
        [IndexAnchor.name]:IndexAnchor
    }
})
export default class ClassName extends Vue{
    private singer: object[] = []
    private hot: object[] = [{title:'热',items:[]}]
    private val: object[] = []
    private singerList: object[] = []
    @Getter private currentSong: any
    private indexList = ['热','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Y','Z']
    mounted () {
        this._getSinger()
    }
    // 获取歌手列表
    _getSinger(){
        getSinger().then(res=>{
            // console.log(res)
            this.singer = res.data.data
            this._getSingerList()
        })
    }
    // 整合数据
    _getSingerList(){
        this.singer.forEach((item: any,index)=>{
            if(index<10){
                const data = new Singer(item.singer_id,item.singer_name,item.singer_pic,item.singer_mid)
                this.hot.forEach((item: any)=>{
                    item.items.push(data)
                })
            }
            const key: string = checkCh(item.singer_name)
            const value: object | undefined = this.val.find((item: any)=>item.title ===key)
            if(!value){
                this.val.push({title:key,items:[]})
                this.val.forEach((item1: any)=>{
                    if(item1.title === key){
                        item1.items.push(new Singer(item.singer_id,item.singer_name,item.singer_pic,item.singer_mid))
                    }
                })
            }else{
                this.val.forEach((item1: any)=>{
                    if(item1.title === key){
                        item1.items.push(new Singer(item.singer_id,item.singer_name,item.singer_pic,item.singer_mid))
                    }
                })
            
            }
        })
        this.val = this.val.sort((a: any,b: any)=>{
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        this.hot.push(...this.val)
        // console.log(this.hot)
    }
    goToDetail(id: string){
        this.$router.push(`/singer/${id}`)
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
.singer{
    overflow auto
    height:calc(100vh - 44px - 46px)
}
.sing{
    height calc(100vh - 44px - 46px - 46px)
}
.content{
    display flex
    align-content center
    margin 15px 0
    padding 0 20px
}
.content img{
    width:44px
    height:44px
    border-radius 50%
}
.content span{
    font-size 12px
    margin 13px 10px
}
.van-index-bar__sidebar{
    color white!important
    font-family: sans-serif
    top 55%!important 
}
</style>