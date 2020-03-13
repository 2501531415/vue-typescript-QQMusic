export interface States {
    PlayList: any[];
    full: boolean;
    currentIndex: number;
    mode: string;
    
}
const States: States = {
    PlayList: [],
    full:true,
    currentIndex:-1,
    mode:'sequence'
}

export default States