import { MutationTree } from 'vuex'

const mutation: MutationTree<any> = {
    addPlayerList(state: any,payload: any): void{
        const PlayItem = state.PlayList.find((item: any)=>item.mid == payload.mid)
        if(PlayItem){
           const index = state.PlayList.findIndex((item: any)=>item.mid == payload.mid)
           state.currentIndex = index
        }else{
            state.PlayList.push(payload)
            // 播放索引+1
            state.currentIndex+=1
            
        }
    },
    // 是否全屏
    changeFull(state: any): void{
        state.full = !state.full
    },
    // 上一首
    PreIndex(state: any): void{
        if(state.currentIndex == 0){
            state.currentIndex = state.PlayList.length - 1
            return;
        }
        state.currentIndex =  state.currentIndex - 1
    },
    // 下一首
    nextIndex(state: any): void{
        if(state.currentIndex == state.PlayList.length - 1){
            state.currentIndex = 0
            return;
        }
        state.currentIndex = state.currentIndex + 1
    },
    // 切换模式
    changeMode(state: any): void{
        if(state.mode == 'sequence'){
            state.mode = 'loop'
        }else if(state.mode == 'loop'){
            state.mode = 'sequence'
        }

    },
    // 根据mid取消一首歌
    cancelList(state: any,payload: any){
    const index =  state.PlayList.findIndex((item: any)=>item.mid == payload.mid)
    if(index == 0 && index == state.PlayList.length -1){
        state.currentIndex = -1
    }else if(index == state.PlayList.length -1){
        state.currentIndex = 0
    }else{
        state.currentIndex--
    }


    state.PlayList.splice(index,1)
    }
}

export default mutation