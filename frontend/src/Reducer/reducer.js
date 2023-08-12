

const status = window.localStorage.getItem('isLoggedIn');


export const initialvalue = {
    isLoggedIn:status,
};


export const reducer = (state, action)=>{
    console.log('from reducer')
    if(action.type==='user')
        return action.value;
    return state;
}