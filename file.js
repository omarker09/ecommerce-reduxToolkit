

const deposit = (payload) => {
    return {
        type: "DEPOSIT_MONEY",
        payload: payload
    }
}

const withdraw = (payload) => {
    return {
        type: "WITHDRAW_MONEY",
        payload: payload
    }
}


const bankReducer = (state = 0 , action) => {
    switch(action.type) {
        case "WITHDRAW_MONEY":
           return state + 500
        case "DEPOSIT_MONEY":
           return state - 500;
        default:
            return state; 
    }
}

const store = createReducer(bankReducer)

store.dispatch(deposit)

store.subscribe = () => {
    console.log(store.getState());
}
