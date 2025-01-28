import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../redux/action";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  return (
    <div>
      <h1>Count:{count}</h1>
      <button onClick={() => dispatch(increment)}>Increment</button>
      <button onClick={() => dispatch(decrement)}>Decrement</button>
      <button onClick={() => dispatch(reset)}>Reset</button>
    </div>
  );
};

export default Counter;
