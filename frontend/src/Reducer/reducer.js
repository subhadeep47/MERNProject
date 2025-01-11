
export const initialvalue = {
    isLoggedIn: false,
};


export const reducer = (state, action)=>{
    console.log('from reducer')
    if(action.type==='user')
        return action.value;
    return state;
}