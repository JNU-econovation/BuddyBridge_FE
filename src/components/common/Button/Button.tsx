import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export default function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}
