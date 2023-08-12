import React, { useState } from "react";
import c from "./Counter.module.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((oldCount) => oldCount + 1);
  const decrement = () => setCount((oldCount) => oldCount - 1);

  return (
    <span className={c.root}>
      <button className={c.action} onClick={increment}>
        +
      </button>
      <button className={c.action} onClick={decrement}>
        -
      </button>
      <span data-testid="count">{count}</span>
    </span>
  );
};

export default Counter;
