
const initialState = {
    counter:3
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter > 0 ? state.counter - 1 : 0
            };
        // case 'GETCOUNTER':
        //     return state;
        default:
            return state;
    }
};

export default rootReducer;
