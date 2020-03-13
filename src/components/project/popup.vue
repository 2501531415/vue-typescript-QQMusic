<template>
<div class="popup">
    <!-- 菜单弹出层 -->
    <van-popup
  v-model="showStatus"
  position="bottom"
  :style="{ height: '50%' }"
    >
    <div class="play-list" >
        <div class="play-list-header">
             <div class="left">
                 <div v-show="modeType" class="left-item">
                 <van-icon name="exchange" size="1.5rem" class="icon" @click="modeChange"/>
                <span>顺序播放</span>
             </div>
             <div v-show="!modeType" class="left-item">
                 <van-icon name="replay" size="1.5rem"  @click="modeChange"/>
                 <span>单曲循环</span>
             </div>
             </div>
             <div class="right">
                 <van-icon name="delete" size="1.5rem"/>
             </div>
              
        </div>
        <scroll :probeType="2" class="warpper">
                <div v-for="(item,index) in List" :key="item.mid" class="play-item">
            <div class="list-songName" @click="goToPlay(item.mid)">
                <van-icon name="volume-o" v-if="currentIndex == index" class="icon"/>
                <span class="title">{{item.singer}}-{{item.songName}}</span>
            </div>
            <div>
                <van-icon name="like-o" class="icon" size="1rem"/>
                <van-icon name="cross" size="1rem" @click="cancelPlayList(item.mid)"/>
            </div>
        </div>
        </scroll>
    </div>
    </van-popup>
</div>
</template>
<script lang="ts">
import { Component, Vue,Prop,Watch,Emit} from 'vue-property-decorator'
import {Getter,Mutation} from 'vuex-class'
import {Icon,Popup} from 'vant'
import Scroll from 'components/common/scroll/scroll.vue'
@Component({
    components:{
        [Icon.name]:Icon,
        [Popup.name]:Popup,
        Scroll

    }
})
export default class PopupClass extends Vue{
    @Getter private mode: any
    @Getter private currentIndex: any
    @Mutation private addPlayerList: any
    @Mutation private changeMode: any
    @Mutation private cancelList: any
    @Mutation private changeFull: any
    @Prop({type:Array,default:[]})
    List!: any[]
    @Prop({type:Boolean,default:false})
    show!: boolean
    private showStatus = false
    // 菜单列表
    goToPlay(mid: string){
        this.addPlayerList({mid})
    }
    // 切换模式
    modeChange(){
        this.changeMode()
    }
    // 取消List
    cancelPlayList(mid: string){
        this.cancelList({mid})
    }
    @Watch('List')
    ListChange(value: any){
        if(value.length == 0){
            this.showStatus = false
            this.changeFull()
        }

    }
    @Watch('show')
    showChange(value: any){
        if(this.show){
            this.showStatus = true
        }
    }
    @Watch('showStatus')
    change(){
        this.statusChange(false)
    }
    @Emit('change')
    statusChange(value: boolean){
        return value
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
.play-list{
    padding 10px 15px
}
.play-item{
    display flex
    justify-content space-between
    padding 10px 0px
}
.title{
    font-size 12px   
}
.icon{
    margin-right 10px
}
.van-popup{
     background-color #eee!important
}
.play-list-header{
    height 46px
    display flex
    justify-content space-between
    align-items center
}
.left-item{
    display flex
    align-items center
   
}
.warpper{
    overflow hidden
    height calc(50vh - 46px)
}
.list-songName{
    display flex
    align-items center
}
</style>