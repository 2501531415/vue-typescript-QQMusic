<template>
    <div class="progress" ref="progress" @click="clickChange">
        <span class="progerss-portion" ref="portion">
            <span class="pot" ref="pot" @touchstart="start" @touchmove="move" @touchend="end" >
            </span>
        </span>  
        </div>
</template>
<script lang="ts">
import { Component, Vue,Prop,Watch,Emit} from 'vue-property-decorator'
@Component
export default class Progress extends Vue{
    @Prop({default:0,type:Number})
    private precent!: number
    private progress: any
    private portion: any = this.$refs.portion
    private pot: any = this.$refs.pot
    private potwidth = 15
    private startX = 0
    private positionX = 0
    private newsPrecent = 0
    private data: any = {}
    private position = 0 //真正要移动的值
    private offsetWidth = 0
    mounted () {
        this.progress = this.$refs.progress
        this.portion = this.$refs.portion
        this.pot = this.$refs.pot
    }
    @Watch('precent')
    precentChange(newPercent: number){
        if (newPercent > 0 && !this.data.initiated) {
        const barWidth = this.progress.clientWidth - this.potwidth // 进度条宽度
        this.offsetWidth = newPercent * barWidth
        if(this.offsetWidth < 0 ){
            return;
        }
        this.portion.style.width = `${this.offsetWidth}px`
        this.pot.style.transform = `translate3d(${this.offsetWidth}px,-25%,0)` // 小球偏移
      }
    }
    @Emit('newPercent')
    change(value: number){
        return value
    }
    // 移动开始
    start(e: any){
        // 触摸了
        this.data.initiated = true
        // 开始位置
        this.startX = parseInt(e.touches[0].clientX)
        // 进度条的位置
        this.data.progressWidth = this.portion.clientWidth
       
    }
    // 移动过程
    move(e: any){
        // 滑动距离
        if(!this.data.initiated){
            return;
        }
       this.positionX = parseInt(e.touches[0].clientX) - this.startX
        // 限制滑动距离
        this.position = Math.min(this.progress.clientWidth - this.potwidth,Math.max(0,this.data.progressWidth + this.positionX))
       this._translate(this.position)
    }
    // 移动结束
    end(e: any){
    //  向左移动
    this.data.initiated = false
    const barWidth = this.progress.clientWidth - this.potwidth
    this.newsPrecent = this.position / barWidth
    this.change(this.newsPrecent)
    }
    _translate(position: number){
        this.portion.style.width = `${position}px` //进度条偏移
       this.pot.style.transform = `translate3d(${position}px,-25%,0)` // 小球偏移
    }
    clickChange(e: any){
    const rect = this.progress.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._translate(offsetWidth)
      const barWidth = this.progress.clientWidth - this.potwidth
    this.newsPrecent = offsetWidth / barWidth
    this.change(this.newsPrecent)
    }
}
</script>
<style lang="stylus" scoped>
.progress{
    position: relative;
    height: 4px;
    background: #ebedf0;
    border-radius: 4px;
    height 6px
    width 100%
    margin 0px 10px
}
.progerss-portion{
    position: absolute;
    left: 0;
    height: 100%;
    background: #1989fa;
    border-radius: inherit;
    width 0px
}
.pot{
    width 15px
    height 15px
    border-radius 50%
    background-color #1989fa
    position absolute 
    left 0px
    transform: translate(0,-25%);
}
</style>