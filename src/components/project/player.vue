<template>
<div class="player" v-show="PlayList.length > 0" :class="[Full?'bgc':'fullclass']">
    <transition name="normal">
         <div class="main-player" v-show="Full">
        <div class="background">
            <img :src="currentSong.imgUrl" alt="">
        </div>
        <div class="top">
            <van-nav-bar :title="currentSong.songName" :border="false" @click-left="_changeFull">
            <van-icon name="arrow-down" slot="left"/>
        </van-nav-bar>
        <div class="singer">{{currentSong.singer}}</div>
        </div>
        <div class="img-content" v-show="!lycStatus">
            <div class="img"  @click="changeLycStatus">
            <img :src="currentSong.imgUrl" alt="">
            </div>
            <div class="lyric">
            <span >{{playLyric}}</span>
            </div>
        </div>
        
        <!-- 歌词 -->
      <scroll class="middle-r" ref="lyricList" v-show="lycStatus" >
            <div class="lyric-wrapper" @click="changeLycStatus">
              <div v-if="lyric">
                <p ref="lyricLine"
                  v-for="(line, index) in lyric.lines"
                  :key="index"
                  :class="{'current': currentLineNum === index}"
                  class="text">{{line.txt}}</p>
              </div>
            </div>
          </scroll>

        
        <!-- 控制 -->
        <div class="bottom">
            <!-- 进度条 -->
        <div class="main-progress">
        <div>{{format(currentTime)}}</div>
        <Progress :precent="precent" @newPercent="onProgressChange"/>
        <div>{{format(resultTime)}}</div>
        </div>
            <div class="play-action">
            <van-icon name="exchange" size="1.5rem" v-show="modeType" @click="modeChange"/>
            <van-icon name="replay" size="1.5rem" v-show="!modeType" @click="modeChange"/>
            <van-icon name="play-circle-o" size="1.5rem" class="icon-right" @click="pre"/>
            <van-icon name="pause-circle-o" size="2.5rem" @click="stop" v-show="!stopStaus"/>
             <van-icon name="play-circle-o" size="2.5rem" @click="begain" v-show="stopStaus"/>
            <van-icon name="play-circle-o" size="1.5rem" @click="next"/>
            <van-icon name="like-o" size="1.5rem"/>
        </div>
        </div>
    </div>
    </transition>
    <!-- middle-player -->
    <div class="middle-player" v-show="!Full" >
        <div class="middle-left" @click="_changeFull">
              <img :src="currentSong.imgUrl" alt="">
             <div class="songName">
                 <span>{{currentSong.songName}}</span>
                 <span>{{currentSong.singer}}</span>
             </div>
        </div>
        <div>
            <van-icon name="pause" size="1.5rem" class="icon" @click="stop" v-show="!stopStaus"/>
            <van-icon name="play" size="1.5rem" class="icon" @click="begain" v-show="stopStaus"/>
            <van-icon name="wap-nav" size="1.5rem" class="icon" @click.prevent="playList"/>
        </div>
        
    </div>
    <popup :List="PlayList" :show="show" @change="showStatusChange"/>
    <audio ref="audio" @play="ready" @ended="end" :src="currentSong.audioUrl" @error="error" @timeupdate="updateTime"/>
</div>
</template>
<script lang="ts">
import { Component, Vue,Watch } from 'vue-property-decorator'
import {Getter,Mutation} from 'vuex-class'
import {NavBar,Icon,Toast} from 'vant'
import {getLyric} from '../../network/detail'
import Progress from 'components/common/progress/progress.vue'
import Lyric from 'lyric-parser'
import Scroll from 'components/common/scroll/scroll.vue'
import Popup from './popup.vue'
@Component({
    components:{
        [NavBar.name]:NavBar,
        [Icon.name]:Icon,
        Progress,
        Scroll,
        Popup
    }
})
export default class Player extends Vue{
    @Getter private PlayList: any
    @Getter private currentSong: any
    @Getter private Full!: boolean
    @Getter private mode: any
     @Getter private currentIndex: any
    @Mutation private changeFull: any
    @Mutation private PreIndex: any
    @Mutation private nextIndex: any
    @Mutation private changeMode: any
    @Mutation private addPlayerList: any
    private resultTime = ''
    private progress = '50'
    private stopStaus = false
    private audio: any 
    private currentTime = ''
    private lyric: any = ''
    private currentLineNum = 0
    private lyricList: any
    private lyricLine: any
    private position = true
    private playLyric = ''
    private lycStatus = false
    private progressRef: any
    private show = false
    private listScrollRef: any
    private list: any
    mounted () {
        this.audio = this.$refs.audio
        this.lyricList = this.$refs.lyricList
        this.progressRef = this.$refs.progress
    }
    _getLyric(id: string){
        getLyric(id).then(res=>{
            this.lyric = new Lyric(res.data,this.handlerChange)
            if(!this.stopStaus){
                this.lyric.play()
            }
        }).catch(err=>{
            if(err){
                this.lyric = ''
            }
        })
    }
    handlerChange(line: any, txt: string){
        this.playLyric = line.txt
        this.currentLineNum = line.lineNum
        this.lyricLine = this.$refs.lyricLine
        if (line.lineNum > 5) {
        // 当滚动歌词超过5行时，歌词头部移动到当前歌词的上面5个，来保证当前播放的歌词在中央
        const lineEl = this.lyricLine[line.lineNum - 5]
        this.lyricList.scrollToElement(lineEl, 1000)
      } else {
        // 当歌词行数小于 5 行，每次调动回到当前位置
        this.lyricList.scrollTo(0, 0, 1000)
      }
    }
    onProgressChange(value: number){
        const newCurrentTime = value * parseInt(this.resultTime)
        this.audio.currentTime = newCurrentTime
        if(this.stopStaus){//如果是停止的话就继续播放
            this.begain()
        }
        this.lyric.seek(newCurrentTime * 1000)
    }
    @Watch('currentSong')
    player(newvalue: any){
        if(!newvalue.mid){
            this.audio.pause()
            return;
        }
        if(this.lyric){
            this.lyric.stop()
            this.currentTime = ''
            this.currentLineNum = 0

        }
        this.$nextTick(()=>{
            this.audio.play()
            this._getLyric(this.currentSong.mid)
        })
        if(this.lyric){
            this.lyric.stop()
        }
    }
    _changeFull(){
        this.changeFull()
    }
    // 暂停
    stop(){
        this.audio.pause()
        this.stopStaus = true
        this.lyric.togglePlay()
    }
    // 继续播放
    begain(){
        this.audio.play()
         this.stopStaus = false
         this.lyric.togglePlay()
    }
    // 上一首
    pre(){
        this.PreIndex()
    }
    // 下一首
    next(){
        this.nextIndex()
    }
    // 音乐准备完
    ready(){
        this.stopStaus = false
    }
    // 音乐结束
    end(){
        if(this.mode == 'loop'){
            this.loop()
        }else{
            this.next()
        }

    }
    // 播放失败
    error(){
        this.next()
        Toast('播放失败')
    }
    // 单曲
    loop(){
        this.audio.currentTime = 0
        this.audio.play()
        this.lyric.seek(0)
    }
    // 切换模式
    modeChange(){
        this.changeMode()
    }
    // 音乐时间
    updateTime(e: any){
        this.currentTime = e.target.currentTime
        this.resultTime = e.target.duration
    }
    // 播放菜单
    playList(){
        this.show = true
    }
    // showStatusChange
    showStatusChange(value: boolean){
        this.show = value
    }
    // 菜单列表
    goToPlay(mid: string){
        this.addPlayerList({mid})
    }
    format(interval: number) {
      // 向下取整
      interval = interval | 0
      const minute = (interval / 60) | 0
      const second = this._pad((interval % 60).toString())
      return `${minute}:${second}`
    }
    // 当 num 小于两位数在前面补 0
    _pad(num: string, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
    // 是歌词还是cd
    changeLycStatus(){
        this.lycStatus = !this.lycStatus
    }
    // 计算播放百分比
    get precent(){
        
        return  parseInt(this.currentTime) / parseInt(this.resultTime)
    }
    get modeType(){
        if(this.mode == 'sequence'){
            return true
        }else{
            return false
        }
    }
    
}
</script>
<style lang="stylus" scoped>
.player{
    position fixed
    left 0
    right 0
    bottom 0
    top 0
    z-index 150
}
.van-nav-bar{
    background-color transparent!important
}
.bgc{
    background-color #fff
   
}
.fullclass{
     height 0px
}
.img-content{
    display flex
    flex-direction column
    justify-content space-between
}
.img{
    width 250px
    height 250px
    border-radius 50%
    position relative
    left 50%
    transform translate(-50%)
    margin-top 20px
    padding 10px
    background-color: #eee;
    
}
.img img{
    width 100%
    height 100%
    border-radius 50%
}
.background{
    position absolute
    top 60px
    left 0px
    width 100%
    height 100%
    z-index -1
    opacity 0.5
    filter blur(30px)      
}
.singer{
    text-align center
    font-size 13px
}
.bottom{
    position fixed
    left 0
    right 0
    bottom 49px
}
.play-action{
    display flex
    justify-content space-around
    align-items center
    
}
.middle-player{
    display flex
    justify-content space-between
    align-items center
    position fixed
    left 0
    right 0
    bottom 0
    height: 49px;
    background-color: #eee;
     z-index 180
}
.middle-left{
    display flex
    align-items center
    padding: 10px;
}
.middle-left img{
    width 38px
    height 38px
    border-radius 50%
    
}
.songName{
    display flex
    flex-direction column
    font-size: 12px
    flex-direction: column
    margin-left: 10px
}
.icon{
    margin-right 10px
}
.icon-right{
    transform rotate(180deg)
}
&.normal-enter-active, &.normal-leave-active
      transition all 0.2s
      .top, .bottom
        transition all 0.2s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity 0
      .top
        transform translate3d(0, -100px, 0)
      .bottom
        transform translate3d(0, 100px, 0)
.play-progress{
    position: fixed
    left: 0
    right: 0
    bottom: 108px
    margin: 0px 60px
}
.main-progress{
    display:flex
    justify-content space-around
    align-items center
    font-size 11px
    padding 0 40px
    margin-bottom: 10px;
}
 .middle-r
        display inline-block
        vertical-align top
        width 100%
        font-size: 12px;
        height: calc(100vh - 220px);
        overflow scroll
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 32px
            color $color-text-l
            font-size $font-size-medium
            &.current
              color red
.lyricLine{
    position relative
}
.lyric{
    font-size 13px
    text-align center
    margin-top 10px
}
</style>