import React, { useReducer, useRef } from "react";
import "./App.css";

function Count() {
  // create a ref object with the useRef hook. DON'T OVERUSE REFS!
  // (https://reactjs.org/docs/refs-and-the-dom.html#dont-overuse-refs)
  const inputRef = useRef();

  // useReducer will cause the component to re-render whenever the returned
  // state changes
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
    case "add":
      return state + 1;
    case "subtract":
      return state - 1;
    case "change":
       // only update the count if the value is numeric
      if (isNaN(action.count)) {
        return state
      }
      return action.count;
    default:
      return state;
    }
  }, 0);

  return (
    <div className="App">
      <button
        className="btn btn-success mt-5 mb-5"
        onClick={() => dispatch({ type: "add" })}
      >
        Add
      </button>
      <div>{count}</div>
      <button
        className="btn btn-danger mt-5"
        onClick={() => dispatch({ type: "subtract" })}
      >
        Subtract
      </button>
      <input
        className="form-control w-25 mx-auto mt-5"
        placeholder="Type new value..."
        // make this input element the value contained by inputRef
        ref={inputRef}
      />
      <button
        className="btn btn-warning mt-5"
        // Reference the input dom element with inputRef.current
        onClick={() =>
          dispatch({ type: "change", count: parseInt(inputRef.current.value) })
        }
      >
        Change
      </button>
    </div>
  );
}

export default Count;
