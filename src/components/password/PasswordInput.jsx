import React from "react";
import "./pw-styles.css";

import { strengthIndicator, strengthColor } from "./StrengthPassword";

export default function PasswordInput(props) {
  const strength = strengthIndicator(props.value);
  const color = strengthColor(strength);

  return (
    <input
      type="password"
      value={props.value}
      name="password"
      className="password-input"
      placeholder={props.placeholder}
      onChange={props.handleChanges}
      style={{
        borderColor: color
      }}
    />
  );
}
