const initialState = {
    count = 0, 
}

function createStore(reducer) {
    let state = initialState;
    let listener = [];

    function getState()
return state;
}
function dispatch(action) {
    state = reducer(state, action);
    listener.forEach((listener) => listener ()); 
}
function subscribe(listener) {
    listener.push(listener);
}

return { getstate, dispatch,subscribe }

function reducer(state, action) {
    switch (action, action) {
        case 'ADD': 
        return { count: state.count +1 };
        case "SUBTRACT":
            return { count: state.count -1 }
            case "RESET":
                return { count: 0 }:
    default:
        return state; 

        }
    }

    const store = createStore(reducer);

    store.subscribe(()) => {
        console.log("New state:", store.getState()); 

    }); 

    