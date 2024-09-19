// Initial state of the counter
const initialState = {
	count: 0, // Initial state object with a single property count set 0;
};

// Create a global store
function createStore(reducer) {
	let state = initialState; // Default state is the initialState object({ count: 0 })
	let listeners = []; // Array to hold functions that are subscribed to state changes

	// Function to get the current state
	function getState() {
		return state; // Return the current state object
	}

	// Function to dispatch actions and update the state based on the action type
	function dispatch(action) {
		state = reducer(state, action); // Update state by calling the reducer with the current state and action
		listeners.forEach((listener) => listener()); // Notify all subscribers that the state has changed
	}

	// Function to subscribe to state changes
	function subscribe(listener) {
		listeners.push(listener); // Adds a listener (callback function) to the listeners array
	}

	// Return public API
	return { getState, dispatch, subscribe }; //// Exposes the store methods (getState, dispatch, subscribe)
}

// Reducer function to handle state updates
function reducer(state, action) {
	switch (action.type) {
		case "ADD": // If the action type is 'ADD'
			return { count: state.count + 1 }; // Increments the current count by 1 and returns the updated state
		case "SUBTRACT": // If the action type is 'SUBTRACT'
			return { count: state.count - 1 }; // Decrements the current count by 1 and returns the updated state
		case "RESET": // If the action type is 'RESET'
			return { count: 0 }; // Resets the count back to 0 and returns the updated state
		default:
			return state; // For any unrecognized action, return the current state unchanged
	}
}
// Create the store with the reducer
const store = createStore(reducer); // We create a store using the reducer. The store holds the state and has dispatch, getState, and subscribe methods.

// Subscribe to store updates and log the state changes
store.subscribe(() => {
	console.log("New state:", store.getState()); // This function will run and log the new state whenever an action is dispatched and the state changes
});

// SCENARIO 1: Initial State Verification
console.log("SCENARIO 1: Initial State Verification"); // Log the description of the test case
console.log("Initial state:", store.getState()); // Fetch and log the current state before any actions are dispatched. Output: { count: 0 }

// SCENARIO 2: Incrementing the Counter
console.log("SCENARIO 2: Incrementing the Counter"); // Log the description of the test case
store.dispatch({ type: "ADD" }); // Dispatch an 'ADD' action. The reducer will increase the count by 1. Count becomes 1
store.dispatch({ type: "ADD" }); // Dispatch another 'ADD' action. The reducer will increase the count by 1 again. Count becomes 2
// At this point, the count should be 2 and is automatically logged due to the subscription

// SCENARIO 3: Decrementing the Counter
console.log("SCENARIO 3: Decrementing the Counter"); // Log the description of the test case
store.dispatch({ type: "SUBTRACT" }); // Dispatch a 'SUBTRACT' action. The reducer will decrease the count by 1. Count becomes 1
// At this point, the count should be 1 and is automatically logged due to the subscription

// SCENARIO 4: Resetting the Counter
console.log("SCENARIO 4: Resetting the Counter"); // Log the description of the test case
store.dispatch({ type: "RESET" }); // Dispatch a 'RESET' action. The reducer will reset the count to 0. Count becomes 0
// At this point, the count should be 0 and is automatically logged due to the subscription
