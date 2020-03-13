<template>
    <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue ,Prop,Emit,Watch} from 'vue-property-decorator'
import BScroll from 'better-scroll'
@Component
export default class ClassName extends Vue{
    public bs: any
    @Prop({default:0})
    probeType!: number
    @Prop({default:true})
    click!: boolean
    @Prop({default:false})
    pullUpLoad!: boolean
    @Prop()
    data!: any[]
    mounted () {
        this.bs = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: this.click,
            pullUpLoad: this.pullUpLoad
        })
        this.bs.on('scroll',(position: number)=>{
            this.send(position)
        })
    }
    @Emit('position')
    send(data: number){
      return data
    }
    @Watch('data')
    change(newValue: any,oldValue: any){
      
      this.refresh()
    }
    // @Watch('scroll',)
    scrollTo(x: number,y: number,time: number) {
      this.bs && this.bs.scrollTo(x,y,time)
    }
    // 滚动到指定元素
    scrollToElement(el: any,time: number) {
     this.bs && this.bs.scrollToElement(el,time)
    }
    // 更新
    refresh() {
      this.bs && this.bs.refresh()
    }
}
</script>
<style lang="stylus" scoped>

</style>