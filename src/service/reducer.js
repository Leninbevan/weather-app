import { ADD, CARD, LOG } from "./action_types";

const initialValue={
    weatherDetails:[],
    cardDetails:[],
    log:0
}

export const reducer=(state=initialValue,action)=>{

    switch(action.type){
        case ADD:{
            return {...state,weatherDetails:action.payload}
        }

        case LOG:{
            return {...state,log:action.payload}
        }

        case CARD:{
            return {...state,cardDetails:action.payload}
        }

        default :{
            return {...state}
        }
    }
}