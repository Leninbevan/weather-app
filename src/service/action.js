import { ADD,CARD,LOG} from "./action_types";

export const searching = (data) => (dispatch) => {
    console.log('add', data);
    dispatch({
        type: LOG,
        payload: data
    })
}

export const weatherDetails = (data) => (dispatch) => {
    console.log('add', data);
    dispatch({
        type: ADD,
        payload: data
    })
}

export const weatherCradDetails = (data) => (dispatch) => {
    console.log('add', data);
    dispatch({
        type: CARD,
        payload: data
    })
}