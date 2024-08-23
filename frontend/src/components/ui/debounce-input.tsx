import React, { FC, useEffect, useState } from "react";
import { Input } from "./input";

interface IDebounceInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

const DebounceInput: FC<IDebounceInputProps> = ({
  value,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [localValue, debounce, onChange]);

  return (
    <Input
      value={localValue}
      onChange={(event) => setLocalValue(event.target.value)}
      {...props}
    />
  );
};

export default DebounceInput;
