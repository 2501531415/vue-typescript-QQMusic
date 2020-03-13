<template>
<div class="music" ref="music">
    <div class="imgClass" :style="bg" v-show="headImgClass">
        <van-nav-bar left-arrow :title="list.name" :border="false" @click-left="onClickLeft"/>
    </div>
    <div class="header" :style="bg" v-show="!headImgClass">
        <van-nav-bar left-arrow :title="list.name" :border="false" @click-left="onClickLeft"/>
    </div>
    <scroll :probeType="2" class="wrapper" @position="position" :class="{contentChange:headImgClass}" v-if="!data && !rankData">
        <div class="content1"  >
        <div v-for="(item,index) in list.songlist" :key="index" class="content-item" @click="play(item)">
            <div>{{item.title}}</div>
            <div>{{item.singer[0].name}}·{{item.title}}</div>
        </div>
    </div>
    </scroll>
    <scroll :probeType="2" class="wrapper" @position="position"  :class="{contentChange:headImgClass}" v-if="data">
    <div class="content1">
        <div v-for="(item,index) in data" :key="index" class="content-item" @click="singerPlay(item)">
            <div>{{item.musicData.songorig}}</div>
            <div>{{item.musicData.songorig}}·{{list.name}}</div>
        </div>
    </div>
    </scroll>
    <scroll :probeType="2"  class="wrapper" @position="position" :class="{contentChange:headImgClass}">
    <div class="content1" v-if="rankData">
        <div v-for="(item,index) in rankData[0]" :key="index" class="content-item" @click="play(item)">
            <div>{{item.name}}</div>
            <div>{{item.name}}·{{item.singer[0].name}}</div>
        </div>
    </div>
    </scroll>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import {Mutation} from 'vuex-class'
import {NavBar} from 'vant'
import {SongDetail} from '../../network/detail'
import Scroll from 'components/common/scroll/scroll.vue'
@Component({
    components:{
        [NavBar.name]:NavBar,
        Scroll
    }
})
export default class MusicList extends Vue{
    @Prop(Object)
    list!: any
    @Prop()
    data!: any[]
    @Prop()
    rankData!: any[]
    @Mutation private addPlayerList: any
    private headImgClass = false
    onClickLeft(){
       history.back()
    }
    // 滚动的高度
    position(position: any){
        if(position.y < 0){
            if(-position.y > 154){
                this.headImgClass = true
            }
        }
        if(-position.y < 154){
                this.headImgClass = false
        }
    }
    get bg(){
        return `background-image:url(${this.list.logo?this.list.logo:this.list.imgUrl})`
    }
    play(list: any){
        const data = new SongDetail(list.title,list.singer[0].name,list.mid,list.album.mid)
        this.addPlayerList(data)
    }
    singerPlay(list: any){
        const data = new SongDetail(list.musicData.songorig,list.musicData.singer[0].name,list.musicData.songmid,list.musicData.albummid)
        this.addPlayerList(data)
    }  
}
</script>
<style lang="stylus" scoped>
.imgClass{
    height 46px
    position fixed
    top 0
    left 0
    right 0
    z-index 9999
    background-repeat: no-repeat
    background-size:cover
}
.music{
    overflow hidden
}
.wrapper{
    height calc(100vh - 200px)
}
.header{
    height 200px;
    width: 100%;
    background-repeat: no-repeat
    background-size:cover

}
.van-nav-bar{
    background-color transparent!important
}
.contentChange{
    margin-top 46px
    height calc(100vh - 46px)!important
}
.content1{
    padding: 22px
    font-size: 12px
    background-color: #eee
}
.content-item{
    margin-bottom: 10px
}
</style>