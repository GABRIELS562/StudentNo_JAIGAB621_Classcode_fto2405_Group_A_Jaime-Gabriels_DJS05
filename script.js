// Initial state of the counter
const initialState = {
	count: 0,
};

// Create a global store
function createStore(reducer) {
	let state = initialState; // Default state is the initialState object
	let listeners = []; // Array to hold the subscribed functions

	// Function to get the current state
	function getState() {
		return state;
	}

	// Function to dispatch actions and update the state based on the action type
	function dispatch(action) {
		state = reducer(state, action); // Update state using the reducer
		listeners.forEach((listener) => listener()); // Notify all subscribers
	}

	// Function to subscribe to state changes
	function subscribe(listener) {
		listeners.push(listener); // Add the listener to the array
	}

	// Return public API
	return { getState, dispatch, subscribe };
}

// Reducer function to handle state updates
function reducer(state, action) {
	switch (action.type) {
		case "ADD":
			return { count: state.count + 1 };
		case "SUBTRACT":
			return { count: state.count - 1 };
		case "RESET":
			return { count: 0 };
		default:
			return state;
	}
}

// Create the store with the reducer
const store = createStore(reducer);

// Subscribe to store updates
store.subscribe(() => {
	console.log("New state:", store.getState());
});

// Log the initial state
console.log("Initial state:", store.getState());

//Dispatch actions to test
store.dispatch({ type: "ADD" });
store.dispatch({ type: "SUBTRACT" });
store.dispatch({ type: "RESET" });
