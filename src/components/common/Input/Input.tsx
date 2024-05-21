import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <input ref={ref} {...props} />;
});

export default Input;
