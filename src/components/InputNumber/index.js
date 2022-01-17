import { useState } from "react";
import "./InputNumber.css";

export default function InputNumber({
  max,
  min,
  value,
  onChange = (number) => {},
  style,
  disable,
}) {

  const [number, setNumber] = useState(value || 0);
  const styleDisable = { backgroundColor: "#777", color: "#999" };

  const increase = () => {
    onChange(number + 1);
    if (disable) return;
    if (max == undefined) {
      setNumber(number + 1);
    } else if (number < max) setNumber(number + 1);
    else setNumber(number);
  };
  
  const decrease = () => {
    onChange(number + 1);
    if (disable) return;
    if (min == undefined) {
      setNumber(number - 1);
    } else if (number > min) setNumber(number - 1);
    else setNumber(number);
  };

  return (
    <div className="input-number-content" style={style}>
      <span
        className="button-input-number"
        onClick={decrease}
        style={disable ? styleDisable : null}
      >
        -
      </span>

      <span
        className="input-number-display"
        style={disable ? styleDisable : null}
      >
        {number}
      </span>

      <span
        className="button-input-number"
        onClick={increase}
        style={disable ? styleDisable : null}
      >
        +
      </span>
    </div>
  );
}
