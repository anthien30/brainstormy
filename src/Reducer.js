const Reducer = (state,action) => {
    switch(action.type){
        case 'setObj':
            console.log("Triggered")
            return{
                googleObj: action.obj
            }
        default:
            return state;
    }
};

export default Reducer