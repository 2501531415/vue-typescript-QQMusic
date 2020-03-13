import {GetterTree} from 'vuex'
import {States} from './state'

const getters: GetterTree<States,any> = {
    PlayList(state: any): void{
        return state.PlayList
    },
    Full(state: any): boolean{
        // if(state.PlayList.length == 1){
        //     return true
        // }
        return state.full
    },
    currentSong(state: any): void{
        return state.PlayList[state.currentIndex]?state.PlayList[state.currentIndex]:[]
    },
    mode(state: any): void{
        return state.mode
    },
    currentIndex(state: any): void{
        return state.currentIndex
    }
}

export default getters