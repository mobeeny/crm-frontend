import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counter";

function WelcomeFlow() {
    // const count = useSelector((state) => state.counter.value);
    // const dispatch = useDispatch();

    return (
        <div>
            {/* <h1> Tabs Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button> */}
            Welcome Flow Screen
        </div>
    );
}

export default WelcomeFlow;
